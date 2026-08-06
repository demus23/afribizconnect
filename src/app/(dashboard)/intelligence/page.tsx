'use client'
import { useState } from 'react'
import { Search, TrendingUp, Package, Globe2, ArrowRight, Ship, Plane, Truck, BarChart3, AlertCircle } from 'lucide-react'

// Africa Trade Intelligence — like Panjiva/ImportGenius but for Africa
// Shows: who is importing what, from where, at what volume
// This doesn't exist anywhere in Africa today

const TRADE_FLOWS = [
  { importer:'Lagos Electronics Hub', country:'NG', product:'Consumer Electronics',    origin:'CN', volume:'$4.2M', shipments:34, method:'sea',   trend:'+12%', up:true },
  { importer:'Nairobi Auto Parts Ltd',country:'KE', product:'Auto Parts & Components',  origin:'JP', volume:'$2.8M', shipments:19, method:'sea',   trend:'+8%',  up:true },
  { importer:'Cairo FMCG Trading',    country:'EG', product:'FMCG & Consumer Goods',    origin:'AE', volume:'$6.1M', shipments:52, method:'road',  trend:'-3%',  up:false },
  { importer:'Accra Pharma Imports',  country:'GH', product:'Pharmaceuticals',           origin:'IN', volume:'$1.9M', shipments:28, method:'air',   trend:'+22%', up:true },
  { importer:'Abuja Machinery Co.',   country:'NG', product:'Industrial Machinery',      origin:'DE', volume:'$8.4M', shipments:11, method:'sea',   trend:'+5%',  up:true },
  { importer:'Dakar Textile Group',   country:'SN', product:'Textiles & Garments',       origin:'TR', volume:'$3.3M', shipments:41, method:'sea',   trend:'+16%', up:true },
  { importer:'Addis Agro Trading',    country:'ET', product:'Agricultural Equipment',    origin:'CN', volume:'$2.1M', shipments:15, method:'sea',   trend:'-8%',  up:false },
  { importer:'Cape Town Beverages',   country:'ZA', product:'Food & Beverages',          origin:'AE', volume:'$5.7M', shipments:63, method:'sea',   trend:'+4%',  up:true },
]

const TOP_CORRIDORS = [
  { from:'China', to:'Nigeria',       vol:'$2.8B', yoy:'+14%', up:true  },
  { from:'UAE',   to:'East Africa',   vol:'$1.9B', yoy:'+22%', up:true  },
  { from:'India', to:'Africa',        vol:'$3.1B', yoy:'+18%', up:true  },
  { from:'Turkey',to:'West Africa',   vol:'$0.8B', yoy:'+31%', up:true  },
  { from:'China', to:'East Africa',   vol:'$1.4B', yoy:'+9%',  up:true  },
  { from:'EU',    to:'North Africa',  vol:'$4.2B', yoy:'-2%',  up:false },
]

const ICONS: Record<string,any> = { sea: Ship, air: Plane, road: Truck }
const FLAGS: Record<string,string> = { NG:'🇳🇬', KE:'🇰🇪', GH:'🇬🇭', ZA:'🇿🇦', EG:'🇪🇬', ET:'🇪🇹', SN:'🇸🇳', CN:'🇨🇳', AE:'🇦🇪', IN:'🇮🇳', JP:'🇯🇵', DE:'🇩🇪', TR:'🇹🇷' }

