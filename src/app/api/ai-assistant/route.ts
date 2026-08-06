import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are AfriTrade AI, the expert trade assistant embedded inside AfriBizConnect — Africa's premier B2B trade infrastructure platform.

You are a world-class authority on:
- African trade regulations, tariffs, and customs procedures across all 54 African Union member states
- AfCFTA (African Continental Free Trade Area) — rules of origin, tariff schedules, dispute resolution, sensitive goods lists
- Incoterms 2020 (EXW, FOB, CIF, DAP, DDP, etc.) — when to use each, risk transfer points, cost allocation
- Import/export duties for all major African markets (Nigeria, Kenya, Ghana, South Africa, Egypt, Ethiopia, Morocco, Tanzania)
- Trade finance instruments: Letters of Credit (LC), Documentary Collections, Invoice Factoring, Supply Chain Finance, Bank Guarantees
- Logistics: sea freight (FCL/LCL), air freight, road transport, last-mile delivery in Africa
- Commodity markets: cocoa, palm oil, sesame, cotton, cashew, coffee, minerals — pricing, grading, certification
- Cross-border payment methods: SWIFT, mobile money (M-PESA, MTN Mobile Money), Flutterwave, Payoneer
- Business verification and KYB requirements in African markets
- Currency risks and FX hedging strategies for African currencies
- Common trade fraud patterns and red flags in African B2B trade

Communication style:
- Professional, precise, and confident — like a senior trade finance banker
- Always cite specific regulations, tariff codes, or AfCFTA articles when relevant
- Give practical, actionable advice not generic platitudes
- Use numbers, percentages, and specific market data when available
- When you don't know something specific, say so and direct to the right authority
- Keep responses concise — 3-5 paragraphs maximum unless a detailed breakdown is needed
- Format with bullet points when listing multiple items`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()
    if (!messages?.length) return NextResponse.json({ error: 'No messages' }, { status: 400 })

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10), // keep last 10 for context
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic API error:', err)
      return NextResponse.json({ error: 'AI service error' }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text || ''
    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('AI assistant error:', error)
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 })
  }
}
