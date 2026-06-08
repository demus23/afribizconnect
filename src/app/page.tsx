'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Globe2, ShieldCheck, TrendingUp, Truck,
  BarChart3, Star, ChevronRight, Zap, Lock, Award,
  Play, CheckCircle2, BadgeCheck, Package, MapPin,
  DollarSign, Building2, Users, Search, ArrowUpRight,
  Flame, Layers, Menu, X, Mail, Phone, ExternalLink,
Share2, Link2, Video, Camera
} from 'lucide-react'

/* ─── DATA ─────────────────────────────────────────────── */

const TICKER = [
  '🇳🇬 Nigeria · Electronics · $2.4M closed',
  '🇦🇪 UAE → Ghana · FMCG · Verified',
  '🇰🇪 Kenya · Series A · $8M raised',
  '🇲🇦 Morocco · Auto Parts · 500MT shipped',
  '🇪🇬 Egypt → Saudi · Textiles · LC agreed',
  '🇿🇦 South Africa · PE · $25M deployed',
  '🇹🇿 Tanzania · Agri · Export approved',
  "🇨🇮 Côte d'Ivoire · Cocoa · 1,200MT",
  '🇬🇭 Ghana · Cashew · $800K matched',
  '🇪🇹 Ethiopia · Textiles · JV signed',
]

const STATS = [
  { val: '12,400+', label: 'Businesses',        icon: Building2 },
  { val: '54',      label: 'Countries',          icon: MapPin },
  { val: '$2.8B',   label: 'Trade volume',       icon: DollarSign },
  { val: '3,200+',  label: 'Verified suppliers', icon: BadgeCheck },
]

const FEATURES = [
  {
    icon: ShieldCheck, num: '01',
    title: 'Verified Trust Scores',
    desc: 'Every business screened and scored 0–100 with KYB document review, trade references, and certification checks.',
    color: '#10b981', bg: '#f0fdf4',
    stat: '94% verification rate',
  },
  {
    icon: Globe2, num: '02',
    title: 'Global Supplier Marketplace',
    desc: 'Discover UAE, Gulf, and global suppliers filtered by category, MOQ, payment terms, and certification level.',
    color: '#1e40af', bg: '#eff6ff',
    stat: '3,200+ verified suppliers',
  },
  {
    icon: TrendingUp, num: '03',
    title: 'Investment Network',
    desc: 'Browse equity, debt, and trade finance opportunities with direct access to curated African deal flow.',
    color: '#7c3aed', bg: '#f5f3ff',
    stat: '$46.5M active deal flow',
  },
  {
    icon: Truck, num: '04',
    title: 'Logistics Hub',
    desc: 'Multi-carrier freight quotes, live shipment tracking, and customs document management — all in one place.',
    color: '#d97706', bg: '#fffbeb',
    stat: '54 country coverage',
  },
  {
    icon: BarChart3, num: '05',
    title: 'Trade Financing',
    desc: 'Letters of credit, invoice factoring, and supply chain finance from vetted financial institutions.',
    color: '#dc2626', bg: '#fef2f2',
    stat: '$2.8B facilitated',
  },
  {
    icon: Layers, num: '06',
    title: 'Enterprise Dashboards',
    desc: 'Premium analytics, deal pipelines, RFQ management, and team collaboration for serious operators.',
    color: '#0891b2', bg: '#ecfeff',
    stat: 'Real-time data',
  },
]

const TESTIMONIALS = [
  {
    quote: 'AfriBizConnect cut our supplier sourcing time by 70%. Closed our first LC with a UAE partner in under 2 weeks. Game-changer.',
    name: 'Adaeze Okonkwo', role: 'CEO, Lagos Prime Imports', country: 'Nigeria', initials: 'AO', color: '#059669',
  },
  {
    quote: 'We deployed $12M into three African deals in 4 months. The verified profiles and due diligence tools made it possible.',
    name: 'Khalid Al-Rashidi', role: 'Partner, Gulf Africa Fund', country: 'UAE', initials: 'KR', color: '#1e40af',
  },
  {
    quote: 'Our export inquiries tripled after getting the verified badge. The trust score system is a genuine competitive advantage.',
    name: 'Amara Diallo', role: 'Director, Dakar Trade Hub', country: 'Senegal', initials: 'AD', color: '#7c3aed',
  },
]

