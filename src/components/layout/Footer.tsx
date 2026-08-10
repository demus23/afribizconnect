'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const LINKS = {
  Platform: [
    { label:'Supplier Marketplace', href:'/marketplace' },
    { label:'Investment Deals',     href:'/invest' },
    { label:'Sourcing & RFQs',      href:'/sourcing' },
    { label:'Logistics Hub',        href:'/logistics' },
    { label:'Trade Finance',        href:'/trade' },
    { label:'Market Data',          href:'/market-data' },
    { label:'Trade Intelligence',   href:'/intelligence' },
    { label:'Price Alerts',         href:'/alerts' },
    { label:'Developer API',        href:'/developer' },
  ],
  Company: [
    { label:'About AfriBizConnect', href:'/about' },
    { label:'Pricing',              href:'/pricing' },
    { label:'Careers',              href:'/careers' },
    { label:'News & Press',         href:'/news' },
    { label:'Contact us',           href:'/contact' },
  ],
  Resources: [
    { label:'AfriTrade Insights',    href:'/blog' },
    { label:'AfCFTA Guide 2025',     href:'/blog/afcfta-complete-guide-2025' },
    { label:'Incoterms Explained',   href:'/blog/incoterms-2020-africa-guide' },
    { label:'LC Practical Guide',    href:'/blog/letter-of-credit-guide' },
    { label:'Nigeria Duty Guide',    href:'/blog/nigeria-import-duties-2025' },
    { label:'Supplier Verification', href:'/blog/how-to-verify-suppliers-china' },
    { label:'Trade Routes 2025',     href:'/blog/african-trade-routes-2025' },
  ],
  Legal: [
    { label:'Privacy Policy',   href:'/privacy' },
    { label:'Terms of Service', href:'/terms' },
    { label:'Cookie Policy',    href:'/cookies' },
    { label:'Refund Policy',    href:'/refund' },
    { label:'Data Processing',  href:'/data-processing' },
    { label:'Regulatory',       href:'/regulatory' },
  ],
}

const STATS = [
  { val:'3,200+', label:'Verified suppliers' },
  { val:'54',     label:'African markets'    },
  { val:'$2.8B',  label:'Trade facilitated'  },
  { val:'480+',   label:'Active investors'    },
]

