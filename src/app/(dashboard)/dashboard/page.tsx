'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, MessageSquare, Truck, BadgeCheck, TrendingUp, Globe2, ArrowRight, Loader2, Plus, ShieldCheck, BarChart3, Package, Clock, Zap } from 'lucide-react'

const QUICK_ACTIONS = [
  { label:'Post RFQ',         href:'/sourcing',    icon:Plus,          color:'#1e40af', bg:'#eff6ff' },
  { label:'Browse suppliers', href:'/marketplace', icon:Globe2,        color:'#059669', bg:'#f0fdf4' },
  { label:'View deals',       href:'/invest',      icon:TrendingUp,    color:'#7c3aed', bg:'#f5f3ff' },
  { label:'Get freight quote',href:'/logistics',   icon:Truck,         color:'#d97706', bg:'#fffbeb' },
  { label:'Market data',      href:'/market',      icon:BarChart3,     color:'#0891b2', bg:'#ecfeff' },
  { label:'AI assistant',     href:'/assistant',   icon:Zap,           color:'#dc2626', bg:'#fef2f2' },
]

const STATUS_COLORS: Record<string,{color:string,bg:string}> = {
  OPEN:    { color:'#059669', bg:'#f0fdf4' },
  AWARDED: { color:'#7c3aed', bg:'#f5f3ff' },
  CLOSED:  { color:'#64748b', bg:'#f1f5f9' },
}

const VERIFY_STEPS = [
  { label:'Register business',        done:true  },
  { label:'Upload trade documents',   done:false },
  { label:'KYB review (1-2 days)',     done:false },
  { label:'Receive verified badge',   done:false },
]

