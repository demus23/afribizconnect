'use client'
import { useState, useEffect } from 'react'
import { TrendingUp, MessageSquare, FileText, Eye, Star, BarChart3, Users, Package, Loader2, ArrowUpRight } from 'lucide-react'

export default function AnalyticsPage() {
  const [data, setData]     = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'7d'|'30d'>('30d')

  useEffect(() => {
    fetch('/api/analytics')
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#C9A84C' }} /></div>

  if (!data || data.error) return (
    <div className="text-center py-20">
      <p className="text-sm font-semibold" style={{ color:'#0f172a' }}>Complete your business profile to see analytics</p>
      <a href="/settings" className="text-sm text-blue-600 mt-2 inline-block">Go to Settings →</a>
    </div>
  )

  const { metrics, chart, business, platform } = data

  const METRICS = [
    { label:'Profile views',     val: metrics.profile.views,     icon: Eye,           color:'#C9A84C', note:'From marketplace' },
    { label:'Inquiries received',val: metrics.profile.inquiries, icon: TrendingUp,    color:'#00D4AA', note:'Direct inquiries' },
    { label:'RFQs posted',       val: metrics.rfqs.total,        icon: FileText,      color:'#1e40af', note:`${metrics.rfqs.open} open` },
    { label:'Messages sent',     val: metrics.messages.total,    icon: MessageSquare, color:'#7c3aed', note:`${metrics.messages.unread} unread` },
    { label:'Freight quotes',    val: metrics.quotes.total,      icon: Package,       color:'#d97706', note:'Requested' },
    { label:'Trust score',       val: business.trustScore,       icon: Star,          color: business.trustScore>=80?'#059669':business.trustScore>=60?'#C9A84C':'#94a3b8', note:'/100' },
  ]

  const sliced = period === '7d' ? chart.slice(-7) : chart
  const maxVal = Math.max(...sliced.map((d:any) => d.views), 1)

  return (
    <div className="space-y-6 max-w-[1100px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Analytics</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>{business.name} · {business.verificationStatus} · Data from your database</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background:'#f1f5f9' }}>
          {(['7d','30d'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="text-xs font-bold px-4 py-2 rounded-lg transition-all"
              style={period===p ? { background:'white', color:'#0f172a', boxShadow:'0 1px 4px rgba(0,0,0,0.08)' } : { color:'#64748b' }}>
              {p === '7d' ? 'Last 7 days' : 'Last 30 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {METRICS.map(m => (
          <div key={m.label} className="rounded-2xl bg-white border p-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor:`${m.color}15` }}>
                <m.icon className="h-4 w-4" style={{ color:m.color }} />
              </div>
              <ArrowUpRight className="h-3.5 w-3.5" style={{ color:'#e2e8f0' }} />
            </div>
            <div className="text-3xl font-black mb-1" style={{ color:'#0f172a', fontFamily:'monospace' }}>{m.val.toLocaleString()}</div>
            <div className="text-xs font-semibold" style={{ color:'#0f172a' }}>{m.label}</div>
            <div className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>{m.note}</div>
          </div>
        ))}
      </div>

      {/* Profile views note */}
      {metrics.profile.views === 0 && (
        <div className="rounded-2xl border p-4 text-sm" style={{ background:'#fffbeb', borderColor:'#fde68a', color:'#92400e' }}>
          💡 Profile views will increment automatically when other users visit your supplier profile page at <code>/marketplace/{business?.slug}</code>
        </div>
      )}

      {/* Chart */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <h2 className="text-sm font-black mb-6" style={{ color:'#0f172a' }}>Platform activity — {period === '7d' ? 'last 7 days' : 'last 30 days'}</h2>
        <div className="flex items-end gap-1 h-28">
          {sliced.map((d:any, i:number) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block text-xs bg-slate-900 text-white px-2 py-1 rounded whitespace-nowrap" style={{ fontSize:'10px' }}>
                {d.date}: {d.views} views
              </div>
              <div className="w-full rounded-t-sm" style={{ height:`${Math.max((d.views/maxVal)*100,2)}%`, background:'linear-gradient(180deg,#C9A84C,#E8B84B)', minHeight:'4px' }} />
              {(period==='7d'||i%5===0) && <span className="text-[9px]" style={{ color:'#94a3b8' }}>{d.date.slice(5)}</span>}
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color:'#94a3b8' }}>
          Chart uses sample activity data. Real per-day breakdown will be added in next update.
        </p>
      </div>

      {/* Platform position */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Your position on the platform</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label:'Verified suppliers',  val: platform.suppliers.toLocaleString(),     icon: Users },
            { label:'Active investment deals', val: platform.opportunities.toLocaleString(), icon: TrendingUp },
            { label:'Your trust rank',     val: business.trustScore>=80?'Top 10%':business.trustScore>=60?'Top 30%':'Building', icon: Star },
            { label:'Verification',        val: business.verificationStatus,              icon: BarChart3 },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl" style={{ background:'#f8fafc', border:'1px solid #f1f5f9' }}>
              <s.icon className="h-4 w-4 mb-2" style={{ color:'#C9A84C' }} />
              <div className="text-lg font-black" style={{ color:'#0f172a' }}>{s.val}</div>
              <div className="text-xs mt-1" style={{ color:'#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
