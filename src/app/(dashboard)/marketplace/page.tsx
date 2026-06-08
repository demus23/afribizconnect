'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Star, BadgeCheck, Globe2, Package, ArrowRight, MapPin, Clock, ArrowUpRight, Loader2 } from 'lucide-react'

const CATEGORIES = ['All','Electronics','FMCG','Textiles','Auto Parts','Agriculture','Pharmaceuticals','Machinery','Cosmetics','Food']
const COUNTRIES  = ['All Countries','AE','CN','TR','IN','SA','DE','DK','CH']
const COUNTRY_NAMES: Record<string,string> = { AE:'UAE', CN:'China', TR:'Turkey', IN:'India', SA:'Saudi Arabia', DE:'Germany', DK:'Denmark', CH:'Switzerland' }
const COUNTRY_FLAGS: Record<string,string> = { AE:'🇦🇪', CN:'🇨🇳', TR:'🇹🇷', IN:'🇮🇳', SA:'🇸🇦', DE:'🇩🇪', DK:'🇩🇰', CH:'🇨🇭' }

function ScorePill({ score }: { score: number }) {
  const color = score>=90?'#10b981':score>=80?'#f59e0b':'#6b7280'
  const bg    = score>=90?'#f0fdf4':score>=80?'#fffbeb':'#f9fafb'
  return (
    <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full"
      style={{ background:bg, color, border:`1.5px solid ${color}30` }}>
      <Star className="h-3 w-3 fill-current" /> {score}
    </span>
  )
}

export default function MarketplacePage() {
  const [businesses, setBusinesses] = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [total, setTotal]           = useState(0)
  const [search, setSearch]         = useState('')
  const [country, setCountry]       = useState('')
  const [category, setCategory]     = useState('')
  const [activeCat, setActiveCat]   = useState('All')
  const [page, setPage]             = useState(1)

  async function fetchSuppliers() {
    setLoading(true)
    const params = new URLSearchParams({
      type: 'SUPPLIER', page: String(page), limit: '12',
      ...(search   && { search }),
      ...(country  && country !== 'All Countries' && { country }),
      ...(category && category !== 'All' && { category }),
    })
    try {
      const res  = await fetch(`/api/suppliers?${params}`)
      const data = await res.json()
      setBusinesses(data.businesses || [])
      setTotal(data.total || 0)
    } catch { setBusinesses([]) }
    finally  { setLoading(false) }
  }

  useEffect(() => { fetchSuppliers() }, [search, country, category, page])

  function handleCat(cat: string) {
    setActiveCat(cat)
    setCategory(cat === 'All' ? '' : cat)
    setPage(1)
  }

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Supplier Marketplace</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>
            {loading ? 'Loading...' : `${total} verified global suppliers`}
          </p>
        </div>
        <Link href="/sourcing"
          className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white"
          style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow:'0 4px 12px rgba(30,64,175,0.3)' }}>
          Post RFQ <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Search bar */}
      <div className="rounded-2xl bg-white border p-4" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color:'#94a3b8' }} />
            <input type="text" placeholder="Search suppliers, products..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none transition-all"
              style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
          </div>
          <select value={country} onChange={e => { setCountry(e.target.value); setPage(1) }}
            className="text-sm px-3 py-2.5 rounded-xl border focus:outline-none font-medium"
            style={{ borderColor:'#e2e8f0', color:'#374151' }}>
            {COUNTRIES.map(c => <option key={c} value={c === 'All Countries' ? '' : c}>{c === 'All Countries' ? 'All Countries' : `${COUNTRY_FLAGS[c] || ''} ${COUNTRY_NAMES[c] || c}`}</option>)}
          </select>
          <select className="text-sm px-3 py-2.5 rounded-xl border focus:outline-none font-medium"
            style={{ borderColor:'#e2e8f0', color:'#374151' }}>
            <option>Sort: Trust Score ↓</option>
            <option>Sort: Newest</option>
          </select>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => handleCat(cat)}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all"
              style={activeCat===cat
                ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' }
                : { borderColor:'#e2e8f0', color:'#475569', backgroundColor:'white' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between text-xs" style={{ color:'#64748b' }}>
        <span>Showing <strong style={{ color:'#0f172a' }}>{businesses.length}</strong> of {total} suppliers</span>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_,i) => (
            <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ backgroundColor:'#f1f5f9' }} />
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <div className="text-center py-20">
          <Package className="h-12 w-12 mx-auto mb-4" style={{ color:'#94a3b8' }} />
          <p className="text-sm font-semibold" style={{ color:'#0f172a' }}>No suppliers found</p>
          <p className="text-xs mt-1" style={{ color:'#94a3b8' }}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {businesses.map((s: any) => (
            <Link key={s.id} href={`/marketplace/${s.id}`}
              className="group bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 flex flex-col"
              style={{ borderColor: s.asSupplier?.featured ? '#fde68a' : '#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              {s.asSupplier?.featured && (
                <div className="bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-wider px-3 py-1">
                  ★ Featured supplier
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black group-hover:text-blue-700 transition-colors" style={{ color:'#0f172a' }}>
                        {COUNTRY_FLAGS[s.country] || '🌍'} {s.name}
                      </span>
                      {s.verificationStatus === 'VERIFIED' && <BadgeCheck className="h-4 w-4 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" style={{ color:'#94a3b8' }} />
                      <span className="text-[11px]" style={{ color:'#94a3b8' }}>{s.city || s.country}</span>
                    </div>
                  </div>
                  <ScorePill score={s.trustScore} />
                </div>

                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color:'#64748b' }}>{s.description}</p>

                <div className="flex gap-1.5 flex-wrap mb-3">
                  {s.categories?.slice(0,3).map((c: string) => (
                    <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                      style={{ borderColor:'#e2e8f0', color:'#475569', background:'#f8fafc' }}>{c}</span>
                  ))}
                </div>

                {s.certifications?.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {s.certifications.slice(0,2).map((c: string) => (
                      <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background:'#f0fdf4', color:'#059669' }}>✓ {c}</span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] pt-3 border-t mt-auto"
                  style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
                  <div className="flex items-center gap-3">
                    {s.minOrderValue && <span className="flex items-center gap-1"><Package className="h-3 w-3" /> ${s.minOrderValue.toLocaleString()}</span>}
                    {s.leadTimeDays  && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.leadTimeDays}d</span>}
                  </div>
                  <div className="flex gap-1">
                    {s.paymentTerms?.slice(0,2).map((t: string) => (
                      <span key={t} className="px-1.5 py-0.5 rounded font-bold" style={{ background:'#f0fdf4', color:'#059669' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 12 && (
        <div className="flex justify-center gap-2 pt-2">
          <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
            className="px-4 py-2 rounded-xl border text-sm font-bold disabled:opacity-40 hover:bg-slate-50 transition-all"
            style={{ borderColor:'#e2e8f0', color:'#374151' }}>← Previous</button>
          <span className="px-4 py-2 text-sm font-bold" style={{ color:'#64748b' }}>Page {page}</span>
          <button onClick={() => setPage(p => p+1)} disabled={businesses.length < 12}
            className="px-4 py-2 rounded-xl border text-sm font-bold disabled:opacity-40 hover:bg-slate-50 transition-all"
            style={{ borderColor:'#e2e8f0', color:'#374151' }}>Next →</button>
        </div>
      )}
    </div>
  )
}
