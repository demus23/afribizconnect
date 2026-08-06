'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Globe2, ShieldCheck, TrendingUp, Truck,
  BarChart3, Star, BadgeCheck, Zap, Lock, Award,
  ChevronRight, Menu, X, ArrowUpRight
} from 'lucide-react'

/* ─── INJECTED STYLES ─────────────────────────────────── */
const CSS = `
@keyframes ticker  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes dash    { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
@keyframes dash2   { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }
@keyframes dash3   { from{stroke-dashoffset:500} to{stroke-dashoffset:0} }
@keyframes dotPulse{ 0%,100%{r:3;opacity:0.9} 50%{r:5.5;opacity:0.4} }
@keyframes dotPulse2{0%,100%{r:2.5;opacity:0.8} 50%{r:5;opacity:0.3} }
@keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideRight{from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)}}
@keyframes float1  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes float2  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes glowBob { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.05)} }
@keyframes tradePacket {
  0%   { offset-distance: 0%;   opacity:0 }
  5%   { opacity:1 }
  95%  { opacity:1 }
  100% { offset-distance: 100%; opacity:0 }
}
.animate-ticker { animation: ticker 40s linear infinite; }
.fade-up        { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; }
.fade-up-2      { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s forwards; opacity:0; }
.fade-up-3      { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s forwards; opacity:0; }
.slide-right    { animation: slideRight 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; opacity:0; }
.float-card1    { animation: float1 5s ease-in-out infinite; }
.float-card2    { animation: float2 6s ease-in-out infinite 0.8s; }
.float-card3    { animation: float1 4.5s ease-in-out infinite 1.5s; }
.glow-bob       { animation: glowBob 4s ease-in-out infinite; }
.card-hover     { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.card-hover:hover { transform: translateY(-4px); }
.route1 { animation: dash  4s ease-in-out infinite; }
.route2 { animation: dash2 5s ease-in-out infinite 0.8s; }
.route3 { animation: dash3 4.5s ease-in-out infinite 1.6s; }
.route4 { animation: dash  3.5s ease-in-out infinite 2.4s; }
.route5 { animation: dash2 4s ease-in-out infinite 0.4s; }
.route6 { animation: dash3 5s ease-in-out infinite 1.2s; }
.dot-a  { animation: dotPulse  2.5s ease-in-out infinite; }
.dot-b  { animation: dotPulse2 3s ease-in-out infinite 0.5s; }
.dot-c  { animation: dotPulse  2s ease-in-out infinite 1s; }
.dot-d  { animation: dotPulse2 2.8s ease-in-out infinite 1.5s; }
.dot-e  { animation: dotPulse  3.2s ease-in-out infinite 0.3s; }
.dot-f  { animation: dotPulse2 2.5s ease-in-out infinite 0.8s; }
.dot-g  { animation: dotPulse  3s ease-in-out infinite 1.8s; }
.dot-h  { animation: dotPulse2 2.3s ease-in-out infinite 0.6s; }
.feature-card { transition: all 0.25s ease; }
.feature-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.12) !important; }
.plan-card { transition: all 0.25s ease; }
.plan-card:hover { transform: translateY(-4px); }
`

/* ─── DATA ────────────────────────────────────────────── */
const TICKER = ['🇳🇬 Nigeria · Electronics · $2.4M closed','🇦🇪 UAE → Ghana · FMCG · Verified','🇰🇪 Kenya · Series A $8M raised','🇲🇦 Morocco · Auto Parts · 500MT','🇪🇬 Egypt → Saudi · LC agreed','🇿🇦 South Africa · PE · $25M','🇬🇭 Ghana · Cashew · $800K matched','🇪🇹 Ethiopia · Textiles · JV signed','🇸🇳 Senegal · Groundnuts · 800MT','🇷🇼 Rwanda · Tourism · $6M closed']

const NAV = [
  {label:'Marketplace',href:'/marketplace'},
  {label:'Invest',href:'/invest'},
  {label:'Logistics',href:'/logistics'},
  {label:'Sourcing',href:'/sourcing'},
  {label:'Market Data',href:'/market'},
  {label:'Pricing',href:'/pricing'},
]

const FEATURES = [
  {icon:ShieldCheck,title:'Verified trust scores',desc:'KYB-screened 0–100 rating on every business',color:'#34d399',bg:'rgba(52,211,153,0.15)',border:'rgba(52,211,153,0.3)'},
  {icon:Globe2,title:'Global supplier search',desc:'3,200+ verified suppliers from UAE, China, Turkey',color:'#93c5fd',bg:'rgba(147,197,253,0.15)',border:'rgba(147,197,253,0.3)'},
  {icon:TrendingUp,title:'Investment network',desc:'Equity, debt & trade finance deal flow',color:'#c4b5fd',bg:'rgba(196,181,253,0.15)',border:'rgba(196,181,253,0.3)'},
  {icon:Truck,title:'Freight & logistics',desc:'Quotes, tracking, customs in 54 countries',color:'#fde68a',bg:'rgba(253,230,138,0.15)',border:'rgba(253,230,138,0.3)'},
  {icon:BarChart3,title:'Live market data',desc:'FX rates, commodities, African business news',color:'#6ee7b7',bg:'rgba(110,231,183,0.15)',border:'rgba(110,231,183,0.3)'},
  {icon:Zap,title:'AI trade assistant',desc:'Duties, Incoterms, AfCFTA instant answers',color:'#fca5a5',bg:'rgba(252,165,165,0.15)',border:'rgba(252,165,165,0.3)'},
]

