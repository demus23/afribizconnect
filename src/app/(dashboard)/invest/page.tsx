'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Globe2, Clock, DollarSign, ArrowRight, BadgeCheck, Flame, MapPin, BarChart3, Loader2 } from 'lucide-react'

const TYPES = ['All','EQUITY','DEBT','TRADE_FINANCE','JOINT_VENTURE','ACQUISITION']
const TYPE_LABELS: Record<string,string> = { EQUITY:'Equity', DEBT:'Debt', TRADE_FINANCE:'Trade Finance', JOINT_VENTURE:'Joint Venture', ACQUISITION:'Acquisition' }
const TYPE_STYLES: Record<string,{bg:string,color:string}> = {
  EQUITY:        { bg:'#f5f3ff', color:'#7c3aed' },
  DEBT:          { bg:'#eff6ff', color:'#1e40af' },
  TRADE_FINANCE: { bg:'#f0fdf4', color:'#059669' },
  JOINT_VENTURE: { bg:'#fffbeb', color:'#d97706' },
  ACQUISITION:   { bg:'#fef2f2', color:'#dc2626' },
}

const COUNTRY_FLAGS: Record<string,string> = {
  KE:'🇰🇪', GH:'🇬🇭', NG:'🇳🇬', MA:'🇲🇦', ET:'🇪🇹', ZA:'🇿🇦', EG:'🇪🇬', RW:'🇷🇼', SN:'🇸🇳', TZ:'🇹🇿'
}

const fmt = (n: number) => n >= 1_000_000 ? `$${(n/1_000_000).toFixed(1)}M` : `$${(n/1_000).toFixed(0)}K`

export default function InvestPage() {
  const [opps, setOpps]         = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [activeType, setType]   = useState('All')

  useEffect(() => {
    async function fetch_() {
      setLoading(true)
      try {
        const params = new URLSearchParams({ limit: '20' })
        if (activeType !== 'All') params.set('oppType', activeType)
        const res  = await fetch(`/api/opportunities?${params}`)
        const data = await res.json()
        setOpps(data.opportunities || [])
      } catch { setOpps([]) }
      finally  { setLoading(false) }
    }
    fetch_()
  }, [activeType])

  const totalDeal  = opps.reduce((a, o) => a + (o.targetAmount || 0), 0)
  const avgReturn  = opps.length ? (opps.reduce((a,o) => a+(o.expectedReturn||0),0)/opps.length).toFixed(1) : '0'

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Investment Opportunities</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Curated Africa-focused deals — equity, debt, and trade finance</p>
        </div>
        <Link href="/invest/new"
          className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white"
          style={{ background:'linear-gradient(135deg,#059669,#047857)', boxShadow:'0 4px 12px rgba(5,150,105,0.3)' }}>
          List Opportunity <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Total deal flow', value: fmt(totalDeal), icon:DollarSign, color:'#1e40af', bg:'#eff6ff' },
          { label:'Active deals',    value: String(opps.length), icon:TrendingUp, color:'#059669', bg:'#f0fdf4' },
          { label:'Avg. return',     value: `${avgReturn}%`,     icon:BarChart3,  color:'#7c3aed', bg:'#f5f3ff' },
        ].map(m => (
          <div key={m.label} className="rounded-2xl bg-white border p-5 flex items-center gap-4"
            style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor:m.bg }}>
              <m.icon className="h-5 w-5" style={{ color:m.color }} />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight" style={{ color:'#0f172a' }}>{m.value}</div>
              <div className="text-xs" style={{ color:'#64748b' }}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Type filters */}
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(t => (
          <button key={t} onClick={() => setType(t)}
            className="text-xs font-bold px-4 py-2 rounded-xl border transition-all"
            style={activeType===t
              ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' }
              : { borderColor:'#e2e8f0', color:'#475569', backgroundColor:'white' }}>
            {TYPE_LABELS[t] || t}
          </button>
        ))}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_,i) => (
            <div key={i} className="h-72 rounded-2xl animate-pulse" style={{ backgroundColor:'#f1f5f9' }} />
          ))}
        </div>
      ) : opps.length === 0 ? (
        <div className="text-center py-20">
          <TrendingUp className="h-12 w-12 mx-auto mb-4" style={{ color:'#94a3b8' }} />
          <p className="text-sm font-semibold" style={{ color:'#0f172a' }}>No opportunities found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {opps.map((o: any) => {
            const ts = TYPE_STYLES[o.type] || TYPE_STYLES['EQUITY']
            const hot = (o.expectedReturn || 0) >= 30 || (o.viewCount || 0) > 1500
            return (
              <Link key={o.id} href={`/invest/${o.id}`}
                className="group bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 flex flex-col"
                style={{ borderColor: hot ? '#fde68a' : '#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                {hot && (
                  <div className="bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-wider px-3 py-1">
                    🔥 High demand
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black border rounded-full px-2.5 py-0.5"
                      style={{ background:ts.bg, color:ts.color }}>
                      {TYPE_LABELS[o.type] || o.type}
                    </span>
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                  </div>

                  <h3 className="text-sm font-black mb-1.5 group-hover:text-blue-700 transition-colors leading-snug"
                    style={{ color:'#0f172a' }}>
                    {COUNTRY_FLAGS[o.country] || '🌍'} {o.title}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="h-2.5 w-2.5" style={{ color:'#94a3b8' }} />
                    <span className="text-[11px]" style={{ color:'#94a3b8' }}>{o.country} · {o.sector} · {o.stage}</span>
                  </div>

                  <p className="text-xs leading-relaxed mb-4 line-clamp-2 flex-1" style={{ color:'#64748b' }}>
                    {o.description}
                  </p>

                  {/* Fill bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[10px] mb-1.5">
                      <span style={{ color:'#94a3b8' }}>Funding progress</span>
                      <span className="font-black" style={{ color:'#059669' }}>{Math.min(Math.floor((o.viewCount/2000)*100),95)}% interest</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor:'#f1f5f9' }}>
                      <div className="h-full rounded-full" style={{ width:`${Math.min(Math.floor((o.viewCount/2000)*100),95)}%`, background:'linear-gradient(90deg,#10b981,#059669)' }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t" style={{ borderColor:'#f1f5f9' }}>
                    {[
                      { label:'Return', val:`${o.expectedReturn}%`, color:'#059669' },
                      { label:'Min ticket', val:fmt(o.minimumTicket), color:'#1e40af' },
                      { label:'Target', val:fmt(o.targetAmount), color:'#7c3aed' },
                    ].map(m => (
                      <div key={m.label} className="text-center p-2 rounded-xl" style={{ background:'#f8fafc' }}>
                        <div className="text-sm font-black" style={{ color:m.color }}>{m.val}</div>
                        <div className="text-[10px] mt-0.5" style={{ color:'#94a3b8' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {o.timeline && (
                    <div className="flex items-center gap-1.5 mt-3 text-[11px]" style={{ color:'#94a3b8' }}>
                      <Clock className="h-3 w-3" /> Timeline: {o.timeline}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
