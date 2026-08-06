import Link from 'next/link'

const ARTICLES = [
  { title:"AfriBizConnect raises $3M seed round to scale Africa's B2B trade platform", date:'June 2025', category:'Company news',     color:'#C9A84C', desc:'Dubai-based AfriBizConnect closes seed round to expand verified supplier marketplace, trade intelligence, and AI assistant capabilities.' },
  { title:'AfCFTA Phase 2: What African importers need to know for July 2025',          date:'June 2025', category:'AfCFTA',           color:'#00D4AA', desc:'The second phase of tariff reductions under the African Continental Free Trade Area takes effect. Full guide for importers and exporters.' },
  { title:'Nigerian Naira stabilizes at ₦1,580 — Impact on UAE-Nigeria trade',         date:'May 2025',  category:'Market analysis',  color:'#7c3aed', desc:'CBN forex reforms show results. We analyze what this means for importers sourcing from Gulf suppliers and paying in USD.' },
  { title:'Top 10 verified FMCG suppliers for West African distributors (2025)',        date:'May 2025',  category:'Supplier guide',   color:'#1e40af', desc:'Our sourcing team highlights the highest-rated FMCG suppliers currently active on AfriBizConnect for Nigeria, Ghana, and Senegal.' },
  { title:'Kenya cold chain logistics: $8M investment signals sector growth',            date:'Apr 2025',  category:'Investment',       color:'#059669', desc:'East Africa cold chain gap is closing. We cover recent investments and what they mean for agricultural exporters in the region.' },
  { title:'How to structure a Letter of Credit for African imports — 2025 guide',       date:'Apr 2025',  category:'Trade finance',    color:'#d97706', desc:'Step-by-step LC documentation walkthrough with bank requirements, common mistakes, and what customs look for at African ports.' },
]

export default function NewsPage() {
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
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'80px 48px 60px' }}>
        <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px', fontFamily:'monospace' }}>News & insights</div>
        <h1 style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:'16px' }}>AfriTrade Intelligence</h1>
        <p style={{ fontSize:'18px', color:'#4A5568', maxWidth:'540px', lineHeight:1.6 }}>Market analysis, trade guides, company news, and supplier spotlights for African B2B traders.</p>
      </section>

      {/* Articles */}
      <section style={{ borderTop:'1px solid #1A2540' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'60px 48px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'#1A2540' }}>
          {ARTICLES.map(a => (
            <div key={a.title} style={{ background:'#0F1629', padding:'32px', display:'flex', flexDirection:'column' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
                <span style={{ fontSize:'10px', fontWeight:700, padding:'3px 10px', borderRadius:'20px', background:`${a.color}20`, color:a.color }}>{a.category}</span>
                <span style={{ fontSize:'10px', color:'#4A5568', fontFamily:'monospace' }}>{a.date}</span>
              </div>
              <h2 style={{ fontSize:'15px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px', lineHeight:1.4, flex:1 }}>{a.title}</h2>
              <p style={{ fontSize:'12px', color:'#4A5568', lineHeight:1.6, marginBottom:'20px' }}>{a.desc}</p>
              <Link href="/blog" style={{ fontSize:'12px', fontWeight:700, color:a.color, textDecoration:'none' }}>Read article →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ borderTop:'1px solid #1A2540', background:'#0F1629', padding:'80px 48px', textAlign:'center' }}>
        <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px', fontFamily:'monospace' }}>Weekly briefing</div>
        <h2 style={{ fontSize:'36px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'12px' }}>Get trade intelligence weekly</h2>
        <p style={{ fontSize:'16px', color:'#4A5568', marginBottom:'36px' }}>FX rates, commodity prices, deal flow, and supplier news. Every Monday.</p>
        <div style={{ display:'flex', gap:'10px', maxWidth:'420px', margin:'0 auto' }}>
          <input type="email" placeholder="your@business.com" style={{ flex:1, padding:'12px 16px', background:'#0A0E1A', border:'1px solid #1A2540', borderRadius:'6px', fontSize:'13px', color:'#E8EDF5', outline:'none', fontFamily:'inherit' }} />
          <button style={{ padding:'12px 20px', background:'#C9A84C', color:'#0A0E1A', border:'none', borderRadius:'6px', fontSize:'13px', fontWeight:700, cursor:'pointer', whiteSpace:'nowrap', fontFamily:'inherit' }}>Subscribe</button>
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
