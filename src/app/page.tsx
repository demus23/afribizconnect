'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Globe2, ShieldCheck, TrendingUp, Truck,
  BarChart3, Star, CheckCircle2, BadgeCheck, MapPin,
  DollarSign, Building2, Users, Zap, Lock, Award,
  ChevronRight, Menu, X, ArrowUpRight
} from 'lucide-react'

const TICKER = [
  '🇳🇬 Nigeria · Electronics · $2.4M closed',
  '🇦🇪 UAE → Ghana · FMCG · Supplier verified',
  '🇰🇪 Kenya · Logistics Hub · Series A $8M',
  '🇲🇦 Morocco · Auto Parts · 500MT shipped',
  '🇪🇬 Egypt → Saudi · Textiles · LC agreed',
  '🇿🇦 South Africa · PE · $25M deployed',
  '🇬🇭 Ghana · Cashew · $800K matched',
  '🇪🇹 Ethiopia · Textiles · JV signed',
]

const NAV = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Invest',      href: '/invest' },
  { label: 'Logistics',   href: '/logistics' },
  { label: 'Sourcing',    href: '/sourcing' },
  { label: 'Market Data', href: '/market' },
  { label: 'Pricing',     href: '/pricing' },
]

const FEATURES = [
  { icon: ShieldCheck, title: 'Verified trust scores',  desc: 'KYB-screened businesses rated 0–100', color: '#10b981', bg: '#f0fdf4' },
  { icon: Globe2,      title: 'Global supplier search', desc: 'UAE, China, Turkey, India suppliers',  color: '#1e40af', bg: '#eff6ff' },
  { icon: TrendingUp,  title: 'Investment deals',       desc: 'Equity, debt & trade finance',         color: '#7c3aed', bg: '#f5f3ff' },
  { icon: Truck,       title: 'Freight & logistics',    desc: 'Quotes, tracking, customs docs',        color: '#d97706', bg: '#fffbeb' },
  { icon: BarChart3,   title: 'Live market data',       desc: 'FX rates, commodities, news',           color: '#0891b2', bg: '#ecfeff' },
  { icon: Zap,         title: 'AI trade assistant',     desc: 'Duties, Incoterms, AfCFTA help',         color: '#dc2626', bg: '#fef2f2' },
]

const STATS = [
  { val: '12,400+', label: 'Verified businesses', color: '#1e40af' },
  { val: '54',      label: 'African markets',     color: '#059669' },
  { val: '$2.8B',   label: 'Trade facilitated',   color: '#7c3aed' },
  { val: '3,200+',  label: 'Global suppliers',    color: '#d97706' },
]

const TESTIMONIALS = [
  { quote: 'Cut our sourcing time by 70%. Closed our first LC with a UAE partner in under 2 weeks.', name: 'Adaeze Okonkwo', role: 'CEO, Lagos Prime Imports', flag: '🇳🇬', initials: 'AO', color: '#059669' },
  { quote: 'Deployed $12M into three African deals in 4 months. The verified profiles made it possible.', name: 'Khalid Al-Rashidi', role: 'Partner, Gulf Africa Fund', flag: '🇦🇪', initials: 'KR', color: '#1e40af' },
  { quote: 'Our export inquiries tripled after the verified badge. Genuinely transformative for our business.', name: 'Amara Diallo', role: 'Director, Dakar Trade Hub', flag: '🇸🇳', initials: 'AD', color: '#7c3aed' },
]

const LOGOS = ['Dangote Group', 'Emirates NBD', 'MTN Business', 'Ecobank', 'TotalEnergies', 'Africa Finance Corp']

