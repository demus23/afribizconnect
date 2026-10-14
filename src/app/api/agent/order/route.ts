import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requestOrder } from '@/lib/agent/order'

export const dynamic = 'force-dynamic'

const HTTP: Record<string, number> = { NOT_FOUND: 404, OPTION_NOT_FOUND: 404, NOT_QUOTED: 409, ALREADY_ORDERED: 409 }

/**
 * Records the buyer's choice of quote option with status PENDING_CONFIRMATION.
 * Nothing else happens automatically: no payment, escrow or shipment. The
 * AfriBizConnect team confirms stock, final freight and payment with the buyer.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return NextResponse.json({ error: 'Please sign in' }, { status: 401 })

  const { requestId, rank } = await request.json().catch(() => ({}))
  if (!requestId || typeof rank !== 'number') return NextResponse.json({ error: 'requestId and rank required' }, { status: 400 })

  const result = await requestOrder({ requestId: String(requestId), rank, userEmail: user.email })
  if (!result.ok) return NextResponse.json({ error: result.message, code: result.code }, { status: HTTP[result.code] })

  return NextResponse.json({
    ok: true,
    status: 'PENDING_CONFIRMATION',
    rank: result.rank,
    supplier: result.option.supplier,
    landed_total_usd: result.option.landed_total_usd,
  })
}
