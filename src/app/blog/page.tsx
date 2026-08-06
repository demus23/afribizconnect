import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog-posts'

const TAG_COLORS: Record<string,{bg:string,color:string}> = {
  AfCFTA:         { bg:'#eff6ff', color:'#1e40af' },
  'Trade Finance':{ bg:'#f5f3ff', color:'#7c3aed' },
  Logistics:      { bg:'#fffbeb', color:'#d97706' },
  Customs:        { bg:'#fef2f2', color:'#dc2626' },
  Sourcing:       { bg:'#f0fdf4', color:'#059669' },
  Intelligence:   { bg:'#ecfeff', color:'#0891b2' },
}

export default function BlogPage() {
  const featured = BLOG_POSTS[0]
  const rest     = BLOG_POSTS.slice(1)

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })

  return (
    <div style={{ background:'#0A0E1A', minHeight:'100vh', fontFamily:'"Inter",system-ui,sans-serif', color:'#E8EDF5' }}>

      {/* Nav */}
      <nav style={{ background:'#0A0E1A', borderBottom:'1px solid #1A2540', padding:'0 48px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          <div style={{ width:'28px', height:'28px', background:'#C9A84C', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:'12px', fontWeight:900, color:'#0A0E1A' }}>A</span>
          </div>
          <span style={{ fontSize:'12px', fontWeight:800, color:'#E8EDF5', letterSpacing:'0.08em' }}>AFRIBIZCONNECT</span>
        </Link>
        <div style={{ display:'flex', gap:'10px' }}>
          <Link href="/login"    style={{ fontSize:'12px', color:'#C9A84C', textDecoration:'none', fontWeight:600, padding:'8px 18px', border:'1px solid #C9A84C44', borderRadius:'4px' }}>Sign in</Link>
          <Link href="/register" style={{ fontSize:'12px', color:'#0A0E1A', background:'#C9A84C', textDecoration:'none', fontWeight:700, padding:'8px 18px', borderRadius:'4px' }}>Get access</Link>
        </div>
      </nav>

      {/* Header */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'80px 48px 48px' }}>
        <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'12px', fontFamily:'monospace' }}>AfriTrade Insights</div>
        <h1 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:900, letterSpacing:'-0.03em', marginBottom:'12px' }}>African trade intelligence,<br />published weekly</h1>
        <p style={{ fontSize:'16px', color:'#4A5568', maxWidth:'520px', lineHeight:1.6 }}>Duties, Incoterms, AfCFTA updates, supplier guides, and trade finance — written for African importers and exporters.</p>
      </section>

      {/* Featured */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 48px 32px' }}>
        <Link href={`/blog/${featured.slug}`} style={{ display:'block', background:'linear-gradient(135deg,#0F1629,#1e3a8a)', border:'1px solid #1A2540', borderRadius:'16px', padding:'40px', textDecoration:'none' }}>
          <div style={{ fontSize:'10px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'12px', fontFamily:'monospace' }}>📌 Latest article</div>
          <h2 style={{ fontSize:'clamp(18px,3vw,28px)', fontWeight:900, color:'white', marginBottom:'12px', letterSpacing:'-0.02em', lineHeight:1.2 }}>{featured.title}</h2>
          <p style={{ fontSize:'14px', color:'rgba(147,197,253,0.7)', lineHeight:1.6, marginBottom:'20px', maxWidth:'600px' }}>{featured.excerpt}</p>
          <div style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
            <span style={{ fontSize:'11px', color:'rgba(147,197,253,0.4)' }}>{fmt(featured.date)}</span>
            <span style={{ fontSize:'11px', color:'rgba(147,197,253,0.4)' }}>{featured.readTime}</span>
            <span style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, marginLeft:'auto' }}>Read article →</span>
          </div>
        </Link>
      </section>

      {/* Grid */}
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 48px 80px', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'16px' }}>
        {rest.map(p => {
          const tc = TAG_COLORS[p.category] || { bg:'#f1f5f9', color:'#475569' }
          return (
            <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display:'block', background:'#0F1629', border:'1px solid #1A2540', borderRadius:'12px', padding:'24px', textDecoration:'none' }}>
              <div style={{ fontSize:'10px', fontWeight:700, color:tc.color, background:tc.bg, borderRadius:'20px', padding:'3px 10px', display:'inline-block', marginBottom:'12px' }}>{p.category}</div>
              <h3 style={{ fontSize:'15px', fontWeight:800, color:'#E8EDF5', marginBottom:'8px', lineHeight:1.3, letterSpacing:'-0.01em' }}>{p.title}</h3>
              <p style={{ fontSize:'12px', color:'#4A5568', lineHeight:1.6, marginBottom:'16px' }}>{p.excerpt}</p>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', fontSize:'11px', color:'#4A5568' }}>
                <span>{fmt(p.date)}</span>
                <span>{p.readTime}</span>
                <span style={{ marginLeft:'auto', color:'#C9A84C', fontWeight:600 }}>Read →</span>
              </div>
            </Link>
          )
        })}
      </section>

      {/* Footer */}
      <footer style={{ borderTop:'1px solid #1A2540', padding:'28px 48px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <span style={{ fontSize:'11px', color:'#4A5568', fontFamily:'monospace' }}>© 2025 AfriBizConnect Ltd. DIFC, Dubai, UAE</span>
          <Link href="/" style={{ fontSize:'11px', color:'#4A5568', textDecoration:'none' }}>← Back to AfriBizConnect</Link>
        </div>
      </footer>
    </div>
  )
}
