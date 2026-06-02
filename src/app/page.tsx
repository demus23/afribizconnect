'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Globe2, ShieldCheck, TrendingUp, Truck,
  BarChart3, Star, ChevronRight, Zap, Lock, Award,
  Play, CheckCircle2, BadgeCheck, Package, MapPin,
  DollarSign, Building2, Users, Search, Bell, ChevronDown,
  ArrowUpRight, Flame, MessageSquare, Layers, Menu, X
} from 'lucide-react'

/* ─── CONSTANTS ─────────────────────────────────────────── */

const TICKER = [
  '🇳🇬 Nigeria · Electronics · $2.4M deal closed',
  '🇦🇪 UAE → Ghana · FMCG · Verified supplier connected',
  '🇰🇪 Kenya · Logistics Hub · Series A $8M raised',
  '🇲🇦 Morocco · Auto Parts · 500MT shipped',
  '🇪🇬 Egypt → Saudi · Textiles · LC terms agreed',
  '🇿🇦 South Africa · Private Equity · $25M deployed',
  '🇹🇿 Tanzania · Agri · Export license approved',
  "🇨🇮 Côte d'Ivoire · Cocoa · 1,200MT contracted",
  '🇬🇭 Ghana · Cashew · $800K buyer request matched',
  '🇪🇹 Ethiopia · Textiles · Joint venture signed',
]

const NAV = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Invest', href: '/invest' },
  { label: 'Logistics', href: '/logistics' },
  { label: 'Sourcing', href: '/sourcing' },
  { label: 'Pricing', href: '#pricing' },
]

const FEATURES = [
  { icon: ShieldCheck, label: 'Verified Trust Scores', desc: 'Every business screened and scored 0–100 with KYB checks, trade references, and document verification.', color: '#059669', bg: '#f0fdf4', stat: '94% verification rate' },
  { icon: Globe2,      label: 'Supplier Marketplace', desc: 'Discover UAE, Gulf, and global suppliers filtered by category, MOQ, payment terms, and certification.', color: '#1e40af', bg: '#eff6ff', stat: '3,200+ verified suppliers' },
  { icon: TrendingUp,  label: 'Investment Network',   desc: 'Browse equity, debt, and trade finance opportunities with direct access to curated African deal flow.', color: '#7c3aed', bg: '#f5f3ff', stat: '$46.5M active deal flow' },
  { icon: Truck,       label: 'Logistics Hub',        desc: 'Multi-carrier freight quotes, live shipment tracking, and customs document management in one place.', color: '#d97706', bg: '#fffbeb', stat: '54 country coverage' },
  { icon: BarChart3,   label: 'Trade Financing',      desc: 'Letters of credit, invoice factoring, and supply chain finance from vetted financial institutions.', color: '#dc2626', bg: '#fef2f2', stat: '$2.8B facilitated' },
  { icon: Layers,      label: 'Enterprise Dashboard', desc: 'Premium analytics, deal pipelines, RFQ management, and team collaboration for serious operators.', color: '#0891b2', bg: '#ecfeff', stat: 'Real-time insights' },
]

const STATS = [
  { val: '12,400+', label: 'Businesses', icon: Building2 },
  { val: '54',      label: 'Countries',  icon: MapPin },
  { val: '$2.8B',   label: 'Trade volume', icon: DollarSign },
  { val: '3,200+',  label: 'Verified suppliers', icon: BadgeCheck },
]

const TESTIMONIALS = [
  { quote: 'Cut our supplier sourcing time by 70%. Closed our first LC with a UAE partner in under 2 weeks. Nothing else comes close.', name: 'Adaeze Okonkwo', role: 'CEO, Lagos Prime Imports', country: 'Nigeria', initials: 'AO', color: '#059669' },
  { quote: 'We deployed $12M into three African deals in 4 months. The due diligence tools and verified profiles made it possible.', name: 'Khalid Al-Rashidi', role: 'Partner, Gulf Africa Fund', country: 'UAE', initials: 'KR', color: '#1e40af' },
  { quote: 'Our export inquiries tripled after the verified badge. The trust score system is a genuine competitive advantage.', name: 'Amara Diallo', role: 'Director, Dakar Trade Hub', country: 'Senegal', initials: 'AD', color: '#7c3aed' },
]

