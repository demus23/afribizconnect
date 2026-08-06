'use client'
import { useState, useEffect } from 'react'
import { Bell, Plus, X, Check, TrendingDown, Loader2 } from 'lucide-react'

interface Alert { id: string; commodity: string; label: string; type: 'above'|'below'; value: number; active: boolean }

const WATCHLIST = [
  { id:'ngn',    label:'USD/NGN',  flag:'🇳🇬', unit:'' },
  { id:'kes',    label:'USD/KES',  flag:'🇰🇪', unit:'' },
  { id:'ghs',    label:'USD/GHS',  flag:'🇬🇭', unit:'' },
  { id:'zar',    label:'USD/ZAR',  flag:'🇿🇦', unit:'' },
  { id:'cocoa',  label:'Cocoa',    flag:'🇬🇭', unit:'/t' },
  { id:'gold',   label:'Gold',     flag:'🥇',  unit:'/oz' },
  { id:'coffee', label:'Coffee',   flag:'🇪🇹', unit:'/lb' },
  { id:'crude',  label:'Crude',    flag:'🛢️', unit:'/bbl' },
  { id:'wheat',  label:'Wheat',    flag:'🌾',  unit:'/t' },
  { id:'corn',   label:'Corn',     flag:'🌽',  unit:'/t' },
]

const STORAGE_KEY = 'afribiz_price_alerts'

export default function AlertsPage() {
  const [alerts, setAlerts]     = useState<Alert[]>([])
  const [prices, setPrices]     = useState<Record<string,number>>({})
  const [live, setLive]         = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]         = useState({ commodity:'ngn', type:'above' as 'above'|'below', value:'' })
  const [loading, setLoading]   = useState(true)

  // Load alerts from localStorage (persists across refreshes)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) { try { setAlerts(JSON.parse(saved)) } catch {} }
    loadPrices()
  }, [])

  async function loadPrices() {
    try {
      const res = await fetch('/api/alerts/check')
      const data = await res.json()
      setPrices(data.prices || {})
      setLive(data.live || false)
    } catch {} finally { setLoading(false) }
  }

  function saveAlerts(newAlerts: Alert[]) {
    setAlerts(newAlerts)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlerts))
  }

  function addAlert() {
    if (!form.value) return
    const item = WATCHLIST.find(w => w.id === form.commodity)!
    const newAlert: Alert = {
      id: Date.now().toString(),
      commodity: form.commodity,
      label: item.label,
      type: form.type,
      value: parseFloat(form.value),
      active: true,
    }
    saveAlerts([...alerts, newAlert])
    setShowForm(false)
    setForm({ commodity:'ngn', type:'above', value:'' })
  }

  const currentPrice = (id: string) => prices[id] || prices[id.toUpperCase()] || null

  return (
    <div className="space-y-6 max-w-[800px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Price Alerts</h1>
            <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: live ? '#f0fdf4' : '#fffbeb', color: live ? '#059669' : '#d97706' }}>
              {live ? '🟢 LIVE' : '🟡 REFERENCE'}
            </span>
          </div>
          <p className="text-sm" style={{ color:'#64748b' }}>
            {live ? 'Connected to live market data. Alerts check against real prices.' : 'Add OPENEXCHANGERATES_API_KEY + COMMODITIES_API_KEY to Vercel for live prices.'}
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
          <Plus className="h-4 w-4" />Set alert
        </button>
      </div>

      {/* Live prices strip */}
      {!loading && Object.keys(prices).length > 0 && (
        <div className="rounded-2xl bg-white border p-5" style={{ borderColor:'#e8edf3' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className={`h-2 w-2 rounded-full ${live ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-xs font-bold" style={{ color:'#374151' }}>Current prices</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {WATCHLIST.map(w => {
              const p = currentPrice(w.id)
              return (
                <div key={w.id} onClick={() => { setForm(f=>({...f,commodity:w.id,value:p?String(Math.round(p*100)/100):''})); setShowForm(true) }}
                  className="p-2.5 rounded-xl border cursor-pointer hover:border-blue-300 transition-colors text-center" style={{ borderColor:'#f1f5f9', background:'#f8fafc' }}>
                  <div className="text-base mb-0.5">{w.flag}</div>
                  <div className="text-xs font-bold" style={{ color:'#374151' }}>{w.label}</div>
                  <div className="text-xs font-black mt-0.5" style={{ color:'#0f172a', fontFamily:'monospace' }}>
                    {p ? (p > 100 ? p.toLocaleString('en',{maximumFractionDigits:0}) : p.toFixed(3)) : '—'}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-xs mt-3" style={{ color:'#94a3b8' }}>Click any price to set an alert instantly</p>
        </div>
      )}

      {/* Alerts list */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Your alerts ({alerts.length})</h2>
        {alerts.length === 0 ? (
          <div className="text-center py-10">
            <Bell className="h-10 w-10 mx-auto mb-3" style={{ color:'#e2e8f0' }} />
            <p className="text-sm font-semibold" style={{ color:'#0f172a' }}>No alerts yet</p>
            <p className="text-xs mt-1" style={{ color:'#94a3b8' }}>Click a price above or use Set Alert button</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map(a => {
              const current = currentPrice(a.commodity)
              const triggered = current !== null && (a.type === 'above' ? current > a.value : current < a.value)
              return (
                <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: triggered ? '#bbf7d0' : '#f1f5f9', background: triggered ? '#f0fdf4' : '#f8fafc' }}>
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: triggered ? '#059669' : '#eff6ff' }}>
                    {triggered ? <Check className="h-4 w-4 text-white" /> : <Bell className="h-4 w-4" style={{ color:'#1e40af' }} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold" style={{ color:'#0f172a' }}>
                      {a.label} {a.type === 'above' ? 'rises above' : 'falls below'} <span style={{ fontFamily:'monospace' }}>{a.value.toLocaleString()}</span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: triggered ? '#059669' : '#64748b' }}>
                      {triggered
                        ? `✓ TRIGGERED — Current: ${current?.toLocaleString('en',{maximumFractionDigits:2})}`
                        : current ? `Current: ${current.toLocaleString('en',{maximumFractionDigits:2})}` : 'Price not available'}
                    </div>
                  </div>
                  <button onClick={() => saveAlerts(alerts.filter(al => al.id !== a.id))} className="p-1.5 rounded-lg hover:bg-red-50">
                    <X className="h-3.5 w-3.5" style={{ color:'#94a3b8' }} />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add alert modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}>
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Set price alert</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5" style={{ color:'#64748b' }} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Commodity / FX pair</label>
                <select value={form.commodity} onChange={e => setForm(f=>({...f,commodity:e.target.value,value:currentPrice(e.target.value)?String(Math.round((currentPrice(e.target.value)||0)*100)/100):''})) }
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                  {WATCHLIST.map(w => {
                    const p = currentPrice(w.id)
                    return <option key={w.id} value={w.id}>{w.flag} {w.label}{p ? ` — ${p.toLocaleString('en',{maximumFractionDigits:2})}` : ''}</option>
                  })}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Alert when</label>
                  <select value={form.type} onChange={e => setForm(f=>({...f,type:e.target.value as 'above'|'below'}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="above">Rises above</option>
                    <option value="below">Falls below</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Target value</label>
                  <input type="number" placeholder="e.g. 1600" value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-slate-50" style={{ borderColor:'#e2e8f0', color:'#374151' }}>Cancel</button>
                <button onClick={addAlert} disabled={!form.value} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white disabled:opacity-70" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                  <Bell className="h-4 w-4" />Set alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
