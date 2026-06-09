'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Globe2, ShieldCheck, TrendingUp, Truck,
  BarChart3, Star, BadgeCheck, Zap, Lock, Award,
  ChevronRight, Menu, X, ArrowUpRight
} from 'lucide-react'

/* ─── STYLES INJECTED ────────────────────────────── */
const CSS = `
@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
@keyframes float1 { 0%,100%{transform:translateY(0px) rotate(-2deg)} 50%{transform:translateY(-16px) rotate(2deg)} }
@keyframes float2 { 0%,100%{transform:translateY(0px) rotate(1deg)} 50%{transform:translateY(-20px) rotate(-1deg)} }
@keyframes float3 { 0%,100%{transform:translateY(0px) rotate(-1deg)} 60%{transform:translateY(-12px) rotate(3deg)} }
@keyframes glow   { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes scaleIn{ from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
@keyframes dash   { to{stroke-dashoffset:0} }
@keyframes pulse2 { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.3);opacity:0.6} }
.animate-ticker { animation: ticker 35s linear infinite; }
.float1 { animation: float1 6s ease-in-out infinite; }
.float2 { animation: float2 7s ease-in-out infinite 0.5s; }
.float3 { animation: float3 5.5s ease-in-out infinite 1s; }
.glow-pulse { animation: glow 3s ease-in-out infinite; }
.fade-up { animation: fadeUp 0.7s ease forwards; }
.scale-in { animation: scaleIn 0.5s ease forwards; }
.card-3d { transition: transform 0.3s ease, box-shadow 0.3s ease; transform-style: preserve-3d; }
.card-3d:hover { transform: perspective(800px) rotateX(-4deg) rotateY(4deg) translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.05); }
.feature-card:hover .feature-arrow { opacity:1; transform:translateX(4px); }
.feature-arrow { opacity:0; transition: opacity 0.2s, transform 0.2s; }
`

const TICKER = [
  '🇳🇬 Nigeria · Electronics · $2.4M closed',
  '🇦🇪 UAE → Ghana · FMCG · Supplier verified',
  '🇰🇪 Kenya · Logistics Hub · Series A $8M',
  '🇲🇦 Morocco · Auto Parts · 500MT shipped',
  '🇪🇬 Egypt → Saudi · Textiles · LC agreed',
  '🇿🇦 South Africa · PE · $25M deployed',
  '🇬🇭 Ghana · Cashew · $800K matched',
  '🇪🇹 Ethiopia · Textiles · JV signed',
  '🇸🇳 Senegal · Groundnuts · 800MT exported',
  '🇷🇼 Rwanda · Tourism · $6M investment closed',
]

const NAV = [
  { label:'Marketplace', href:'/marketplace' },
  { label:'Invest',      href:'/invest' },
  { label:'Logistics',   href:'/logistics' },
  { label:'Sourcing',    href:'/sourcing' },
  { label:'Market Data', href:'/market' },
  { label:'Pricing',     href:'/pricing' },
]

const FEATURES = [
  { icon:ShieldCheck, title:'Verified trust scores',  desc:'KYB-screened every business scored 0–100',color:'#10b981', bg:'rgba(16,185,129,0.12)',  border:'rgba(16,185,129,0.25)' },
  { icon:Globe2,      title:'Global supplier search', desc:'UAE, China, Turkey, India — 3,200+ verified',color:'#60a5fa',bg:'rgba(96,165,250,0.12)',  border:'rgba(96,165,250,0.25)'  },
  { icon:TrendingUp,  title:'Investment network',     desc:'Equity, debt & trade finance deal flow',     color:'#c084fc',bg:'rgba(192,132,252,0.12)', border:'rgba(192,132,252,0.25)' },
  { icon:Truck,       title:'Freight & logistics',    desc:'Quotes, tracking, customs in 54 countries',  color:'#fbbf24',bg:'rgba(251,191,36,0.12)',  border:'rgba(251,191,36,0.25)'  },
  { icon:BarChart3,   title:'Live market data',       desc:'FX rates, commodities, African business news',color:'#34d399',bg:'rgba(52,211,153,0.12)',  border:'rgba(52,211,153,0.25)'  },
  { icon:Zap,         title:'AI trade assistant',     desc:'Duties, Incoterms, AfCFTA instant help',      color:'#f87171',bg:'rgba(248,113,113,0.12)', border:'rgba(248,113,113,0.25)' },
]