const FOOTER = {
  Platform: [
    { label: 'Marketplace',  href: '/marketplace' },
    { label: 'Invest',       href: '/invest' },
    { label: 'Sourcing',     href: '/sourcing' },
    { label: 'Logistics',    href: '/logistics' },
    { label: 'Market Data',  href: '/market' },
    { label: 'AI Assistant', href: '/assistant' },
    { label: 'Pricing',      href: '/pricing' },
  ],
  Company: [
    { label: 'About us',  href: '/about' },
    { label: 'Careers',   href: '/careers' },
    { label: 'News',      href: '/news' },
    { label: 'Contact',   href: '/contact' },
    { label: 'Partners',  href: '/about' },
    { label: 'Press kit', href: '/about' },
  ],
  Resources: [
    { label: 'Trade guides', href: '/news' },
    { label: 'Webinars',     href: '/news' },
    { label: 'Podcast',      href: '/news' },
    { label: 'Newsletter',   href: '/contact' },
    { label: 'Help centre',  href: '/contact' },
    { label: 'API docs',     href: '/about' },
  ],
  Legal: [
    { label: 'Privacy policy',   href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
    { label: 'Cookie policy',    href: '/cookies' },
    { label: 'Compliance',       href: '/about' },
  ],
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ fontFamily: "'Geist Sans',system-ui,sans-serif", backgroundColor: '#fff', color: '#0f172a' }}>

      {/* HEADER */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : '#fff', borderBottom: `1px solid ${scrolled ? '#e2e8f0' : '#f1f5f9'}`, boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
              <Globe2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-black text-[15px]">AfriBiz<span style={{ color: '#f59e0b' }}>Connect</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} className="text-sm font-medium px-3.5 py-2 rounded-lg transition-colors hover:bg-slate-100" style={{ color: '#475569' }}>{n.label}</Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Link href="/login" className="text-sm font-semibold" style={{ color: '#64748b' }}>Sign in</Link>
            <Link href="/register" className="text-sm font-black px-5 py-2.5 rounded-xl text-white flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow: '0 4px 14px rgba(30,64,175,0.4)' }}>
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <button className="lg:hidden ml-auto p-2 rounded-lg hover:bg-slate-100" onClick={() => setMobile(!mobile)}>
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobile && (
          <div className="lg:hidden px-5 pb-4 space-y-1 border-t" style={{ borderColor: '#f1f5f9' }}>
            {NAV.map(n => <Link key={n.href} href={n.href} className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-50" style={{ color: '#374151' }}>{n.label}</Link>)}
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1 text-center py-2.5 text-sm font-semibold rounded-xl border" style={{ borderColor: '#e2e8f0', color: '#374151' }}>Sign in</Link>
              <Link href="/register" className="flex-1 text-center py-2.5 text-sm font-black rounded-xl text-white" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>Get started</Link>
            </div>
          </div>
        )}
      </header>

      {/* TICKER */}
      <div className="border-b overflow-hidden" style={{ background: '#0f172a', borderColor: '#1e293b', height: 36 }}>
        <div className="h-full flex items-center">
          <div className="shrink-0 px-4 h-full flex items-center" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
            <span className="text-[9px] font-black tracking-[0.2em] text-white uppercase">Live</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-ticker whitespace-nowrap">
              {[...TICKER,...TICKER].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-2 px-8 text-[11px]" style={{ color: 'rgba(148,163,184,0.75)' }}>
                  <span className="h-1 w-1 rounded-full bg-emerald-400 inline-block shrink-0" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg,#f0f6ff 0%,#ffffff 70%)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'linear-gradient(#e2e8f0 1px,transparent 1px),linear-gradient(to right,#e2e8f0 1px,transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 relative">
          <div className="flex justify-center mb-8">
            <Link href="/marketplace" className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full border transition-all hover:shadow-md" style={{ borderColor: '#e2e8f0', background: 'white', color: '#1e40af', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              23 new verified suppliers added this week
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <h1 className="text-center font-black tracking-tighter leading-[0.92] mb-7" style={{ fontSize: 'clamp(2.8rem,8vw,7rem)', color: '#0f172a' }}>
            Africa's trade<br />
            <span className="relative inline-block px-3 mx-1">
              <span className="relative z-10" style={{ color: '#1e40af' }}>infrastructure</span>
              <span className="absolute inset-0 rounded-2xl -skew-x-2" style={{ background: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', zIndex: 0 }} />
            </span>
            <br />reimagined.
          </h1>

          <p className="text-center text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
            AfriBizConnect connects African importers with verified global suppliers, logistics providers, trade financing, and investors across 54 markets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-black px-8 py-4 rounded-2xl text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow: '0 8px 30px rgba(30,64,175,0.35)' }}>
              Start free — no card needed <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/marketplace" className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold px-8 py-4 rounded-2xl border transition-all hover:bg-slate-50" style={{ borderColor: '#e2e8f0', color: '#374151' }}>
              Browse 3,200+ suppliers <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: '#94a3b8' }}>
            {[{ icon: Lock, label: 'Bank-grade security' }, { icon: ShieldCheck, label: 'KYB verified' }, { icon: Award, label: 'ISO 27001' }, { icon: Users, label: 'Free to join' }].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 font-medium"><Icon className="h-3.5 w-3.5 text-emerald-500" />{label}</span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="border-t border-b" style={{ borderColor: '#e8edf3', background: 'white' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 md:grid-cols-4 divide-x" style={{ divideColor: '#f1f5f9' }}>
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col items-center justify-center py-4 px-4">
                <span className="text-3xl font-black tracking-tighter mb-1" style={{ color: s.color }}>{s.val}</span>
                <span className="text-xs font-medium text-center" style={{ color: '#64748b' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16">
          <div className="rounded-3xl overflow-hidden border" style={{ borderColor: '#e2e8f0', boxShadow: '0 32px 80px rgba(0,0,0,0.12)', background: '#f8fafc' }}>
            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: '#e2e8f0', background: '#f1f5f9' }}>
              <div className="flex gap-1.5">
                {['#f87171','#fbbf24','#34d399'].map(c => <div key={c} className="h-3 w-3 rounded-full" style={{ backgroundColor: c }} />)}
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-lg px-4 py-1 text-xs font-medium border" style={{ color: '#94a3b8', borderColor: '#e2e8f0' }}>afribizconnect.vercel.app/dashboard</div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-5">
                {[{ label:'Active RFQs',val:'8',color:'#1e40af',bg:'#eff6ff'},{label:'Trust Score',val:'94',color:'#059669',bg:'#f0fdf4'},{label:'Deal Flow',val:'$46M',color:'#7c3aed',bg:'#f5f3ff'},{label:'Shipments',val:'12',color:'#d97706',bg:'#fffbeb'}].map(m => (
                  <div key={m.label} className="rounded-2xl p-4" style={{ background: m.bg }}>
                    <div className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.val}</div>
                    <div className="text-xs font-medium" style={{ color: m.color, opacity: 0.7 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[['Gulf Electronics Trading LLC','🇦🇪','#1e40af'],['Al Madina FMCG Group','🇦🇪','#059669'],['Shenzhen TechExport','🇨🇳','#7c3aed']].map(([name,flag,color],i) => (
                  <div key={name} className="rounded-xl p-4 bg-white border flex items-center gap-3" style={{ borderColor: '#e8edf3' }}>
                    <div className="h-8 w-8 rounded-lg shrink-0 flex items-center justify-center text-white text-xs font-black" style={{ background: color as string }}>{flag}</div>
                    <div>
                      <div className="text-xs font-bold line-clamp-1" style={{ color: '#0f172a' }}>{name}</div>
                      <div className="flex items-center gap-1 mt-0.5"><BadgeCheck className="h-3 w-3 text-emerald-500" /><span className="text-[10px] text-emerald-600 font-semibold">Verified</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="py-10 border-y" style={{ borderColor: '#f1f5f9', background: '#fafbfc' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: '#cbd5e1' }}>Trusted by leading African enterprises</p>
          <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
            {LOGOS.map(l => <span key={l} className="text-sm font-black uppercase tracking-wide" style={{ color: '#cbd5e1' }}>{l}</span>)}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right,#1e40af,transparent)' }} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#1e40af' }}>Platform</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.05] max-w-xl" style={{ color: '#0f172a' }}>
              One platform for<br />all your trade needs
            </h2>
            <Link href="/register" className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl text-white shrink-0" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
              Explore features <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="group rounded-2xl border p-7 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer" style={{ borderColor: '#e8edf3', background: 'white' }}>
                <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: f.bg }}>
                  <f.icon className="h-6 w-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-black mb-2" style={{ color: '#0f172a' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{f.desc}</p>
                <div className="flex items-center gap-1.5 mt-5 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: f.color }}>
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 px-5 sm:px-8 border-y" style={{ borderColor: '#f1f5f9', background: '#fafbfc' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: 'linear-gradient(to right,#d97706,transparent)' }} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#d97706' }}>How it works</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-6" style={{ color: '#0f172a' }}>
              From signup to first<br />trade deal in days,<br /><span style={{ color: '#1e40af' }}>not months.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#64748b' }}>AfriBizConnect removes every friction point in cross-border African trade. Register, get verified, and connect today.</p>
            <Link href="/register" className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl text-white w-fit" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
              Create free account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { n:'01', title:'Create your profile',   desc:'Register your business with trade documents, certifications, and history.',       color:'#059669' },
              { n:'02', title:'Get KYB verified',       desc:'Our team reviews your documents and assigns your official trust score.',          color:'#1e40af' },
              { n:'03', title:'Discover & connect',     desc:'Browse suppliers, post RFQs, explore investment deals, and request quotes.',      color:'#7c3aed' },
              { n:'04', title:'Trade with confidence',  desc:'Manage deals, track shipments, and close transactions in your dashboard.',       color:'#d97706' },
            ].map(step => (
              <div key={step.n} className="flex gap-4 p-5 rounded-2xl bg-white border transition-all hover:shadow-sm" style={{ borderColor: '#e8edf3' }}>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-black text-white" style={{ backgroundColor: step.color }}>{step.n}</div>
                <div>
                  <div className="text-sm font-black mb-1" style={{ color: '#0f172a' }}>{step.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: 'linear-gradient(to right,#059669,transparent)' }} />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#059669' }}>Social proof</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-14" style={{ color: '#0f172a' }}>
            Trusted across<br /><span style={{ color: '#059669' }}>54 African countries</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="rounded-2xl bg-white border p-7 flex flex-col" style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex gap-0.5 mb-5">{[...Array(5)].map((_,j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
                <blockquote className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#374151' }}>"{t.quote}"</blockquote>
                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: '#f1f5f9' }}>
                  <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0" style={{ backgroundColor: t.color }}>{t.initials}</div>
                  <div>
                    <div className="text-sm font-black" style={{ color: '#0f172a' }}>{t.name} {t.flag}</div>
                    <div className="text-[11px]" style={{ color: '#94a3b8' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-5 sm:px-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1e40af 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.04) 1px,transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="font-black tracking-tighter text-white mb-5" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            Join 12,400+ businesses<br />growing their African trade
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'rgba(147,197,253,0.75)' }}>Free to start. Upgrade when you need more. Cancel anytime.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="flex items-center gap-2 text-sm font-black px-8 py-4 rounded-2xl text-white" style={{ background: 'linear-gradient(135deg,#34d399,#059669)', boxShadow: '0 8px 32px rgba(52,211,153,0.35)' }}>
              Create free account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="flex items-center gap-2 text-sm font-medium px-8 py-4 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(203,213,225,0.8)' }}>
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'linear-gradient(180deg,#080f1e 0%,#030812 100%)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 mb-14">

            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-5">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                  <Globe2 className="h-4 w-4 text-white" />
                </div>
                <span className="font-black text-base text-white">AfriBiz<span style={{ color: '#fbbf24' }}>Connect</span></span>
              </Link>
              <p className="text-xs leading-relaxed mb-5 max-w-[220px]" style={{ color: 'rgba(100,116,139,0.65)' }}>
                Africa's B2B trade infrastructure and investment platform — connecting 54 markets with verified global suppliers and investors.
              </p>
              <div className="space-y-2 mb-5">
                <div className="text-xs" style={{ color: 'rgba(100,116,139,0.5)' }}>✉ hello@afribizconnect.com</div>
                <div className="text-xs" style={{ color: 'rgba(100,116,139,0.5)' }}>📞 +971 4 200 0000 (Dubai HQ)</div>
              </div>
              <div className="flex items-center gap-1.5 text-xs mb-4" style={{ color: '#34d399' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </div>
              {/* Social */}
              <div className="flex gap-2">
                {['LinkedIn','Twitter','YouTube','Instagram'].map(s => (
                  <a key={s} href="#" className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(148,163,184,0.5)' }}>{s[0]}</a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER).map(([heading, links]) => (
              <div key={heading}>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: 'rgba(100,116,139,0.45)' }}>{heading}</div>
                <ul className="space-y-2.5">
                  {links.map(l => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(100,116,139,0.6)' }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="border-t pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <p className="text-[11px]" style={{ color: 'rgba(100,116,139,0.35)' }}>© 2025 AfriBizConnect Ltd. Registered in Dubai International Financial Centre (DIFC).</p>
            <div className="flex flex-wrap gap-2">
              {['ISO 27001','DIFC Licensed','GDPR','54 Markets'].map(b => (
                <span key={b} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(100,116,139,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
