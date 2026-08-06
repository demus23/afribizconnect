'use client'
import { useState, useEffect } from 'react'
import { CheckCircle2, Zap, Loader2, ExternalLink, CreditCard } from 'lucide-react'

const PLANS = [
  { id:'free',      name:'Free',       price:'$0',    per:'/mo', features:['5 RFQs/month','20 contacts','Basic profile'],                                  highlight:false },
  { id:'starter',   name:'Starter',    price:'$49',   per:'/mo', features:['Unlimited RFQs','Verified badge','100 contacts','Priority support'],            highlight:false },
  { id:'growth',    name:'Growth',     price:'$149',  per:'/mo', features:['Everything in Starter','Unlimited contacts','Investment listings','API access'], highlight:true, badge:'Most popular' },
  { id:'enterprise',name:'Enterprise', price:'Custom',per:'',    features:['Everything in Growth','Dedicated manager','Unlimited seats','SLA'],             highlight:false },
]

export default function BillingSection() {
  const [currentPlan, setPlan]     = useState('free')
  const [loading, setLoading]      = useState<string|null>(null)
  const [portalLoading, setPortal] = useState(false)
  const [success, setSuccess]      = useState(false)

  useEffect(() => {
    if (window.location.search.includes('success=1')) setSuccess(true)
    fetch('/api/profile').then(r => r.json()).then(d => {
      if (d.user?.subscription?.tier) setPlan(d.user.subscription.tier.toLowerCase())
    }).catch(() => {})
  }, [])

  async function upgrade(planId: string) {
    if (planId === 'free') return
    if (planId === 'enterprise') { window.location.href = '/contact'; return }
    setLoading(planId)
    try {
      const res  = await fetch('/api/stripe/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ plan: planId }) })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch { alert('Failed to open checkout.') }
    finally { setLoading(null) }
  }

  async function openPortal() {
    setPortal(true)
    try {
      const res  = await fetch('/api/stripe/portal', { method:'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally { setPortal(false) }
  }

  return (
    <div className="space-y-5">
      {success && (
        <div className="flex items-center gap-2.5 p-4 rounded-2xl text-sm" style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#059669' }}>
          <CheckCircle2 className="h-4 w-4 shrink-0" />Payment successful! Your plan has been upgraded.
        </div>
      )}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="h-5 w-5" style={{ color:'#1e40af' }} />
              <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Subscription</h2>
            </div>
            <p className="text-xs" style={{ color:'#64748b' }}>Current: <span className="font-black capitalize" style={{ color:'#1e40af' }}>{currentPlan}</span></p>
          </div>
          {currentPlan !== 'free' && (
            <button onClick={openPortal} disabled={portalLoading}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border hover:bg-slate-50"
              style={{ borderColor:'#e2e8f0', color:'#374151' }}>
              {portalLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ExternalLink className="h-3.5 w-3.5" />}
              Manage billing
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {PLANS.map(plan => {
            const isCurrent = currentPlan === plan.id
            return (
              <div key={plan.id} className="relative rounded-2xl border flex flex-col p-5"
                style={plan.highlight ? { background:'linear-gradient(135deg,#0f172a,#1e3a8a)' } : { background:'white', borderColor: isCurrent ? '#1e40af' : '#e8edf3' }}>
                {(plan as any).badge && <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-black px-3 py-0.5 rounded-full" style={{ background:'#fbbf24', color:'#0f172a' }}>★ {(plan as any).badge}</div>}
                {isCurrent && !plan.highlight && <div className="absolute -top-2.5 right-4 text-[10px] font-black px-2.5 py-0.5 rounded-full text-white" style={{ background:'#1e40af' }}>Current</div>}
                <div className="text-[11px] font-black uppercase tracking-wide mb-1" style={{ color: plan.highlight ? 'rgba(147,197,253,0.6)' : '#94a3b8' }}>{plan.name}</div>
                <div className="flex items-baseline gap-0.5 mb-4">
                  <span className="text-3xl font-black" style={{ color: plan.highlight ? 'white' : '#0f172a' }}>{plan.price}</span>
                  <span className="text-xs" style={{ color: plan.highlight ? 'rgba(147,197,253,0.5)' : '#94a3b8' }}>{plan.per}</span>
                </div>
                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: plan.highlight ? '#34d399' : '#059669' }} />
                      <span style={{ color: plan.highlight ? 'rgba(219,234,254,0.8)' : '#374151' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                {isCurrent
                  ? <div className="py-2.5 rounded-xl text-center text-xs font-black" style={{ background:'rgba(30,64,175,0.1)', color:'#1e40af' }}>✓ Active plan</div>
                  : <button onClick={() => upgrade(plan.id)} disabled={loading===plan.id}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black text-white w-full disabled:opacity-70"
                      style={{ background: plan.highlight ? 'linear-gradient(135deg,#34d399,#059669)' : 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                      {loading===plan.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Zap className="h-3.5 w-3.5" />{plan.id==='enterprise'?'Contact sales':'Upgrade'}</>}
                    </button>
                }
              </div>
            )
          })}
        </div>
        <p className="text-xs mt-4" style={{ color:'#94a3b8' }}>14-day free trial on all paid plans. Cancel anytime.</p>
      </div>
    </div>
  )
}
