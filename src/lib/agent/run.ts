import { TOOL_DEFINITIONS, runTool } from './tools'

const MODEL = process.env.AGENT_MODEL || 'claude-opus-5-5'
const MAX_TURNS = 8

const SYSTEM_PROMPT = `You are the AfriBizConnect Trade Agent. African business owners message you (WhatsApp or the AfriBizConnect dashboard) to buy goods from suppliers in Dubai, or to ask trade questions.

BUYING REQUESTS:
1. Work out product, quantity and destination country. The buyer may write in English, Swahili, Amharic, French or another language. Use earlier messages in the conversation for context.
2. If product, quantity or destination country is missing, call submit_reply with status NEEDS_INFO and ONE short question. Do not guess quantity or country.
3. Call search_catalog ONCE with broad English keywords. Search again only if it returned zero results.
4. Call calculate_landed_cost for the best 2-3 combinations IN THE SAME TURN (parallel). Default to air under 300 kg total, sea above, unless the buyer says otherwise. Offering the same product by air and by sea counts as two options.
5. Only offer products that match what was asked. Never pad with unrelated or much more expensive products.
6. Rank up to 3 options by landed total, supplier trust and transit time, then call submit_reply with status QUOTED.

GENERAL TRADE QUESTIONS (duties, Incoterms, payments, documents):
- For duty or tax rates, call get_duty_rates and use its numbers. Never quote rates from memory.
- For other topics answer from general knowledge, briefly and practically, and say when the buyer should confirm with a customs broker or bank.
- Finish with submit_reply status ANSWERED.

Rules:
- Every price must come from a calculate_landed_cost result. Never invent or adjust a number.
- Prices are estimates, not confirmed offers; say so in one short phrase.
- Never say an order is placed, paid or shipped. Ordering only sends a request that our team confirms.
- Only call a supplier "verified" when search_catalog returns supplier_verified: true. If results are demo_listing, say once that these are demo listings and prices are illustrative; never present them as verified or confirmed.
- If nothing matches, use status NO_MATCH and say we will source it and come back.
- Reply in the buyer's language.

Reply format (under 900 characters, plain text):
- One opening line.
- Each option: number, product + supplier, landed total in local currency and USD, per-unit cost in local currency and USD, delivery days, one-line reason.
- End quotes with "Reply 1, 2 or 3 to order." (translated).
- Use *bold* sparingly. No headers or tables.`

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

export interface AgentResult {
  status: 'QUOTED' | 'NEEDS_INFO' | 'ANSWERED' | 'NO_MATCH' | 'FAILED'
  replyText: string
  options: any[]
  trace: { tool: string; input: any; output: any }[]
}

/** Joins each chosen option with the full landed-cost breakdown the tool returned. */
function withBreakdowns(options: any[], trace: AgentResult['trace']) {
  const costs = trace.filter(t => t.tool === 'calculate_landed_cost' && t.output && !t.output.error)
  return options.map(o => {
    const match =
      costs.find(c => c.input.catalog_item_id === o.catalog_item_id && (!o.shipping_mode || c.output.shipping_mode === o.shipping_mode)) ??
      costs.find(c => c.input.catalog_item_id === o.catalog_item_id)
    return match ? { ...o, landed: match.output } : o
  })
}

/**
 * Runs the agent. `input` is either a single buyer message, or a conversation
 * (oldest first, last turn from the user) so follow-ups keep their context.
 */
export async function runTradeAgent(input: string | ChatTurn[]): Promise<AgentResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')

  const history: ChatTurn[] = typeof input === 'string' ? [{ role: 'user', content: input }] : input.slice(-12)
  const messages: any[] = history.map(t => ({ role: t.role, content: t.content }))
  while (messages.length && messages[0].role !== 'user') messages.shift()
  if (!messages.length || messages.at(-1).role !== 'user') throw new Error('Conversation must end with a user message')
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
        options: withBreakdowns(final.input.options ?? [], trace),
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
