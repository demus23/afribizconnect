'use client'
import { useState, useEffect } from 'react'
import { Search, Users, BadgeCheck, Building2, Truck, TrendingUp, Package, Loader2, MessageSquare, UserPlus, Check, Globe2 } from 'lucide-react'

const TYPE_LABELS: Record<string,string> = { SUPPLIER:'Supplier', IMPORTER:'Importer', DISTRIBUTOR:'Distributor', LOGISTICS_PROVIDER:'Logistics', INVESTOR:'Investor', PRIVATE_EQUITY:'Private Equity' }
const TYPE_COLORS: Record<string,{color:string,bg:string}> = {
  SUPPLIER:          { color:'#1e40af', bg:'#eff6ff' },
  IMPORTER:          { color:'#059669', bg:'#f0fdf4' },
  DISTRIBUTOR:       { color:'#7c3aed', bg:'#f5f3ff' },
  LOGISTICS_PROVIDER:{ color:'#d97706', bg:'#fffbeb' },
  INVESTOR:          { color:'#0891b2', bg:'#ecfeff' },
  PRIVATE_EQUITY:    { color:'#dc2626', bg:'#fef2f2' },
}
const COUNTRY_FLAGS: Record<string,string> = { AE:'🇦🇪', CN:'🇨🇳', NG:'🇳🇬', KE:'🇰🇪', GH:'🇬🇭', ZA:'🇿🇦', IN:'🇮🇳', TR:'🇹🇷', SA:'🇸🇦', EG:'🇪🇬', SN:'🇸🇳', ET:'🇪🇹', MA:'🇲🇦', TZ:'🇹🇿' }