export default function DashboardPage() {
  const [stats, setStats]   = useState<any>(null)
  const [loading, setLoad]  = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch('/api/dashboard')
        const data = await res.json()
        setStats(data)
      } catch { setStats(null) }
      finally  { setLoad(false) }
    }
    load()
  }, [])

  const trustColor = !stats?.trustScore ? '#94a3b8'
    : stats.trustScore >= 80 ? '#059669'
    : stats.trustScore >= 60 ? '#d97706'
    : '#dc2626'

  const verified = stats?.verificationStatus === 'VERIFIED'

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>
            {stats?.businessName ? `Welcome back, ${stats.businessName}` : 'Your trade intelligence overview'}
          </p>
        </div>
        {verified && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ borderColor:'#bbf7d0', background:'#f0fdf4' }}>
            <BadgeCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-black text-emerald-700">Verified Business</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color:'#1e40af' }} />
        </div>
      ) : (
        <>
          {/* Top stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label:'My RFQs',      val:String(stats?.rfqCount || 0),      sub:`${stats?.rfqOpen || 0} open`,       icon:FileText,      color:'#1e40af', bg:'#eff6ff', href:'/sourcing' },
              { label:'Messages',     val:String(stats?.messageCount || 0),   sub:`${stats?.unreadMessages || 0} unread`, icon:MessageSquare, color:'#7c3aed', bg:'#f5f3ff', href:'/messages' },
              { label:'Shipments',    val:String(stats?.shipmentCount || 0),  sub:'Active shipments',                  icon:Truck,         color:'#d97706', bg:'#fffbeb', href:'/logistics' },
              { label:'Trust score',  val:String(stats?.trustScore || 0),     sub:verified ? 'Verified ✓' : 'Pending', icon:ShieldCheck,   color:trustColor, bg:'#f0fdf4', href:'/settings' },
            ].map(s => (
              <Link key={s.label} href={s.href}
                className="rounded-2xl bg-white border p-5 flex items-start gap-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:s.bg }}>
                  <s.icon className="h-5 w-5" style={{ color:s.color }} />
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color:'#0f172a' }}>{s.val}</div>
                  <div className="text-xs font-semibold" style={{ color:'#94a3b8' }}>{s.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color:s.color }}>{s.sub}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-5">

            {/* Recent activity */}
            <div className="lg:col-span-2 rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Recent activity</h2>
                <Link href="/sourcing" className="text-xs font-bold flex items-center gap-1 hover:underline" style={{ color:'#1e40af' }}>
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {stats?.recentActivity?.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentActivity.map((act: any, i: number) => {
                    const sc = STATUS_COLORS[act.status] || STATUS_COLORS['CLOSED']
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'#fafbfc', border:'1px solid #f1f5f9' }}>
                        <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0" style={{ background:'#eff6ff' }}>
                          <FileText className="h-4 w-4" style={{ color:'#1e40af' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold truncate" style={{ color:'#0f172a' }}>{act.text}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            {act.category && <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background:'#f1f5f9', color:'#64748b' }}>{act.category}</span>}
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background:sc.bg, color:sc.color }}>{act.status}</span>
                          </div>
                        </div>
                        <span className="text-[10px] shrink-0" style={{ color:'#94a3b8' }}>
                          {new Date(act.time).toLocaleDateString()}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Clock className="h-10 w-10 mx-auto mb-3" style={{ color:'#e2e8f0' }} />
                  <p className="text-sm font-semibold mb-1" style={{ color:'#0f172a' }}>No activity yet</p>
                  <p className="text-xs mb-4" style={{ color:'#94a3b8' }}>Start by posting your first RFQ to get quotes from verified suppliers.</p>
                  <Link href="/sourcing"
                    className="inline-flex items-center gap-2 text-xs font-black px-4 py-2.5 rounded-xl text-white"
                    style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                    <Plus className="h-3.5 w-3.5" /> Post first RFQ
                  </Link>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-5">

              {/* Trust score ring */}
              <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Trust score</h2>
                <div className="flex items-center gap-5">
                  {/* Ring */}
                  <div className="relative h-20 w-20 shrink-0">
                    <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="7" />
                      <circle cx="40" cy="40" r="32" fill="none" strokeWidth="7" strokeDasharray="201"
                        strokeDashoffset={201 - (201 * (stats?.trustScore || 0)) / 100}
                        strokeLinecap="round" style={{ stroke:trustColor, transition:'stroke-dashoffset 1s ease' }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-black" style={{ color:trustColor }}>{stats?.trustScore || 0}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-black mb-1" style={{ color:'#0f172a' }}>
                      {verified ? 'Verified ✓' : stats?.verificationStatus === 'PENDING' ? 'Under review' : 'Not verified'}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color:'#64748b' }}>
                      {verified ? 'Your business is verified and trusted.' : 'Complete verification to get your badge.'}
                    </p>
                    {!verified && (
                      <Link href="/settings" className="inline-flex items-center gap-1 mt-2 text-xs font-black" style={{ color:'#1e40af' }}>
                        Complete verification <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Steps */}
                {!verified && (
                  <div className="mt-4 space-y-2">
                    {VERIFY_STEPS.map((step, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs">
                        <div className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${step.done ? 'bg-emerald-500' : 'border-2'}`}
                          style={{ borderColor: step.done ? undefined : '#e2e8f0' }}>
                          {step.done && <span className="text-white text-[9px]">✓</span>}
                        </div>
                        <span style={{ color: step.done ? '#059669' : '#94a3b8', textDecoration: step.done ? 'line-through' : 'none' }}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Platform stats */}
              <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Platform overview</h2>
                <div className="space-y-3">
                  {[
                    { label:'Verified suppliers', val:String(stats?.platformStats?.suppliers || 0), icon:Package,   color:'#1e40af' },
                    { label:'Active deals',        val:String(stats?.platformStats?.opportunities || 0), icon:TrendingUp, color:'#7c3aed' },
                    { label:'African markets',     val:String(stats?.platformStats?.countries || 54), icon:Globe2,    color:'#059669' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor:`${s.color}15` }}>
                        <s.icon className="h-3.5 w-3.5" style={{ color:s.color }} />
                      </div>
                      <span className="text-xs flex-1" style={{ color:'#64748b' }}>{s.label}</span>
                      <span className="text-sm font-black" style={{ color:'#0f172a' }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 className="text-sm font-black mb-5" style={{ color:'#0f172a' }}>Quick actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {QUICK_ACTIONS.map(a => (
                <Link key={a.label} href={a.href}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border text-center transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{ borderColor:'#f1f5f9' }}>
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor:a.bg }}>
                    <a.icon className="h-5 w-5" style={{ color:a.color }} />
                  </div>
                  <span className="text-xs font-bold leading-tight" style={{ color:'#374151' }}>{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
