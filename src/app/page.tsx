'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'

const TICKER_ITEMS = [
  { pair: 'USD/NGN', val: '1,587.40', chg: '+0.32%', up: true },
  { pair: 'USD/KES', val: '129.85',   chg: '+0.12%', up: true },
  { pair: 'USD/GHS', val: '15.62',    chg: '-0.08%', up: false },
  { pair: 'USD/ZAR', val: '18.94',    chg: '+0.41%', up: true },
  { pair: 'USD/EGP', val: '48.72',    chg: '-0.15%', up: false },
  { pair: 'CRUDE/B', val: '$78.42',   chg: '+1.2%',  up: true },
  { pair: 'COCOA',   val: '$6,842',   chg: '-0.9%',  up: false },
  { pair: 'PALM/OIL',val: '$987',     chg: '+0.6%',  up: true },
  { pair: 'AFCFTA',  val: 'ACTIVE',   chg: '54 MKT', up: true },
  { pair: 'SESAME',  val: '$1,240/T', chg: '+2.1%',  up: true },
  { pair: 'COTTON',  val: '$0.847/LB',chg: '-0.4%',  up: false },
  { pair: 'USD/MAD', val: '10.04',    chg: '+0.05%', up: true },
]

const STATS = [
  { label: 'Verified suppliers', val: '3,200+', sub: 'across 54 markets' },
  { label: 'Deal flow (2025)',   val: '$2.8B',  sub: 'facilitated' },
  { label: 'Active investors',  val: '480+',   sub: 'institutional & PE' },
  { label: 'Avg. response',     val: '<24h',   sub: 'to RFQs' },
]

const FEATURES = [
  {
    tag: '01 / SOURCING',
    title: 'Global supplier network',
    body: 'Issue RFQs to 3,200+ verified manufacturers in UAE, China, Turkey, India, Germany. Quotes within 24 hours. No intermediaries.',
    href: '/sourcing',
    metric: '3,200+', metricLabel: 'verified suppliers',
  },
  {
    tag: '02 / INVEST',
    title: 'Institutional deal flow',
    body: '$2.8B in equity, debt, and trade finance opportunities across 54 African markets. PE-grade due diligence and documentation.',
    href: '/invest',
    metric: '$46M+', metricLabel: 'active deal flow',
  },
  {
    tag: '03 / LOGISTICS',
    title: 'Freight intelligence',
    body: 'Real-time quotes from DHL, Maersk, Emirates SkyCargo, MSC, and FedEx. Air, FCL, LCL — routed and tracked from origin to door.',
    href: '/logistics',
    metric: '8', metricLabel: 'carrier partners',
  },
  {
    tag: '04 / TRADE FINANCE',
    title: 'Cross-border capital',
    body: 'Letters of credit, invoice factoring, AfCFTA-preferential financing, and escrow for first trades. Bank-grade instruments, startup speed.',
    href: '/trade',
    metric: '48h', metricLabel: 'approval time',
  },
]