export default function NetworkPage() {
  const [businesses, setBiz]      = useState<any[]>([])
  const [connected, setConnected] = useState<Set<string>>(new Set())
  const [loading, setLoading]     = useState(true)
  const [connecting, setConn]     = useState<string|null>(null)
  const [search, setSearch]       = useState('')
  const [filter, setFilter]       = useState('All')
  const [myUserId, setMyUserId]   = useState('')
  const [showModal, setModal]     = useState<any>(null)
  const [msgText, setMsg]         = useState('')
  const [sending, setSending]     = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const [bizRes, connRes] = await Promise.all([
        fetch('/api/suppliers?limit=50'),
        fetch('/api/connections'),
      ])
      const bizData  = await bizRes.json()
      const connData = await connRes.json()
      setBiz(bizData.businesses || [])
      setMyUserId(connData.userId || '')
      const ids = new Set<string>((connData.connections || []).map((c:any) => c.business?.id || c.id))
      setConnected(ids)
    } catch {}
    finally { setLoading(false) }
  }

  async function connect(biz: any) {
    setModal(biz)
    setMsg(`Hi ${biz.name}, I'd like to connect with you on AfriBizConnect to explore trade opportunities.`)
  }

  async function sendConnect() {
    if (!showModal || !msgText.trim()) return
    setSending(true)
    try {
      await fetch('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: showModal.userId, message: msgText })
      })
      setConnected(prev => new Set([...prev, showModal.id]))
      setModal(null); setMsg('')
    } catch {}
    finally { setSending(false) }
  }

  const filters = ['All','Suppliers','Importers','Logistics','Investors']
  const typeMap: Record<string,string[]> = {
    'All': [],
    'Suppliers': ['SUPPLIER'],
    'Importers': ['IMPORTER','DISTRIBUTOR'],
    'Logistics': ['LOGISTICS_PROVIDER'],
    'Investors': ['INVESTOR','PRIVATE_EQUITY'],
  }

  const filtered = businesses.filter(b => {
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.country?.toLowerCase().includes(search.toLowerCase()) || b.categories?.some((c:string) => c.toLowerCase().includes(search.toLowerCase()))
    const matchFilter = filter === 'All' || typeMap[filter]?.includes(b.type)
    return matchSearch && matchFilter
  })

  const stats = [
    { label:'Total businesses', val:'12,400+', icon:Building2, color:'#1e40af' },
    { label:'Verified suppliers', val:'3,200+', icon:BadgeCheck, color:'#059669' },
    { label:'Active investors',   val:'480+',   icon:TrendingUp, color:'#7c3aed' },
    { label:'Logistics providers',val:'95+',    icon:Truck,      color:'#d97706' },
  ]

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Trade Network</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Connect with verified businesses across 54 African markets and global suppliers</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl" style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#059669' }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {connected.size} connections
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl bg-white border p-4 flex items-center gap-3" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:`${s.color}15` }}>
              <s.icon className="h-4 w-4" style={{ color:s.color }} />
            </div>
            <div>
              <div className="text-xl font-black" style={{ color:'#0f172a' }}>{s.val}</div>
              <div className="text-xs" style={{ color:'#64748b' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color:'#94a3b8' }} />
          <input type="text" placeholder="Search businesses, suppliers, investors..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
        </div>
        <div className="flex gap-1.5">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="text-xs font-bold px-4 py-2.5 rounded-xl border transition-all"
              style={filter===f ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' } : { borderColor:'#e2e8f0', color:'#475569', background:'white' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Business grid */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#1e40af' }} /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white border p-16 text-center" style={{ borderColor:'#e8edf3' }}>
          <Globe2 className="h-12 w-12 mx-auto mb-3" style={{ color:'#e2e8f0' }} />
          <p className="text-sm font-semibold" style={{ color:'#0f172a' }}>No businesses found</p>
          <p className="text-xs mt-1" style={{ color:'#94a3b8' }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((biz: any) => {
            const tc    = TYPE_COLORS[biz.type] || { color:'#64748b', bg:'#f1f5f9' }
            const flag  = COUNTRY_FLAGS[biz.country] || '🌍'
            const isConn = connected.has(biz.id)
            const initials = biz.name?.split(' ').map((w:string) => w[0]).join('').toUpperCase().slice(0,2) || '??'
            const avatarColors = ['#1e40af','#059669','#7c3aed','#d97706','#dc2626','#0891b2']
            const avatarColor  = avatarColors[initials.charCodeAt(0) % avatarColors.length]

            return (
              <div key={biz.id} className="rounded-2xl bg-white border p-5 flex flex-col" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-11 w-11 rounded-2xl flex items-center justify-center text-white text-sm font-black shrink-0" style={{ backgroundColor: avatarColor }}>
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-black truncate" style={{ color:'#0f172a' }}>{biz.name}</span>
                      {biz.verificationStatus === 'VERIFIED' && <BadgeCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:tc.bg, color:tc.color }}>{TYPE_LABELS[biz.type] || biz.type}</span>
                      <span className="text-xs" style={{ color:'#94a3b8' }}>{flag} {biz.country}</span>
                    </div>
                  </div>
                  {biz.trustScore > 0 && (
                    <div className="text-center shrink-0">
                      <div className="text-sm font-black" style={{ color: biz.trustScore>=80 ? '#059669' : biz.trustScore>=60 ? '#d97706' : '#dc2626' }}>{biz.trustScore}</div>
                      <div className="text-[9px]" style={{ color:'#94a3b8' }}>Trust</div>
                    </div>
                  )}
                </div>

                {biz.description && (
                  <p className="text-xs leading-relaxed mb-3 flex-1 line-clamp-2" style={{ color:'#64748b' }}>{biz.description}</p>
                )}

                {biz.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {biz.categories.slice(0,3).map((c:string) => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:'#f8fafc', border:'1px solid #f1f5f9', color:'#64748b' }}>{c}</span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 mt-auto">
                  <button onClick={() => connect(biz)} disabled={isConn}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-black py-2.5 rounded-xl transition-all"
                    style={isConn ? { background:'#f0fdf4', color:'#059669', border:'1px solid #bbf7d0' } : { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white' }}>
                    {isConn ? <><Check className="h-3.5 w-3.5" />Connected</> : <><UserPlus className="h-3.5 w-3.5" />Connect</>}
                  </button>
                  <button className="flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all hover:bg-slate-50" style={{ borderColor:'#e2e8f0', color:'#374151' }}>
                    <MessageSquare className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* CONNECT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}>
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-6">
            <h2 className="text-base font-black mb-1" style={{ color:'#0f172a' }}>Connect with {showModal.name}</h2>
            <p className="text-xs mb-5" style={{ color:'#64748b' }}>Send a connection request with a personalised message</p>
            <textarea rows={4} value={msgText} onChange={e => setMsg(e.target.value)}
              className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none resize-none mb-4" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
            <div className="flex gap-3">
              <button onClick={() => { setModal(null); setMsg('') }} className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-slate-50" style={{ borderColor:'#e2e8f0', color:'#374151' }}>Cancel</button>
              <button onClick={sendConnect} disabled={sending}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white disabled:opacity-70"
                style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><UserPlus className="h-4 w-4" />Send request</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