const PLANS = [
  {
    name: 'Starter', price: '$49', period: '/mo', highlight: false, badge: null,
    desc: 'For importers and early-stage businesses',
    features: ['Verified business profile', '20 supplier contacts/mo', 'Basic trust score badge', 'RFQ posting (5/mo)', 'Email support'],
    cta: 'Start for free',
  },
  {
    name: 'Growth', price: '$149', period: '/mo', highlight: true, badge: 'Most popular',
    desc: 'For active traders and distributors',
    features: ['Everything in Starter', 'Unlimited contacts', 'Premium verified badge', 'Investment listings', 'Logistics quotes', 'Priority support', 'Full analytics'],
    cta: 'Start 14-day trial',
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', highlight: false, badge: null,
    desc: 'For PE firms, large traders & platforms',
    features: ['Everything in Growth', 'Dedicated account manager', 'API + webhooks access', 'White-label options', 'SLA guarantee', 'Unlimited team seats'],
    cta: 'Contact sales',
  },
]

const LOGOS = ['Dangote Group', 'Emirates NBD', 'MTN Business', 'Ecobank', 'TotalEnergies', 'Africa Finance Corp']

const HOW = [
  { n: '01', title: 'Create your profile', desc: 'Register and complete your verified business profile with documents, certifications, and trade history.', color: '#059669' },
  { n: '02', title: 'Get trust verified', desc: 'Our team reviews your KYB documents and assigns your official trust score and verification badge.', color: '#1e40af' },
  { n: '03', title: 'Discover & connect', desc: 'Browse verified suppliers, post RFQs, explore investment deals, and request logistics quotes.', color: '#7c3aed' },
  { n: '04', title: 'Trade with confidence', desc: 'Manage deals, track shipments, and close transactions — all in your secure enterprise dashboard.', color: '#d97706' },
]

/* ─── COMPONENTS ─────────────────────────────────────────── */

