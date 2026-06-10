'use client'
import { useState, useEffect } from 'react'
import { Truck, Package, Clock, MapPin, ArrowRight, Loader2, Plus, X, AlertCircle, CheckCircle2, Plane, Ship, Box } from 'lucide-react'

const FREIGHT_TYPES = [
  { id:'air',      label:'Air Freight',    icon:Plane,  time:'3-7 days',  desc:'Best for urgent, high-value cargo' },
  { id:'sea_fcl',  label:'Sea FCL',        icon:Ship,   time:'18-35 days',desc:'Full container load, best rates for bulk' },
  { id:'sea_lcl',  label:'Sea LCL',        icon:Box,    time:'21-40 days',desc:'Less than container, flexible volumes' },
]

const CARGO_TYPES = ['General Cargo','Electronics','Food & Perishables','Chemicals (Hazmat)','Machinery & Equipment','Textiles & Apparel','Auto Parts','Pharmaceuticals','Building Materials']

const ORIGINS = ['Dubai, UAE','Shanghai, China','Istanbul, Turkey','Mumbai, India','Riyadh, Saudi Arabia','Rotterdam, Netherlands','Shenzhen, China','Guangzhou, China']

const DESTINATIONS = ['Lagos, Nigeria','Nairobi, Kenya','Accra, Ghana','Addis Ababa, Ethiopia','Johannesburg, South Africa','Cairo, Egypt','Dar es Salaam, Tanzania','Casablanca, Morocco']

const STATUS_CONFIG: Record<string, {color:string,bg:string,label:string}> = {
  QUOTED:       { color:'#1e40af', bg:'#eff6ff',  label:'Quote received' },
  ACCEPTED:     { color:'#059669', bg:'#f0fdf4',  label:'Accepted' },
  IN_TRANSIT:   { color:'#d97706', bg:'#fffbeb',  label:'In transit' },
  DELIVERED:    { color:'#059669', bg:'#f0fdf4',  label:'Delivered' },
  CANCELLED:    { color:'#dc2626', bg:'#fef2f2',  label:'Cancelled' },
}

const CARRIER_FLAGS: Record<string,string> = {
  'Emirates Cargo Solutions':'🇦🇪',
  'DHL Express Africa':'🇩🇪',
  'Maersk Africa':'🇩🇰',
  'MSC Mediterranean Africa':'🇨🇭',
  'COSCO Africa Shipping':'🇨🇳',
}