const TESTIMONIALS = [
  {quote:'Cut sourcing time by 70%. Closed first LC with UAE partner in 2 weeks. Nothing else compares.',name:'Adaeze Okonkwo',role:'CEO, Lagos Prime Imports',flag:'🇳🇬',initials:'AO'},
  {quote:'Deployed $12M into three African deals in 4 months. Verified profiles made due diligence fast.',name:'Khalid Al-Rashidi',role:'Partner, Gulf Africa Fund',flag:'🇦🇪',initials:'KR'},
  {quote:'Export inquiries tripled after the verified badge. Genuinely transformative for our business.',name:'Amara Diallo',role:'Director, Dakar Trade Hub',flag:'🇸🇳',initials:'AD'},
]

const PLANS = [
  {name:'Starter',price:'$49',per:'/mo',badge:null,features:['Verified profile','5 RFQs/month','20 contacts','Email support'],cta:'Start free'},
  {name:'Growth',price:'$149',per:'/mo',badge:'Most popular',features:['Everything in Starter','Unlimited RFQs','Investment listings','Logistics quotes','Analytics'],cta:'Start 14-day trial'},
  {name:'Enterprise',price:'Custom',per:'',badge:null,features:['Everything in Growth','Dedicated manager','API access','White-label','SLA guarantee'],cta:'Contact sales'},
]

const FOOTER_LINKS = {
  Platform:  [{label:'Marketplace',href:'/marketplace'},{label:'Invest',href:'/invest'},{label:'Sourcing',href:'/sourcing'},{label:'Logistics',href:'/logistics'},{label:'Market Data',href:'/market'},{label:'AI Assistant',href:'/assistant'},{label:'Trade Hub',href:'/trade'},{label:'Pricing',href:'/pricing'}],
  Company:   [{label:'About us',href:'/about'},{label:'Careers',href:'/careers'},{label:'News',href:'/news'},{label:'Contact',href:'/contact'},{label:'Partners',href:'/about'},{label:'Press kit',href:'/about'}],
  Resources: [{label:'Trade guides',href:'/news'},{label:'Webinars',href:'/news'},{label:'Podcast',href:'/news'},{label:'Newsletter',href:'/contact'},{label:'Help centre',href:'/contact'},{label:'API docs',href:'/about'}],
  Legal:     [{label:'Privacy policy',href:'/privacy'},{label:'Terms of service',href:'/terms'},{label:'Cookie policy',href:'/cookies'},{label:'Compliance',href:'/about'}],
}