function Ticker() {
  return (
    <div className="overflow-hidden border-b h-9 flex items-center shrink-0"
      style={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}>
      <div className="shrink-0 px-4 h-full flex items-center"
        style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">LIVE</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-8 text-[11px] font-medium"
              style={{ color: 'rgba(148,163,184,0.8)' }}>
              <span className="h-1 w-1 rounded-full inline-block shrink-0" style={{ backgroundColor: '#34d399' }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function AfricaMap() {
  return (
    <svg viewBox="0 0 400 420" fill="none" className="w-full h-full opacity-20"
      style={{ filter: 'drop-shadow(0 0 40px rgba(52,211,153,0.3))' }}>
      {/* Simplified Africa continent outline */}
      <path d="M180 20 C220 15 265 30 280 60 C295 90 290 115 285 140 C295 160 300 180 295 200 C305 220 310 240 305 265 C310 285 305 310 295 330 C280 360 260 380 240 395 C220 405 200 410 180 400 C160 390 140 375 125 355 C110 330 105 305 110 280 C100 260 95 240 100 215 C90 195 88 175 95 155 C85 130 80 105 90 80 C100 50 140 25 180 20Z"
        fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" />
      {/* Trade route dots */}
      {[
        [180, 150], [220, 200], [160, 250], [200, 300], [240, 180],
        [170, 320], [210, 230], [185, 275], [235, 260], [160, 200],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="#34d399" opacity="0.7" />
      ))}
      {/* Connection lines */}
      {[
        [180, 150, 220, 200], [220, 200, 200, 300], [160, 250, 200, 300],
        [240, 180, 220, 200], [210, 230, 235, 260], [185, 275, 170, 320],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(52,211,153,0.3)" strokeWidth="0.8" strokeDasharray="4 3" />
      ))}
    </svg>
  )
}

/* ─── MAIN PAGE ─────────────────────────────────────────── */

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Auto-rotate features
  useEffect(() => {
    const t = setInterval(() => setActiveFeature(p => (p + 1) % FEATURES.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Geist Sans',system-ui,sans-serif", backgroundColor: '#f8fafc', color: '#0f172a' }}>

      {/* ══ STICKY HEADER ══ */}
      <header className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${scrolled ? '#e2e8f0' : 'rgba(226,232,240,0.6)'}`,
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.07)' : 'none',
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-xl blur-sm opacity-50" style={{ backgroundColor: '#1e40af' }} />
              <div className="relative h-8 w-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
                <Globe2 className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-black text-base tracking-tight" style={{ color: '#0f172a' }}>AfriBiz</span>
              <span className="font-black text-base tracking-tight" style={{ color: '#f59e0b' }}>Connect</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className="text-sm font-semibold px-3.5 py-2 rounded-xl transition-all hover:bg-slate-100"
                style={{ color: '#475569' }}>
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3 ml-auto">
            <Link href="/login" className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-xl transition-all hover:bg-slate-100"
              style={{ color: '#475569' }}>
              Sign in
            </Link>
            <Link href="/register"
              className="flex items-center gap-1.5 text-sm font-black px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow: '0 4px 16px rgba(30,64,175,0.35)' }}>
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t px-5 py-4 space-y-1" style={{ borderColor: '#f1f5f9', backgroundColor: 'white' }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
                className="block text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50"
                style={{ color: '#374151' }}>{n.label}</Link>
            ))}
          </div>
        )}
      </header>

      {/* ══ TICKER ══ */}
      <Ticker />

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#0f172a 0%,#1e293b 40%,#0f172a 100%)', minHeight: '88vh' }}>

        {/* Background texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          {/* Glow blobs */}
          <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(30,64,175,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-1/2 h-[300px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-24 relative flex flex-col lg:flex-row items-center gap-16">

          {/* Left — Text */}
          <div className="flex-1 max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 mb-8"
              style={{ borderColor: 'rgba(52,211,153,0.3)', backgroundColor: 'rgba(52,211,153,0.07)' }}>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold" style={{ color: '#6ee7b7' }}>Africa's #1 B2B Trade Infrastructure</span>
              <ChevronRight className="h-3.5 w-3.5" style={{ color: '#6ee7b7', opacity: 0.6 }} />
            </div>

            {/* Headline */}
            <h1 className="font-black tracking-tighter leading-[0.95] mb-7"
              style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', color: '#f8fafc' }}>
              Where African<br />
              trade meets<br />
              <span style={{
                background: 'linear-gradient(135deg,#6ee7b7 0%,#34d399 35%,#fbbf24 80%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>
                global capital
              </span>
            </h1>

            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(148,163,184,0.85)', maxWidth: 520 }}>
              AfriBizConnect connects African importers, distributors, and businesses with verified global suppliers, logistics providers, trade financing, and investors — all on one trusted platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/register"
                className="group flex items-center gap-2 text-sm font-black px-7 py-4 rounded-2xl text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#34d399,#059669)', boxShadow: '0 8px 32px rgba(52,211,153,0.35)' }}>
                Create free account
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button className="flex items-center gap-3 text-sm font-semibold px-7 py-4 rounded-2xl transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(203,213,225,0.8)', backgroundColor: 'rgba(255,255,255,0.04)' }}>
                <div className="h-7 w-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <Play className="h-3 w-3 fill-white text-white ml-0.5" />
                </div>
                Watch demo
              </button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-5 text-xs" style={{ color: 'rgba(100,116,139,0.9)' }}>
              {[
                { icon: Lock, label: 'Bank-grade security' },
                { icon: ShieldCheck, label: 'KYB verified' },
                { icon: Award, label: 'ISO 27001' },
                { icon: Users, label: 'No card required' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-emerald-500" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Africa visual + live stats */}
          <div className="flex-shrink-0 w-full lg:w-[380px] xl:w-[440px] relative">
            {/* Africa map */}
            <div className="relative h-[400px]">
              <AfricaMap />

              {/* Floating stat cards */}
              <div className="absolute top-4 -left-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(52,211,153,0.15)' }}>
                  <BadgeCheck className="h-4.5 w-4.5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">3,200+</div>
                  <div className="text-[11px]" style={{ color: 'rgba(148,163,184,0.7)' }}>Verified suppliers</div>
                </div>
              </div>

              <div className="absolute top-1/3 -right-4 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(251,191,36,0.15)' }}>
                  <TrendingUp className="h-4.5 w-4.5 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">$2.8B</div>
                  <div className="text-[11px]" style={{ color: 'rgba(148,163,184,0.7)' }}>Trade facilitated</div>
                </div>
              </div>

              <div className="absolute bottom-8 -left-2 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(30,64,175,0.2)' }}>
                  <MapPin className="h-4.5 w-4.5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">54</div>
                  <div className="text-[11px]" style={{ color: 'rgba(148,163,184,0.7)' }}>African markets</div>
                </div>
              </div>

              {/* Live activity feed */}
              <div className="absolute bottom-2 right-0 w-52 rounded-2xl overflow-hidden"
                style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-3 py-2 border-b flex items-center gap-1.5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Live activity</span>
                </div>
                {[
                  { text: 'RFQ matched — Electronics', flag: '🇳🇬' },
                  { text: 'Shipment cleared customs', flag: '🇰🇪' },
                  { text: '$2.5M deal connected', flag: '🇬🇭' },
                ].map((a, i) => (
                  <div key={i} className="px-3 py-2 flex items-center gap-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    <span className="text-sm">{a.flag}</span>
                    <span className="text-[11px]" style={{ color: 'rgba(203,213,225,0.6)' }}>{a.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-white mb-1">{s.val}</div>
                <div className="text-xs font-medium" style={{ color: 'rgba(100,116,139,0.8)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUSTED BY ══ */}
      <section className="py-10 border-y" style={{ borderColor: '#e8edf3', backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] mb-7" style={{ color: '#94a3b8' }}>
            Trusted by Africa's leading enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {LOGOS.map(name => (
              <span key={name} className="text-sm font-black uppercase tracking-wider transition-colors" style={{ color: '#cbd5e1' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES (Interactive) ══ */}
      <section id="features" className="py-28 px-5 sm:px-8" style={{ backgroundColor: '#fafbfc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#1e40af' }}>Platform</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.05] max-w-xl" style={{ color: '#0f172a' }}>
              Everything your trade<br />
              <span style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                business needs
              </span>
            </h2>
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: '#64748b' }}>
              Built for serious operators — the complete infrastructure layer for cross-border African trade.
            </p>
          </div>

          {/* Feature tabs + detail */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Tab list */}
            <div className="space-y-2">
              {FEATURES.map((f, i) => (
                <button key={f.label} onClick={() => setActiveFeature(i)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all"
                  style={{
                    borderColor: activeFeature === i ? 'transparent' : '#e2e8f0',
                    backgroundColor: activeFeature === i ? 'white' : 'transparent',
                    boxShadow: activeFeature === i ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
                  }}>
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: activeFeature === i ? f.bg : '#f1f5f9' }}>
                    <f.icon className="h-5 w-5" style={{ color: activeFeature === i ? f.color : '#94a3b8' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black mb-0.5" style={{ color: '#0f172a' }}>{f.label}</div>
                    {activeFeature === i && (
                      <div className="text-xs leading-snug" style={{ color: '#64748b' }}>{f.desc}</div>
                    )}
                  </div>
                  {activeFeature === i && (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full shrink-0"
                      style={{ backgroundColor: f.bg, color: f.color }}>{f.stat}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Visual panel */}
            <div className="sticky top-24 rounded-3xl overflow-hidden border"
              style={{ borderColor: '#e2e8f0', boxShadow: '0 8px 48px rgba(0,0,0,0.08)', backgroundColor: 'white', minHeight: 420 }}>
              {(() => {
                const f = FEATURES[activeFeature]
                return (
                  <div className="p-8 flex flex-col h-full">
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: f.bg }}>
                      <f.icon className="h-7 w-7" style={{ color: f.color }} />
                    </div>
                    <h3 className="text-2xl font-black mb-3" style={{ color: '#0f172a' }}>{f.label}</h3>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: '#64748b' }}>{f.desc}</p>
                    <div className="mt-auto rounded-2xl p-5"
                      style={{ backgroundColor: f.bg, border: `1px solid ${f.color}20` }}>
                      <div className="flex items-center gap-3 mb-4">
                        <BadgeCheck className="h-5 w-5 shrink-0" style={{ color: f.color }} />
                        <span className="text-sm font-black" style={{ color: f.color }}>Platform stat: {f.stat}</span>
                      </div>
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="flex items-center gap-2.5 mb-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: f.color }} />
                          <span className="text-xs font-medium" style={{ color: f.color }}>
                            {j === 0 ? 'Available on all plans' : j === 1 ? 'Unlimited on Growth+' : 'Enterprise API access'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-24 px-5 sm:px-8 border-y" style={{ borderColor: '#e8edf3', backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#d97706' }}>How it works</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-14" style={{ color: '#0f172a' }}>
            From signup to first trade<br />
            <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              deal in days
            </span>
          </h2>
          <div className="grid md:grid-cols-4 gap-5 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px" style={{ backgroundColor: '#e2e8f0', zIndex: 0 }} />
            {HOW.map((h, i) => (
              <div key={h.n} className="relative rounded-2xl border bg-white p-6" style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', zIndex: 1 }}>
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5 border-4 border-white"
                  style={{ backgroundColor: `${h.color}15` }}>
                  <span className="text-xl font-black" style={{ color: h.color }}>{h.n}</span>
                </div>
                <h3 className="text-sm font-black mb-2" style={{ color: '#0f172a' }}>{h.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-28 px-5 sm:px-8" style={{ backgroundColor: '#fafbfc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-emerald-500 to-transparent" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#059669' }}>Testimonials</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-14" style={{ color: '#0f172a' }}>
            Trusted by traders<br />
            <span style={{ background: 'linear-gradient(135deg,#059669,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              across 54 countries
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl bg-white border p-7 flex flex-col" style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <blockquote className="text-sm leading-relaxed flex-1 mb-6 italic" style={{ color: '#374151' }}>
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: '#f1f5f9' }}>
                  <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ backgroundColor: t.color }}>{t.initials}</div>
                  <div>
                    <div className="text-sm font-black" style={{ color: '#0f172a' }}>{t.name}</div>
                    <div className="text-[11px]" style={{ color: '#94a3b8' }}>{t.role} · {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" className="py-28 px-5 sm:px-8 border-y" style={{ borderColor: '#e8edf3', backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-purple-500 to-transparent" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#7c3aed' }}>Pricing</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <h2 className="text-4xl font-black tracking-tighter max-w-md" style={{ color: '#0f172a' }}>
              Simple, transparent<br />
              <span style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                pricing that scales
              </span>
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: '#64748b' }}>
              Start free. Upgrade when you're ready to grow your cross-border trade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl">
            {PLANS.map(plan => (
              <div key={plan.name} className="relative rounded-2xl flex flex-col p-8 transition-all"
                style={plan.highlight
                  ? { background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1e40af 100%)', boxShadow: '0 20px 60px rgba(30,64,175,0.3)' }
                  : { backgroundColor: 'white', border: '1px solid #e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }
                }>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] font-black px-3.5 py-1 rounded-full"
                    style={{ backgroundColor: '#fbbf24', color: '#0f172a', boxShadow: '0 4px 12px rgba(251,191,36,0.4)' }}>
                    <Zap className="h-2.5 w-2.5" /> {plan.badge}
                  </div>
                )}
                <div className="text-[11px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: plan.highlight ? 'rgba(147,197,253,0.7)' : '#94a3b8' }}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black tracking-tighter" style={{ color: plan.highlight ? '#fff' : '#0f172a' }}>{plan.price}</span>
                  <span className="text-sm" style={{ color: plan.highlight ? 'rgba(147,197,253,0.6)' : '#94a3b8' }}>{plan.period}</span>
                </div>
                <p className="text-xs mb-7" style={{ color: plan.highlight ? 'rgba(147,197,253,0.6)' : '#64748b' }}>{plan.desc}</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: plan.highlight ? '#34d399' : '#059669' }} />
                      <span style={{ color: plan.highlight ? 'rgba(219,234,254,0.85)' : '#374151' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register"
                  className="flex items-center justify-center gap-2 text-sm font-black py-3.5 rounded-xl transition-all hover:opacity-90"
                  style={plan.highlight
                    ? { background: 'linear-gradient(135deg,#34d399,#059669)', color: 'white', boxShadow: '0 4px 16px rgba(52,211,153,0.35)' }
                    : { border: '1.5px solid #e2e8f0', color: '#0f172a', backgroundColor: '#f8fafc' }
                  }>
                  {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-7 text-xs" style={{ color: '#94a3b8' }}>All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-28 px-5 sm:px-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#0f172a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="font-black tracking-tighter mb-5 text-white" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            Ready to trade smarter?
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(148,163,184,0.8)' }}>
            Join 12,400+ African businesses growing their global trade on AfriBizConnect.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register"
              className="flex items-center gap-2 text-sm font-black px-8 py-4 rounded-2xl text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#34d399,#059669)', boxShadow: '0 8px 32px rgba(52,211,153,0.35)' }}>
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login"
              className="flex items-center gap-2 text-sm font-medium px-8 py-4 rounded-2xl transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(203,213,225,0.7)' }}>
              Sign in to existing account
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: 'linear-gradient(180deg,#080f1e 0%,#030812 100%)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-5">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                  <Globe2 className="h-4 w-4 text-white" />
                </div>
                <span className="font-black text-sm text-white">AfriBiz<span style={{ color: '#fbbf24' }}>Connect</span></span>
              </Link>
              <p className="text-xs leading-relaxed mb-6 max-w-[200px]" style={{ color: 'rgba(100,116,139,0.7)' }}>
                Africa's B2B trade infrastructure and investment platform — connecting 54 markets.
              </p>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: '#34d399' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </div>
            </div>
            {[
              { h: 'Platform', links: ['Marketplace', 'Invest', 'Sourcing', 'Logistics', 'Trade Finance'] },
              { h: 'Company', links: ['About', 'Careers', 'Press', 'Blog', 'Contact'] },
              { h: 'Resources', links: ['Documentation', 'API Reference', 'Trade Guides', 'Podcast'] },
              { h: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Compliance', 'Cookies'] },
            ].map(col => (
              <div key={col.h}>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: 'rgba(100,116,139,0.5)' }}>{col.h}</div>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l}><Link href="#" className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(100,116,139,0.6)' }}>{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px]" style={{ color: 'rgba(100,116,139,0.4)' }}>
              © 2025 AfriBizConnect Ltd. Registered in Dubai International Financial Centre.
            </p>
            <div className="flex items-center gap-4 text-[11px]" style={{ color: 'rgba(100,116,139,0.4)' }}>
              <span>ISO 27001 Certified</span><span>·</span><span>DIFC Licensed</span><span>·</span><span>54 Markets</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}