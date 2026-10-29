import { prisma } from '@/lib/prisma'

/** Status of a quote the buyer chose to order, awaiting a human to confirm stock, freight and payment. */
export const ORDER_PENDING = 'PENDING_CONFIRMATION'
/** Earlier builds used this value; still treated as "already ordered". */
const LEGACY_ORDERED = 'ORDER_REQUESTED'
const ORDERED_STATUSES = [ORDER_PENDING, LEGACY_ORDERED]

export type OrderResult =
  | { ok: true; requestId: string; rank: number; option: any }
  | { ok: false; code: 'NOT_FOUND' | 'OPTION_NOT_FOUND' | 'NOT_QUOTED' | 'ALREADY_ORDERED'; message: string }

/**
 * Records the buyer's choice of one quote option. Only updates the AgentRequest row:
 * no payment, escrow or shipment is created here.
 *
 * The write is a single conditional UPDATE (status must still be QUOTED), so
 * concurrent or repeated calls produce exactly one order.
 */
export async function requestOrder(opts: { requestId: string; rank: number; userEmail: string }): Promise<OrderResult> {
  const req = await prisma.agentRequest.findUnique({ where: { id: opts.requestId } })
  if (!req || !req.userEmail || req.userEmail !== opts.userEmail) {
    return { ok: false, code: 'NOT_FOUND', message: 'Quote not found' }
  }
  if ([...ORDERED_STATUSES, 'CONFIRMED', 'CANCELLED'].includes(req.status)) {
    return { ok: false, code: 'ALREADY_ORDERED', message: 'An order was already requested for this quote' }
  }
  if (req.status !== 'QUOTED') {
    return { ok: false, code: 'NOT_QUOTED', message: 'This request has no quote to order' }
  }

  const option = ((req.quotes as any[]) ?? []).find(o => o?.rank === opts.rank)
  if (!option) return { ok: false, code: 'OPTION_NOT_FOUND', message: 'Option not found' }

  const { count } = await prisma.agentRequest.updateMany({
    where: { id: req.id, userEmail: opts.userEmail, status: 'QUOTED' },
    data: { status: ORDER_PENDING, selectedOption: option, orderedAt: new Date() },
  })
  if (count !== 1) {
    return { ok: false, code: 'ALREADY_ORDERED', message: 'An order was already requested for this quote' }
  }
  return { ok: true, requestId: req.id, rank: opts.rank, option }
}

/** Statuses the AfriBizConnect team can move a pending order to. Status changes only — no payment or shipment. */
export const ORDER_REVIEW_ACTIONS = { confirm: 'CONFIRMED', cancel: 'CANCELLED' } as const
export type OrderReviewAction = keyof typeof ORDER_REVIEW_ACTIONS

/** Moves a pending order to CONFIRMED or CANCELLED. Atomic: only succeeds while the order is still pending. */
export async function reviewOrder(requestId: string, action: OrderReviewAction) {
  const { count } = await prisma.agentRequest.updateMany({
    where: { id: requestId, status: { in: ORDERED_STATUSES } },
    data: { status: ORDER_REVIEW_ACTIONS[action] },
  })
  return count === 1
}

export const ORDER_LIST_STATUSES = [...ORDERED_STATUSES, 'CONFIRMED', 'CANCELLED']
