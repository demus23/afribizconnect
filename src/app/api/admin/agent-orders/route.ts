import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { ORDER_LIST_STATUSES, ORDER_REVIEW_ACTIONS, reviewOrder, type OrderReviewAction } from '@/lib/agent/order'

export const dynamic = 'force-dynamic'

// Same gate as /api/admin/stats (the admin page's data source).
const ADMIN_EMAILS = ['natnael@afribizconnect.com', process.env.ADMIN_EMAIL || ''].filter(Boolean)

async function isAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return !!user?.email && ADMIN_EMAILS.includes(user.email)
}

/** Lists trade-agent order requests, newest first. */
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const rows = await prisma.agentRequest.findMany({
    where: { status: { in: ORDER_LIST_STATUSES } },
    orderBy: { orderedAt: 'desc' },
    take: 100,
    select: {
      id: true, channel: true, userEmail: true, buyerPhone: true, inputText: true,
      status: true, selectedOption: true, orderedAt: true, updatedAt: true,
    },
  })
  return NextResponse.json({ orders: rows })
}

/** Confirms or cancels a pending order. Status change only: no payment, escrow or shipment is created. */
export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { requestId, action } = await request.json().catch(() => ({}))
  if (!requestId || !(action in ORDER_REVIEW_ACTIONS)) {
    return NextResponse.json({ error: 'requestId and action (confirm | cancel) required' }, { status: 400 })
  }
  const ok = await reviewOrder(String(requestId), action as OrderReviewAction)
  if (!ok) return NextResponse.json({ error: 'Order is not pending (already reviewed or not found)' }, { status: 409 })
  return NextResponse.json({ ok: true, status: ORDER_REVIEW_ACTIONS[action as OrderReviewAction] })
}
