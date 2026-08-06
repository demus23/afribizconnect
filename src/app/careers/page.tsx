import Link from 'next/link'

const JOBS = [
  { title:'Senior Full-Stack Engineer',       team:'Engineering',  location:'Dubai / Remote',    type:'Full-time',  color:'#C9A84C' },
  { title:'Trade Finance Product Manager',    team:'Product',      location:'Lagos, Nigeria',    type:'Full-time',  color:'#00D4AA' },
  { title:'African Markets Growth Lead',      team:'Growth',       location:'Nairobi / Remote',  type:'Full-time',  color:'#7c3aed' },
  { title:'Supplier Verification Analyst',    team:'Trust & Safety',location:'Dubai, UAE',       type:'Full-time',  color:'#1e40af' },
  { title:'Business Development — MENA',      team:'Sales',        location:'Dubai, UAE',        type:'Full-time',  color:'#dc2626' },
  { title:'Content & Trade Research Writer',  team:'Marketing',    location:'Remote',            type:'Part-time',  color:'#0891b2' },
]

const PERKS = [
  { title:'Remote-first',        desc:'Work from anywhere across Africa, UAE, or Europe.' },
  { title:'Equity for all',      desc:'Every team member gets meaningful equity in the company.' },
  { title:'Trade allowance',     desc:'$2,000/year to invest in African trade — we put our money where our mouth is.' },
  { title:'Learning budget',     desc:'$1,500/year for courses, conferences, and trade certifications.' },
]

export default function CareersPage() {
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
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'100px 48px 80px' }}>
        <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px', fontFamily:'monospace' }}>Careers</div>
        <h1 style={{ fontSize:'clamp(36px,5vw,64px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1.05, marginBottom:'20px', maxWidth:'600px' }}>
          Help us build Africa's<br /><span style={{ color:'#C9A84C' }}>trade infrastructure.</span>
        </h1>
        <p style={{ fontSize:'18px', color:'#4A5568', lineHeight:1.6, maxWidth:'540px' }}>
          We're a remote-first team building the operating system for African trade. Join us from Dubai, Lagos, Nairobi, or anywhere on earth.
        </p>
      </section>

      {/* Perks */}
      <section style={{ borderTop:'1px solid #1A2540', background:'#0F1629' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'60px 48px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'#1A2540' }}>
          {PERKS.map(p => (
            <div key={p.title} style={{ background:'#0F1629', padding:'32px 28px' }}>
              <div style={{ fontSize:'14px', fontWeight:800, color:'#E8EDF5', marginBottom:'8px' }}>{p.title}</div>
              <div style={{ fontSize:'13px', color:'#4A5568', lineHeight:1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'80px 48px' }}>
        <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'40px', fontFamily:'monospace' }}>Open positions — {JOBS.length} roles</div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'#1A2540' }}>
          {JOBS.map(job => (
            <div key={job.title} style={{ background:'#0F1629', padding:'24px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'20px' }}>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
                  <span style={{ fontSize:'15px', fontWeight:700, color:'#E8EDF5' }}>{job.title}</span>
                  <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'20px', background:`${job.color}20`, color:job.color }}>{job.team}</span>
                </div>
                <div style={{ fontSize:'12px', color:'#4A5568' }}>{job.location} · {job.type}</div>
              </div>
              <Link href="/contact" style={{ padding:'8px 20px', borderRadius:'4px', fontSize:'12px', fontWeight:700, textDecoration:'none', background:job.color, color:'#0A0E1A', whiteSpace:'nowrap' }}>
                Apply →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Open application */}
      <section style={{ borderTop:'1px solid #1A2540', background:'#0F1629', padding:'80px 48px', textAlign:'center' }}>
        <h2 style={{ fontSize:'32px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'12px' }}>Don't see your role?</h2>
        <p style={{ fontSize:'16px', color:'#4A5568', marginBottom:'32px' }}>We're always looking for exceptional people. Send us your CV.</p>
        <Link href="mailto:careers@afribizconnect.com" style={{ padding:'12px 32px', background:'#C9A84C', color:'#0A0E1A', borderRadius:'4px', textDecoration:'none', fontWeight:700, fontSize:'14px' }}>Send open application →</Link>
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
