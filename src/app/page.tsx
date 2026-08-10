'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const TICKER_ITEMS = [
  { pair:'USD/NGN', val:'1,587.40', chg:'+0.32%', up:true },
  { pair:'USD/KES', val:'129.85',   chg:'+0.12%', up:true },
  { pair:'USD/GHS', val:'15.62',    chg:'-0.08%', up:false },
  { pair:'USD/ZAR', val:'18.94',    chg:'+0.41%', up:true },
  { pair:'USD/EGP', val:'48.72',    chg:'-0.15%', up:false },
  { pair:'CRUDE/B', val:'$78.42',   chg:'+1.2%',  up:true },
  { pair:'COCOA',   val:'$6,842',   chg:'-0.9%',  up:false },
  { pair:'SESAME',  val:'$1,240/T', chg:'+2.1%',  up:true },
]

const STATS = [
  { label:'Verified suppliers', val:'3,200+', sub:'across 54 markets' },
  { label:'Deal flow (2025)',   val:'$2.8B',  sub:'facilitated'       },
  { label:'Active investors',  val:'480+',   sub:'institutional & PE' },
  { label:'Avg. response',     val:'<24h',   sub:'to RFQs'            },
]

const FEATURES = [
  { tag:'01 / SOURCING',      title:'Global supplier network',    body:'Issue RFQs to 3,200+ verified manufacturers in UAE, China, Turkey, India, Germany. Quotes within 24 hours.',        href:'/sourcing',  metric:'3,200+', metricLabel:'verified suppliers' },
  { tag:'02 / INVEST',        title:'Institutional deal flow',    body:'$2.8B in equity, debt, and trade finance opportunities across 54 African markets. PE-grade due diligence.',         href:'/invest',    metric:'$46M+',  metricLabel:'active deal flow' },
  { tag:'03 / LOGISTICS',     title:'Freight intelligence',       body:'Real-time quotes from DHL, Maersk, Emirates SkyCargo, MSC, and FedEx. Air, FCL, LCL — routed from origin to door.',href:'/logistics', metric:'8',      metricLabel:'carrier partners' },
  { tag:'04 / TRADE FINANCE', title:'Cross-border capital',       body:'Letters of credit, invoice factoring, AfCFTA-preferential financing, and escrow for first trades.',                 href:'/trade',     metric:'48h',    metricLabel:'approval time' },
]

const BLOG = [
  { slug:'afcfta-complete-guide-2025',    title:'AfCFTA 2025: Complete Guide',              cat:'AfCFTA',       time:'10 min' },
  { slug:'letter-of-credit-guide',        title:'Letter of Credit: Practical Guide',        cat:'Trade Finance', time:'8 min' },
  { slug:'how-to-verify-suppliers-china', title:'How to Verify Chinese Suppliers',          cat:'Sourcing',     time:'6 min' },
]