/* ─── AFRICA MAP SVG ──────────────────────────────────── */
function AfricaMap() {
  // Key city coordinates in the SVG viewBox (0 0 500 560)
  const cities = [
    {id:'lagos',   x:157, y:248, label:'Lagos',        dot:'dot-a', flag:'🇳🇬'},
    {id:'accra',   x:143, y:255, label:'Accra',         dot:'dot-b', flag:'🇬🇭'},
    {id:'nairobi', x:310, y:278, label:'Nairobi',       dot:'dot-c', flag:'🇰🇪'},
    {id:'addis',   x:318, y:248, label:'Addis Ababa',   dot:'dot-d', flag:'🇪🇹'},
    {id:'cairo',   x:290, y:142, label:'Cairo',         dot:'dot-e', flag:'🇪🇬'},
    {id:'casablanca',x:148,y:128,label:'Casablanca',    dot:'dot-f', flag:'🇲🇦'},
    {id:'johannesburg',x:268,y:418,label:'Johannesburg',dot:'dot-g', flag:'🇿🇦'},
    {id:'dakar',   x:108, y:212, label:'Dakar',         dot:'dot-h', flag:'🇸🇳'},
    {id:'dar',     x:310, y:308, label:'Dar es Salaam', dot:'dot-b', flag:'🇹🇿'},
    {id:'kampala', x:298, y:278, label:'Kampala',       dot:'dot-a', flag:'🇺🇬'},
    {id:'abidjan', x:142, y:258, label:'Abidjan',       dot:'dot-c', flag:'🇨🇮'},
    {id:'kigali',  x:286, y:292, label:'Kigali',        dot:'dot-d', flag:'🇷🇼'},
  ]

  // Trade routes [from, to] using coordinates
  const routes = [
    {x1:157,y1:248, x2:143,y2:255, cls:'route1', color:'rgba(251,191,36,0.7)'},     // Lagos → Accra
    {x1:157,y1:248, x2:290,y2:142, cls:'route2', color:'rgba(147,197,253,0.6)'},    // Lagos → Cairo
    {x1:310,y1:278, x2:318,y2:248, cls:'route3', color:'rgba(52,211,153,0.7)'},     // Nairobi → Addis
    {x1:310,y1:278, x2:268,y2:418, cls:'route4', color:'rgba(196,181,253,0.6)'},    // Nairobi → Joburg
    {x1:290,y1:142, x2:148,y2:128, cls:'route5', color:'rgba(251,191,36,0.5)'},     // Cairo → Casablanca
    {x1:108,y1:212, x2:157,y2:248, cls:'route6', color:'rgba(110,231,183,0.6)'},    // Dakar → Lagos
    {x1:157,y1:248, x2:310,y2:278, cls:'route1', color:'rgba(147,197,253,0.5)'},    // Lagos → Nairobi
    {x1:268,y1:418, x2:310,y2:278, cls:'route2', color:'rgba(52,211,153,0.5)'},     // Joburg → Dar
    {x1:290,y1:142, x2:310,y2:278, cls:'route3', color:'rgba(251,191,36,0.4)'},     // Cairo → Nairobi
  ]

  return (
    <svg viewBox="0 0 500 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="countryGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Africa continent — detailed simplified path */}
      {/* Morocco */}
      <path d="M148 82 L192 80 L205 95 L198 118 L185 128 L165 132 L148 128 L135 115 L138 95Z" fill="rgba(59,130,246,0.25)" stroke="rgba(147,197,253,0.5)" strokeWidth="0.8"/>
      {/* Algeria/Tunisia */}
      <path d="M192 80 L265 78 L275 88 L268 108 L255 118 L230 120 L205 115 L198 118 L205 95Z" fill="rgba(59,130,246,0.2)" stroke="rgba(147,197,253,0.4)" strokeWidth="0.7"/>
      {/* Libya */}
      <path d="M265 78 L315 80 L325 92 L318 118 L305 128 L280 130 L268 118 L275 88Z" fill="rgba(59,130,246,0.22)" stroke="rgba(147,197,253,0.4)" strokeWidth="0.7"/>
      {/* Egypt */}
      <path d="M315 80 L350 82 L355 98 L348 125 L332 142 L310 148 L295 142 L288 128 L290 112 L305 100 L318 92Z" fill="rgba(59,130,246,0.28)" stroke="rgba(147,197,253,0.6)" strokeWidth="0.9" filter="url(#glow)"/>
      {/* Sudan/South Sudan */}
      <path d="M295 142 L332 142 L348 158 L345 185 L338 210 L318 222 L295 220 L280 205 L278 185 L285 165Z" fill="rgba(59,130,246,0.2)" stroke="rgba(147,197,253,0.35)" strokeWidth="0.7"/>
      {/* Ethiopia */}
      <path d="M318 210 L345 210 L365 220 L372 240 L360 258 L338 262 L318 255 L305 242 L308 225Z" fill="rgba(52,211,153,0.3)" stroke="rgba(52,211,153,0.6)" strokeWidth="0.9" filter="url(#glow)"/>
      {/* Somalia */}
      <path d="M338 255 L365 248 L380 262 L375 285 L360 302 L342 308 L330 295 L335 275Z" fill="rgba(59,130,246,0.18)" stroke="rgba(147,197,253,0.35)" strokeWidth="0.7"/>
      {/* Kenya */}
      <path d="M295 255 L318 255 L330 270 L325 295 L310 308 L295 312 L278 300 L272 280 L280 262Z" fill="rgba(52,211,153,0.28)" stroke="rgba(52,211,153,0.55)" strokeWidth="0.9" filter="url(#glow)"/>
      {/* Tanzania */}
      <path d="M278 298 L310 298 L325 312 L322 335 L308 350 L285 355 L268 345 L262 328 L265 312Z" fill="rgba(59,130,246,0.22)" stroke="rgba(147,197,253,0.4)" strokeWidth="0.7"/>
      {/* Uganda/Rwanda */}
      <path d="M272 258 L295 255 L298 278 L285 292 L268 298 L258 285 L260 268Z" fill="rgba(196,181,253,0.25)" stroke="rgba(196,181,253,0.45)" strokeWidth="0.8"/>
      {/* Mozambique/Zimbabwe */}
      <path d="M268 342 L308 342 L318 360 L315 388 L300 405 L278 410 L262 398 L255 378 L258 358Z" fill="rgba(59,130,246,0.2)" stroke="rgba(147,197,253,0.35)" strokeWidth="0.7"/>
      {/* South Africa */}
      <path d="M240 405 L278 405 L300 420 L308 442 L295 465 L268 478 L245 475 L228 462 L220 442 L225 420Z" fill="rgba(52,211,153,0.25)" stroke="rgba(52,211,153,0.5)" strokeWidth="0.9" filter="url(#glow)"/>
      {/* Namibia/Botswana */}
      <path d="M210 358 L255 355 L268 370 L268 400 L240 405 L215 398 L200 380 L202 362Z" fill="rgba(59,130,246,0.18)" stroke="rgba(147,197,253,0.32)" strokeWidth="0.7"/>
      {/* Angola */}
      <path d="M195 295 L232 292 L248 308 L250 338 L235 355 L210 358 L192 345 L185 325 L190 305Z" fill="rgba(59,130,246,0.2)" stroke="rgba(147,197,253,0.35)" strokeWidth="0.7"/>
      {/* DRC */}
      <path d="M232 248 L278 248 L292 260 L290 295 L272 308 L248 308 L232 295 L225 275 L228 258Z" fill="rgba(59,130,246,0.22)" stroke="rgba(147,197,253,0.38)" strokeWidth="0.7"/>
      {/* Zambia/Malawi */}
      <path d="M265 300 L290 298 L305 312 L305 338 L285 350 L262 348 L248 332 L248 312Z" fill="rgba(59,130,246,0.18)" stroke="rgba(147,197,253,0.32)" strokeWidth="0.7"/>
      {/* Cameroon/Gabon */}
      <path d="M195 238 L228 235 L235 250 L225 268 L205 275 L188 268 L182 252Z" fill="rgba(59,130,246,0.2)" stroke="rgba(147,197,253,0.35)" strokeWidth="0.7"/>
      {/* Nigeria */}
      <path d="M155 222 L198 218 L212 232 L208 252 L192 262 L168 265 L152 255 L145 240 L148 228Z" fill="rgba(251,191,36,0.3)" stroke="rgba(251,191,36,0.6)" strokeWidth="1" filter="url(#glow)"/>
      {/* Ghana/Togo/Benin */}
      <path d="M130 235 L158 232 L165 248 L160 262 L143 268 L125 262 L118 248 L122 238Z" fill="rgba(251,191,36,0.25)" stroke="rgba(251,191,36,0.5)" strokeWidth="0.9" filter="url(#glow)"/>
      {/* Côte d'Ivoire */}
      <path d="M112 238 L132 235 L140 248 L135 262 L118 268 L105 260 L100 248 L105 238Z" fill="rgba(59,130,246,0.2)" stroke="rgba(147,197,253,0.35)" strokeWidth="0.7"/>
      {/* Senegal/Gambia/Guinea */}
      <path d="M88 195 L118 192 L128 205 L125 222 L108 228 L90 222 L80 210 L82 200Z" fill="rgba(147,197,253,0.25)" stroke="rgba(147,197,253,0.5)" strokeWidth="0.8"/>
      {/* Mali/Niger */}
      <path d="M112 155 L188 148 L210 160 L215 185 L205 205 L182 218 L155 220 L130 215 L108 208 L102 188 L105 168Z" fill="rgba(59,130,246,0.18)" stroke="rgba(147,197,253,0.32)" strokeWidth="0.7"/>
      {/* Chad */}
      <path d="M208 160 L262 158 L272 172 L268 200 L252 215 L228 218 L212 205 L210 182Z" fill="rgba(59,130,246,0.2)" stroke="rgba(147,197,253,0.35)" strokeWidth="0.7"/>
      {/* Western Sahara/Mauritania */}
      <path d="M82 128 L148 125 L148 158 L130 175 L108 188 L82 185 L68 165 L70 145Z" fill="rgba(59,130,246,0.16)" stroke="rgba(147,197,253,0.3)" strokeWidth="0.7"/>

      {/* Trade route lines */}
      {routes.map((r,i) => {
        const len = Math.sqrt((r.x2-r.x1)**2+(r.y2-r.y1)**2)
        const dashLen = Math.round(len)
        return (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke={r.color} strokeWidth="1.5" strokeDasharray={`${dashLen} ${dashLen}`}
            strokeDashoffset={dashLen} strokeLinecap="round"
            className={r.cls} style={{ filter:`drop-shadow(0 0 3px ${r.color})` }} />
        )
      })}

      {/* City dots with labels */}
      {cities.map(c => (
        <g key={c.id}>
          {/* Outer glow ring */}
          <circle cx={c.x} cy={c.y} r="8" fill="rgba(255,255,255,0.05)" />
          {/* Animated dot */}
          <circle cx={c.x} cy={c.y} r="3" className={c.dot}
            fill="#fbbf24" filter="url(#glow)"
            style={{ transformOrigin:`${c.x}px ${c.y}px` }} />
          {/* Label */}
          <text x={c.x+8} y={c.y+4} fontSize="7" fill="rgba(255,255,255,0.75)" fontFamily="system-ui" fontWeight="600">{c.label}</text>
        </g>
      ))}

      {/* External connection arrows (from UAE, China) */}
      <line x1="440" y1="118" x2="290" y2="142" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5" strokeDasharray="8 4" strokeDashoffset="0" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="120" to="0" dur="3s" repeatCount="indefinite"/>
      </line>
      <text x="445" y="115" fontSize="9" fill="rgba(251,191,36,0.8)" fontFamily="system-ui" fontWeight="700">🇦🇪 UAE</text>

      <line x1="460" y1="170" x2="318" y2="248" stroke="rgba(147,197,253,0.4)" strokeWidth="1.5" strokeDasharray="8 4" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="180" to="0" dur="4s" repeatCount="indefinite"/>
      </line>
      <text x="462" y="168" fontSize="9" fill="rgba(147,197,253,0.8)" fontFamily="system-ui" fontWeight="700">🇨🇳 China</text>

      <line x1="445" y1="240" x2="157" y2="248" stroke="rgba(110,231,183,0.4)" strokeWidth="1.5" strokeDasharray="8 4" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="300" to="0" dur="5s" repeatCount="indefinite"/>
      </line>
      <text x="447" y="238" fontSize="9" fill="rgba(110,231,183,0.8)" fontFamily="system-ui" fontWeight="700">🇮🇳 India</text>
    </svg>
  )
}

