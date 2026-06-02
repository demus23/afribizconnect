'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Star, BadgeCheck, Globe2, Package, ArrowRight, MapPin, Clock, ChevronDown, Zap, TrendingUp, ArrowUpRight, Filter, X } from 'lucide-react'

const CATEGORIES = ['All','Electronics','FMCG','Textiles','Auto Parts','Agri','Chemicals','Machinery','Cosmetics','Packaging']
const COUNTRIES = ['All Countries','UAE','China','Turkey','India','Saudi Arabia','Germany']

const SUPPLIERS = [
  { id:1, name:'Gulf Electronics Trading', country:'UAE', city:'Dubai', cats:['Electronics','Tech'], score:94, reviews:128, verified:true, featured:true,
    desc:'Premium electronics supplier with 15+ years exporting to Africa. TÜV and ISO 9001 certified.',
    minOrder:'$5,000', lead:'14 days', terms:['LC','TT'], flag:'🇦🇪', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop&q=80' },
  { id:2, name:'Al Madina FMCG Group', country:'UAE', city:'Sharjah', cats:['FMCG','Food'], score:88, reviews:76, verified:true, featured:false,
    desc:'Halal-certified FMCG distributor supplying 20+ African countries. Minimum order $2,000.',
    minOrder:'$2,000', lead:'10 days', terms:['TT','Net30'], flag:'🇦🇪', img:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop&q=80' },
  { id:3, name:'Shenzhen Mega Exports', country:'China', city:'Shenzhen', cats:['Electronics','Machinery'], score:81, reviews:204, verified:true, featured:false,
    desc:'Factory-direct electronics and machinery. OEM/ODM capable. Private label available.',
    minOrder:'$3,000', lead:'21 days', terms:['LC','TT'], flag:'🇨🇳', img:'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop&q=80' },
  { id:4, name:'Istanbul Textile Hub', country:'Turkey', city:'Istanbul', cats:['Textiles','Apparel'], score:79, reviews:53, verified:true, featured:false,
    desc:'Premium fabrics and ready-to-wear garments. 200+ fabric varieties. Quick turnaround.',
    minOrder:'$1,500', lead:'18 days', terms:['LC','Net30'], flag:'🇹🇷', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&q=80' },
  { id:5, name:'Riyadh Auto Parts Co.', country:'Saudi Arabia', city:'Riyadh', cats:['Auto Parts'], score:86, reviews:91, verified:true, featured:false,
    desc:'OEM and aftermarket auto parts for Japanese, European, and American vehicles.',
    minOrder:'$4,000', lead:'12 days', terms:['LC','TT'], flag:'🇸🇦', img:'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=200&fit=crop&q=80' },
  { id:6, name:'Mumbai Agri Exports', country:'India', city:'Mumbai', cats:['Agri','Food'], score:77, reviews:38, verified:false, featured:false,
    desc:'Bulk agricultural commodities — rice, pulses, spices, and oilseeds.',
    minOrder:'$8,000', lead:'25 days', terms:['LC'], flag:'🇮🇳', img:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop&q=80' },
]

function ScorePill({ score }: { score: number }) {
  const color = score>=90?'#10b981':score>=80?'#f59e0b':'#6b7280'
  const bg = score>=90?'#f0fdf4':score>=80?'#fffbeb':'#f9fafb'
  return (
    <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full"
      style={{ background:bg, color, border:`1.5px solid ${color}30` }}>
      <Star className="h-3 w-3 fill-current" /> {score}
    </span>
  )
}

export default function MarketplacePage() {
  const [activeCat, setActiveCat] = useState('All')
  const [view, setView] = useState<'grid'|'list'>('grid')

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Supplier Marketplace</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>3,200+ verified global suppliers across 48 countries</p>
        </div>
        <Link href="/sourcing"
          className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
          style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow:'0 4px 12px rgba(30,64,175,0.3)' }}>
          Post RFQ <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Search + Filter bar */}
      <div className="rounded-2xl bg-white border p-4" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color:'#94a3b8' }} />
            <input type="text" placeholder="Search suppliers, products, countries..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all"
              style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', '--tw-ring-color':'#bfdbfe' } as any} />
          </div>
          <select className="text-sm px-3 py-2.5 rounded-xl border focus:outline-none font-medium"
            style={{ borderColor:'#e2e8f0', color:'#374151' }}>
            {COUNTRIES.map(c=><option key={c}>{c}</option>)}
          </select>
          <select className="text-sm px-3 py-2.5 rounded-xl border focus:outline-none font-medium"
            style={{ borderColor:'#e2e8f0', color:'#374151' }}>
            <option>Sort: Trust Score ↓</option>
            <option>Sort: Reviews ↓</option>
            <option>Sort: Newest</option>
          </select>
          <button className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-colors hover:bg-slate-50"
            style={{ borderColor:'#e2e8f0', color:'#374151' }}>
            <SlidersHorizontal className="h-4 w-4" /> Advanced Filters
          </button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>setActiveCat(cat)}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all"
              style={activeCat===cat
                ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' }
                : { borderColor:'#e2e8f0', color:'#475569', backgroundColor:'white' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-xs" style={{ color:'#64748b' }}>
        <span>Showing <strong style={{ color:'#0f172a' }}>{SUPPLIERS.length}</strong> of 3,200+ suppliers</span>
        <div className="flex items-center gap-2">
          <button onClick={()=>setView('grid')} className="p-1.5 rounded-lg transition-colors" style={{ background:view==='grid'?'#eff6ff':'transparent' }}>
            <div className="grid grid-cols-2 gap-0.5">{[...Array(4)].map((_,i)=><div key={i} className="h-1.5 w-1.5 rounded-sm" style={{ backgroundColor:view==='grid'?'#1e40af':'#94a3b8' }}/>)}</div>
          </button>
          <button onClick={()=>setView('list')} className="p-1.5 rounded-lg transition-colors" style={{ background:view==='list'?'#eff6ff':'transparent' }}>
            <div className="space-y-0.5">{[...Array(3)].map((_,i)=><div key={i} className="h-1 w-5 rounded-full" style={{ backgroundColor:view==='list'?'#1e40af':'#94a3b8' }}/>)}</div>
          </button>
        </div>
      </div>

      {/* Supplier Grid */}
      <div className={view==='grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
        {SUPPLIERS.map(s=>(
          <Link key={s.id} href={`/marketplace/${s.id}`}
            className={`group bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 flex ${view==='list'?'flex-row':'flex-col'}`}
            style={{ borderColor: s.featured?'#fde68a':'#e8edf3', boxShadow: s.featured?'0 1px 4px rgba(245,158,11,0.15)':'0 1px 4px rgba(0,0,0,0.04)' }}>
            {/* Image */}
            <div className={`relative overflow-hidden shrink-0 ${view==='list'?'w-40 h-auto':'h-36 w-full'}`}>
              <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)' }} />
              {s.featured && (
                <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full" style={{ background:'#fbbf24', color:'#0f172a' }}>
                  <Star className="h-2.5 w-2.5 fill-current" /> Featured
                </div>
              )}
              <div className="absolute top-2 right-2 text-xl">{s.flag}</div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black group-hover:text-blue-700 transition-colors" style={{ color:'#0f172a' }}>{s.name}</span>
                    {s.verified && <BadgeCheck className="h-4 w-4 text-emerald-500 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" style={{ color:'#94a3b8' }} />
                    <span className="text-[11px]" style={{ color:'#94a3b8' }}>{s.city}, {s.country}</span>
                  </div>
                </div>
                <ScorePill score={s.score} />
              </div>
              <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color:'#64748b' }}>{s.desc}</p>
              <div className="flex gap-1.5 flex-wrap mb-3">
                {s.cats.map(c=>(
                  <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-full border" style={{ borderColor:'#e2e8f0', color:'#475569', background:'#f8fafc' }}>{c}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] pt-3 border-t mt-auto" style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Package className="h-3 w-3" /> {s.minOrder}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.lead}</span>
                </div>
                <div className="flex gap-1">
                  {s.terms.map(t=>(
                    <span key={t} className="px-1.5 py-0.5 rounded font-bold" style={{ background:'#f0fdf4', color:'#059669' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more */}
      <div className="flex justify-center pb-4">
        <button className="flex items-center gap-2 text-sm font-bold px-8 py-3 rounded-2xl border transition-all hover:bg-slate-50 hover:shadow-sm"
          style={{ borderColor:'#e2e8f0', color:'#374151' }}>
          Load more suppliers <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
