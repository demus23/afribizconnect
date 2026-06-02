'use client'
import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Globe2, Clock, DollarSign, ArrowRight, BadgeCheck, Filter, Flame, ArrowUpRight, MapPin, BarChart3, Users, ChevronRight } from 'lucide-react'

const TYPES = ['All','Equity','Debt','Trade Finance','Joint Venture','Acquisition']

const TYPE_STYLES: Record<string,{bg:string,color:string,border:string}> = {
  'Equity':        { bg:'#f5f3ff', color:'#7c3aed', border:'#ddd6fe' },
  'Debt':          { bg:'#eff6ff', color:'#1e40af', border:'#bfdbfe' },
  'Trade Finance': { bg:'#f0fdf4', color:'#059669', border:'#bbf7d0' },
  'Joint Venture': { bg:'#fffbeb', color:'#d97706', border:'#fde68a' },
  'Acquisition':   { bg:'#fef2f2', color:'#dc2626', border:'#fecaca' },
}

const OPPS = [
  { id:1, title:'Nairobi Logistics Hub Expansion', type:'Equity', sector:'Logistics', country:'Kenya', stage:'Series A', target:8_000_000, min:250_000, ret:28, timeline:'4–6 yrs', verified:true, hot:true, flag:'🇰🇪', img:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=220&fit=crop&q=80', filled:72, desc:'East Africa\'s fastest-growing cold-chain logistics operator expanding to 3 new cities.' },
  { id:2, title:'Ghana Cocoa Processing Facility', type:'Trade Finance', sector:'Agriculture', country:'Ghana', stage:'Growth', target:3_500_000, min:100_000, ret:14, timeline:'18 months', verified:true, hot:false, flag:'🇬🇭', img:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=220&fit=crop&q=80', filled:45, desc:'Structured trade finance for established cocoa processor supplying European premium brands.' },
  { id:3, title:'Lagos PropTech Platform', type:'Equity', sector:'Real Estate Tech', country:'Nigeria', stage:'Pre-Series A', target:5_000_000, min:150_000, ret:35, timeline:'5 years', verified:true, hot:true, flag:'🇳🇬', img:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=220&fit=crop&q=80', filled:89, desc:'SaaS platform digitising property transactions. 12k active users, $1.2M ARR.' },
  { id:4, title:'Morocco Solar Farm Phase 2', type:'Debt', sector:'Energy', country:'Morocco', stage:'Infrastructure', target:20_000_000, min:500_000, ret:11, timeline:'10 years', verified:true, hot:false, flag:'🇲🇦', img:'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=220&fit=crop&q=80', filled:31, desc:'Green bond financing for 40MW solar installation with government-backed offtake.' },
  { id:5, title:'Ethiopia Textile Export JV', type:'Joint Venture', sector:'Textiles', country:'Ethiopia', stage:'Operational', target:4_000_000, min:200_000, ret:22, timeline:'3 years', verified:true, hot:false, flag:'🇪🇹', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop&q=80', filled:58, desc:'Scale existing garment factory serving US and EU fast-fashion brands.' },
  { id:6, title:'Egypt Agri Import Financing', type:'Trade Finance', sector:'Agriculture', country:'Egypt', stage:'Recurring', target:6_000_000, min:50_000, ret:12, timeline:'12 months', verified:false, hot:false, flag:'🇪🇬', img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=220&fit=crop&q=80', filled:20, desc:'Short-term revolving trade finance facility for Egypt\'s largest grain importer.' },
]

const fmt = (n:number) => n>=1_000_000 ? `$${(n/1_000_000).toFixed(1)}M` : `$${(n/1_000).toFixed(0)}K`

export default function InvestPage() {
  const [active, setActive] = useState('All')

  const filtered = active==='All' ? OPPS : OPPS.filter(o=>o.type===active)

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Investment Opportunities</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Curated Africa-focused deals — equity, debt, and trade finance</p>
        </div>
        <Link href="/invest/new"
          className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
          style={{ background:'linear-gradient(135deg,#059669,#047857)', boxShadow:'0 4px 12px rgba(5,150,105,0.3)' }}>
          List Opportunity <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Total deal flow', value:'$46.5M', icon:DollarSign, color:'#1e40af', bg:'#eff6ff' },
          { label:'Active deals',    value:'24',     icon:TrendingUp, color:'#059669', bg:'#f0fdf4' },
          { label:'Avg. return',     value:'21.4%',  icon:BarChart3,  color:'#7c3aed', bg:'#f5f3ff' },
        ].map(m=>(
          <div key={m.label} className="rounded-2xl bg-white border p-5 flex items-center gap-4"
            style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor:m.bg }}>
              <m.icon className="h-5 w-5" style={{ color:m.color }} />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight" style={{ color:'#0f172a' }}>{m.value}</div>
              <div className="text-xs" style={{ color:'#64748b' }}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Type filters */}
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(t=>(
          <button key={t} onClick={()=>setActive(t)}
            className="text-xs font-bold px-4 py-2 rounded-xl border transition-all"
            style={active===t
              ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' }
              : { borderColor:'#e2e8f0', color:'#475569', backgroundColor:'white' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(o=>{
          const ts = TYPE_STYLES[o.type] || TYPE_STYLES['Equity']
          return (
            <Link key={o.id} href={`/invest/${o.id}`}
              className="group bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 flex flex-col"
              style={{ borderColor:o.hot?'#fde68a':'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>

              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img src={o.img} alt={o.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)' }} />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm"
                    style={{ background:ts.bg+'ee', color:ts.color, border:`1px solid ${ts.border}` }}>
                    {o.type}
                  </span>
                  {o.hot && <span className="flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full" style={{ background:'#fbbf24', color:'#0f172a' }}><Flame className="h-2.5 w-2.5" /> Hot</span>}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  {o.verified && <BadgeCheck className="h-4 w-4 text-emerald-400 drop-shadow" />}
                  <span className="text-lg">{o.flag}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-sm font-black text-white leading-snug drop-shadow">{o.title}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-3">
                  <MapPin className="h-3 w-3" style={{ color:'#94a3b8' }} />
                  <span className="text-[11px]" style={{ color:'#94a3b8' }}>{o.country} · {o.sector} · {o.stage}</span>
                </div>
                <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color:'#64748b' }}>{o.desc}</p>

                {/* Fill bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span style={{ color:'#94a3b8' }}>Funding progress</span>
                    <span className="font-black" style={{ color:'#059669' }}>{o.filled}% filled</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor:'#f1f5f9' }}>
                    <div className="h-full rounded-full" style={{ width:`${o.filled}%`, background:'linear-gradient(90deg,#10b981,#059669)' }} />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t mt-auto" style={{ borderColor:'#f1f5f9' }}>
                  {[{label:'Return',val:`${o.ret}%`,color:'#059669'},{label:'Min ticket',val:fmt(o.min),color:'#1e40af'},{label:'Target',val:fmt(o.target),color:'#7c3aed'}].map(m=>(
                    <div key={m.label} className="text-center p-2 rounded-xl" style={{ background:'#f8fafc' }}>
                      <div className="text-sm font-black" style={{ color:m.color }}>{m.val}</div>
                      <div className="text-[10px] mt-0.5" style={{ color:'#94a3b8' }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mt-3 text-[11px]" style={{ color:'#94a3b8' }}>
                  <Clock className="h-3 w-3" /> Timeline: {o.timeline}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
