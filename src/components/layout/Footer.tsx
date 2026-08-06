'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'

const LINKS = {
  Platform: [
    { label: 'Supplier Marketplace', href: '/marketplace' },
    { label: 'Investment Deals',     href: '/invest' },
    { label: 'Sourcing & RFQs',      href: '/sourcing' },
    { label: 'Logistics Hub',         href: '/logistics' },
    { label: 'Trade Finance',         href: '/trade' },
    { label: 'Market Data',           href: '/market-data' },
    { label: 'Trade Intelligence',    href: '/intelligence' },
    { label: 'Price Alerts',          href: '/alerts' },
    { label: 'Developer API',         href: '/developer' },
  ],
  Company: [
    { label: 'About AfriBizConnect', href: '/about' },
    { label: 'How it works',          href: '/about#how' },
    { label: 'Pricing',               href: '/pricing' },
    { label: 'Careers',               href: '/careers' },
    { label: 'News & Press',          href: '/news' },
    { label: 'Contact us',            href: '/contact' },
    { label: 'Admin portal',          href: '/admin' },
  ],
  Resources: [
    { label: 'AfriTrade Insights',   href: '/blog' },
    { label: 'AfCFTA Guide 2025',    href: '/blog/afcfta-complete-guide-2025' },
    { label: 'Incoterms Explained',  href: '/blog/incoterms-2020-africa-guide' },
    { label: 'LC Practical Guide',   href: '/blog/letter-of-credit-guide' },
    { label: 'Nigeria Duty Guide',   href: '/blog/nigeria-import-duties-2025' },
    { label: 'Supplier Verification',href: '/blog/how-to-verify-suppliers-china' },
    { label: 'Trade Routes 2025',    href: '/blog/african-trade-routes-2025' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy',    href: '/cookies' },
    { label: 'Refund Policy',    href: '/terms#refund' },
    { label: 'Data Processing',  href: '/privacy#dpa' },
    { label: 'Regulatory',       href: '/about#regulatory' },
  ],
}

const MARKETS = [
  { code:'NG', name:'Nigeria',       flag:'🇳🇬' },
  { code:'KE', name:'Kenya',         flag:'🇰🇪' },
  { code:'GH', name:'Ghana',         flag:'🇬🇭' },
  { code:'ZA', name:'South Africa',  flag:'🇿🇦' },
  { code:'EG', name:'Egypt',         flag:'🇪🇬' },
  { code:'ET', name:'Ethiopia',      flag:'🇪🇹' },
  { code:'TZ', name:'Tanzania',      flag:'🇹🇿' },
  { code:'SN', name:'Senegal',       flag:'🇸🇳' },
  { code:'AE', name:'UAE',           flag:'🇦🇪' },
  { code:'CN', name:'China',         flag:'🇨🇳' },
  { code:'TR', name:'Turkey',        flag:'🇹🇷' },
  { code:'IN', name:'India',         flag:'🇮🇳' },
]

const STATS = [
  { val:'3,200+', label:'Verified suppliers' },
  { val:'54',     label:'African markets' },
  { val:'$2.8B',  label:'Trade facilitated' },
  { val:'480+',   label:'Active investors' },
]

export default function Footer() {
  const [email, setEmail]   = useState('')
  const [subbed, setSubbed] = useState(false)
  const [loading, setLoading] = useState(false)

  async function subscribe() {
    if (!email || !email.includes('@')) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSubbed(true)
    setLoading(false)
    setEmail('')
  }

  return (
    <footer style={{ background:'#0A0E1A', borderTop:'1px solid #1A2540', fontFamily:'"Inter",system-ui,sans-serif' }}>

      {/* Stats bar */}
      <div style={{ borderBottom:'1px solid #1A2540', background:'#0F1629' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'32px 48px', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'#1A2540' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background:'#0F1629', padding:'24px 32px', textAlign:'center' }}>
              <div style={{ fontSize:'28px', fontWeight:900, color:'#C9A84C', fontFamily:'monospace', letterSpacing:'-0.02em', marginBottom:'4px' }}>{s.val}</div>
              <div style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.08em', textTransform:'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'64px 48px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.8fr 1fr 1fr 1fr 1fr', gap:'48px', marginBottom:'64px' }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
              <div style={{ width:'32px', height:'32px', background:'#C9A84C', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:'14px', fontWeight:900, color:'#0A0E1A' }}>A</span>
              </div>
              <div>
                <div style={{ fontSize:'13px', fontWeight:800, color:'#E8EDF5', letterSpacing:'0.08em' }}>AFRIBIZCONNECT</div>
                <div style={{ fontSize:'9px', color:'#4A5568', letterSpacing:'0.15em' }}>AFRICA'S TRADE OS</div>
              </div>
            </div>

            <p style={{ fontSize:'13px', color:'#4A5568', lineHeight:1.7, marginBottom:'24px', maxWidth:'280px' }}>
              Institutional-grade supplier sourcing, investment deal flow, freight intelligence, and trade finance — unified for cross-border business across 54 African markets.
            </p>

            {/* Newsletter */}
            <div style={{ marginBottom:'28px' }}>
              <div style={{ fontSize:'11px', color:'#E8EDF5', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'12px' }}>Weekly trade briefing</div>
              {subbed ? (
                <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'#00D4AA' }}>
                  <CheckCircle2 style={{ width:'16px', height:'16px' }} />
                  Subscribed! Check your inbox.
                </div>
              ) : (
                <div style={{ display:'flex', gap:'8px' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && subscribe()}
                    placeholder="your@email.com"
                    style={{ flex:1, padding:'10px 14px', background:'#0F1629', border:'1px solid #1A2540', borderRadius:'6px', fontSize:'12px', color:'#E8EDF5', outline:'none', fontFamily:'inherit' }} />
                  <button
                    onClick={subscribe}
                    disabled={loading}
                    style={{ padding:'10px 14px', background:'#C9A84C', border:'none', borderRadius:'6px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {loading
                      ? <Loader2 style={{ width:'14px', height:'14px', color:'#0A0E1A', animation:'spin 1s linear infinite' }} />
                      : <ArrowRight style={{ width:'14px', height:'14px', color:'#0A0E1A' }} />}
                  </button>
                </div>
              )}
              <div style={{ fontSize:'10px', color:'#4A5568', marginTop:'8px' }}>AfCFTA updates, commodity prices, trade opportunities. No spam.</div>
            </div>

            {/* Social */}
            <div style={{ display:'flex', gap:'12px' }}>
              {[
                { label:'LinkedIn', href:'https://linkedin.com/company/afribizconnect', icon:'in' },
                { label:'Twitter',  href:'https://twitter.com/afribizconnect',          icon:'𝕏' },
                { label:'WhatsApp', href:'https://wa.me/971500000000',                  icon:'W' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener"
                  style={{ width:'32px', height:'32px', background:'#1A2540', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:800, color:'#4A5568', textDecoration:'none', transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#C9A84C20'; e.currentTarget.style.color='#C9A84C' }}
                  onMouseLeave={e => { e.currentTarget.style.background='#1A2540'; e.currentTarget.style.color='#4A5568' }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize:'10px', color:'#E8EDF5', fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'20px' }}>{title}</div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'10px' }}>
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href}
                      style={{ fontSize:'12px', color:'#4A5568', textDecoration:'none', transition:'color 0.15s', letterSpacing:'0.01em' }}
                      onMouseEnter={e => (e.currentTarget.style.color='#C9A84C')}
                      onMouseLeave={e => (e.currentTarget.style.color='#4A5568')}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Markets strip */}
        <div style={{ borderTop:'1px solid #1A2540', borderBottom:'1px solid #1A2540', padding:'24px 0', marginBottom:'32px' }}>
          <div style={{ fontSize:'10px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'monospace', marginBottom:'16px' }}>Active markets</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
            {MARKETS.map(m => (
              <div key={m.code}
                style={{ display:'flex', alignItems:'center', gap:'6px', padding:'5px 12px', background:'#0F1629', border:'1px solid #1A2540', borderRadius:'20px' }}>
                <span style={{ fontSize:'13px' }}>{m.flag}</span>
                <span style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.05em' }}>{m.name}</span>
              </div>
            ))}
            <div style={{ display:'flex', alignItems:'center', padding:'5px 12px', background:'#C9A84C10', border:'1px solid #C9A84C33', borderRadius:'20px' }}>
              <span style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.05em' }}>+42 more →</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'20px', flexWrap:'wrap' }}>
            <span style={{ fontSize:'11px', color:'#4A5568', fontFamily:'monospace' }}>© 2025 AfriBizConnect Ltd.</span>
            <span style={{ fontSize:'11px', color:'#1A2540' }}>|</span>
            <span style={{ fontSize:'11px', color:'#4A5568' }}>DIFC, Dubai, UAE</span>
            <span style={{ fontSize:'11px', color:'#1A2540' }}>|</span>
            <span style={{ fontSize:'11px', color:'#4A5568' }}>Registered in England & Wales No. 12345678</span>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#00D4AA', display:'inline-block', animation:'pulse 2s infinite' }} />
              <span style={{ fontSize:'11px', color:'#00D4AA', fontFamily:'monospace' }}>All systems operational</span>
            </div>
            <span style={{ fontSize:'11px', color:'#1A2540' }}>|</span>
            <div style={{ display:'flex', gap:'16px' }}>
              {['Privacy', 'Terms', 'Cookies'].map(l => (
                <Link key={l} href={`/${l.toLowerCase()}`}
                  style={{ fontSize:'11px', color:'#4A5568', textDecoration:'none', letterSpacing:'0.05em' }}
                  onMouseEnter={e => (e.currentTarget.style.color='#C9A84C')}
                  onMouseLeave={e => (e.currentTarget.style.color='#4A5568')}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ marginTop:'32px', padding:'24px', background:'#0F1629', border:'1px solid #1A2540', borderRadius:'8px', textAlign:'center' }}>
          <span style={{ fontSize:'12px', color:'#1A2540', letterSpacing:'0.3em', textTransform:'uppercase', fontFamily:'monospace' }}>
            ————— BUILT FOR THOSE WHO MOVE SERIOUS CAPITAL ACROSS AFRICA —————
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </footer>
  )
}