const TESTIMONIALS = [
  { quote:'Cut our sourcing time by 70%. Closed our first LC with a UAE partner in under 2 weeks.', name:'Adaeze Okonkwo', role:'CEO, Lagos Prime Imports', flag:'🇳🇬', initials:'AO', color:'#10b981' },
  { quote:'Deployed $12M into three African deals in 4 months. The verified profiles made it possible.', name:'Khalid Al-Rashidi', role:'Partner, Gulf Africa Fund', flag:'🇦🇪', initials:'KR', color:'#60a5fa' },
  { quote:'Our export inquiries tripled after the verified badge. Genuinely transformative for our business.', name:'Amara Diallo', role:'Director, Dakar Trade Hub', flag:'🇸🇳', initials:'AD', color:'#c084fc' },
]

const FOOTER = {
  Platform:  [{ label:'Marketplace',href:'/marketplace'},{ label:'Invest',href:'/invest'},{ label:'Sourcing',href:'/sourcing'},{ label:'Logistics',href:'/logistics'},{ label:'Market Data',href:'/market'},{ label:'AI Assistant',href:'/assistant'},{ label:'Trade Hub',href:'/trade'},{ label:'Pricing',href:'/pricing'}],
  Company:   [{ label:'About us',href:'/about'},{ label:'Careers',href:'/careers'},{ label:'News',href:'/news'},{ label:'Contact',href:'/contact'},{ label:'Partners',href:'/about'},{ label:'Press kit',href:'/about'}],
  Resources: [{ label:'Trade guides',href:'/news'},{ label:'Webinars',href:'/news'},{ label:'Podcast',href:'/news'},{ label:'Newsletter',href:'/contact'},{ label:'Help centre',href:'/contact'},{ label:'API docs',href:'/about'}],
  Legal:     [{ label:'Privacy policy',href:'/privacy'},{ label:'Terms of service',href:'/terms'},{ label:'Cookie policy',href:'/cookies'},{ label:'Compliance',href:'/about'}],
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [count, setCount] = useState({ b:0, m:0, s:0, c:0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Animate counters
  useEffect(() => {
    const targets = { b:12400, m:2800, s:3200, c:54 }
    const duration = 2000
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount({
        b: Math.floor(targets.b * ease),
        m: Math.floor(targets.m * ease),
        s: Math.floor(targets.s * ease),
        c: Math.floor(targets.c * ease),
      })
      if (progress < 1) requestAnimationFrame(tick)
    }
    const timer = setTimeout(() => requestAnimationFrame(tick), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ fontFamily:"'Geist Sans',system-ui,sans-serif", backgroundColor:'#060d1f', color:'#f8fafc', overflowX:'hidden' }}>

        {/* ══ HEADER ══ */}
        <header className="sticky top-0 z-50 transition-all duration-300"
          style={{ backgroundColor: scrolled ? 'rgba(6,13,31,0.95)' : 'transparent', backdropFilter:'blur(20px)', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#3b82f6,#1e40af)' }}><Globe2 className="h-4 w-4 text-white" /></div>
              <span className="font-black text-[15px] text-white">AfriBiz<span style={{ color:'#fbbf24' }}>Connect</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-0.5 flex-1">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} className="text-sm font-medium px-3.5 py-2 rounded-lg transition-colors hover:bg-white/10" style={{ color:'rgba(148,163,184,0.8)' }}>{n.label}</Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-3 ml-auto">
              <Link href="/login" className="text-sm font-semibold transition-colors hover:text-white" style={{ color:'rgba(148,163,184,0.7)' }}>Sign in</Link>
              <Link href="/register" className="text-sm font-black px-5 py-2.5 rounded-xl text-white flex items-center gap-1.5" style={{ background:'linear-gradient(135deg,#3b82f6,#1e40af)', boxShadow:'0 4px 20px rgba(59,130,246,0.4)' }}>
                Get started <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <button className="lg:hidden ml-auto p-2 rounded-lg hover:bg-white/10 text-white" onClick={() => setMobile(!mobile)}>
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {mobile && (
            <div className="lg:hidden px-5 pb-4 space-y-1 border-t" style={{ borderColor:'rgba(255,255,255,0.06)', backgroundColor:'rgba(6,13,31,0.98)' }}>
              {NAV.map(n => <Link key={n.href} href={n.href} className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-white/10" style={{ color:'rgba(148,163,184,0.8)' }}>{n.label}</Link>)}
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="flex-1 text-center py-2.5 text-sm font-semibold rounded-xl border text-white" style={{ borderColor:'rgba(255,255,255,0.15)' }}>Sign in</Link>
                <Link href="/register" className="flex-1 text-center py-2.5 text-sm font-black rounded-xl text-white" style={{ background:'linear-gradient(135deg,#3b82f6,#1e40af)' }}>Get started</Link>
              </div>
            </div>
          )}
        </header>

        {/* ══ LIVE TICKER ══ */}
        <div className="overflow-hidden border-b" style={{ background:'rgba(255,255,255,0.03)', borderColor:'rgba(255,255,255,0.06)', height:36 }}>
          <div className="h-full flex items-center">
            <div className="shrink-0 px-4 h-full flex items-center" style={{ background:'linear-gradient(135deg,#3b82f6,#1e40af)' }}>
              <span className="text-[9px] font-black tracking-[0.2em] text-white uppercase">Live</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex animate-ticker whitespace-nowrap">
                {[...TICKER,...TICKER].map((t,i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-8 text-[11px]" style={{ color:'rgba(148,163,184,0.6)' }}>
                    <span className="h-1 w-1 rounded-full bg-emerald-400 inline-block shrink-0" style={{ animation:'pulse2 2s ease-in-out infinite' }} />{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ HERO — DARK PREMIUM 3D ══ */}
        <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight:'100vh', background:'radial-gradient(ellipse 120% 80% at 50% -10%,rgba(59,130,246,0.2) 0%,transparent 60%), radial-gradient(ellipse 80% 60% at 80% 60%,rgba(139,92,246,0.12) 0%,transparent 60%), #060d1f' }}>

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(to right,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'64px 64px' }} />

          {/* Glow blobs */}
          <div className="absolute pointer-events-none glow-pulse" style={{ top:'15%',left:'5%',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)',filter:'blur(40px)' }} />
          <div className="absolute pointer-events-none glow-pulse" style={{ top:'40%',right:'0%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)',filter:'blur(50px)',animationDelay:'1.5s' }} />
          <div className="absolute pointer-events-none glow-pulse" style={{ bottom:'10%',left:'30%',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)',filter:'blur(60px)',animationDelay:'3s' }} />

          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-20 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* LEFT */}
              <div className="fade-up">
                {/* Pill */}
                <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-8 border" style={{ borderColor:'rgba(59,130,246,0.3)', background:'rgba(59,130,246,0.08)' }}>
                  <span className="h-2 w-2 rounded-full bg-blue-400" style={{ animation:'pulse2 2s ease-in-out infinite' }} />
                  <span className="text-xs font-bold text-blue-300">Africa's #1 B2B Trade Platform</span>
                  <ChevronRight className="h-3.5 w-3.5 text-blue-400 opacity-60" />
                </div>

                <h1 className="font-black tracking-tighter leading-[0.9] mb-7 text-white" style={{ fontSize:'clamp(3rem,6vw,5rem)' }}>
                  Where African<br />trade meets<br />
                  <span style={{ background:'linear-gradient(135deg,#60a5fa 0%,#a78bfa 40%,#34d399 80%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    global capital.
                  </span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-md" style={{ color:'rgba(148,163,184,0.8)' }}>
                  Connect with verified global suppliers, logistics providers, trade finance, and investors — all verified, all trusted, all in one place.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <Link href="/register" className="flex items-center gap-2 text-sm font-black px-7 py-4 rounded-2xl text-white transition-all hover:scale-105"
                    style={{ background:'linear-gradient(135deg,#3b82f6,#1e40af)', boxShadow:'0 8px 32px rgba(59,130,246,0.45)' }}>
                    Start free today <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/marketplace" className="flex items-center gap-2 text-sm font-bold px-7 py-4 rounded-2xl transition-all hover:bg-white/10"
                    style={{ border:'1px solid rgba(255,255,255,0.12)', color:'rgba(203,213,225,0.8)' }}>
                    Browse suppliers <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap gap-5 text-xs" style={{ color:'rgba(100,116,139,0.8)' }}>
                  {[{ icon:Lock, label:'Bank-grade security' },{ icon:ShieldCheck, label:'KYB verified' },{ icon:Award, label:'ISO 27001' }].map(({ icon:Icon, label }) => (
                    <span key={label} className="flex items-center gap-1.5 font-medium"><Icon className="h-3.5 w-3.5 text-emerald-500" />{label}</span>
                  ))}
                </div>
              </div>

              {/* RIGHT — 3D floating cards */}
              <div className="relative h-[520px] hidden lg:block" style={{ perspective:'1200px' }}>

                {/* Central card — main dashboard preview */}
                <div className="absolute card-3d rounded-3xl overflow-hidden float1"
                  style={{ top:'10%', left:'5%', width:'75%', background:'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.04) 100%)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(20px)', boxShadow:'0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
                    <div className="flex gap-1.5">{['#f87171','#fbbf24','#34d399'].map(c => <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor:c }} />)}</div>
                    <div className="flex-1 mx-2 bg-white/5 rounded-lg px-3 py-0.5 text-[10px]" style={{ color:'rgba(148,163,184,0.4)' }}>afribizconnect.vercel.app/dashboard</div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      {[{l:'Active RFQs',v:'8',c:'#60a5fa'},{l:'Trust Score',v:'94',c:'#34d399'},{l:'Deal Flow',v:'$46M',c:'#c084fc'},{l:'Shipments',v:'12',c:'#fbbf24'}].map(m => (
                        <div key={m.l} className="rounded-xl p-3" style={{ background:`${m.c}15`, border:`1px solid ${m.c}20` }}>
                          <div className="text-lg font-black" style={{ color:m.c }}>{m.v}</div>
                          <div className="text-[10px] mt-0.5" style={{ color:`${m.c}80` }}>{m.l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[['Gulf Electronics Trading','🇦🇪','#60a5fa'],['Al Madina FMCG Group','🇦🇪','#34d399'],['Shenzhen TechExport','🇨🇳','#c084fc']].map(([name,flag,color]) => (
                        <div key={name} className="flex items-center gap-2.5 rounded-xl px-3 py-2" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.05)' }}>
                          <span className="text-sm">{flag}</span>
                          <span className="text-xs font-semibold text-white flex-1">{name}</span>
                          <div className="flex items-center gap-1">
                            <BadgeCheck className="h-3.5 w-3.5" style={{ color:color as string }} />
                            <span className="text-[10px] font-bold" style={{ color:color as string }}>Verified</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating stat card 1 */}
                <div className="absolute card-3d rounded-2xl px-5 py-4 float2"
                  style={{ top:'5%', right:'0%', background:'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(59,130,246,0.1))', border:'1px solid rgba(59,130,246,0.3)', backdropFilter:'blur(20px)', boxShadow:'0 20px 40px rgba(0,0,0,0.4)' }}>
                  <div className="text-2xl font-black text-white mb-0.5">{count.b.toLocaleString()}+</div>
                  <div className="text-xs font-medium" style={{ color:'rgba(147,197,253,0.7)' }}>Businesses</div>
                </div>

                {/* Floating stat card 2 */}
                <div className="absolute card-3d rounded-2xl px-5 py-4 float3"
                  style={{ bottom:'15%', right:'2%', background:'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(16,185,129,0.1))', border:'1px solid rgba(16,185,129,0.3)', backdropFilter:'blur(20px)', boxShadow:'0 20px 40px rgba(0,0,0,0.4)' }}>
                  <div className="text-2xl font-black text-white mb-0.5">${count.m.toLocaleString()}M+</div>
                  <div className="text-xs font-medium" style={{ color:'rgba(110,231,183,0.7)' }}>Trade facilitated</div>
                </div>

                {/* Live feed card */}
                <div className="absolute card-3d rounded-2xl overflow-hidden float1"
                  style={{ bottom:'2%', left:'0%', width:220, background:'rgba(6,13,31,0.85)', border:'1px solid rgba(255,255,255,0.08)', backdropFilter:'blur(20px)', boxShadow:'0 20px 40px rgba(0,0,0,0.5)', animationDelay:'2s' }}>
                  <div className="px-3 py-2 border-b flex items-center gap-1.5" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation:'pulse2 2s ease-in-out infinite' }} />
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color:'rgba(255,255,255,0.4)' }}>Live activity</span>
                  </div>
                  {[{ text:'RFQ matched — Electronics', flag:'🇳🇬' },{ text:'Shipment cleared customs', flag:'🇰🇪' },{ text:'$2.5M deal connected', flag:'🇬🇭' }].map((a,i) => (
                    <div key={i} className="px-3 py-2 flex items-center gap-2 border-b" style={{ borderColor:'rgba(255,255,255,0.04)' }}>
                      <span className="text-sm">{a.flag}</span>
                      <span className="text-[11px]" style={{ color:'rgba(148,163,184,0.6)' }}>{a.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── STATS BAR ── */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val:`${count.b.toLocaleString()}+`, label:'Verified businesses', color:'#60a5fa' },
                { val:`${count.c}`,                   label:'African markets',     color:'#34d399' },
                { val:`$${count.m.toLocaleString()}M+`,label:'Trade facilitated',  color:'#c084fc' },
                { val:`${count.s.toLocaleString()}+`, label:'Global suppliers',    color:'#fbbf24' },
              ].map(s => (
                <div key={s.label} className="rounded-2xl text-center py-6 px-4" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-3xl font-black mb-1" style={{ color:s.color }}>{s.val}</div>
                  <div className="text-xs font-medium" style={{ color:'rgba(100,116,139,0.7)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ LOGOS ══ */}
        <section className="py-10 border-y" style={{ borderColor:'rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color:'rgba(100,116,139,0.5)' }}>Trusted by leading African enterprises</p>
            <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
              {['Dangote Group','Emirates NBD','MTN Business','Ecobank','TotalEnergies','Africa Finance Corp'].map(l => (
                <span key={l} className="text-sm font-black uppercase tracking-wide" style={{ color:'rgba(100,116,139,0.35)' }}>{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES DARK GRID ══ */}
        <section className="py-28 px-5 sm:px-8" style={{ background:'#060d1f' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background:'linear-gradient(to right,#3b82f6,transparent)' }} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400">Platform</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.05] max-w-xl text-white">
                Everything your<br />
                <span style={{ background:'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  trade business needs
                </span>
              </h2>
              <Link href="/register" className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl text-white shrink-0" style={{ background:'linear-gradient(135deg,#3b82f6,#1e40af)' }}>
                Explore all features <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map(f => (
                <div key={f.title} className="feature-card group rounded-2xl p-7 transition-all cursor-pointer"
                  style={{ background:'rgba(255,255,255,0.03)', border:`1px solid ${f.border}`, position:'relative', overflow:'hidden' }}>
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(to right,transparent,${f.color},transparent)` }} />
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor:f.bg, border:`1px solid ${f.border}` }}>
                    <f.icon className="h-5.5 w-5.5" style={{ color:f.color }} />
                  </div>
                  <h3 className="text-base font-black mb-2 text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color:'rgba(148,163,184,0.6)' }}>{f.desc}</p>
                  <div className="feature-arrow flex items-center gap-1.5 text-xs font-bold" style={{ color:f.color }}>
                    Learn more <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS — dark split ══ */}
        <section className="py-28 px-5 sm:px-8 border-y" style={{ borderColor:'rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)' }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background:'linear-gradient(to right,#fbbf24,transparent)' }} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-400">How it works</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-6 text-white">
                From signup to<br />first trade deal<br />
                <span style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  in days.
                </span>
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color:'rgba(148,163,184,0.7)' }}>AfriBizConnect removes every friction point in cross-border African trade. Register, get verified, and connect with your first supplier or investor today.</p>
              <Link href="/register" className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl text-white w-fit" style={{ background:'linear-gradient(135deg,#fbbf24,#d97706)', boxShadow:'0 4px 20px rgba(251,191,36,0.3)' }}>
                Create free account <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { n:'01', title:'Create your profile', desc:'Register and complete your business profile with trade documents, certifications, and history.', color:'#34d399' },
                { n:'02', title:'Get KYB verified', desc:'Our team reviews your documents and assigns your official trust score and verified badge.', color:'#60a5fa' },
                { n:'03', title:'Discover & connect', desc:'Browse suppliers, post RFQs, explore investment deals, and request logistics quotes.', color:'#c084fc' },
                { n:'04', title:'Trade with confidence', desc:'Manage deals, track shipments, and close transactions in your secure dashboard.', color:'#fbbf24' },
              ].map(step => (
                <div key={step.n} className="flex gap-4 p-5 rounded-2xl transition-all hover:-translate-y-0.5" style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.07)` }}>
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-black" style={{ backgroundColor:`${step.color}20`, color:step.color, border:`1px solid ${step.color}40` }}>{step.n}</div>
                  <div>
                    <div className="text-sm font-black mb-1 text-white">{step.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color:'rgba(148,163,184,0.6)' }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="py-28 px-5 sm:px-8" style={{ background:'#060d1f' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background:'linear-gradient(to right,#34d399,transparent)' }} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400">Social proof</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-14 text-white">
              Trusted across<br />
              <span style={{ background:'linear-gradient(135deg,#34d399,#10b981)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                54 African countries
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t,i) => (
                <div key={i} className="card-3d rounded-2xl p-7 flex flex-col" style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.07)`, position:'relative', overflow:'hidden' }}>
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(to right,transparent,${t.color},transparent)` }} />
                  <div className="flex gap-0.5 mb-5">{[...Array(5)].map((_,j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
                  <blockquote className="text-sm leading-relaxed flex-1 mb-6 italic" style={{ color:'rgba(203,213,225,0.75)' }}>"{t.quote}"</blockquote>
                  <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
                    <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0" style={{ backgroundColor:t.color }}>{t.initials}</div>
                    <div>
                      <div className="text-sm font-black text-white">{t.name} {t.flag}</div>
                      <div className="text-[11px]" style={{ color:'rgba(100,116,139,0.7)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FINAL CTA ══ */}
        <section className="py-28 px-5 sm:px-8 relative overflow-hidden" style={{ background:'radial-gradient(ellipse 100% 80% at 50% 50%,rgba(59,130,246,0.15) 0%,transparent 70%), #060d1f' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.03) 1px,transparent 0)', backgroundSize:'28px 28px' }} />
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="font-black tracking-tighter text-white mb-5" style={{ fontSize:'clamp(2.2rem,5vw,3.5rem)' }}>
              Join 12,400+ businesses<br />growing their African trade
            </h2>
            <p className="text-base mb-10 max-w-md mx-auto" style={{ color:'rgba(148,163,184,0.7)' }}>Free to start. Upgrade when you need more. Cancel anytime.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/register" className="flex items-center gap-2 text-sm font-black px-8 py-4 rounded-2xl text-white transition-all hover:scale-105" style={{ background:'linear-gradient(135deg,#34d399,#059669)', boxShadow:'0 8px 32px rgba(52,211,153,0.35)' }}>
                Create free account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="flex items-center gap-2 text-sm font-medium px-8 py-4 rounded-2xl transition-all hover:bg-white/10" style={{ border:'1px solid rgba(255,255,255,0.15)', color:'rgba(203,213,225,0.8)' }}>
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ background:'linear-gradient(180deg,#04091a 0%,#020610 100%)', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
              {/* Brand */}
              <div className="col-span-2">
                <Link href="/" className="flex items-center gap-2.5 mb-5">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#3b82f6,#1e40af)' }}><Globe2 className="h-4 w-4 text-white" /></div>
                  <span className="font-black text-base text-white">AfriBiz<span style={{ color:'#fbbf24' }}>Connect</span></span>
                </Link>
                <p className="text-xs leading-relaxed mb-5 max-w-[220px]" style={{ color:'rgba(100,116,139,0.6)' }}>Africa's B2B trade infrastructure platform — connecting 54 markets with verified global suppliers and investors.</p>
                <div className="space-y-2 mb-5">
                  <div className="text-xs" style={{ color:'rgba(100,116,139,0.45)' }}>✉ hello@afribizconnect.com</div>
                  <div className="text-xs" style={{ color:'rgba(100,116,139,0.45)' }}>📞 +971 4 200 0000 (Dubai HQ)</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs mb-5" style={{ color:'#34d399' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation:'pulse2 2s ease-in-out infinite' }} />
                  All systems operational
                </div>
                <div className="flex gap-2">
                  {['Li','Tw','YT','IG'].map(s => (
                    <a key={s} href="#" className="h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all hover:bg-white/10" style={{ border:'1px solid rgba(255,255,255,0.08)', color:'rgba(148,163,184,0.5)' }}>{s}</a>
                  ))}
                </div>
              </div>
              {/* Columns */}
              {Object.entries(FOOTER).map(([heading, links]) => (
                <div key={heading}>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color:'rgba(100,116,139,0.4)' }}>{heading}</div>
                  <ul className="space-y-2.5">
                    {links.map(l => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-xs transition-colors hover:text-white" style={{ color:'rgba(100,116,139,0.55)' }}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Bottom */}
            <div className="border-t pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
              <p className="text-[11px]" style={{ color:'rgba(100,116,139,0.3)' }}>© 2025 AfriBizConnect Ltd. Registered in Dubai International Financial Centre (DIFC).</p>
              <div className="flex flex-wrap gap-2">
                {['ISO 27001','DIFC Licensed','GDPR','54 Markets'].map(b => (
                  <span key={b} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background:'rgba(255,255,255,0.04)', color:'rgba(100,116,139,0.35)', border:'1px solid rgba(255,255,255,0.04)' }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
