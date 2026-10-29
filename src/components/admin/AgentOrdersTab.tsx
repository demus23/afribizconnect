'use client'
import { useEffect, useState } from 'react'
import { Loader2, CheckCircle2, XCircle, RefreshCw, Package, Plane, Ship } from 'lucide-react'

interface AgentOrder {
  id: string
  channel: string
  userEmail: string | null
  buyerPhone: string | null
  inputText: string
  status: string
  orderedAt: string | null
  updatedAt: string
  selectedOption: {
    rank: number
    supplier: string
    landed_total_usd: number
    reason?: string
    landed?: {
      product: string
      quantity: number
      destination: string
      shipping_mode: string
      transit_days: [number, number]
      landed_total_local: number
      local_currency: string
      demo_data?: boolean
    }
  } | null
}

const STATUS_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  PENDING_CONFIRMATION: { label: 'Pending confirmation', color: '#b45309', bg: '#fffbeb' },
  ORDER_REQUESTED:      { label: 'Pending confirmation', color: '#b45309', bg: '#fffbeb' },
  CONFIRMED:            { label: 'Confirmed',            color: '#059669', bg: '#f0fdf4' },
  CANCELLED:            { label: 'Cancelled',            color: '#64748b', bg: '#f1f5f9' },
}
const isPending = (s: string) => s === 'PENDING_CONFIRMATION' || s === 'ORDER_REQUESTED'

export default function AgentOrdersTab({ onCount }: { onCount?: (pending: number) => void }) {
  const [orders, setOrders]   = useState<AgentOrder[] | null>(null)
  const [error, setError]     = useState<string | null>(null)
  const [acting, setActing]   = useState<string | null>(null)
  const [filter, setFilter]   = useState<'pending' | 'all'>('pending')

  async function load() {
    setError(null)
    try {
      const res = await fetch('/api/admin/agent-orders')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load orders')
      setOrders(json.orders)
      onCount?.(json.orders.filter((o: AgentOrder) => isPending(o.status)).length)
    } catch (e: any) { setError(e.message) }
  }

  useEffect(() => { load() }, [])

  async function review(id: string, action: 'confirm' | 'cancel') {
    if (action === 'cancel' && !window.confirm('Cancel this order request?')) return
    setActing(id)
    try {
      const res = await fetch('/api/admin/agent-orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: id, action }),
      })
      const json = await res.json()
      if (!res.ok) setError(json.error || 'Action failed')
      await load()
    } finally { setActing(null) }
  }

  if (error) return <div className="rounded-2xl bg-white border p-6 text-sm" style={{ borderColor: '#e8edf3', color: '#dc2626' }}>{error}</div>
  if (!orders) return <div className="flex justify-center py-12"><Loader2 className="h-5 w-5 animate-spin" style={{ color: '#1e40af' }} /></div>

  const shown = filter === 'pending' ? orders.filter(o => isPending(o.status)) : orders

  return (
    <div className="rounded-2xl bg-white border p-6" style={{ borderColor: '#e8edf3' }}>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h2 className="text-sm font-black" style={{ color: '#0f172a' }}>Trade agent orders</h2>
        <div className="flex items-center gap-2">
          {(['pending', 'all'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className="text-xs font-bold px-3 py-1.5 rounded-lg"
              style={filter === f ? { background: '#0f172a', color: 'white' } : { background: '#f1f5f9', color: '#64748b' }}>
              {f === 'pending' ? `Pending (${orders.filter(o => isPending(o.status)).length})` : `All (${orders.length})`}
            </button>
          ))}
          <button onClick={load} className="p-1.5 rounded-lg hover:bg-slate-50" aria-label="Refresh"><RefreshCw className="h-3.5 w-3.5" style={{ color: '#64748b' }} /></button>
        </div>
      </div>
      <p className="text-xs mb-5" style={{ color: '#94a3b8' }}>
        Confirming or cancelling only changes the status. No payment, escrow or shipment is created — arrange those with the buyer directly.
      </p>

      {shown.length === 0 ? (
        <div className="flex flex-col items-center py-10 gap-2">
          <Package className="h-8 w-8" style={{ color: '#cbd5e1' }} />
          <div className="text-sm" style={{ color: '#94a3b8' }}>{filter === 'pending' ? 'No orders waiting for confirmation' : 'No agent orders yet'}</div>
        </div>
      ) : (
        <div className="space-y-3">
          {shown.map(o => {
            const sel = o.selectedOption
            const l = sel?.landed
            const st = STATUS_STYLE[o.status] ?? { label: o.status, color: '#64748b', bg: '#f1f5f9' }
            return (
              <div key={o.id} className="rounded-xl border p-4 flex flex-col md:flex-row md:items-center gap-4" style={{ borderColor: '#e8edf3' }}>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-black" style={{ color: '#0f172a' }}>{l?.product ?? 'Product'}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                    {l?.demo_data && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: '#b45309', border: '1px solid #fcd34d' }}>DEMO LISTING</span>}
                  </div>
                  <div className="text-xs" style={{ color: '#475569' }}>
                    {l ? `${l.quantity} units` : ''} · {sel?.supplier ?? '—'} · to {l?.destination ?? '—'} ·{' '}
                    <span className="inline-flex items-center gap-1 align-middle">
                      {l?.shipping_mode === 'sea' ? <Ship className="h-3 w-3" /> : <Plane className="h-3 w-3" />}
                      {l ? `${l.transit_days[0]}–${l.transit_days[1]} days` : ''}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: '#94a3b8' }}>
                    Buyer {o.userEmail ?? o.buyerPhone ?? 'unknown'} · via {o.channel} · {o.orderedAt ? new Date(o.orderedAt).toLocaleString() : ''}
                  </div>
                  <div className="text-xs italic truncate" style={{ color: '#94a3b8' }}>“{o.inputText}”</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] font-bold tracking-wide" style={{ color: '#94a3b8' }}>EST. LANDED</div>
                  <div className="text-base font-black" style={{ color: '#0f172a' }}>${sel?.landed_total_usd?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  {l && <div className="text-xs" style={{ color: '#64748b' }}>{l.local_currency} {l.landed_total_local.toLocaleString('en-US')}</div>}
                </div>

                {isPending(o.status) && (
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => review(o.id, 'confirm')} disabled={acting === o.id}
                      className="flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-xl text-white disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>
                      {acting === o.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}Confirm
                    </button>
                    <button onClick={() => review(o.id, 'cancel')} disabled={acting === o.id}
                      className="flex items-center gap-1.5 text-xs font-black px-3 py-2 rounded-xl border disabled:opacity-60"
                      style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                      <XCircle className="h-3.5 w-3.5" />Cancel
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