/* ─── PAGE ────────────────────────────────────────────── */
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [counts, setCounts] = useState({ b:0, m:0, s:0, c:0 })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const targets = { b:12400, m:2800, s:3200, c:54 }
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / 2200, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setCounts({ b:Math.floor(targets.b*e), m:Math.floor(targets.m*e), s:Math.floor(targets.s*e), c:Math.floor(targets.c*e) })
      if (p < 1) requestAnimationFrame(tick)
    }
    setTimeout(() => requestAnimationFrame(tick), 400)
  }, [])

  /* BG: rich royal blue gradient — exactly like the login panel you showed */
  const BG = 'linear-gradient(145deg,#0c1e6b 0%,#1a3aad 30%,#1e40af 55%,#1e3a8a 75%,#0f2460 100%)'
  const SECTION_BG = 'linear-gradient(180deg,#0f2460 0%,#0c1a50 100%)'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div style={{ fontFamily:"'Geist Sans',system-ui,sans-serif", background:'#0c1e6b', color:'#f1f5f9', overflowX:'hidden' }}>

        {/* HEADER */}
        <header className="sticky top-0 z-50 transition-all duration-300"
          style={{ background: scrolled ? 'rgba(12,30,107,0.96)' : 'transparent', backdropFilter:'blur(20px)', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)' }}>
                <Globe2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-black text-[15px] text-white">AfriBiz<span style={{ color:'#fbbf24' }}>Connect</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-0.5 flex-1">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} className="text-sm font-medium px-3.5 py-2 rounded-lg transition-colors hover:bg-white/10" style={{ color:'rgba(191,219,254,0.8)' }}>{n.label}</Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-3 ml-auto">
              <Link href="/login" className="text-sm font-semibold" style={{ color:'rgba(191,219,254,0.7)' }}>Sign in</Link>
              <Link href="/register" className="text-sm font-black px-5 py-2.5 rounded-xl text-blue-900 flex items-center gap-1.5 transition-all hover:scale-105"
                style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow:'0 4px 20px rgba(251,191,36,0.45)' }}>
                Get started free <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <button className="lg:hidden ml-auto p-2 rounded-lg hover:bg-white/10 text-white" onClick={() => setMobile(!mobile)}>
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {mobile && (
            <div className="lg:hidden px-5 pb-4 space-y-1 border-t" style={{ borderColor:'rgba(255,255,255,0.08)', background:'rgba(12,30,107,0.98)' }}>
              {NAV.map(n => <Link key={n.href} href={n.href} className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-white/10" style={{ color:'rgba(191,219,254,0.8)' }}>{n.label}</Link>)}
            </div>
          )}
        </header>

        {/* TICKER */}
        <div className="overflow-hidden border-b" style={{ background:'rgba(0,0,0,0.2)', borderColor:'rgba(255,255,255,0.08)', height:36 }}>
          <div className="h-full flex items-center">
            <div className="shrink-0 px-4 h-full flex items-center" style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>
              <span className="text-[9px] font-black tracking-[0.2em] text-blue-900 uppercase">Live</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex animate-ticker whitespace-nowrap">
                {[...TICKER,...TICKER].map((t,i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-8 text-[11px]" style={{ color:'rgba(191,219,254,0.65)' }}>
                    <span className="h-1 w-1 rounded-full bg-amber-400 inline-block shrink-0" />{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ HERO ══ */}
        <section className="relative overflow-hidden" style={{ background: BG, minHeight:'100vh' }}>
          {/* Stars/dots bg */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage:'radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize:'40px 40px' }} />
          {/* Glow */}
          <div className="absolute glow-bob pointer-events-none" style={{ top:'10%',left:'0%',width:700,height:700,borderRadius:'50%',background:'radial-gradient(circle,rgba(59,130,246,0.25) 0%,transparent 65%)',filter:'blur(40px)' }} />
          <div className="absolute glow-bob pointer-events-none" style={{ bottom:'5%',right:'5%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(251,191,36,0.12) 0%,transparent 65%)',filter:'blur(50px)',animationDelay:'2s' }} />

          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-16 relative">
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">

              {/* LEFT */}
              <div>
                {/* Top badge */}
                <div className="fade-up inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-8 border" style={{ borderColor:'rgba(251,191,36,0.4)', background:'rgba(251,191,36,0.1)' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="text-xs font-bold" style={{ color:'#fde68a' }}>PAN-AFRICAN TRADE PLATFORM</span>
                </div>

                <h1 className="fade-up-2 font-black tracking-tight leading-[0.95] mb-6 text-white" style={{ fontSize:'clamp(2.8rem,6vw,5rem)' }}>
                  Africa's trade<br />
                  infrastructure,<br />
                  <span style={{ color:'#34d399' }}>reimagined.</span>
                </h1>

                <p className="fade-up-3 text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color:'rgba(191,219,254,0.75)' }}>
                  Connect with verified suppliers, investors, and logistics providers across 54 African markets.
                </p>

                {/* Feature bullets */}
                <div className="fade-up-3 space-y-3 mb-10">
                  {[
                    {icon:ShieldCheck, text:'3,200+ KYB-verified global suppliers', color:'#34d399'},
                    {icon:TrendingUp,  text:'$2.8B in trade volume facilitated',    color:'#fbbf24'},
                    {icon:Truck,       text:'Logistics & customs in 54 countries',  color:'#93c5fd'},
                    {icon:BadgeCheck,  text:'ISO 27001 certified · DIFC licensed',  color:'#c4b5fd'},
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0" style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)' }}>
                        <item.icon className="h-4 w-4" style={{ color:item.color }} />
                      </div>
                      <span className="text-sm" style={{ color:'rgba(191,219,254,0.8)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <Link href="/register"
                    className="flex items-center gap-2 text-sm font-black px-7 py-4 rounded-2xl text-blue-900 transition-all hover:scale-105"
                    style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow:'0 8px 32px rgba(251,191,36,0.45)' }}>
                    Create free account <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/marketplace"
                    className="flex items-center gap-2 text-sm font-bold px-7 py-4 rounded-2xl transition-all hover:bg-white/15"
                    style={{ border:'1px solid rgba(255,255,255,0.2)', color:'rgba(191,219,254,0.9)', background:'rgba(255,255,255,0.07)' }}>
                    Browse suppliers <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Testimonial card */}
                <div className="fade-up-3 rounded-2xl p-5" style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', backdropFilter:'blur(12px)' }}>
                  <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_,j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
                  <p className="text-sm italic mb-3" style={{ color:'rgba(191,219,254,0.8)' }}>
                    "Cut our supplier sourcing time by 70%. Closed our first LC with a UAE partner in under 2 weeks."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-black text-white">AO</div>
                    <div>
                      <div className="text-xs font-black text-white">Adaeze Okonkwo 🇳🇬</div>
                      <div className="text-[10px]" style={{ color:'rgba(147,197,253,0.6)' }}>CEO, Lagos Prime Imports</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — Africa map */}
              <div className="slide-right relative">
                <div className="relative">
                  {/* Map container */}
                  <div className="relative rounded-3xl overflow-hidden" style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 40px 80px rgba(0,0,0,0.4)', padding:'16px' }}>
                    {/* Top badge */}
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color:'rgba(191,219,254,0.6)' }}>Live trade routes</span>
                    </div>
                    <AfricaMap />
                  </div>

                  {/* Floating stats */}
                  <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 float-card1" style={{ background:'linear-gradient(135deg,rgba(251,191,36,0.25),rgba(251,191,36,0.12))', border:'1px solid rgba(251,191,36,0.4)', backdropFilter:'blur(16px)' }}>
                    <div className="text-xl font-black text-white">{counts.s.toLocaleString()}+</div>
                    <div className="text-[10px] font-medium" style={{ color:'rgba(253,230,138,0.7)' }}>Verified suppliers</div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3 float-card2" style={{ background:'linear-gradient(135deg,rgba(52,211,153,0.25),rgba(52,211,153,0.12))', border:'1px solid rgba(52,211,153,0.4)', backdropFilter:'blur(16px)' }}>
                    <div className="text-xl font-black text-white">${counts.m.toLocaleString()}M+</div>
                    <div className="text-[10px] font-medium" style={{ color:'rgba(110,231,183,0.7)' }}>Trade facilitated</div>
                  </div>

                  <div className="absolute -top-4 -left-4 rounded-2xl px-4 py-3 float-card3" style={{ background:'linear-gradient(135deg,rgba(147,197,253,0.25),rgba(147,197,253,0.12))', border:'1px solid rgba(147,197,253,0.4)', backdropFilter:'blur(16px)' }}>
                    <div className="text-xl font-black text-white">{counts.c}</div>
                    <div className="text-[10px] font-medium" style={{ color:'rgba(191,219,254,0.7)' }}>African markets</div>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS BAR */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {val:`${counts.b.toLocaleString()}+`,label:'Verified businesses',color:'#93c5fd'},
                {val:`${counts.c}`,label:'African markets',color:'#34d399'},
                {val:`$${counts.m.toLocaleString()}M+`,label:'Trade facilitated',color:'#fbbf24'},
                {val:`${counts.s.toLocaleString()}+`,label:'Global suppliers',color:'#c4b5fd'},
              ].map(s => (
                <div key={s.label} className="rounded-2xl text-center py-6 px-4" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(8px)' }}>
                  <div className="text-3xl font-black mb-1" style={{ color:s.color }}>{s.val}</div>
                  <div className="text-xs font-medium" style={{ color:'rgba(147,197,253,0.6)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <section className="py-10 border-y" style={{ borderColor:'rgba(255,255,255,0.08)', background:'rgba(0,0,0,0.2)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color:'rgba(147,197,253,0.4)' }}>Trusted by leading African enterprises</p>
            <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
              {['Dangote Group','Emirates NBD','MTN Business','Ecobank','TotalEnergies','Africa Finance Corp'].map(l => (
                <span key={l} className="text-sm font-black uppercase tracking-wide" style={{ color:'rgba(147,197,253,0.3)' }}>{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-28 px-5 sm:px-8" style={{ background: SECTION_BG }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background:'linear-gradient(to right,#fbbf24,transparent)' }} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color:'#fbbf24' }}>Platform</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.05] max-w-xl text-white">
                One platform for<br />all your trade needs
              </h2>
              <Link href="/register" className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl text-blue-900 shrink-0" style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>
                Explore all features <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map(f => (
                <div key={f.title} className="feature-card rounded-2xl p-7 relative overflow-hidden cursor-pointer"
                  style={{ background:'rgba(255,255,255,0.06)', border:`1px solid ${f.border}` }}>
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(to right,transparent,${f.color},transparent)` }} />
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor:f.bg, border:`1px solid ${f.border}` }}>
                    <f.icon className="h-5 w-5" style={{ color:f.color }} />
                  </div>
                  <h3 className="text-base font-black mb-2 text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color:'rgba(147,197,253,0.6)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 px-5 sm:px-8 border-y" style={{ borderColor:'rgba(255,255,255,0.08)', background:'rgba(0,0,0,0.15)' }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background:'linear-gradient(to right,#34d399,transparent)' }} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400">How it works</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-6 text-white">
                From signup to<br />first trade deal<br />
                <span style={{ color:'#34d399' }}>in days, not months.</span>
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color:'rgba(147,197,253,0.7)' }}>AfriBizConnect removes every friction point in cross-border African trade. Register, get verified, and connect today.</p>
              <Link href="/register" className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl text-blue-900 w-fit" style={{ background:'linear-gradient(135deg,#34d399,#059669)', boxShadow:'0 4px 20px rgba(52,211,153,0.35)' }}>
                Create free account <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                {n:'01',title:'Create your profile',desc:'Register with trade documents, certifications, and business history.',color:'#34d399'},
                {n:'02',title:'Get KYB verified',desc:'Our team reviews your documents and assigns your official trust score.',color:'#93c5fd'},
                {n:'03',title:'Discover & connect',desc:'Browse suppliers, post RFQs, explore deals, and request freight quotes.',color:'#c4b5fd'},
                {n:'04',title:'Trade with confidence',desc:'Manage deals, track shipments, and close transactions in your dashboard.',color:'#fbbf24'},
              ].map(step => (
                <div key={step.n} className="flex gap-4 p-5 rounded-2xl transition-all hover:-translate-y-0.5" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)' }}>
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-black" style={{ background:`${step.color}20`, color:step.color, border:`1px solid ${step.color}40` }}>{step.n}</div>
                  <div>
                    <div className="text-sm font-black mb-1 text-white">{step.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color:'rgba(147,197,253,0.6)' }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-28 px-5 sm:px-8" style={{ background: SECTION_BG }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background:'linear-gradient(to right,#34d399,transparent)' }} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-400">Social proof</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-14 text-white">
              Trusted across<br />
              <span style={{ color:'#34d399' }}>54 African countries</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t,i) => (
                <div key={i} className="rounded-2xl p-7 flex flex-col" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                  <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_,j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
                  <blockquote className="text-sm leading-relaxed flex-1 mb-6 italic" style={{ color:'rgba(191,219,254,0.8)' }}>"{t.quote}"</blockquote>
                  <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor:'rgba(255,255,255,0.08)' }}>
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background:'rgba(255,255,255,0.15)' }}>{t.initials}</div>
                    <div>
                      <div className="text-sm font-black text-white">{t.name} {t.flag}</div>
                      <div className="text-[11px]" style={{ color:'rgba(147,197,253,0.5)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-24 px-5 sm:px-8 border-y" style={{ borderColor:'rgba(255,255,255,0.08)', background:'rgba(0,0,0,0.15)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background:'linear-gradient(to right,transparent,#fbbf24)' }} />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color:'#fbbf24' }}>Pricing</span>
                <div className="h-px w-10" style={{ background:'linear-gradient(to left,transparent,#fbbf24)' }} />
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-white mb-3">Simple, transparent pricing</h2>
              <p className="text-sm" style={{ color:'rgba(147,197,253,0.65)' }}>Start free. No credit card required. Upgrade when ready.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {PLANS.map(plan => (
                <div key={plan.name} className="plan-card relative rounded-2xl p-7 flex flex-col"
                  style={plan.badge
                    ? { background:'linear-gradient(135deg,rgba(251,191,36,0.2),rgba(251,191,36,0.08))', border:'1.5px solid rgba(251,191,36,0.5)', boxShadow:'0 16px 40px rgba(251,191,36,0.15)' }
                    : { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }
                  }>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black px-3 py-1 rounded-full text-blue-900" style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>
                      ★ {plan.badge}
                    </div>
                  )}
                  <div className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color:'rgba(147,197,253,0.5)' }}>{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-sm" style={{ color:'rgba(147,197,253,0.5)' }}>{plan.per}</span>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-7">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-400">✓</span>
                        <span style={{ color:'rgba(191,219,254,0.75)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="flex items-center justify-center gap-2 text-sm font-black py-3 rounded-xl transition-all"
                    style={plan.badge
                      ? { background:'linear-gradient(135deg,#fbbf24,#f59e0b)', color:'#0c1e6b' }
                      : { background:'rgba(255,255,255,0.1)', color:'white', border:'1px solid rgba(255,255,255,0.15)' }
                    }>
                    {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-xs mt-6" style={{ color:'rgba(147,197,253,0.4)' }}>All paid plans include a 14-day free trial. Cancel anytime.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-5 sm:px-8 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0c1e6b,#1e3a8a,#1e40af)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage:'radial-gradient(rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
          <div className="max-w-3xl mx-auto text-center relative">
            <h2 className="font-black tracking-tighter text-white mb-5" style={{ fontSize:'clamp(2rem,5vw,3.5rem)' }}>
              Join 12,400+ businesses<br />growing African trade
            </h2>
            <p className="text-base mb-10" style={{ color:'rgba(191,219,254,0.7)' }}>Free to start. No card needed. Upgrade when ready.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/register" className="flex items-center gap-2 text-sm font-black px-8 py-4 rounded-2xl text-blue-900 transition-all hover:scale-105" style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow:'0 8px 32px rgba(251,191,36,0.4)' }}>
                Start for free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="flex items-center gap-2 text-sm font-medium px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors" style={{ border:'1px solid rgba(255,255,255,0.2)', color:'rgba(191,219,254,0.8)' }}>
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background:'linear-gradient(180deg,#060e3a 0%,#030820 100%)', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
              <div className="col-span-2">
                <Link href="/" className="flex items-center gap-2.5 mb-5">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,rgba(59,130,246,0.4),rgba(30,64,175,0.4))', border:'1px solid rgba(255,255,255,0.15)' }}>
                    <Globe2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-black text-base text-white">AfriBiz<span style={{ color:'#fbbf24' }}>Connect</span></span>
                </Link>
                <p className="text-xs leading-relaxed mb-5 max-w-[220px]" style={{ color:'rgba(147,197,253,0.5)' }}>
                  Africa's B2B trade infrastructure platform — connecting 54 markets with verified global suppliers and investors.
                </p>
                <div className="space-y-1.5 mb-5 text-xs" style={{ color:'rgba(147,197,253,0.4)' }}>
                  <div>✉ hello@afribizconnect.com</div>
                  <div>📞 +971 4 200 0000 (Dubai HQ)</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs mb-5" style={{ color:'#34d399' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All systems operational
                </div>
                <div className="flex gap-2">
                  {['Li','Tw','YT','IG'].map(s => (
                    <a key={s} href="#" className="h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all hover:bg-white/15" style={{ border:'1px solid rgba(255,255,255,0.1)', color:'rgba(147,197,253,0.45)' }}>{s}</a>
                  ))}
                </div>
              </div>
              {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
                <div key={heading}>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-4" style={{ color:'rgba(147,197,253,0.35)' }}>{heading}</div>
                  <ul className="space-y-2.5">
                    {links.map(l => (
                      <li key={l.label}>
                        <Link href={l.href} className="text-xs transition-colors hover:text-white" style={{ color:'rgba(147,197,253,0.5)' }}>{l.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderColor:'rgba(255,255,255,0.05)' }}>
              <p className="text-[11px]" style={{ color:'rgba(147,197,253,0.25)' }}>© 2025 AfriBizConnect Ltd. Registered in Dubai International Financial Centre (DIFC).</p>
              <div className="flex flex-wrap gap-2">
                {['ISO 27001','DIFC Licensed','GDPR','54 Markets'].map(b => (
                  <span key={b} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background:'rgba(255,255,255,0.04)', color:'rgba(147,197,253,0.3)', border:'1px solid rgba(255,255,255,0.04)' }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}