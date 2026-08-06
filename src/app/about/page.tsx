import Link from 'next/link'

const STATS = [
  { val:'3,200+', label:'Verified suppliers' },
  { val:'54',     label:'African markets'    },
  { val:'$2.8B',  label:'Trade facilitated'  },
  { val:'480+',   label:'Active investors'    },
]
const TEAM = [
  { name:'Natnael Demus',  role:'Founder & CEO',                location:'Dubai, UAE',     initials:'ND', color:'#C9A84C' },
  { name:'Aisha Mohammed', role:'Head of Trust & Verification', location:'Lagos, Nigeria',  initials:'AM', color:'#00D4AA' },
  { name:'Chen Wei',       role:'Head of Supplier Relations',   location:'Shenzhen, China', initials:'CW', color:'#7c3aed' },
  { name:'Omar Hassan',    role:'Head of Trade Finance',        location:'Nairobi, Kenya',  initials:'OH', color:'#1e40af' },
]

export default function AboutPage() {
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
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'100px 48px 80px', position:'relative' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(#1A254008 1px,transparent 1px),linear-gradient(90deg,#1A254008 1px,transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:'640px' }}>
          <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px', fontFamily:'monospace' }}>About AfriBizConnect</div>
          <h1 style={{ fontSize:'clamp(36px,5vw,64px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1.05, marginBottom:'24px' }}>
            Building Africa's<br /><span style={{ color:'#C9A84C' }}>trade infrastructure.</span>
          </h1>
          <p style={{ fontSize:'18px', color:'#4A5568', lineHeight:1.7, marginBottom:'40px' }}>
            Founded in Dubai in 2024 with a single mission: eliminate the trust and information gaps that make cross-border African trade harder than it needs to be.
          </p>
          <div style={{ display:'flex', gap:'12px' }}>
            <Link href="/register" style={{ padding:'12px 28px', background:'#C9A84C', color:'#0A0E1A', borderRadius:'4px', textDecoration:'none', fontWeight:700, fontSize:'14px' }}>Join the platform</Link>
            <Link href="/contact"  style={{ padding:'12px 28px', background:'transparent', color:'#E8EDF5', border:'1px solid #1A2540', borderRadius:'4px', textDecoration:'none', fontWeight:600, fontSize:'14px' }}>Contact us</Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ borderTop:'1px solid #1A2540', borderBottom:'1px solid #1A2540', background:'#0F1629' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 48px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'#1A2540' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background:'#0F1629', padding:'36px 28px', textAlign:'center' }}>
              <div style={{ fontSize:'36px', fontWeight:900, color:'#C9A84C', fontFamily:'monospace', marginBottom:'6px' }}>{s.val}</div>
              <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'80px 48px' }}>
        <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'40px', fontFamily:'monospace' }}>Our values</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'#1A2540' }}>
          {[
            { title:'Trust first',    color:'#00D4AA', desc:'Every business is KYB-verified with a public trust score. No guessing if a supplier is legitimate.' },
            { title:'Africa-built',   color:'#C9A84C', desc:'Built for African trade corridors — UAE to Nigeria, China to Ghana, Turkey to Kenya and every route in between.' },
            { title:'Capital access', color:'#7c3aed', desc:'African businesses deserve the same quality of trade finance and investment tools as businesses anywhere in the world.' },
          ].map(v => (
            <div key={v.title} style={{ background:'#0F1629', padding:'40px' }}>
              <div style={{ width:'28px', height:'3px', background:v.color, marginBottom:'20px', borderRadius:'2px' }} />
              <h3 style={{ fontSize:'18px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>{v.title}</h3>
              <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.7 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ borderTop:'1px solid #1A2540', background:'#0F1629' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'80px 48px' }}>
          <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'40px', fontFamily:'monospace' }}>The team</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {TEAM.map(m => (
              <div key={m.name} style={{ background:'#0A0E1A', border:'1px solid #1A2540', borderRadius:'12px', padding:'28px 20px', textAlign:'center' }}>
                <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:m.color, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', fontSize:'18px', fontWeight:900, color:'#0A0E1A' }}>{m.initials}</div>
                <div style={{ fontSize:'13px', fontWeight:700, color:'#E8EDF5', marginBottom:'4px' }}>{m.name}</div>
                <div style={{ fontSize:'11px', color:'#4A5568', marginBottom:'6px' }}>{m.role}</div>
                <div style={{ fontSize:'10px', color:'#C9A84C', fontFamily:'monospace' }}>{m.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop:'1px solid #1A2540', padding:'80px 48px', textAlign:'center' }}>
        <h2 style={{ fontSize:'40px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'16px' }}>Join Africa's trade OS</h2>
        <p style={{ fontSize:'16px', color:'#4A5568', marginBottom:'36px' }}>12,400+ businesses trust AfriBizConnect for cross-border trade.</p>
        <Link href="/register" style={{ padding:'14px 40px', background:'#C9A84C', color:'#0A0E1A', borderRadius:'4px', textDecoration:'none', fontWeight:700, fontSize:'14px', letterSpacing:'0.05em' }}>Get started free →</Link>
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