const PLANS = [
  {
    name: 'Starter', price: '$49', period: '/mo', highlight: false, badge: null,
    desc: 'For importers getting started',
    features: ['Verified business profile', '20 supplier contacts/mo', 'Basic trust score', 'RFQ posting (5/mo)', 'Email support'],
    cta: 'Start free',
  },
  {
    name: 'Growth', price: '$149', period: '/mo', highlight: true, badge: 'Most popular',
    desc: 'For active traders & distributors',
    features: ['Everything in Starter', 'Unlimited contacts', 'Premium verified badge', 'Investment listings', 'Logistics quotes', 'Priority support', 'Full analytics'],
    cta: 'Start 14-day trial',
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', highlight: false, badge: null,
    desc: 'For PE firms & large operators',
    features: ['Everything in Growth', 'Dedicated manager', 'API + webhooks', 'White-label options', 'SLA guarantee', 'Unlimited team seats'],
    cta: 'Contact sales',
  },
]

const LOGOS = ['Dangote Group', 'Emirates NBD', 'MTN Business', 'Ecobank', 'TotalEnergies', 'Africa Finance Corp']

const HOW = [
  { n: '01', title: 'Create your profile', desc: 'Register your business with documents, certifications, and trade history.', color: '#10b981' },
  { n: '02', title: 'Get trust verified', desc: 'Our KYB team reviews your documents and assigns your official trust score.', color: '#1e40af' },
  { n: '03', title: 'Discover & connect', desc: 'Browse suppliers, post RFQs, explore deals, and request freight quotes.', color: '#7c3aed' },
  { n: '04', title: 'Trade with confidence', desc: 'Manage deals, track shipments, and close transactions in your dashboard.', color: '#d97706' },
]

const FOOTER_LINKS = {
  Platform:  [
    { label: 'Marketplace',    href: '/marketplace' },
    { label: 'Invest',         href: '/invest' },
    { label: 'Sourcing',       href: '/sourcing' },
    { label: 'Logistics',      href: '/logistics' },
    { label: 'Market Data',    href: '/market' },
    { label: 'AI Assistant',   href: '/assistant' },
  ],
  Company: [
    { label: 'About us',    href: '#about' },
    { label: 'Careers',     href: '#careers' },
    { label: 'Press kit',   href: '#press' },
    { label: 'Blog',        href: '#blog' },
    { label: 'Partners',    href: '#partners' },
    { label: 'Contact',     href: '#contact' },
  ],
  Resources: [
    { label: 'Documentation',  href: '#docs' },
    { label: 'API Reference',  href: '#api' },
    { label: 'Trade guides',   href: '#guides' },
    { label: 'Webinars',       href: '#webinars' },
    { label: 'Podcast',        href: '#podcast' },
    { label: 'Newsletter',     href: '#newsletter' },
  ],
  Legal: [
    { label: 'Privacy policy',   href: '#privacy' },
    { label: 'Terms of service', href: '#terms' },
    { label: 'Cookie policy',    href: '#cookies' },
    { label: 'Compliance',       href: '#compliance' },
    { label: 'Data processing',  href: '#dpa' },
  ],
}

/* ─── COMPONENTS ─────────────────────────────────────────── */

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  return <span>{target}{suffix}</span>
}