export default function HomePage() {
  const [time, setTime] = useState('')
  const [blink, setBlink] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12:false, hour:'2-digit', minute:'2-digit', timeZone:'Africa/Lagos' }))
      setBlink(b => !b)
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background:'#0A0E1A', minHeight:'100vh', fontFamily:'"Inter",system-ui,sans-serif', color:'#E8EDF5', overflowX:'hidden' }}>

      {/* TICKER */}
      <div style={{ background:'#0F1629', borderBottom:'1px solid #1A2540', overflow:'hidden', height:'32px', display:'flex', alignItems:'center' }}>
        <div style={{ display:'flex', gap:0, animation:'ticker 40s linear infinite', whiteSpace:'nowrap' }}>
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'0 16px', borderRight:'1px solid #1A2540', fontSize:'10px', fontFamily:'monospace' }}>
              <span style={{ color:'#4A5568' }}>{item.pair}</span>
              <span style={{ color:'#E8EDF5', fontWeight:600 }}>{item.val}</span>
              <span style={{ color: item.up ? '#00D4AA' : '#FF4D6D' }}>{item.chg}</span>
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:'60px', borderBottom:'1px solid #1A2540', position:'sticky', top:0, zIndex:50, background:'#0A0E1A' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:'26px', height:'26px', background:'#C9A84C', borderRadius:'3px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontSize:'11px', fontWeight:900, color:'#0A0E1A' }}>A</span>
          </div>
          <span style={{ fontSize:'11px', fontWeight:800, color:'#E8EDF5', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>AFRIBIZCONNECT</span>
        </div>
        <div className="nav-links" style={{ display:'flex', alignItems:'center', gap:'20px' }}>
          {['Platform','Blog','Pricing','About'].map(item => (
            <a key={item} href={`/${item.toLowerCase()}`} style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.08em', textDecoration:'none', fontWeight:500 }}>{item}</a>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', flexShrink:0 }}>
          <Link href="/login" style={{ fontSize:'11px', color:'#C9A84C', textDecoration:'none', fontWeight:600, padding:'6px 14px', border:'1px solid #C9A84C44', borderRadius:'4px', whiteSpace:'nowrap' }}>Sign in</Link>
          <Link href="/register" style={{ fontSize:'11px', color:'#0A0E1A', background:'#C9A84C', textDecoration:'none', fontWeight:700, padding:'6px 14px', borderRadius:'4px', whiteSpace:'nowrap' }}>Get access</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding:'60px 20px 48px', maxWidth:'1200px', margin:'0 auto', position:'relative' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(#1A254008 1px,transparent 1px),linear-gradient(90deg,#1A254008 1px,transparent 1px)', backgroundSize:'48px 48px', pointerEvents:'none' }} />
        <div style={{ position:'relative' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginBottom:'20px', background:'#C9A84C10', border:'1px solid #C9A84C33', borderRadius:'2px', padding:'5px 12px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#C9A84C', display:'inline-block', animation:'pulse 2s infinite' }} />
            <span style={{ fontSize:'10px', color:'#C9A84C', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'monospace' }}>Live — Africa trade infrastructure</span>
          </div>

          <h1 style={{ fontSize:'clamp(32px,8vw,80px)', fontWeight:800, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:'20px' }}>
            The operating system<br />
            <span style={{ color:'#C9A84C' }}>for African trade.</span>
          </h1>

          <p style={{ fontSize:'clamp(14px,4vw,18px)', color:'#4A5568', lineHeight:1.6, maxWidth:'560px', marginBottom:'36px' }}>
            Institutional-grade supplier sourcing, investment deal flow, freight intelligence, and trade finance — unified for cross-border business across 54 African markets.
          </p>

          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'60px' }}>
            <Link href="/register" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 28px', background:'#C9A84C', color:'#0A0E1A', borderRadius:'4px', textDecoration:'none', fontWeight:700, fontSize:'13px' }}>
              Request access →
            </Link>
            <Link href="/dashboard" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 28px', background:'transparent', color:'#E8EDF5', border:'1px solid #1A2540', borderRadius:'4px', textDecoration:'none', fontWeight:600, fontSize:'13px' }}>
              View platform
            </Link>
          </div>

          {/* Stats — responsive grid */}
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} style={{ background:'#0F1629', padding:'24px 20px' }}>
                <div style={{ fontSize:'clamp(24px,6vw,36px)', fontWeight:800, color:'#C9A84C', fontFamily:'monospace', letterSpacing:'-0.02em', marginBottom:'6px' }}>{s.val}</div>
                <div style={{ fontSize:'10px', color:'#E8EDF5', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'3px' }}>{s.label}</div>
                <div style={{ fontSize:'10px', color:'#4A5568' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 20px 60px' }}>
        <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'monospace', marginBottom:'32px', borderBottom:'1px solid #1A2540', paddingBottom:'16px' }}>Platform capabilities</div>
        <div className="features-grid">
          {FEATURES.map(f => (
            <Link key={f.tag} href={f.href} style={{ display:'block', background:'#0F1629', padding:'32px 24px', textDecoration:'none', border:'1px solid #1A2540' }}>
              <div style={{ fontSize:'10px', color:'#C9A84C', fontFamily:'monospace', letterSpacing:'0.2em', marginBottom:'16px' }}>{f.tag}</div>
              <h3 style={{ fontSize:'18px', fontWeight:700, color:'#E8EDF5', marginBottom:'10px', letterSpacing:'-0.01em' }}>{f.title}</h3>
              <p style={{ fontSize:'13px', color:'#4A5568', lineHeight:1.6, marginBottom:'24px' }}>{f.body}</p>
              <div style={{ display:'flex', alignItems:'baseline', gap:'8px', borderTop:'1px solid #1A2540', paddingTop:'20px' }}>
                <span style={{ fontSize:'24px', fontWeight:800, color:'#00D4AA', fontFamily:'monospace' }}>{f.metric}</span>
                <span style={{ fontSize:'10px', color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase' }}>{f.metricLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARKET STRIP */}
      <section style={{ background:'#0F1629', borderTop:'1px solid #1A2540', borderBottom:'1px solid #1A2540', padding:'40px 20px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
            <span style={{ fontSize:'10px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'monospace' }}>Live African FX · Commodity prices</span>
            <span style={{ fontSize:'10px', color:'#00D4AA', fontFamily:'monospace' }}>● LIVE</span>
          </div>
          <div style={{ display:'flex', gap:'1px', overflowX:'auto', background:'#1A2540', WebkitOverflowScrolling:'touch' }}>
            {TICKER_ITEMS.map(item => (
              <div key={item.pair} style={{ background:'#0A0E1A', padding:'16px 14px', flexShrink:0, minWidth:'120px' }}>
                <div style={{ fontSize:'9px', color:'#4A5568', fontFamily:'monospace', letterSpacing:'0.1em', marginBottom:'6px' }}>{item.pair}</div>
                <div style={{ fontSize:'15px', fontWeight:700, color:'#E8EDF5', fontFamily:'monospace', marginBottom:'3px' }}>{item.val}</div>
                <div style={{ fontSize:'10px', color: item.up ? '#00D4AA' : '#FF4D6D', fontFamily:'monospace' }}>{item.chg}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG STRIP */}
      <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'60px 20px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
          <span style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'monospace' }}>AfriTrade Insights</span>
          <a href="/blog" style={{ fontSize:'12px', color:'#C9A84C', textDecoration:'none', fontWeight:600 }}>View all articles →</a>
        </div>
        <div className="blog-grid">
          {BLOG.map(p => (
            <a key={p.slug} href={`/blog/${p.slug}`} style={{ display:'block', background:'#0F1629', padding:'24px', textDecoration:'none', border:'1px solid #1A2540' }}>
              <div style={{ fontSize:'10px', color:'#C9A84C', fontFamily:'monospace', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'10px' }}>{p.cat} · {p.time} read</div>
              <h3 style={{ fontSize:'14px', fontWeight:700, color:'#E8EDF5', lineHeight:1.4, marginBottom:'12px' }}>{p.title}</h3>
              <span style={{ fontSize:'11px', color:'#4A5568' }}>Read article →</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 20px 60px' }}>
        <div style={{ background:'#0F1629', border:'1px solid #1A2540', padding:'48px 24px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, right:0, width:'300px', height:'300px', background:'radial-gradient(circle,#C9A84C08 0%,transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'relative' }}>
            <div style={{ fontSize:'10px', color:'#C9A84C', fontFamily:'monospace', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px' }}>Limited access · Verified businesses only</div>
            <h2 style={{ fontSize:'clamp(24px,6vw,48px)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'14px', lineHeight:1.1 }}>
              Built for those who move<br /><span style={{ color:'#C9A84C' }}>serious capital across Africa.</span>
            </h2>
            <p style={{ fontSize:'14px', color:'#4A5568', marginBottom:'32px', maxWidth:'480px', lineHeight:1.6 }}>
              Join 480+ investors, 3,200+ suppliers, and 95+ logistics partners on Africa's most trusted trade infrastructure.
            </p>
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              <Link href="/register" style={{ padding:'12px 28px', background:'#C9A84C', color:'#0A0E1A', borderRadius:'4px', textDecoration:'none', fontWeight:700, fontSize:'13px' }}>
                Apply for access →
              </Link>
              <Link href="/pricing" style={{ padding:'12px 28px', background:'transparent', color:'#E8EDF5', border:'1px solid #1A2540', borderRadius:'4px', textDecoration:'none', fontWeight:600, fontSize:'13px' }}>
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid #1A2540', padding:'32px 20px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          {/* Footer columns */}
          <div className="footer-grid" style={{ marginBottom:'32px' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                <div style={{ width:'28px', height:'28px', background:'#C9A84C', borderRadius:'3px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:'11px', fontWeight:900, color:'#0A0E1A' }}>A</span>
                </div>
                <div>
                  <div style={{ fontSize:'11px', fontWeight:800, color:'#E8EDF5', letterSpacing:'0.08em' }}>AFRIBIZCONNECT</div>
                  <div style={{ fontSize:'9px', color:'#4A5568', letterSpacing:'0.1em' }}>AFRICA'S TRADE OS</div>
                </div>
              </div>
              <p style={{ fontSize:'12px', color:'#4A5568', lineHeight:1.7, marginBottom:'20px' }}>
                Institutional-grade trade infrastructure for cross-border business across 54 African markets.
              </p>
            </div>

            {[
              { title:'Platform', links:[['Marketplace','/marketplace'],['Invest','/invest'],['Sourcing','/sourcing'],['Logistics','/logistics'],['Trade','/trade'],['Market Data','/market-data']] },
              { title:'Company',  links:[['About','/about'],['Pricing','/pricing'],['Careers','/careers'],['News','/news'],['Contact','/contact']] },
              { title:'Legal',    links:[['Privacy','/privacy'],['Terms','/terms'],['Cookies','/cookies'],['Refund','/refund'],['Regulatory','/regulatory']] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:'10px', color:'#E8EDF5', fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }}>{col.title}</div>
                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'8px' }}>
                  {col.links.map(([label,href]) => (
                    <li key={label}><Link href={href} style={{ fontSize:'12px', color:'#4A5568', textDecoration:'none' }}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop:'1px solid #1A2540', paddingTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
            <span style={{ fontSize:'10px', color:'#4A5568', fontFamily:'monospace' }}>© 2025 AfriBizConnect Ltd. DIFC, Dubai, UAE</span>
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00D4AA', display:'inline-block', animation:'pulse 2s infinite' }} />
              <span style={{ fontSize:'10px', color:'#00D4AA', fontFamily:'monospace' }}>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse  { 0%, 100% { opacity:1; } 50% { opacity:0.3; } }

        /* Stats: 2x2 on mobile, 4 cols on desktop */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #1A2540;
        }
        /* Features: 2 cols on desktop */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: #1A2540;
        }
        /* Blog: 3 cols on desktop */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #1A2540;
        }
        /* Footer: 4 cols on desktop */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 32px;
        }
        /* Nav links — hide on mobile */
        .nav-links { display: flex; }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; }
          .blog-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
