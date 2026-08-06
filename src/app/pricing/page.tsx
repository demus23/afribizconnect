import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

const PLANS = [
  { name:'Free',       price:'$0',    period:'/mo', color:'#4A5568', features:['5 RFQs/month','20 contacts','Basic profile','Email support'],                                                         cta:'Get started', href:'/register' },
  { name:'Starter',    price:'$49',   period:'/mo', color:'#C9A84C', features:['Unlimited RFQs','Verified badge','100 contacts','Priority support','Analytics'],                                       cta:'Start free trial', href:'/register?plan=starter' },
  { name:'Growth',     price:'$149',  period:'/mo', color:'#00D4AA', features:['Everything in Starter','Unlimited contacts','Investment listings','Logistics quotes','5 team seats','API access'],    cta:'Start 14-day trial', href:'/register?plan=growth', highlight:true },
  { name:'Enterprise', price:'Custom',period:'',    color:'#7c3aed', features:['Everything in Growth','Dedicated manager','Unlimited seats','White-label','SLA guarantee','Custom integrations'], cta:'Contact sales', href:'/contact' },
]

export default function PricingPage() {
  return (
    <div style={{ fontFamily:'"Inter",system-ui,sans-serif', background:'#0A0E1A', minHeight:'100vh', color:'#E8EDF5' }}>

    <nav style={{ background:'#0A0E1A', borderBottom:'1px solid #1A2540', padding:'0 48px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
        <div style={{ width:'28px', height:'28px', background:'#C9A84C', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:'12px', fontWeight:900, color:'#0A0E1A' }}>A</span></div>
        <span style={{ fontSize:'12px', fontWeight:800, color:'#E8EDF5', letterSpacing:'0.08em' }}>AFRIBIZCONNECT</span>
      </Link>
      <div style={{ display:'flex', gap:'10px' }}>
        <Link href="/login"    style={{ fontSize:'12px', color:'#C9A84C', textDecoration:'none', fontWeight:600, padding:'8px 18px', border:'1px solid #C9A84C44', borderRadius:'4px' }}>Sign in</Link>
        <Link href="/register" style={{ fontSize:'12px', color:'#0A0E1A', background:'#C9A84C', textDecoration:'none', fontWeight:700, padding:'8px 18px', borderRadius:'4px' }}>Get access</Link>
      </div>
    </nav>
      {/* Hero */}
      <section style={{ textAlign:'center', padding:'80px 48px 60px' }}>
        <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px', fontFamily:'monospace' }}>Pricing</div>
        <h1 style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:'16px' }}>Simple, transparent pricing</h1>
        <p style={{ fontSize:'18px', color:'#4A5568' }}>Start free. No credit card required. Upgrade when you're ready.</p>
      </section>

      {/* Plans */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 48px 80px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
        {PLANS.map(plan => (
          <div key={plan.name} style={{ background: plan.highlight ? 'linear-gradient(135deg,#0F1629,#141B2D)' : '#0F1629', border:`1px solid ${plan.highlight ? plan.color + '44' : '#1A2540'}`, borderRadius:'12px', padding:'32px 24px', display:'flex', flexDirection:'column', position:'relative' }}>
            {plan.highlight && <div style={{ position:'absolute', top:'-1px', left:0, right:0, height:'3px', background:plan.color, borderRadius:'12px 12px 0 0' }} />}
            {plan.highlight && <div style={{ position:'absolute', top:'-28px', left:'50%', transform:'translateX(-50%)', fontSize:'10px', fontWeight:700, padding:'4px 12px', borderRadius:'20px', background:plan.color, color:'#0A0E1A', whiteSpace:'nowrap' }}>★ Most popular</div>}
            <div style={{ fontSize:'11px', fontWeight:700, color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'12px' }}>{plan.name}</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:'4px', marginBottom:'28px' }}>
              <span style={{ fontSize:'36px', fontWeight:900, color:'#E8EDF5', fontFamily:'monospace' }}>{plan.price}</span>
              <span style={{ fontSize:'12px', color:'#4A5568' }}>{plan.period}</span>
            </div>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:'10px', flex:1 }}>
              {plan.features.map(f => (
                <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:'8px', fontSize:'13px', color:'#94a3b8' }}>
                  <span style={{ color:plan.color, fontSize:'12px', marginTop:'2px' }}>✓</span>{f}
                </li>
              ))}
            </ul>
            <Link href={plan.href} style={{ display:'block', textAlign:'center', padding:'11px', borderRadius:'6px', fontSize:'13px', fontWeight:700, textDecoration:'none', background: plan.highlight ? plan.color : 'transparent', color: plan.highlight ? '#0A0E1A' : plan.color, border: plan.highlight ? 'none' : `1px solid ${plan.color}44` }}>
              {plan.cta} →
            </Link>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section style={{ borderTop:'1px solid #1A2540', background:'#0F1629' }}>
        <div style={{ maxWidth:'700px', margin:'0 auto', padding:'80px 48px' }}>
          <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'40px', fontFamily:'monospace' }}>Common questions</div>
          {[
            { q:'Can I cancel anytime?',            a:'Yes. Cancel your subscription from the billing portal at any time. You keep access until the end of the billing period.' },
            { q:'Is there a free trial?',            a:'Yes. Starter and Growth plans include a 14-day free trial. No credit card required to start.' },
            { q:'What payment methods do you accept?',a:'Visa, Mastercard, American Express. Bank transfer available for annual Enterprise contracts.' },
            { q:'Can I switch plans?',               a:'Yes, upgrade or downgrade anytime. Upgrades take effect immediately. Downgrades take effect at the next billing cycle.' },
          ].map(f => (
            <div key={f.q} style={{ borderBottom:'1px solid #1A2540', paddingBottom:'24px', marginBottom:'24px' }}>
              <div style={{ fontSize:'14px', fontWeight:700, color:'#E8EDF5', marginBottom:'8px' }}>{f.q}</div>
              <div style={{ fontSize:'13px', color:'#4A5568', lineHeight:1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

    <footer style={{ borderTop:'1px solid #1A2540', padding:'28px 48px' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
        <span style={{ fontSize:'11px', color:'#4A5568', fontFamily:'monospace' }}>© 2025 AfriBizConnect Ltd. DIFC, Dubai, UAE</span>
        <div style={{ display:'flex', gap:'20px' }}>
          {[['Privacy','/privacy'],['Terms','/terms'],['Contact','/contact'],['← Home','/']].map(([l,h]) => (
            <Link key={l} href={h} style={{ fontSize:'11px', color:'#4A5568', textDecoration:'none' }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
    </div>
  )
}