export default function IntelligencePage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = TRADE_FLOWS.filter(t =>
    (!search || t.product.toLowerCase().includes(search.toLowerCase()) || t.importer.toLowerCase().includes(search.toLowerCase()) || t.origin.includes(search.toUpperCase())) &&
    (filter === 'All' || t.method === filter.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Trade Intelligence</h1>
            <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ background:'linear-gradient(135deg,#C9A84C,#E8B84B)', color:'#0A0E1A' }}>AFRICA EXCLUSIVE</span>
          </div>
          <p className="text-sm" style={{ color:'#64748b' }}>Real-time African import/export flows, corridors and trade volumes — Africa's first trade intelligence platform</p>
        </div>
      </div>

      {/* Unique value banner */}
      <div className="rounded-2xl p-5 border" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a8a)', borderColor:'#1e40af' }}>
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1">
            <div className="text-xs font-black text-blue-300 mb-1 tracking-wider uppercase">Only on AfriBizConnect</div>
            <h2 className="text-lg font-black text-white mb-2">Africa's Panjiva — trade flow visibility</h2>
            <p className="text-sm" style={{ color:'rgba(147,197,253,0.75)' }}>See exactly what businesses in Nigeria, Kenya, Ghana and 50 more markets are importing — products, origins, volumes, shipping methods. Equivalent data costs $2,000+/mo on Panjiva or ImportGenius.</p>
          </div>
          <div className="flex gap-6 shrink-0">
            {[{val:'$48B+',label:'Trade tracked'},{val:'54',label:'Markets'},{val:'2.1M+',label:'Shipments'}].map(s=>(
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.val}</div>
                <div className="text-xs" style={{ color:'rgba(147,197,253,0.6)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top trade corridors */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Top Africa trade corridors (2025)</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {TOP_CORRIDORS.map(c => (
            <div key={`${c.from}-${c.to}`} className="p-4 rounded-xl border" style={{ borderColor:'#f1f5f9', background:'#f8fafc' }}>
              <div className="flex items-center gap-2 mb-2 text-sm font-black" style={{ color:'#0f172a' }}>
                {c.from} <ArrowRight className="h-3 w-3" style={{ color:'#94a3b8' }} /> {c.to}
              </div>
              <div className="text-xl font-black" style={{ color:'#0f172a', fontFamily:'monospace' }}>{c.vol}</div>
              <div className="text-xs mt-0.5" style={{ color: c.up ? '#059669' : '#dc2626' }}>{c.yoy} YoY</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color:'#94a3b8' }} />
          <input type="text" placeholder="Search by product, importer, or origin..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
        </div>
        <div className="flex gap-1.5">
          {['All','Sea','Air','Road'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="text-xs font-bold px-4 py-2.5 rounded-xl border transition-all"
              style={filter===f ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' } : { borderColor:'#e2e8f0', color:'#475569', background:'white' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Trade flow table */}
      <div className="rounded-2xl bg-white border overflow-hidden" style={{ borderColor:'#e8edf3' }}>
        <div className="grid text-xs font-black uppercase tracking-wide p-4 border-b" style={{ gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 1fr', color:'#94a3b8', borderColor:'#f1f5f9' }}>
          <span>Importer</span><span>Product</span><span>Origin</span><span>Volume</span><span>Shipments</span><span>Trend</span>
        </div>
        {filtered.map((t, i) => {
          const Icon = ICONS[t.method]
          return (
            <div key={i} className="grid items-center p-4 border-b hover:bg-slate-50 transition-colors cursor-pointer" style={{ gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 1fr', borderColor:'#f8fafc' }}>
              <div>
                <div className="text-sm font-bold" style={{ color:'#0f172a' }}>{t.importer}</div>
                <div className="text-xs mt-0.5" style={{ color:'#64748b' }}>{FLAGS[t.country]} {t.country}</div>
              </div>
              <div className="text-xs font-medium" style={{ color:'#374151' }}>{t.product}</div>
              <div className="flex items-center gap-1.5">
                <span>{FLAGS[t.origin]}</span>
                <span className="text-xs font-bold" style={{ color:'#374151' }}>{t.origin}</span>
              </div>
              <div className="text-sm font-black" style={{ color:'#0f172a', fontFamily:'monospace' }}>{t.volume}</div>
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" style={{ color:'#94a3b8' }} />
                <span className="text-xs" style={{ color:'#374151' }}>{t.shipments}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: t.up ? '#059669' : '#dc2626' }}>{t.trend}</span>
            </div>
          )
        })}
      </div>
      <div className="rounded-2xl border p-4 flex items-center gap-2.5 text-sm" style={{ background:'#fffbeb', borderColor:'#fde68a', color:'#92400e' }}>
        <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
        Data shown is a sample. Full trade intelligence with real shipment-level data requires Growth plan or above.
      </div>
    </div>
  )
}
