import { NextRequest, NextResponse } from 'next/server'
import { handleBuyerMessage } from '@/lib/agent/handle'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Test the trade agent without WhatsApp.
 *
 *   curl -X POST http://localhost:3000/api/agent/quote \
 *     -H "x-agent-key: $AGENT_TEST_KEY" -H "Content-Type: application/json" \
 *     -d '{"message":"Nahitaji taa za sola 200 kwa duka langu Nairobi"}'
 */
export async function POST(request: NextRequest) {
  const key = process.env.AGENT_TEST_KEY
  if (!key || request.headers.get('x-agent-key') !== key) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { message } = await request.json().catch(() => ({}))
  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Send { "message": "..." }' }, { status: 400 })
  }

  try {
    const result = await handleBuyerMessage({ channel: 'test', text: message })
    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Agent failed' }, { status: 500 })
  }
}
