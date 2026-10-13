import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * Records the buyer's choice of quote option as an order request.
 * Payment / escrow and supplier confirmation come later; for now the AfriBizConnect
 * team sees ORDER_REQUESTED rows in AgentRequest and follows up.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Please sign in' }, { status: 401 })

  const { requestId, rank } = await request.json().catch(() => ({}))
  if (!requestId || typeof rank !== 'number') return NextResponse.json({ error: 'requestId and rank required' }, { status: 400 })

  const req = await prisma.agentRequest.findUnique({ where: { id: String(requestId) } })
  if (!req || req.userEmail !== user.email) return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
  if (req.status === 'ORDER_REQUESTED') return NextResponse.json({ error: 'An order was already requested for this quote' }, { status: 409 })

  const option = ((req.quotes as any[]) ?? []).find(o => o.rank === rank)
  if (!option) return NextResponse.json({ error: 'Option not found' }, { status: 404 })

  await prisma.agentRequest.update({
    where: { id: req.id },
    data: { status: 'ORDER_REQUESTED', selectedOption: option, orderedAt: new Date() },
  })

  return NextResponse.json({ ok: true, rank, supplier: option.supplier, landed_total_usd: option.landed_total_usd })
}
