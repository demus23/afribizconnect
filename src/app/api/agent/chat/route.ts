import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { handleBuyerMessage } from '@/lib/agent/handle'
import type { ChatTurn } from '@/lib/agent/run'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/** Dashboard chat → trade agent. Requires a signed-in user. */
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Please sign in' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const raw: unknown[] = Array.isArray(body?.messages) ? body.messages : []
  const history: ChatTurn[] = raw
    .filter((m: any) => (m?.role === 'user' || m?.role === 'assistant') && typeof m?.content === 'string' && m.content.trim())
    .map((m: any) => ({ role: m.role, content: m.content.slice(0, 4000) }))
    .slice(-12)

  const last = history.at(-1)
  if (!last || last.role !== 'user') return NextResponse.json({ error: 'No message' }, { status: 400 })

  try {
    const result = await handleBuyerMessage({ channel: 'dashboard', userEmail: user.email, text: last.content, history })
    return NextResponse.json({
      requestId: result.requestId,
      status: result.status,
      replyText: result.replyText,
      options: result.options,
      latencyMs: result.latencyMs,
      toolsUsed: result.trace.map(t => t.tool),
    })
  } catch (e: any) {
    console.error('Agent chat failed', e)
    return NextResponse.json({ error: 'The agent could not finish this request. Please try again.' }, { status: 500 })
  }
}
