'use client'
import { useState, useEffect } from 'react'
import { Users, Building2, FileText, MessageSquare, TrendingUp, BadgeCheck, Clock, CheckCircle2, XCircle, Loader2, RefreshCw, AlertTriangle, Package, BarChart3, Shield } from 'lucide-react'

export default function AdminPage() {
  const [data, setData]       = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [acting, setActing]   = useState<string|null>(null)
  const [tab, setTab]         = useState<'overview'|'verify'|'opportunities'|'users'>('overview')
  const [trustInput, setTrust]= useState<Record<string,number>>({})

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/stats')
      if (res.status === 403) { setData('forbidden'); return }
      const json = await res.json()
      setData(json)
    } catch { setData(null) }
    finally { setLoading(false) }
  }

  async function act(businessId: string, action: string, score?: number) {
    setActing(businessId)
    try {
      await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ businessId, action, trustScore: score })
      })
      load()
    } finally { setActing(null) }
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#1e40af' }} /></div>

  if (data === 'forbidden') return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <Shield className="h-16 w-16" style={{ color:'#dc2626' }} />
      <h1 className="text-xl font-black" style={{ color:'#0f172a' }}>Access Denied</h1>
      <p className="text-sm" style={{ color:'#64748b' }}>This page is restricted to AfriBizConnect administrators only.</p>
    </div>
  )

  if (!data) return <div className="text-center py-20 text-sm" style={{ color:'#64748b' }}>Failed to load admin data.</div>

  const { stats, recentUsers, pendingBusinesses } = data

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color:'#0f172a' }}>Admin Panel</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Platform management and verification</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border hover:bg-slate-50" style={{ borderColor:'#e2e8f0', color:'#374151' }}>
          <RefreshCw className="h-4 w-4" />Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background:'#f1f5f9' }}>
        {[{id:'overview',label:'Overview'},{id:'verify',label:`Verify (${stats.pendingVerification})`},{id:'opportunities',label:'Opportunities'},{id:'users',label:'Users'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)}
            className="text-sm font-bold px-4 py-2 rounded-lg transition-all"
            style={tab===t.id ? { background:'white', color:'#0f172a', boxShadow:'0 1px 4px rgba(0,0,0,0.08)' } : { color:'#64748b' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label:'Total users',        val:stats.totalUsers,          icon:Users,        color:'#1e40af', bg:'#eff6ff' },
              { label:'Total businesses',   val:stats.totalBusinesses,     icon:Building2,    color:'#059669', bg:'#f0fdf4' },
              { label:'Verified',           val:stats.verifiedBusinesses,  icon:BadgeCheck,   color:'#7c3aed', bg:'#f5f3ff' },
              { label:'Pending KYB',        val:stats.pendingVerification, icon:Clock,        color:'#d97706', bg:'#fffbeb' },
              { label:'Total RFQs',         val:stats.totalRfqs,           icon:FileText,     color:'#1e40af', bg:'#eff6ff' },
              { label:'Open RFQs',          val:stats.openRfqs,            icon:Package,      color:'#059669', bg:'#f0fdf4' },
              { label:'Messages',           val:stats.totalMessages,       icon:MessageSquare,color:'#7c3aed', bg:'#f5f3ff' },
              { label:'Active deals',       val:stats.activeOpportunities, icon:TrendingUp,   color:'#d97706', bg:'#fffbeb' },
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

          {/* Recent signups */}
          <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
            <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Recent signups</h2>
            <div className="space-y-2">
              {recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'#fafbfc', border:'1px solid #f1f5f9' }}>
                  <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-xs font-black text-blue-700 shrink-0">
                    {(u.name||u.email)?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate" style={{ color:'#0f172a' }}>{u.name || u.email}</div>
                    <div className="text-[10px]" style={{ color:'#94a3b8' }}>{u.email}</div>
                  </div>
                  {u.business && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:'#eff6ff', color:'#1e40af' }}>{u.business.type?.replace('_',' ')}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full`}
                        style={{ background: u.business.verificationStatus==='VERIFIED' ? '#f0fdf4' : '#fffbeb', color: u.business.verificationStatus==='VERIFIED' ? '#059669' : '#d97706' }}>
                        {u.business.verificationStatus}
                      </span>
                    </div>
                  )}
                  <div className="text-[10px] shrink-0" style={{ color:'#94a3b8' }}>{new Date(u.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* VERIFY */}
      {tab === 'verify' && (
        <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
          <h2 className="text-sm font-black mb-1" style={{ color:'#0f172a' }}>Pending KYB verification</h2>
          <p className="text-xs mb-5" style={{ color:'#64748b' }}>Review and approve businesses requesting verified status</p>
          {pendingBusinesses.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-emerald-500" />
              <p className="text-sm font-semibold" style={{ color:'#0f172a' }}>All clear! No pending verifications.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingBusinesses.map((b: any) => (
                <div key={b.id} className="rounded-2xl border p-5" style={{ borderColor:'#e8edf3' }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black" style={{ color:'#0f172a' }}>{b.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:'#eff6ff', color:'#1e40af' }}>{b.type?.replace('_',' ')}</span>
                      </div>
                      <div className="text-xs" style={{ color:'#94a3b8' }}>{b.user?.email} · {b.country} · {b.city}</div>
                      {b.description && <p className="text-xs mt-1 max-w-lg" style={{ color:'#64748b' }}>{b.description.slice(0,150)}...</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color:'#374151' }}>Trust score:</span>
                      <input type="number" min={0} max={100} defaultValue={75}
                        onChange={e => setTrust(p => ({...p, [b.id]: parseInt(e.target.value)}))}
                        className="w-16 px-2 py-1 text-xs rounded-lg border text-center" style={{ borderColor:'#e2e8f0' }} />
                    </div>
                    <button onClick={() => act(b.id, 'approve', trustInput[b.id] || 75)} disabled={acting===b.id}
                      className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl text-white disabled:opacity-70"
                      style={{ background:'linear-gradient(135deg,#059669,#047857)' }}>
                      {acting===b.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                      Approve & verify
                    </button>
                    <button onClick={() => act(b.id, 'reject')} disabled={acting===b.id}
                      className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border disabled:opacity-70"
                      style={{ borderColor:'#fecaca', color:'#dc2626' }}>
                      <XCircle className="h-3.5 w-3.5" />Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* OPPORTUNITIES */}
      {tab === 'opportunities' && (
        <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
          <h2 className="text-sm font-black mb-1" style={{ color:'#0f172a' }}>Investment opportunity approvals</h2>
          <p className="text-xs mb-5" style={{ color:'#64748b' }}>Activate submitted investment listings after review</p>
          <InvestmentApprovals act={act} acting={acting} />
        </div>
      )}

      {/* USERS */}
      {tab === 'users' && (
        <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
          <h2 className="text-sm font-black mb-5" style={{ color:'#0f172a' }}>All recent users ({stats.totalUsers} total)</h2>
          <div className="space-y-2">
            {recentUsers.map((u: any) => (
              <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor:'#f1f5f9' }}>
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-xs font-black text-blue-700 shrink-0">
                  {(u.name||u.email)?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold" style={{ color:'#0f172a' }}>{u.name || 'No name'}</div>
                  <div className="text-[10px]" style={{ color:'#94a3b8' }}>{u.email}</div>
                </div>
                {u.business ? (
                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold" style={{ color:'#374151' }}>{u.business.name}</div>
                    <div className="text-[10px]" style={{ color: u.business.verificationStatus==='VERIFIED' ? '#059669' : '#d97706' }}>
                      {u.business.verificationStatus} · Score: {u.business.trustScore}
                    </div>
                  </div>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:'#f1f5f9', color:'#94a3b8' }}>No business</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function InvestmentApprovals({ act, acting }: { act: any; acting: string|null }) {
  const [opps, setOpps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/opportunities?isActive=false')
      .then(r => r.json())
      .then(d => setOpps((d.opportunities || []).filter((o: any) => !o.isActive)))
      .finally(() => setLoading(false))
  }, [acting])

  if (loading) return <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin" style={{ color:'#1e40af' }} /></div>
  if (opps.length === 0) return (
    <div className="text-center py-12">
      <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-emerald-500" />
      <p className="text-sm font-semibold" style={{ color:'#0f172a' }}>No pending opportunities.</p>
    </div>
  )

  return (
    <div className="space-y-3">
      {opps.map((o: any) => (
        <div key={o.id} className="flex items-center justify-between gap-4 p-4 rounded-xl border flex-wrap" style={{ borderColor:'#e8edf3' }}>
          <div>
            <div className="text-sm font-black" style={{ color:'#0f172a' }}>{o.title}</div>
            <div className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>{o.type} · {o.country} · ${Number(o.targetAmount).toLocaleString()}</div>
          </div>
          <button onClick={() => act(o.id, 'activate_opportunity')} disabled={acting===o.id}
            className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl text-white disabled:opacity-70"
            style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
            {acting===o.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            Activate
          </button>
        </div>
      ))}
    </div>
  )
}
