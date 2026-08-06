import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { BLOG_POSTS, getPost } from '@/lib/blog-posts'

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: `${post.title} — AfriTrade Insights`,
    description: post.excerpt,
  }
}

const TAG_COLORS: Record<string,{bg:string,color:string}> = {
  AfCFTA:        { bg:'#eff6ff', color:'#1e40af' },
  'Trade Finance':{ bg:'#f5f3ff', color:'#7c3aed' },
  Logistics:     { bg:'#fffbeb', color:'#d97706' },
  Customs:       { bg:'#fef2f2', color:'#dc2626' },
  Sourcing:      { bg:'#f0fdf4', color:'#059669' },
  Intelligence:  { bg:'#ecfeff', color:'#0891b2' },
}

function renderContent(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## '))
      return <h2 key={i} style={{ fontSize:'22px', fontWeight:800, color:'#0f172a', margin:'36px 0 12px', letterSpacing:'-0.01em' }}>{block.slice(3)}</h2>
    if (block.startsWith('### '))
      return <h3 key={i} style={{ fontSize:'18px', fontWeight:700, color:'#0f172a', margin:'28px 0 10px' }}>{block.slice(4)}</h3>
    if (block.startsWith('**') && block.endsWith('**') && !block.slice(2).includes('**'))
      return <h3 key={i} style={{ fontSize:'17px', fontWeight:700, color:'#0f172a', margin:'24px 0 8px' }}>{block.slice(2,-2)}</h3>
    if (block.includes('\n- ') || block.startsWith('- ') || block.startsWith('🚩'))
      return (
        <ul key={i} style={{ margin:'12px 0', paddingLeft:'20px' }}>
          {block.split('\n').map((l, j) => (
            <li key={j} style={{ marginBottom:'8px', color:'#374151', lineHeight:1.6 }}
              dangerouslySetInnerHTML={{ __html: l.replace(/^[-🚩]\s?/,'').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>') }} />
          ))}
        </ul>
      )
    return (
      <p key={i} style={{ marginBottom:'20px', color:'#374151', lineHeight:1.8 }}
        dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.+?)\*\*/g,'<strong style="color:#0f172a;font-weight:700">$1</strong>') }} />
    )
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const tc = TAG_COLORS[post.category] || { bg:'#f1f5f9', color:'#475569' }
  const date = new Date(post.date).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })

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

      <div style={{ maxWidth:'760px', margin:'0 auto', padding:'48px 32px' }}>

        {/* Back */}
        <Link href="/blog" style={{ display:'inline-flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'#4A5568', textDecoration:'none', marginBottom:'32px' }}>
          <ArrowLeft style={{ width:'14px', height:'14px' }} /> Back to AfriTrade Insights
        </Link>

        {/* Category tag */}
        <div style={{ fontSize:'11px', fontWeight:700, color:tc.color, background:tc.bg, border:`1px solid ${tc.color}33`, borderRadius:'20px', padding:'4px 12px', display:'inline-block', marginBottom:'16px' }}>
          {post.category}
        </div>

        {/* Title */}
        <h1 style={{ fontSize:'clamp(26px,4vw,40px)', fontWeight:900, color:'#E8EDF5', letterSpacing:'-0.03em', lineHeight:1.15, marginBottom:'16px' }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'40px', paddingBottom:'24px', borderBottom:'1px solid #1A2540', flexWrap:'wrap' }}>
          <span style={{ fontSize:'12px', color:'#4A5568', display:'flex', alignItems:'center', gap:'5px' }}>
            <Calendar style={{ width:'12px', height:'12px' }} /> {date}
          </span>
          <span style={{ fontSize:'12px', color:'#4A5568', display:'flex', alignItems:'center', gap:'5px' }}>
            <Clock style={{ width:'12px', height:'12px' }} /> {post.readTime} read
          </span>
        </div>

        {/* Content — render on white card for readability */}
        <div style={{ background:'white', borderRadius:'16px', padding:'40px', marginBottom:'40px' }}>
          {renderContent(post.content)}
        </div>

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,#0F1629,#1e3a8a)', border:'1px solid #1A2540', borderRadius:'12px', padding:'32px', textAlign:'center' }}>
          <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'12px', fontFamily:'monospace' }}>Have questions?</div>
          <h3 style={{ fontSize:'20px', fontWeight:800, color:'white', marginBottom:'10px' }}>Ask AfriTrade AI</h3>
          <p style={{ fontSize:'14px', color:'rgba(147,197,253,0.7)', marginBottom:'24px' }}>Get instant answers on duties, Incoterms, AfCFTA, supplier verification, and trade finance.</p>
          <Link href="/dashboard" style={{ display:'inline-block', padding:'12px 28px', background:'#C9A84C', color:'#0A0E1A', borderRadius:'6px', textDecoration:'none', fontWeight:700, fontSize:'13px' }}>
            Open AI Assistant →
          </Link>
        </div>

        {/* Related */}
        <div style={{ marginTop:'40px' }}>
          <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px', fontFamily:'monospace' }}>More articles</div>
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            {BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3).map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'14px 16px', background:'#0F1629', border:'1px solid #1A2540', borderRadius:'8px', textDecoration:'none' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'13px', fontWeight:600, color:'#E8EDF5', marginBottom:'2px' }}>{p.title}</div>
                  <div style={{ fontSize:'11px', color:'#4A5568' }}>{p.category} · {p.readTime}</div>
                </div>
                <span style={{ fontSize:'16px', color:'#4A5568' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:'1px solid #1A2540', padding:'28px 48px', marginTop:'48px' }}>
        <div style={{ maxWidth:'760px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <span style={{ fontSize:'11px', color:'#4A5568', fontFamily:'monospace' }}>© 2025 AfriBizConnect Ltd.</span>
          <Link href="/blog" style={{ fontSize:'11px', color:'#C9A84C', textDecoration:'none' }}>← All articles</Link>
        </div>
      </footer>
    </div>
  )
}
