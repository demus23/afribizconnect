import Link from 'next/link'
import { Globe2, ArrowRight, CheckCircle2, Zap } from 'lucide-react'

const PLANS = [
  { name:'Free',       price:'$0',   period:'/mo', features:['Basic profile','5 RFQs/month','20 contacts/month','Email support'], cta:'Get started free', highlight:false },
  { name:'Starter',    price:'$49',  period:'/mo', features:['Verified badge','Unlimited RFQs','100 contacts/month','Priority support','Analytics dashboard'], cta:'Start free trial', highlight:false },
  { name:'Growth',     price:'$149', period:'/mo', features:['Everything in Starter','Unlimited contacts','Investment listings','Logistics quotes','Team access (5 seats)','API access'], cta:'Start 14-day trial', highlight:true, badge:'Most popular' },
  { name:'Enterprise', price:'Custom',period:'',   features:['Everything in Growth','Dedicated account manager','Unlimited team seats','White-label options','SLA guarantee','Custom integrations'], cta:'Contact sales', highlight:false },
]

export default function PricingPage() {
  return (
    <div style={{ fontFamily:"'Geist Sans',system-ui,sans-serif" }}>
      <header className="border-b" style={{ borderColor:'#f1f5f9' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#1e40af,#0f172a)' }}><Globe2 className="h-4 w-4 text-white" /></div>
            <span className="font-black text-[15px]">AfriBiz<span style={{ color:'#f59e0b' }}>Connect</span></span>
          </Link>
          <Link href="/register" className="text-sm font-black px-5 py-2.5 rounded-xl text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>Get started free</Link>
        </div>
      </header>

      <section className="py-20 px-5 sm:px-8 text-center" style={{ background:'linear-gradient(180deg,#f0f6ff,#fff)' }}>
        <div className="text-xs font-black uppercase tracking-[0.3em] mb-5" style={{ color:'#1e40af' }}>Pricing</div>
        <h1 className="text-5xl font-black tracking-tighter mb-4" style={{ color:'#0f172a' }}>Simple, transparent pricing</h1>
        <p className="text-lg" style={{ color:'#64748b' }}>Start free. No credit card required. Upgrade when you're ready.</p>
      </section>

      <section className="py-16 px-5 sm:px-8 border-y" style={{ borderColor:'#f1f5f9' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {PLANS.map(plan => (
            <div key={plan.name} className="relative rounded-2xl flex flex-col p-7"
              style={plan.highlight
                ? { background:'linear-gradient(135deg,#0f172a,#1e3a8a)', boxShadow:'0 16px 48px rgba(30,64,175,0.3)' }
                : { backgroundColor:'white', border:'1px solid #e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full" style={{ backgroundColor:'#fbbf24', color:'#0f172a' }}>
                  <Zap className="h-2.5 w-2.5" />{plan.badge}
                </div>
              )}
              <div className="text-[11px] font-black uppercase tracking-wide mb-2" style={{ color: plan.highlight ? 'rgba(147,197,253,0.6)' : '#94a3b8' }}>{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-black" style={{ color: plan.highlight ? '#fff' : '#0f172a' }}>{plan.price}</span>
                <span className="text-xs" style={{ color: plan.highlight ? 'rgba(147,197,253,0.5)' : '#94a3b8' }}>{plan.period}</span>
              </div>
              <ul className="space-y-2.5 flex-1 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: plan.highlight ? '#34d399' : '#059669' }} />
                    <span style={{ color: plan.highlight ? 'rgba(219,234,254,0.8)' : '#374151' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="flex items-center justify-center gap-2 text-sm font-black py-3 rounded-xl transition-all hover:opacity-90"
                style={plan.highlight
                  ? { background:'linear-gradient(135deg,#34d399,#059669)', color:'white' }
                  : { border:'1.5px solid #e2e8f0', color:'#0f172a', backgroundColor:'#f8fafc' }}>
                {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs mt-8" style={{ color:'#94a3b8' }}>All paid plans include a 14-day free trial. Cancel anytime.</p>
      </section>

      <div className="border-t py-5 text-center text-xs" style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
        <Link href="/" className="hover:text-blue-600 transition-colors">← Back to AfriBizConnect</Link>
      </div>
    </div>
  )
}
