'use client'
import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, RefreshCw, Globe2, BarChart3, Newspaper, DollarSign, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface Rate   { code: string; rate: number; name: string; flag: string; change: string }
interface Commodity { symbol: string; name: string; unit: string; flag: string; price: number; change: string; changePercent: string; countries: string }
interface NewsItem  { title: string; description: string; url: string; source: { name: string }; publishedAt: string; urlToImage: string | null }

export default function MarketPage() {
  const [rates, setRates]             = useState<Rate[]>([])
  const [commodities, setCommodities] = useState<Commodity[]>([])
  const [news, setNews]               = useState<NewsItem[]>([])
  const [loading, setLoading]         = useState(true)
  const [lastUpdate, setLastUpdate]   = useState<string>('')

  async function fetchData() {
    setLoading(true)
    try {
      const res = await fetch('/api/market')
      const data = await res.json()
      setRates(data.rates || [])
      setCommodities(data.commodities || [])
      setNews(data.news || [])
      setLastUpdate(new Date().toLocaleTimeString())
    } catch (e) {
      console.error('Market data error:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  // Auto-refresh every 60s
  useEffect(() => {
    const t = setInterval(fetchData, 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: '#0f172a' }}>African Market Data</h1>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>Live exchange rates, commodity prices, and trade news</p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdate && (
            <span className="text-xs" style={{ color: '#94a3b8' }}>Updated: {lastUpdate}</span>
          )}
          <button onClick={fetchData} disabled={loading}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl border transition-all hover:bg-slate-50"
            style={{ borderColor: '#e2e8f0', color: '#374151' }}>
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Exchange Rates */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="h-7 w-7 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
            <DollarSign className="h-3.5 w-3.5 text-white" />
          </div>
          <h2 className="text-sm font-black" style={{ color: '#0f172a' }}>African Currency Rates vs USD</h2>
          <span className="ml-auto text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: '#f0fdf4', color: '#059669' }}>
            Live
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl animate-pulse" style={{ backgroundColor: '#f1f5f9' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {rates.map(r => {
              const up = parseFloat(r.change) > 0
              const flat = parseFloat(r.change) === 0
              return (
                <div key={r.code} className="rounded-xl border p-3.5 transition-all hover:shadow-sm"
                  style={{ borderColor: '#f1f5f9', backgroundColor: '#fafbfc' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base">{r.flag}</span>
                    <span className={`text-[10px] font-black flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
                      flat ? 'bg-slate-100 text-slate-500' :
                      up ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {flat ? '—' : up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                      {flat ? '0.00' : r.change}%
                    </span>
                  </div>
                  <div className="text-xs font-black" style={{ color: '#0f172a' }}>
                    {r.rate.toLocaleString()} {r.code}
                  </div>
                  <div className="text-[10px] mt-0.5 truncate" style={{ color: '#94a3b8' }}>per 1 USD</div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Commodities */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="h-7 w-7 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#d97706,#b45309)' }}>
            <BarChart3 className="h-3.5 w-3.5 text-white" />
          </div>
          <h2 className="text-sm font-black" style={{ color: '#0f172a' }}>African Commodity Prices</h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(loading ? [] : commodities).map(c => {
            const up = parseFloat(c.changePercent) >= 0
            return (
              <div key={c.symbol} className="flex items-center gap-4 p-4 rounded-xl border"
                style={{ borderColor: '#f1f5f9', backgroundColor: '#fafbfc' }}>
                <div className="text-2xl shrink-0">{c.flag}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-black" style={{ color: '#0f172a' }}>{c.name}</span>
                    <span className={`text-[10px] font-black flex items-center gap-0.5 ${up ? 'text-red-500' : 'text-green-600'}`}>
                      {up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                      {Math.abs(parseFloat(c.changePercent))}%
                    </span>
                  </div>
                  <div className="text-xs font-bold" style={{ color: '#1e40af' }}>
                    {c.unit.startsWith('$') ? '' : ''}{c.price.toLocaleString()} {c.unit}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>
                    Key markets: {c.countries}
                  </div>
                </div>
              </div>
            )
          })}
          {loading && [...Array(6)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl animate-pulse" style={{ backgroundColor: '#f1f5f9' }} />
          ))}
        </div>
      </div>

      {/* News */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="h-7 w-7 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>
            <Newspaper className="h-3.5 w-3.5 text-white" />
          </div>
          <h2 className="text-sm font-black" style={{ color: '#0f172a' }}>African Trade & Business News</h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(loading ? [] : news).slice(0, 9).map((article, i) => (
            <a key={i} href={article.url} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col gap-2.5 p-4 rounded-xl border transition-all hover:border-blue-200 hover:shadow-sm cursor-pointer"
              style={{ borderColor: '#f1f5f9' }}>
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: '#eff6ff', color: '#1e40af' }}>
                    {article.source.name}
                  </span>
                  <span className="text-[10px]" style={{ color: '#94a3b8' }}>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xs font-black leading-snug mb-1.5 group-hover:text-blue-700 transition-colors line-clamp-2"
                  style={{ color: '#0f172a' }}>
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: '#64748b' }}>
                    {article.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold mt-auto" style={{ color: '#1e40af' }}>
                Read more <ArrowUpRight className="h-3 w-3" />
              </div>
            </a>
          ))}
          {loading && [...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-xl animate-pulse" style={{ backgroundColor: '#f1f5f9' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