export default function HomePage() {
  const [time, setTime] = useState('')
  const [blink, setBlink] = useState(true)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date()
      setTime(d.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Africa/Lagos' }))
      setBlink(b => !b)
    }, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background: '#0A0E1A', minHeight: '100vh', fontFamily: '"Inter", system-ui, sans-serif', color: '#E8EDF5' }}>

      {/* TICKER TAPE */}
      <div style={{ background: '#0F1629', borderBottom: '1px solid #1A2540', overflow: 'hidden', height: '36px', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 0, animation: 'ticker 40s linear infinite', whiteSpace: 'nowrap' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0 24px', borderRight: '1px solid #1A2540', fontSize: '11px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.05em' }}>
              <span style={{ color: '#4A5568' }}>{item.pair}</span>
              <span style={{ color: '#E8EDF5', fontWeight: 600 }}>{item.val}</span>
              <span style={{ color: item.up ? '#00D4AA' : '#FF4D6D' }}>{item.chg}</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: '64px', borderBottom: '1px solid #1A2540' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '28px', height: '28px', background: '#C9A84C', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#0A0E1A' }}>A</span>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#E8EDF5' }}>AfriBizConnect</span>
          <span style={{ fontSize: '9px', color: '#C9A84C', fontFamily: 'monospace', border: '1px solid #C9A84C33', padding: '2px 6px', borderRadius: '2px', letterSpacing: '0.15em' }}>PRO</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Platform', 'Markets', 'Invest', 'Pricing'].map(item => (
            <a key={item} href="#" style={{ fontSize: '12px', color: '#4A5568', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500 }}>{item}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#4A5568' }}>
            {blink ? '●' : '○'} {time} WAT
          </div>
          <Link href="/login" style={{ fontSize: '12px', color: '#C9A84C', textDecoration: 'none', letterSpacing: '0.05em', fontWeight: 600, padding: '8px 20px', border: '1px solid #C9A84C44', borderRadius: '4px' }}>
            Sign in
          </Link>
          <Link href="/register" style={{ fontSize: '12px', color: '#0A0E1A', background: '#C9A84C', textDecoration: 'none', letterSpacing: '0.05em', fontWeight: 700, padding: '8px 20px', borderRadius: '4px' }}>
            Get access
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '100px 48px 80px', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Grid background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#1A254008 1px, transparent 1px), linear-gradient(90deg, #1A254008 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', background: '#C9A84C10', border: '1px solid #C9A84C33', borderRadius: '2px', padding: '6px 14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Live — Africa trade infrastructure</span>
          </div>
          <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>

          <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '24px', maxWidth: '900px' }}>
            The operating system<br />
            <span style={{ color: '#C9A84C' }}>for African trade.</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#4A5568', lineHeight: 1.6, maxWidth: '560px', marginBottom: '48px', fontWeight: 400 }}>
            Institutional-grade supplier sourcing, investment deal flow, freight intelligence, and trade finance — unified for cross-border business across 54 African markets.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '80px' }}>
            <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: '#C9A84C', color: '#0A0E1A', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em' }}>
              Request access →
            </Link>
            <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: 'transparent', color: '#E8EDF5', border: '1px solid #1A2540', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
              View platform
            </Link>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#1A2540' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: '#0F1629', padding: '28px 32px' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#C9A84C', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '-0.02em', marginBottom: '6px' }}>{s.val}</div>
                <div style={{ fontSize: '11px', color: '#E8EDF5', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontSize: '11px', color: '#4A5568' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '48px', borderBottom: '1px solid #1A2540', paddingBottom: '24px' }}>
          <span style={{ fontSize: '11px', color: '#4A5568', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Platform capabilities</span>
          <div style={{ flex: 1, height: '1px', background: '#1A2540' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: '#1A2540' }}>
          {FEATURES.map(f => (
            <Link key={f.tag} href={f.href} style={{ display: 'block', background: '#0F1629', padding: '40px', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#141B2D')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0F1629')}>
              <div style={{ fontSize: '10px', color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.2em', marginBottom: '20px' }}>{f.tag}</div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#E8EDF5', marginBottom: '12px', letterSpacing: '-0.02em' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: 1.6, marginBottom: '32px' }}>{f.body}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', borderTop: '1px solid #1A2540', paddingTop: '24px' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#00D4AA', fontFamily: 'monospace' }}>{f.metric}</span>
                <span style={{ fontSize: '11px', color: '#4A5568', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.metricLabel}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARKET DATA STRIP */}
      <section style={{ background: '#0F1629', borderTop: '1px solid #1A2540', borderBottom: '1px solid #1A2540', padding: '48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '32px' }}>
            <span style={{ fontSize: '10px', color: '#4A5568', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace' }}>Live African FX · Commodity prices</span>
            <span style={{ fontSize: '10px', color: '#00D4AA', fontFamily: 'monospace' }}>● LIVE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1px', background: '#1A2540' }}>
            {TICKER_ITEMS.slice(0, 6).map(item => (
              <div key={item.pair} style={{ background: '#0A0E1A', padding: '20px 16px' }}>
                <div style={{ fontSize: '10px', color: '#4A5568', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '8px' }}>{item.pair}</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#E8EDF5', fontFamily: 'monospace', marginBottom: '4px' }}>{item.val}</div>
                <div style={{ fontSize: '11px', color: item.up ? '#00D4AA' : '#FF4D6D', fontFamily: 'monospace' }}>{item.chg}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS STRIP */}
<section style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px 80px' }}>
  <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:'32px' }}>
    <div style={{ display:'flex', alignItems:'baseline', gap:'16px' }}>
      <span style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'monospace' }}>AfriTrade Insights</span>
      <div style={{ height:'1px', width:'60px', background:'#1A2540' }} />
    </div>
    <a href="/blog" style={{ fontSize:'12px', color:'#C9A84C', textDecoration:'none', fontWeight:600, letterSpacing:'0.05em' }}>View all articles →</a>
  </div>

  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'#1A2540' }}>
    {[
      { slug:'afcfta-complete-guide-2025',    title:'AfCFTA 2025: Complete Guide for Importers & Exporters',       cat:'AfCFTA',        time:'10 min' },
      { slug:'letter-of-credit-guide',        title:'Letter of Credit in African Trade: Practical Guide',           cat:'Trade Finance',  time:'8 min' },
      { slug:'how-to-verify-suppliers-china', title:'How to Verify Chinese Suppliers Before Sending Money',         cat:'Sourcing',       time:'6 min' },
    ].map(p => (
      <a key={p.slug} href={`/blog/${p.slug}`} style={{ display:'block', background:'#0F1629', padding:'28px', textDecoration:'none', transition:'background 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.background='#141B2D')}
        onMouseLeave={e => (e.currentTarget.style.background='#0F1629')}>
        <div style={{ fontSize:'10px', color:'#C9A84C', fontFamily:'monospace', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'12px' }}>{p.cat} · {p.time} read</div>
        <h3 style={{ fontSize:'15px', fontWeight:700, color:'#E8EDF5', lineHeight:1.4, marginBottom:'16px', letterSpacing:'-0.01em' }}>{p.title}</h3>
        <span style={{ fontSize:'11px', color:'#4A5568', letterSpacing:'0.05em' }}>Read article →</span>
      </a>
    ))}
  </div>
</section>

      {/* CTA */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 48px' }}>
        <div style={{ background: '#0F1629', border: '1px solid #1A2540', padding: '80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, #C9A84C08 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '10px', color: '#C9A84C', fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>Limited access · Institutional & verified businesses only</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px', maxWidth: '600px' }}>
              Built for those who move<br /><span style={{ color: '#C9A84C' }}>serious capital across Africa.</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#4A5568', marginBottom: '40px', maxWidth: '480px', lineHeight: 1.6 }}>
              Join 480+ investors, 3,200+ suppliers, and 95+ logistics partners operating on Africa's most trusted trade infrastructure.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/register" style={{ padding: '14px 36px', background: '#C9A84C', color: '#0A0E1A', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em', display: 'inline-block' }}>
                Apply for access →
              </Link>
              <Link href="/pricing" style={{ padding: '14px 36px', background: 'transparent', color: '#E8EDF5', border: '1px solid #1A2540', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'inline-block' }}>
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

     <Footer />
    </div>
    
  )
}