export default function LogisticsPage() {
  const [quotes, setQuotes]       = useState<any[]>([])
  const [shipments, setShipments] = useState<any[]>([])
  const [loading, setLoading]     = useState(true)
  const [showForm, setForm]       = useState(false)
  const [requesting, setReq]      = useState(false)
  const [error, setError]         = useState<string|null>(null)
  const [success, setSuccess]     = useState<string|null>(null)
  const [activeTab, setTab]       = useState<'quotes'|'shipments'>('quotes')

  const [form, setForm2] = useState({
    type: 'sea_fcl', origin: '', destination: '',
    cargoType: '', weight: '', volume: '', notes: '',
  })

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res  = await fetch('/api/shipments')
      const data = await res.json()
      setQuotes(data.quotes || [])
      setShipments(data.shipments || [])
    } catch {}
    finally { setLoading(false) }
  }

  async function requestQuotes() {
    if (!form.origin || !form.destination || !form.cargoType) {
      setError('Origin, destination, and cargo type are required.'); return
    }
    setReq(true); setError(null)
    try {
      const res  = await fetch('/api/shipments', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setSuccess(`${data.quotes?.length || 3} freight quotes received from verified carriers!`)
      setForm(false)
      load()
      setTimeout(() => setSuccess(null), 5000)
    } catch { setError('Failed to get quotes. Try again.') }
    finally { setReq(false) }
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Logistics Hub</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Get freight quotes from verified carriers and track your shipments</p>
        </div>
        <button onClick={() => setForm(true)}
          className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white"
          style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow:'0 4px 12px rgba(124,58,237,0.3)' }}>
          <Plus className="h-4 w-4" /> Request freight quote
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'Quote requests', val:String(quotes.length),    color:'#7c3aed', bg:'#f5f3ff', icon:Package },
          { label:'Active shipments',val:String(shipments.filter(s=>s.status==='IN_TRANSIT').length), color:'#d97706', bg:'#fffbeb', icon:Truck },
          { label:'Delivered',      val:String(shipments.filter(s=>s.status==='DELIVERED').length), color:'#059669', bg:'#f0fdf4', icon:CheckCircle2 },
          { label:'Carriers available',val:'5',               color:'#1e40af', bg:'#eff6ff', icon:MapPin },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-white border p-4 flex items-center gap-3" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:s.bg }}>
              <s.icon className="h-4 w-4" style={{ color:s.color }} />
            </div>
            <div>
              <div className="text-xl font-black" style={{ color:'#0f172a' }}>{s.val}</div>
              <div className="text-xs" style={{ color:'#64748b' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-2.5 p-4 rounded-2xl text-sm" style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#059669' }}>
          <CheckCircle2 className="h-4 w-4 shrink-0" />{success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background:'#f1f5f9' }}>
        {(['quotes','shipments'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="text-sm font-bold px-5 py-2 rounded-lg capitalize transition-all"
            style={activeTab===t ? { background:'white', color:'#0f172a', boxShadow:'0 1px 4px rgba(0,0,0,0.08)' } : { color:'#64748b' }}>
            {t} {t==='quotes' ? `(${quotes.length})` : `(${shipments.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#7c3aed' }} /></div>
      ) : activeTab === 'quotes' ? (
        quotes.length === 0 ? (
          <div className="rounded-2xl bg-white border p-16 text-center" style={{ borderColor:'#e8edf3' }}>
            <Truck className="h-14 w-14 mx-auto mb-4" style={{ color:'#e2e8f0' }} />
            <h3 className="text-base font-black mb-2" style={{ color:'#0f172a' }}>No freight quotes yet</h3>
            <p className="text-sm mb-6" style={{ color:'#64748b' }}>Request quotes from our 5 verified carrier partners including DHL, Maersk, and Emirates Cargo.</p>
            <button onClick={() => setForm(true)} className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl text-white mx-auto" style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
              <Plus className="h-4 w-4" /> Get first quote
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {quotes.map((q: any) => {
              const sc = STATUS_CONFIG[q.status] || STATUS_CONFIG['QUOTED']
              const flag = CARRIER_FLAGS[q.provider?.name] || '🌍'
              return (
                <div key={q.id} className="rounded-2xl bg-white border p-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center text-lg" style={{ background:'#f5f3ff' }}>{flag}</div>
                      <div>
                        <div className="text-sm font-black" style={{ color:'#0f172a' }}>{q.provider?.name || 'Carrier'}</div>
                        <div className="text-[11px]" style={{ color:'#94a3b8' }}>Trust: {q.provider?.trustScore || 'N/A'}/100</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background:sc.bg, color:sc.color }}>{sc.label}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2.5 rounded-xl" style={{ background:'#f5f3ff' }}>
                      <div className="text-base font-black" style={{ color:'#7c3aed' }}>${Number(q.price).toLocaleString()}</div>
                      <div className="text-[10px]" style={{ color:'#94a3b8' }}>Total price</div>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{ background:'#fffbeb' }}>
                      <div className="text-base font-black" style={{ color:'#d97706' }}>{q.transitDays}d</div>
                      <div className="text-[10px]" style={{ color:'#94a3b8' }}>Transit time</div>
                    </div>
                    <div className="text-center p-2.5 rounded-xl" style={{ background:'#fef2f2' }}>
                      <div className="text-xs font-black" style={{ color:'#dc2626' }}>
                        {q.validUntil ? new Date(q.validUntil).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="text-[10px]" style={{ color:'#94a3b8' }}>Valid until</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs mb-4" style={{ color:'#64748b' }}>
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{q.origin} → {q.destination}</span>
                  </div>

                  {q.status === 'QUOTED' && (
                    <button className="w-full py-2.5 rounded-xl text-sm font-black text-white" style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
                      Accept this quote
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )
      ) : (
        shipments.length === 0 ? (
          <div className="rounded-2xl bg-white border p-16 text-center" style={{ borderColor:'#e8edf3' }}>
            <Package className="h-14 w-14 mx-auto mb-4" style={{ color:'#e2e8f0' }} />
            <p className="text-sm font-black mb-1" style={{ color:'#0f172a' }}>No shipments yet</p>
            <p className="text-xs" style={{ color:'#94a3b8' }}>Accept a freight quote to create your first shipment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shipments.map((s: any) => {
              const sc = STATUS_CONFIG[s.status] || STATUS_CONFIG['IN_TRANSIT']
              return (
                <div key={s.id} className="rounded-2xl bg-white border p-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black" style={{ color:'#0f172a' }}>{s.trackingNumber || 'TRK-' + s.id.slice(0,8).toUpperCase()}</span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background:sc.bg, color:sc.color }}>{sc.label}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color:'#94a3b8' }}>
                        <MapPin className="h-3 w-3" />{s.origin || 'Origin'} → {s.destination || 'Destination'}
                        <span>·</span><Clock className="h-3 w-3" />{new Date(s.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button className="text-xs font-bold px-4 py-2 rounded-xl border" style={{ borderColor:'#e2e8f0', color:'#374151' }}>
                      Track shipment
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}

      {/* QUOTE REQUEST MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}>
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden" style={{ maxHeight:'90vh', overflowY:'auto' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor:'#f1f5f9' }}>
              <h2 className="text-lg font-black" style={{ color:'#0f172a' }}>Request Freight Quote</h2>
              <button onClick={() => { setForm(false); setError(null) }} className="p-2 rounded-xl hover:bg-slate-100">
                <X className="h-5 w-5" style={{ color:'#64748b' }} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl text-sm" style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626' }}>
                  <AlertCircle className="h-4 w-4 shrink-0" />{error}
                </div>
              )}

              {/* Freight type */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-2" style={{ color:'#374151' }}>Shipping method</label>
                <div className="grid grid-cols-3 gap-2">
                  {FREIGHT_TYPES.map(ft => (
                    <button key={ft.id} type="button" onClick={() => setForm2(p => ({...p, type:ft.id}))}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all"
                      style={form.type===ft.id ? { borderColor:'#7c3aed', background:'#f5f3ff' } : { borderColor:'#e2e8f0', background:'white' }}>
                      <ft.icon className="h-5 w-5" style={{ color:form.type===ft.id ? '#7c3aed' : '#94a3b8' }} />
                      <div className="text-[10px] font-black" style={{ color:form.type===ft.id ? '#7c3aed' : '#374151' }}>{ft.label}</div>
                      <div className="text-[9px]" style={{ color:'#94a3b8' }}>{ft.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Origin *</label>
                  <select value={form.origin} onChange={e => setForm2(p => ({...p, origin:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="">Select origin</option>
                    {ORIGINS.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Destination *</label>
                  <select value={form.destination} onChange={e => setForm2(p => ({...p, destination:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="">Select destination</option>
                    {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Cargo type *</label>
                <select value={form.cargoType} onChange={e => setForm2(p => ({...p, cargoType:e.target.value}))}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                  <option value="">Select cargo type</option>
                  {CARGO_TYPES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Weight (kg)</label>
                  <input type="number" placeholder="1000" value={form.weight} onChange={e => setForm2(p => ({...p, weight:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Volume (CBM)</label>
                  <input type="number" placeholder="10" value={form.volume} onChange={e => setForm2(p => ({...p, volume:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Special requirements</label>
                <textarea rows={2} placeholder="Temperature control, fragile items, hazmat requirements..." value={form.notes} onChange={e => setForm2(p => ({...p, notes:e.target.value}))}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
              </div>

              <div className="flex gap-3">
                <button onClick={() => { setForm(false); setError(null) }} className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-slate-50" style={{ borderColor:'#e2e8f0', color:'#374151' }}>Cancel</button>
                <button onClick={requestQuotes} disabled={requesting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white disabled:opacity-70"
                  style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
                  {requesting ? <><Loader2 className="h-4 w-4 animate-spin" />Getting quotes...</> : <>Get quotes from 5 carriers</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