function TradeMap() {
  const dots = [
    { x: 48, y: 52, label: 'Nigeria', active: true },
    { x: 52, y: 42, label: 'Ghana', active: false },
    { x: 58, y: 55, label: 'Kenya', active: true },
    { x: 50, y: 38, label: 'Morocco', active: false },
    { x: 55, y: 65, label: 'South Africa', active: true },
    { x: 46, y: 48, label: 'Côte d\'Ivoire', active: false },
    { x: 62, y: 50, label: 'Ethiopia', active: true },
    { x: 54, y: 58, label: 'Tanzania', active: false },
  ]
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 absolute inset-0">
        <path d="M45 15 C55 12 68 18 72 30 C76 42 73 52 70 62 C74 72 72 82 65 90 C57 98 48 100 40 96 C32 92 26 84 24 74 C20 64 24 54 22 44 C20 34 22 24 30 18 C36 14 40 17 45 15Z"
          fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="0.5"/>
        {dots.map((d, i) => (
          <g key={i}>
            <circle cx={d.x} cy={d.y} r="1.2" fill={d.active ? '#10b981' : '#6ee7b7'} opacity={d.active ? 1 : 0.5}>
              {d.active && (
                <animate attributeName="r" values="1.2;2;1.2" dur="2s" repeatCount="indefinite" begin={`${i*0.4}s`}/>
              )}
            </circle>
          </g>
        ))}
        <line x1="48" y1="52" x2="58" y2="55" stroke="rgba(16,185,129,0.3)" strokeWidth="0.3" strokeDasharray="2 1"/>
        <line x1="58" y1="55" x2="55" y2="65" stroke="rgba(16,185,129,0.3)" strokeWidth="0.3" strokeDasharray="2 1"/>
        <line x1="48" y1="52" x2="50" y2="38" stroke="rgba(16,185,129,0.2)" strokeWidth="0.3" strokeDasharray="2 1"/>
        <line x1="62" y1="50" x2="58" y2="55" stroke="rgba(16,185,129,0.2)" strokeWidth="0.3" strokeDasharray="2 1"/>
      </svg>
    </div>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveFeature(p => (p + 1) % FEATURES.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Geist Sans',system-ui,sans-serif", backgroundColor: '#ffffff', color: '#0f172a' }}>

      {/* ══ HEADER ══ */}
      <header className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? '#e2e8f0' : 'rgba(226,232,240,0.5)'}`,
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
        }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
              <Globe2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-black text-base" style={{ color: '#0f172a' }}>
              AfriBiz<span style={{ color: '#f59e0b' }}>Connect</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {[
              { label: 'Marketplace', href: '/marketplace' },
              { label: 'Invest',      href: '/invest' },
              { label: 'Logistics',   href: '/logistics' },
              { label: 'Sourcing',    href: '/sourcing' },
              { label: 'Market Data', href: '/market' },
              { label: 'Pricing',     href: '#pricing' },
            ].map(n => (
              <Link key={n.href} href={n.href}
                className="text-sm font-semibold px-3.5 py-2 rounded-xl transition-all hover:bg-slate-100"
                style={{ color: '#475569' }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            <Link href="/login" className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-100 transition-all" style={{ color: '#475569' }}>
              Sign in
            </Link>
            <Link href="/register"
              className="flex items-center gap-1.5 text-sm font-black px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow: '0 4px 16px rgba(30,64,175,0.35)' }}>
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden border-t px-5 py-4 space-y-1" style={{ borderColor: '#f1f5f9' }}>
            {['Marketplace','Invest','Logistics','Sourcing','Pricing'].map(n => (
              <Link key={n} href={`/${n.toLowerCase()}`} onClick={() => setMobileOpen(false)}
                className="block text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50" style={{ color: '#374151' }}>{n}</Link>
            ))}
          </div>
        )}
      </header>

      {/* ══ LIVE TICKER ══ */}
      <div className="overflow-hidden border-b h-9 flex items-center shrink-0" style={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}>
        <div className="shrink-0 px-4 h-full flex items-center" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">LIVE</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...TICKER,...TICKER].map((item,i) => (
              <span key={i} className="inline-flex items-center gap-2 px-8 text-[11px] font-medium" style={{ color: 'rgba(148,163,184,0.8)' }}>
                <span className="h-1 w-1 rounded-full inline-block" style={{ backgroundColor: '#34d399' }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ HERO — NO IMAGE, PURE DESIGN ══ */}
      <section className="relative overflow-hidden" style={{ minHeight: '88vh', background: 'linear-gradient(160deg,#0f172a 0%,#1e293b 45%,#0f172a 100%)' }}>
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.03) 1px,transparent 0)', backgroundSize: '32px 32px' }} />
        {/* Glow orbs */}
        <div className="absolute pointer-events-none" style={{ top: '20%', left: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,64,175,0.2) 0%,transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute pointer-events-none" style={{ top: '40%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '10%', left: '40%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 70%)', filter: 'blur(60px)' }} />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-24 relative flex flex-col lg:flex-row items-center gap-16">

          {/* Left */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2 mb-8" style={{ borderColor: 'rgba(52,211,153,0.3)', backgroundColor: 'rgba(52,211,153,0.07)' }}>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold" style={{ color: '#6ee7b7' }}>Africa's #1 B2B Trade Infrastructure</span>
              <ChevronRight className="h-3.5 w-3.5" style={{ color: '#6ee7b7', opacity: 0.6 }} />
            </div>

            <h1 className="font-black tracking-tighter leading-[0.95] mb-7" style={{ fontSize: 'clamp(3rem,7vw,5.5rem)', color: '#f8fafc' }}>
              Where African<br />trade meets<br />
              <span style={{ background: 'linear-gradient(135deg,#6ee7b7 0%,#34d399 35%,#fbbf24 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                global capital
              </span>
            </h1>

            <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(148,163,184,0.85)', maxWidth: 520 }}>
              Connect African importers with verified global suppliers, logistics providers, trade financing, and investors — all on one trusted platform serving 54 markets.
            </p>

            {/* Search bar CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-lg">
              <div className="flex-1 flex items-center gap-2 rounded-2xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Search className="h-4 w-4 shrink-0" style={{ color: 'rgba(148,163,184,0.6)' }} />
                <input type="text" placeholder="Search suppliers, categories..." className="flex-1 bg-transparent text-sm focus:outline-none" style={{ color: 'white' }} />
              </div>
              <Link href="/register"
                className="flex items-center justify-center gap-2 text-sm font-black px-6 py-3 rounded-2xl text-white shrink-0 transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#34d399,#059669)', boxShadow: '0 8px 24px rgba(52,211,153,0.35)' }}>
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
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
                  <Icon className="h-3.5 w-3.5 text-emerald-500" />{label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — visual */}
          <div className="flex-shrink-0 w-full lg:w-[420px] relative">
            <div className="relative h-[480px]">
              {/* Africa map */}
              <div className="absolute inset-0"><TradeMap /></div>

              {/* Floating cards */}
              <div className="absolute top-4 -left-4 rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(52,211,153,0.15)' }}>
                  <BadgeCheck className="h-4.5 w-4.5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">3,200+</div>
                  <div className="text-[11px]" style={{ color: 'rgba(148,163,184,0.7)' }}>Verified suppliers</div>
                </div>
              </div>

              <div className="absolute top-1/3 -right-4 rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(251,191,36,0.15)' }}>
                  <TrendingUp className="h-4.5 w-4.5 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">$2.8B</div>
                  <div className="text-[11px]" style={{ color: 'rgba(148,163,184,0.7)' }}>Trade facilitated</div>
                </div>
              </div>

              <div className="absolute bottom-12 -left-2 rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(30,64,175,0.2)' }}>
                  <MapPin className="h-4.5 w-4.5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">54</div>
                  <div className="text-[11px]" style={{ color: 'rgba(148,163,184,0.7)' }}>African markets</div>
                </div>
              </div>

              {/* Live feed */}
              <div className="absolute bottom-0 right-0 w-56 rounded-2xl overflow-hidden" style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-3 py-2 border-b flex items-center gap-1.5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>Live activity</span>
                </div>
                {[
                  { text: 'RFQ matched — Electronics', flag: '🇳🇬' },
                  { text: 'Shipment cleared customs', flag: '🇰🇪' },
                  { text: '$2.5M deal connected', flag: '🇬🇭' },
                ].map((a,i) => (
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
      <section className="py-10 border-y" style={{ borderColor: '#e8edf3', backgroundColor: '#fafbfc' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] mb-7" style={{ color: '#94a3b8' }}>Trusted by leading African enterprises</p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {LOGOS.map(name => (
              <span key={name} className="text-sm font-black uppercase tracking-wider" style={{ color: '#cbd5e1' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" className="py-28 px-5 sm:px-8" style={{ backgroundColor: '#ffffff' }}>
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
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: '#64748b' }}>Built for serious operators — the complete infrastructure layer for cross-border African trade.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Tab list */}
            <div className="space-y-2">
              {FEATURES.map((f, i) => (
                <button key={f.title} onClick={() => setActiveFeature(i)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all"
                  style={{ borderColor: activeFeature===i ? f.color+'30' : '#e2e8f0', backgroundColor: activeFeature===i ? f.bg : 'transparent', boxShadow: activeFeature===i ? `0 4px 16px ${f.color}15` : 'none' }}>
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: activeFeature===i ? f.bg : '#f1f5f9' }}>
                    <f.icon className="h-5 w-5" style={{ color: activeFeature===i ? f.color : '#94a3b8' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black mb-0.5" style={{ color: '#0f172a' }}>{f.title}</div>
                    {activeFeature===i && <div className="text-xs leading-snug" style={{ color: '#64748b' }}>{f.desc}</div>}
                  </div>
                  {activeFeature===i && <span className="text-[10px] font-black px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: f.bg, color: f.color }}>{f.stat}</span>}
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="sticky top-24 rounded-3xl border overflow-hidden" style={{ borderColor: '#e2e8f0', boxShadow: '0 8px 48px rgba(0,0,0,0.06)', backgroundColor: 'white', minHeight: 380 }}>
              {(() => {
                const f = FEATURES[activeFeature]
                return (
                  <div className="p-8">
                    <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: f.bg }}>
                      <f.icon className="h-7 w-7" style={{ color: f.color }} />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: f.color }}>{f.num}</div>
                    <h3 className="text-2xl font-black mb-3" style={{ color: '#0f172a' }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed mb-8" style={{ color: '#64748b' }}>{f.desc}</p>
                    <div className="rounded-2xl p-5" style={{ backgroundColor: f.bg, border: `1px solid ${f.color}20` }}>
                      <div className="flex items-center gap-3 mb-4">
                        <BadgeCheck className="h-5 w-5 shrink-0" style={{ color: f.color }} />
                        <span className="text-sm font-black" style={{ color: f.color }}>Platform stat: {f.stat}</span>
                      </div>
                      {['Available on all plans','Unlimited on Growth+','Enterprise API access'].map((pt,j) => (
                        <div key={j} className="flex items-center gap-2.5 mb-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: f.color }} />
                          <span className="text-xs font-medium" style={{ color: f.color }}>{pt}</span>
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
      <section className="py-24 px-5 sm:px-8 border-y" style={{ borderColor: '#e8edf3', backgroundColor: '#fafbfc' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-amber-500 to-transparent" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#d97706' }}>How it works</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter mb-14" style={{ color: '#0f172a' }}>
            From signup to first<br />
            <span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              trade deal in days
            </span>
          </h2>
          <div className="grid md:grid-cols-4 gap-5">
            {HOW.map((h,i) => (
              <div key={h.n} className="relative rounded-2xl border bg-white p-6" style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${h.color}15` }}>
                  <span className="text-xl font-black" style={{ color: h.color }}>{h.n}</span>
                </div>
                <h3 className="text-sm font-black mb-2" style={{ color: '#0f172a' }}>{h.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{h.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-slate-300 text-lg font-black z-10">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-28 px-5 sm:px-8" style={{ backgroundColor: '#ffffff' }}>
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
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="rounded-2xl bg-white border p-7 flex flex-col" style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex gap-0.5 mb-5">{[...Array(5)].map((_,j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
                <blockquote className="text-sm leading-relaxed flex-1 mb-6 italic" style={{ color: '#374151' }}>"{t.quote}"</blockquote>
                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: '#f1f5f9' }}>
                  <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-xs font-black text-white shrink-0" style={{ backgroundColor: t.color }}>{t.initials}</div>
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
      <section id="pricing" className="py-28 px-5 sm:px-8 border-y" style={{ borderColor: '#e8edf3', backgroundColor: '#fafbfc' }}>
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
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: '#64748b' }}>Start free. Upgrade when you're ready to scale your trade.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl">
            {PLANS.map(plan => (
              <div key={plan.name} className="relative rounded-2xl flex flex-col p-8 transition-all"
                style={plan.highlight
                  ? { background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1e40af 100%)', boxShadow: '0 20px 60px rgba(30,64,175,0.3)' }
                  : { backgroundColor: 'white', border: '1px solid #e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }
                }>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] font-black px-3.5 py-1 rounded-full" style={{ backgroundColor: '#fbbf24', color: '#0f172a' }}>
                    <Zap className="h-2.5 w-2.5" /> {plan.badge}
                  </div>
                )}
                <div className="text-[11px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: plan.highlight ? 'rgba(147,197,253,0.7)' : '#94a3b8' }}>{plan.name}</div>
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

      {/* ══ NEWSLETTER CTA ══ */}
      <section className="py-20 px-5 sm:px-8" style={{ background: 'linear-gradient(135deg,#1e40af 0%,#0f172a 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#60a5fa' }}>Stay connected</div>
          <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Get African trade insights weekly</h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(147,197,253,0.7)' }}>Market data, commodity prices, currency updates, and investment opportunities — in your inbox every Monday.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@business.com"
              className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white' }} />
            <button className="px-5 py-3 rounded-xl text-sm font-black text-blue-900 transition-all hover:opacity-90" style={{ backgroundColor: '#fbbf24' }}>
              Subscribe
            </button>
          </div>
          <p className="text-[11px] mt-3" style={{ color: 'rgba(147,197,253,0.4)' }}>Join 8,400+ trade professionals. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-28 px-5 sm:px-8 relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(30,64,175,0.04) 1px,transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="font-black tracking-tighter mb-5" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#0f172a' }}>
            Ready to trade smarter?
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto leading-relaxed" style={{ color: '#64748b' }}>
            Join 12,400+ African businesses growing their global trade on AfriBizConnect.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/register"
              className="flex items-center gap-2 text-sm font-black px-8 py-4 rounded-2xl text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow: '0 8px 32px rgba(30,64,175,0.3)' }}>
              Start for free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/login"
              className="flex items-center gap-2 text-sm font-medium px-8 py-4 rounded-2xl border transition-all hover:bg-slate-50"
              style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
              Sign in to existing account
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PREMIUM FOOTER ══ */}
      <footer style={{ background: 'linear-gradient(180deg,#080f1e 0%,#030812 100%)' }}>
        {/* Main grid */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-7 gap-10 mb-12">

            {/* Brand — 3 cols wide */}
            <div className="col-span-2 lg:col-span-3">
              <Link href="/" className="flex items-center gap-2.5 mb-5">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                  <Globe2 className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="font-black text-base text-white">AfriBiz<span style={{ color: '#fbbf24' }}>Connect</span></span>
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-[260px]" style={{ color: 'rgba(100,116,139,0.7)' }}>
                Africa's B2B trade infrastructure and investment platform — connecting 54 markets with verified global suppliers, logistics providers, and investors.
              </p>

              {/* Contact */}
              <div className="space-y-2 mb-6">
                <a href="mailto:hello@afribizconnect.com" className="flex items-center gap-2 text-xs transition-colors hover:text-white" style={{ color: 'rgba(100,116,139,0.6)' }}>
                  <Mail className="h-3.5 w-3.5" /> hello@afribizconnect.com
                </a>
                <a href="tel:+97142000000" className="flex items-center gap-2 text-xs transition-colors hover:text-white" style={{ color: 'rgba(100,116,139,0.6)' }}>
                  <Phone className="h-3.5 w-3.5" /> +971 4 200 0000 (Dubai HQ)
                </a>
              </div>

              {/* Social icons */}
              <div className="flex gap-2">
                {[
                 { icon: Link2,  href: 'https://linkedin.com',  label: 'LinkedIn' },
                 { icon: Share2, href: 'https://twitter.com',   label: 'Twitter' },
                 { icon: Video,  href: 'https://youtube.com',   label: 'YouTube' },
                 { icon: Camera, href: 'https://instagram.com', label: 'Instagram' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="h-8 w-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/15"
                    style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.05)' }}
                    aria-label={s.label}>
                    <s.icon className="h-3.5 w-3.5" style={{ color: 'rgba(148,163,184,0.6)' }} />
                  </a>
                ))}
              </div>

              {/* Status */}
              <div className="flex items-center gap-1.5 mt-5 text-xs" style={{ color: '#34d399' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All systems operational
              </div>
            </div>

            {/* Link columns — 4 cols */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: 'rgba(100,116,139,0.5)' }}>{heading}</div>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-xs transition-colors hover:text-white flex items-center gap-1 group" style={{ color: 'rgba(100,116,139,0.6)' }}>
                        {link.label}
                        {link.href.startsWith('http') && <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider with badges */}
          <div className="border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <p className="text-[11px]" style={{ color: 'rgba(100,116,139,0.4)' }}>
                © 2025 AfriBizConnect Ltd. Registered in Dubai International Financial Centre (DIFC).
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {['ISO 27001 Certified','DIFC Licensed','GDPR Compliant','54 African Markets'].map(badge => (
                  <span key={badge} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(100,116,139,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* App stores + awards row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[11px]" style={{ color: 'rgba(100,116,139,0.3)' }}>Available on:</span>
                {['App Store','Google Play'].map(store => (
                  <span key={store} className="text-[10px] font-bold px-2.5 py-1 rounded-lg cursor-pointer hover:bg-white/10 transition-all" style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(148,163,184,0.5)' }}>
                    {store}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px]" style={{ color: 'rgba(100,116,139,0.3)' }}>Backed by:</span>
                {['Y Combinator','Africa Finance Corp','IFC'].map(backer => (
                  <span key={backer} className="text-[10px] font-bold" style={{ color: 'rgba(100,116,139,0.3)' }}>{backer}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}