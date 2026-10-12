import { TOOL_DEFINITIONS, runTool } from './tools'

const MODEL = process.env.AGENT_MODEL || 'claude-opus-5-5'
const MAX_TURNS = 8

const SYSTEM_PROMPT = `You are the AfriBizConnect Trade Agent. African business owners message you on WhatsApp to buy goods from verified suppliers in Dubai.

Your job for each request:
1. Work out the product, quantity and destination country. The buyer may write in English, Swahili, Amharic, French or another language.
2. If product, quantity or destination country is missing, call submit_reply with status NEEDS_INFO and ONE short question. Do not guess quantity or country.
3. Otherwise call search_catalog (English keywords). Try 2-3 keyword variations if results are poor.
4. For the best 3-5 matches, call calculate_landed_cost. Default to air for orders under 300 kg total, sea above, unless the buyer says otherwise.
5. Rank up to 3 options by landed total, supplier trust and transit time. Call submit_reply with status QUOTED.

Rules:
- Every price you mention must come from a calculate_landed_cost result. Never invent or adjust a number.
- Prices are estimates; say so in one short phrase.
- Prefer verified suppliers; mention when a supplier is not verified.
- If nothing matches, use status NO_MATCH and say we will source it and come back.
- Reply in the buyer's language.

WhatsApp reply format (keep under 900 characters):
- One opening line.
- Each option: number, product + supplier, landed total in local currency and USD, per-unit cost, delivery days, one-line reason.
- End with: "Reply 1, 2 or 3 to order." (translated).
- Use *bold* sparingly. No markdown headers or tables.`

export interface AgentResult {
  status: 'QUOTED' | 'NEEDS_INFO' | 'NO_MATCH' | 'FAILED'
  replyText: string
  options: any[]
  trace: { tool: string; input: any; output: any }[]
}

export async function runTradeAgent(buyerMessage: string): Promise<AgentResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')

  const messages: any[] = [{ role: 'user', content: buyerMessage }]
  const trace: AgentResult['trace'] = []

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        tools: TOOL_DEFINITIONS,
        messages,
      }),
    })
    if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`)
    const data = await res.json()
    messages.push({ role: 'assistant', content: data.content })

    const toolUses = (data.content as any[]).filter(b => b.type === 'tool_use')

    const final = toolUses.find(t => t.name === 'submit_reply')
    if (final) {
      trace.push({ tool: 'submit_reply', input: final.input, output: null })
      return {
        status: final.input.status,
        replyText: final.input.reply_text,
        options: final.input.options ?? [],
        trace,
      }
    }

    if (toolUses.length === 0) {
      // Model answered in plain text without the finish tool; use it as the reply.
      const text = (data.content as any[]).filter(b => b.type === 'text').map(b => b.text).join('\n').trim()
      return { status: 'NEEDS_INFO', replyText: text || 'Sorry, could you tell me what you need, how many, and which country?', options: [], trace }
    }

    // Run independent tool calls in parallel.
    const results = await Promise.all(
      toolUses.map(async t => {
        let output: any
        try {
          output = await runTool(t.name, t.input)
        } catch (e: any) {
          output = { error: e?.message ?? 'Tool failed' }
        }
        trace.push({ tool: t.name, input: t.input, output })
        return { type: 'tool_result', tool_use_id: t.id, content: JSON.stringify(output), is_error: !!output?.error }
      }),
    )
    messages.push({ role: 'user', content: results })
  }

  return {
    status: 'FAILED',
    replyText: 'Sorry, I could not finish this quote. A team member will follow up shortly.',
    options: [],
    trace,
  }
}
