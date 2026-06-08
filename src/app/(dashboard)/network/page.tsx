'use client'
import { useState, useEffect } from 'react'
import { Search, Users, Building2, Globe2, BadgeCheck, MapPin, TrendingUp, Truck, MessageSquare, UserPlus, Star, Filter } from 'lucide-react'

const COUNTRY_FLAGS: Record<string,string> = {
  AE:'🇦🇪', CN:'🇨🇳', TR:'🇹🇷', IN:'🇮🇳', SA:'🇸🇦', NG:'🇳🇬', KE:'🇰🇪', GH:'🇬🇭', ZA:'🇿🇦', ET:'🇪🇹', DE:'🇩🇪', DK:'🇩🇰'
}

const TYPE_ICONS: Record<string,any> = {
  SUPPLIER: Building2, LOGISTICS_PROVIDER: Truck, INVESTOR: TrendingUp, IMPORTER: Globe2, DISTRIBUTOR: Globe2
}

const TYPE_COLORS: Record<string,{bg:string,color:string}> = {
  SUPPLIER:          { bg:'#eff6ff',  color:'#1e40af' },
  LOGISTICS_PROVIDER:{ bg:'#f5f3ff',  color:'#7c3aed' },
  INVESTOR:          { bg:'#f0fdf4',  color:'#059669' },
  IMPORTER:          { bg:'#fffbeb',  color:'#d97706' },
  DISTRIBUTOR:       { bg:'#fef2f2',  color:'#dc2626' },
}

const FILTERS = ['All','Suppliers','Logistics','Investors','Importers']

export default function NetworkPage() {
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [activeFilter, setFilter]   = useState('All')
  const [connected, setConnected]   = useState<Set<string>>(new Set())

  const TYPE_MAP: Record<string,string> = {
    Suppliers: 'SUPPLIER', Logistics: 'LOGISTICS_PROVIDER',
    Investors: 'INVESTOR', Importers: 'IMPORTER',
  }

  useEffect(() => {
    async function load() {
      setLoading(true)
      const params = new URLSearchParams({ limit: '24' })
      if (activeFilter !== 'All') params.set('type', TYPE_MAP[activeFilter] || '')
      if (search) params.set('search', search)
      try {
        const res  = await fetch(`/api/suppliers?${params}`)
        const data = await res.json()
        setBusinesses(data.businesses || [])
      } catch { setBusinesses([]) }
      finally  { setLoading(false) }
    }
    load()
  }, [activeFilter, search])

  function toggleConnect(id: string) {
    setConnected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Trade Network</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>
            Connect with verified businesses across 54 African markets and global suppliers
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border"
          style={{ borderColor:'#e8edf3', background:'white' }}>
          <Users className="h-4 w-4" style={{ color:'#1e40af' }} />
          <span className="text-sm font-black" style={{ color:'#0f172a' }}>
            {businesses.length > 0 ? `${businesses.length}+ members online` : 'Loading...'}
          </span>
        </div>
      </div>

      {/* Network stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'Total businesses',    value:'12,400+', icon:Building2,  color:'#1e40af', bg:'#eff6ff' },
          { label:'Verified suppliers',  value:'3,200+',  icon:BadgeCheck, color:'#059669', bg:'#f0fdf4' },
          { label:'Active investors',    value:'480+',    icon:TrendingUp, color:'#7c3aed', bg:'#f5f3ff' },
          { label:'Logistics providers', value:'95+',     icon:Truck,      color:'#d97706', bg:'#fffbeb' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-white border p-4 flex items-center gap-3"
            style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:s.bg }}>
              <s.icon className="h-4 w-4" style={{ color:s.color }} />
            </div>
            <div>
              <div className="text-base font-black" style={{ color:'#0f172a' }}>{s.value}</div>
              <div className="text-[11px]" style={{ color:'#64748b' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="rounded-2xl bg-white border p-4" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex gap-3 flex-wrap mb-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color:'#94a3b8' }} />
            <input type="text" placeholder="Search businesses, suppliers, investors..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none"
              style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all"
              style={activeFilter===f
                ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' }
                : { borderColor:'#e2e8f0', color:'#475569', backgroundColor:'white' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Business cards grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_,i) => (
            <div key={i} className="h-48 rounded-2xl animate-pulse" style={{ backgroundColor:'#f1f5f9' }} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {businesses.map((b: any) => {
            const Icon = TYPE_ICONS[b.type] || Building2
            const typeStyle = TYPE_COLORS[b.type] || { bg:'#f8fafc', color:'#64748b' }
            const isConnected = connected.has(b.id)

            return (
              <div key={b.id} className="rounded-2xl bg-white border p-5 transition-all hover:shadow-md"
                style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>

                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  {/* Avatar */}
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 text-lg font-black text-white"
                    style={{ background:'linear-gradient(135deg,#1e40af,#0f172a)' }}>
                    {(COUNTRY_FLAGS[b.country] || '🌍')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black truncate" style={{ color:'#0f172a' }}>{b.name}</span>
                      {b.verificationStatus === 'VERIFIED' && <BadgeCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 shrink-0" style={{ color:'#94a3b8' }} />
                      <span className="text-[11px] truncate" style={{ color:'#94a3b8' }}>{b.city || b.country}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-full shrink-0"
                    style={{ background:typeStyle.bg, color:typeStyle.color }}>
                    <Icon className="h-3 w-3" />
                    {b.trustScore}
                  </div>
                </div>

                {/* Type badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background:typeStyle.bg, color:typeStyle.color }}>
                    {b.type?.replace('_',' ')}
                  </span>
                  {b.categories?.slice(0,2).map((c: string) => (
                    <span key={c} className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                      style={{ borderColor:'#e2e8f0', color:'#64748b' }}>{c}</span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[11px] leading-relaxed mb-4 line-clamp-2" style={{ color:'#64748b' }}>
                  {b.description || 'Verified business on AfriBizConnect platform.'}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => toggleConnect(b.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-black py-2 rounded-xl transition-all"
                    style={isConnected
                      ? { background:'#f0fdf4', color:'#059669', border:'1px solid #bbf7d0' }
                      : { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', boxShadow:'0 2px 8px rgba(30,64,175,0.25)' }
                    }>
                    <UserPlus className="h-3.5 w-3.5" />
                    {isConnected ? 'Connected ✓' : 'Connect'}
                  </button>
                  <button className="flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-xl border transition-all hover:bg-slate-50"
                    style={{ borderColor:'#e2e8f0', color:'#374151' }}>
                    <MessageSquare className="h-3.5 w-3.5" /> Message
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
