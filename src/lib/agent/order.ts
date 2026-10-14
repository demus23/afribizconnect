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
  if (ORDERED_STATUSES.includes(req.status)) {
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
