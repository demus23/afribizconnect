'use client'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Newspaper, RefreshCw, Loader2 } from 'lucide-react'

const TAG_COLORS: Record<string,{bg:string,color:string}> = {
  AfCFTA:     { bg:'#eff6ff', color:'#1e40af' },
  Nigeria:    { bg:'#f0fdf4', color:'#059669' },
  Kenya:      { bg:'#f0fdf4', color:'#059669' },
  Ghana:      { bg:'#fffbeb', color:'#d97706' },
  Logistics:  { bg:'#fffbeb', color:'#d97706' },
  FX:         { bg:'#f5f3ff', color:'#7c3aed' },
  Commodities:{ bg:'#fef2f2', color:'#dc2626' },
  Ethiopia:   { bg:'#ecfeff', color:'#0891b2' },
  Finance:    { bg:'#f0fdf4', color:'#059669' },
  Africa:     { bg:'#f1f5f9', color:'#475569' },
}

export default function MarketDataPage() {
  const [tab, setTab]         = useState<'fx'|'commodities'|'news'>('fx')
  const [rates, setRates]     = useState<any>(null)
  const [news, setNews]       = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  async function loadRates() {
    try {
      const res = await fetch('/api/market-rates')
      const data = await res.json()
      setRates(data)
    } catch {}
  }

  async function loadNews() {
    try {
      const res = await fetch('/api/market-news')
      const data = await res.json()
      setNews(data)
    } catch {}
  }

  useEffect(() => {
    Promise.all([loadRates(), loadNews()]).finally(() => setLoading(false))
    const interval = setInterval(loadRates, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  async function refresh() {
    setRefreshing(true)
    await Promise.all([loadRates(), loadNews()])
    setRefreshing(false)
  }

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const h = Math.floor(diff / 3600000)
    const m = Math.floor(diff / 60000)
    if (h > 24) return `${Math.floor(h/24)}d ago`
    if (h > 0) return `${h}h ago`
    return `${m}m ago`
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Market Data</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>
            {rates?.live ? '🟢 Live data from Open Exchange Rates & Commodities API' : '🟡 Showing reference rates — add API keys for live data'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {rates?.updatedAt && (
            <span className="text-xs" style={{ color:'#94a3b8' }}>
              Updated {timeAgo(rates.updatedAt)}
            </span>
          )}
          <button onClick={refresh} disabled={refreshing}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border"
            style={{ borderColor:'#e2e8f0', color:'#374151' }}>
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary strip */}
      {rates && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            rates.fx?.find((f:any) => f.code === 'NGN'),
            rates.fx?.find((f:any) => f.code === 'KES'),
            rates.commodities?.find((c:any) => c.id === 'gold'),
            rates.commodities?.find((c:any) => c.id === 'crude'),
          ].filter(Boolean).map((item: any) => (
            <div key={item.pair || item.label} className="rounded-2xl bg-white border p-4" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="text-xs mb-1" style={{ color:'#94a3b8' }}>{item.pair || item.label}</div>
              <div className="text-xl font-black" style={{ color:'#0f172a', fontFamily:'monospace' }}>
                {item.flag} {item.rate}
              </div>
              <div className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>{item.fullName || item.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background:'#f1f5f9' }}>
        {[{id:'fx',label:'FX Rates'},{id:'commodities',label:'Commodities'},{id:'news',label:'Trade News'}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)}
            className="text-sm font-bold px-5 py-2 rounded-lg transition-all"
            style={tab===t.id ? { background:'white', color:'#0f172a', boxShadow:'0 1px 4px rgba(0,0,0,0.08)' } : { color:'#64748b' }}>
            {t.label}
          </button>
        ))}
      </div>

      {loading && <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#1e40af' }} /></div>}

      {/* FX */}
      {!loading && tab === 'fx' && rates?.fx && (
        <div className="rounded-2xl bg-white border overflow-hidden" style={{ borderColor:'#e8edf3' }}>
          <div className="grid text-xs font-black uppercase tracking-wide p-4 border-b" style={{ gridTemplateColumns:'2fr 1fr 1fr', color:'#94a3b8', borderColor:'#f1f5f9' }}>
            <span>Currency</span><span>USD Rate</span><span>Full name</span>
          </div>
          {rates.fx.map((r: any) => (
            <div key={r.code} className="grid items-center p-4 border-b hover:bg-slate-50 transition-colors" style={{ gridTemplateColumns:'2fr 1fr 1fr', borderColor:'#f8fafc' }}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{r.flag}</span>
                <span className="text-sm font-black" style={{ color:'#0f172a', fontFamily:'monospace' }}>{r.pair}</span>
              </div>
              <div className="text-sm font-black" style={{ color:'#0f172a', fontFamily:'monospace' }}>{r.rate}</div>
              <div className="text-xs" style={{ color:'#64748b' }}>{r.fullName}</div>
            </div>
          ))}
          <div className="p-4 text-xs text-center" style={{ color:'#94a3b8' }}>
            {rates.live ? '✓ Live rates from Open Exchange Rates · Updated every 5 minutes' : 'Reference rates · Add OPENEXCHANGERATES_API_KEY for live data'}
          </div>
        </div>
      )}

      {/* Commodities */}
      {!loading && tab === 'commodities' && rates?.commodities && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {rates.commodities.map((c: any) => (
            <div key={c.id} className="rounded-2xl bg-white border p-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-sm font-black" style={{ color:'#0f172a' }}>{c.label}</span>
                  </div>
                  <div className="text-xs" style={{ color:'#94a3b8' }}>{c.desc}</div>
                </div>
              </div>
              <div className="text-2xl font-black" style={{ color:'#0f172a', fontFamily:'monospace' }}>
                {c.rate}<span className="text-xs font-normal ml-1" style={{ color:'#94a3b8' }}>{c.unit}</span>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border p-5 flex items-center justify-center text-center" style={{ borderColor:'#e2e8f0', borderStyle:'dashed' }}>
            <div>
              <div className="text-sm font-bold mb-1" style={{ color:'#374151' }}>More commodities</div>
              <div className="text-xs" style={{ color:'#94a3b8' }}>Add COMMODITIES_API_KEY for sesame, palm oil, cashew, rubber live prices</div>
            </div>
          </div>
        </div>
      )}

      {/* News */}
      {!loading && tab === 'news' && (
        <div className="space-y-3">
          {(news?.articles || []).map((n: any, i: number) => {
            const tc = TAG_COLORS[n.tag] || { bg:'#f1f5f9', color:'#64748b' }
            return (
              <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
                className="block rounded-2xl bg-white border p-5 hover:shadow-md transition-shadow" style={{ borderColor:'#e8edf3', textDecoration:'none' }}>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background:'#f8fafc', border:'1px solid #f1f5f9' }}>
                    <Newspaper className="h-5 w-5" style={{ color:'#94a3b8' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold mb-2 leading-snug" style={{ color:'#0f172a' }}>{n.title}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold" style={{ background:tc.bg, color:tc.color }}>{n.tag}</span>
                      <span className="text-xs" style={{ color:'#94a3b8' }}>{n.source}</span>
                      <span className="text-xs" style={{ color:'#94a3b8' }}>{timeAgo(n.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
          <div className="text-xs text-center py-3" style={{ color:'#94a3b8' }}>
            {news?.live ? '✓ Live news from NewsAPI' : 'Reference news · Add NEWSAPI_KEY for live African business news'}
          </div>
        </div>
      )}
    </div>
  )
}
