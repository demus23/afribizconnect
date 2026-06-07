import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  // Auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { message, history = [] } = await request.json()
  if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })

  const SYSTEM_PROMPT = `You are AfriBiz AI, an expert trade assistant for AfriBizConnect — Africa's leading B2B trade infrastructure platform.

You have deep expertise in:
- African import/export regulations and customs procedures for all 54 countries
- HS codes and tariff classifications for goods entering African markets
- Trade finance instruments: Letters of Credit (LC), Documentary Collections, Bank Guarantees, Factoring
- Logistics: FCL/LCL shipping, air freight, Incoterms 2020 (EXW, FOB, CIF, DAP, DDP)
- African payment systems: SWIFT, mobile money (M-Pesa, MTN MoMo), Pan-African Payment and Settlement System (PAPSS)
- AfCFTA (African Continental Free Trade Area) rules of origin and benefits
- AGOA, EBA, and other preferential trade agreements benefiting Africa
- Commodity markets: cocoa, coffee, oil, gold, agricultural products
- African currency risks and hedging strategies
- Specific knowledge of major trade corridors: UAE-Nigeria, China-Africa, Turkey-Africa, India-Africa
- Verification requirements: NAFDAC, KEBS, SABS, SON, FDA approvals per country
- Key African ports: Lagos Apapa, Mombasa, Dar es Salaam, Tema, Durban, Alexandria

Always give practical, actionable advice. When discussing duties, reference the actual tariff rates where possible. Be specific about which country's regulations you are discussing. If you don't know a specific rate, say so and suggest where to find it.

Format responses with clear sections when helpful. Keep responses concise but complete. Always relate advice back to helping the user grow their African trade business.`

  try {
    const messages = [
      ...history.map((h: any) => ({ role: h.role, content: h.content })),
      { role: 'user', content: message },
    ]

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
        messages,
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    const reply = data.content[0]?.text || 'Sorry, I could not generate a response.'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 500 })
  }
}