export default function Footer() {
  const [email, setEmail]   = useState('')
  const [subbed, setSubbed] = useState(false)

  return (
    <footer style={{ background:'#0A0E1A', borderTop:'1px solid #1A2540', fontFamily:'"Inter",system-ui,sans-serif' }}>

      {/* Stats bar */}
      <div style={{ background:'#0F1629', borderBottom:'1px solid #1A2540' }}>
        <div className="stats-bar">
          {STATS.map(s => (
            <div key={s.label} style={{ background:'#0F1629', padding:'24px 20px', textAlign:'center', borderRight:'1px solid #1A2540' }}>
              <div style={{ fontSize:'clamp(20px,4vw,28px)', fontWeight:900, color:'#C9A84C', fontFamily:'monospace', marginBottom:'4px' }}>{s.val}</div>
              <div style={{ fontSize:'10px', color:'#4A5568', letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'48px 20px 32px' }}>

        {/* Top: brand + links */}
        <div className="footer-main">
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
              <div style={{ width:'28px', height:'28px', background:'#C9A84C', borderRadius:'3px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:'11px', fontWeight:900, color:'#0A0E1A' }}>A</span>
              </div>
              <div>
                <div style={{ fontSize:'11px', fontWeight:800, color:'#E8EDF5', letterSpacing:'0.08em' }}>AFRIBIZCONNECT</div>
                <div style={{ fontSize:'9px', color:'#4A5568', letterSpacing:'0.15em' }}>AFRICA'S TRADE OS</div>
              </div>
            </div>
            <p style={{ fontSize:'12px', color:'#4A5568', lineHeight:1.7, marginBottom:'20px', maxWidth:'280px' }}>
              Institutional-grade supplier sourcing, investment deal flow, freight intelligence, and trade finance — unified for cross-border business across 54 African markets.
            </p>

            {/* Newsletter */}
            <div style={{ marginBottom:'20px' }}>
              <div style={{ fontSize:'10px', color:'#E8EDF5', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'10px' }}>Weekly trade briefing</div>
              {subbed ? (
                <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'12px', color:'#00D4AA' }}>
                  <CheckCircle2 style={{ width:'14px', height:'14px' }} /> Subscribed!
                </div>
              ) : (
                <div style={{ display:'flex', gap:'8px' }}>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{ flex:1, padding:'9px 12px', background:'#0F1629', border:'1px solid #1A2540', borderRadius:'5px', fontSize:'12px', color:'#E8EDF5', outline:'none', fontFamily:'inherit', minWidth:0 }} />
                  <button onClick={() => { if(email.includes('@')) setSubbed(true) }}
                    style={{ padding:'9px 12px', background:'#C9A84C', border:'none', borderRadius:'5px', cursor:'pointer', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <ArrowRight style={{ width:'14px', height:'14px', color:'#0A0E1A' }} />
                  </button>
                </div>
              )}
            </div>

            {/* Social */}
            <div style={{ display:'flex', gap:'10px' }}>
              {[{icon:'in',href:'https://linkedin.com'},{icon:'𝕏',href:'https://x.com'},{icon:'W',href:'https://wa.me'}].map(s => (
                <a key={s.icon} href={s.href} target="_blank" rel="noopener"
                  style={{ width:'30px', height:'30px', background:'#1A2540', borderRadius:'5px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:800, color:'#4A5568', textDecoration:'none' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize:'10px', color:'#E8EDF5', fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'16px' }}>{title}</div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'8px' }}>
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ fontSize:'12px', color:'#4A5568', textDecoration:'none' }}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Markets */}
        <div style={{ borderTop:'1px solid #1A2540', borderBottom:'1px solid #1A2540', padding:'20px 0', margin:'32px 0' }}>
          <div style={{ fontSize:'10px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'monospace', marginBottom:'12px' }}>Active markets</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
            {[['🇳🇬','Nigeria'],['🇰🇪','Kenya'],['🇬🇭','Ghana'],['🇿🇦','S. Africa'],['🇪🇬','Egypt'],['🇪🇹','Ethiopia'],['🇹🇿','Tanzania'],['🇸🇳','Senegal'],['🇦🇪','UAE'],['🇨🇳','China'],['🇹🇷','Turkey'],['🇮🇳','India']].map(([flag,name]) => (
              <div key={name} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'4px 10px', background:'#0F1629', border:'1px solid #1A2540', borderRadius:'20px' }}>
                <span style={{ fontSize:'12px' }}>{flag}</span>
                <span style={{ fontSize:'10px', color:'#4A5568' }}>{name}</span>
              </div>
            ))}
            <div style={{ display:'flex', alignItems:'center', padding:'4px 10px', background:'#C9A84C10', border:'1px solid #C9A84C33', borderRadius:'20px' }}>
              <span style={{ fontSize:'10px', color:'#C9A84C', fontWeight:700 }}>+42 more →</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
          <span style={{ fontSize:'10px', color:'#4A5568', fontFamily:'monospace' }}>© 2025 AfriBizConnect Ltd. DIFC, Dubai, UAE</span>
          <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
            <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#00D4AA', display:'inline-block', animation:'pulse 2s infinite' }} />
            <span style={{ fontSize:'10px', color:'#00D4AA', fontFamily:'monospace' }}>All systems operational</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }

        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-main {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 0;
        }

        @media (max-width: 900px) {
          .footer-main {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 600px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .footer-main { grid-template-columns: 1fr 1fr; gap: 24px; }
        }

        @media (max-width: 400px) {
          .footer-main { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  )
}
