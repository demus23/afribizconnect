import Link from 'next/link'
import { Globe2, ArrowRight, Calendar, Tag } from 'lucide-react'

const ARTICLES = [
  { title: "AfriBizConnect raises $3M seed to scale Africa's B2B trade platform", date: 'June 2025', category: 'Company news', desc: 'Dubai-based AfriBizConnect closes seed round led by Africa Finance Corp to expand its verified supplier marketplace and trade finance offering.', color: '#1e40af', bg: '#eff6ff' },
  { title: 'AfCFTA Implementation Update: What African importers need to know in 2025', date: 'May 2025', category: 'Trade insights', desc: 'A practical guide to leveraging African Continental Free Trade Area preferential tariffs for cross-border goods movement.', color: '#059669', bg: '#f0fdf4' },
  { title: 'Nigerian Naira stabilizes: Impact on UAE-Africa trade corridors', date: 'May 2025', category: 'Market analysis', desc: 'CBN forex reforms show positive results. We analyze what this means for importers currently sourcing from Gulf suppliers.', color: '#7c3aed', bg: '#f5f3ff' },
  { title: 'How to structure a Letter of Credit for African imports — complete guide', date: 'April 2025', category: 'Trade guides', desc: 'Step-by-step walkthrough of LC documentation, bank requirements, and common mistakes to avoid when importing to Africa.', color: '#d97706', bg: '#fffbeb' },
  { title: 'Top 10 verified FMCG suppliers for West African distributors', date: 'April 2025', category: 'Supplier spotlight', desc: 'Our sourcing team highlights the most active and highly-rated FMCG suppliers currently serving Nigeria, Ghana, and Senegal.', color: '#dc2626', bg: '#fef2f2' },
  { title: 'Kenya cold chain logistics: $8M Series A signals investor confidence', date: 'March 2025', category: 'Investment', desc: 'East Africa\'s cold chain infrastructure gap is closing. We look at recent investments and what it means for agricultural exporters.', color: '#0891b2', bg: '#ecfeff' },
]

export default function NewsPage() {
  return (
    <div style={{ fontFamily:"'Geist Sans',system-ui,sans-serif" }}>
      <header className="border-b" style={{ borderColor:'#f1f5f9' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#1e40af,#0f172a)' }}><Globe2 className="h-4 w-4 text-white" /></div>
            <span className="font-black text-[15px]">AfriBiz<span style={{ color:'#f59e0b' }}>Connect</span></span>
          </Link>
          <Link href="/register" className="text-sm font-black px-5 py-2.5 rounded-xl text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>Get started</Link>
        </div>
      </header>

      <section className="py-20 px-5 sm:px-8" style={{ background:'linear-gradient(180deg,#f0f6ff,#fff)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color:'#1e40af' }}>News & insights</div>
          <h1 className="text-5xl font-black tracking-tighter mb-4" style={{ color:'#0f172a' }}>African Trade Intelligence</h1>
          <p className="text-lg" style={{ color:'#64748b' }}>Market analysis, trade guides, company news, and supplier spotlights — all in one place.</p>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-8 border-y" style={{ borderColor:'#f1f5f9' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ARTICLES.map((a, i) => (
            <article key={i} className="rounded-2xl border bg-white overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 flex flex-col" style={{ borderColor:'#e8edf3' }}>
              <div className="h-2 w-full" style={{ backgroundColor:a.color }} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background:a.bg, color:a.color }}>{a.category}</span>
                  <span className="text-[10px] flex items-center gap-1" style={{ color:'#94a3b8' }}><Calendar className="h-3 w-3" />{a.date}</span>
                </div>
                <h2 className="text-sm font-black leading-snug mb-3 flex-1" style={{ color:'#0f172a' }}>{a.title}</h2>
                <p className="text-xs leading-relaxed mb-4" style={{ color:'#64748b' }}>{a.desc}</p>
                <button className="flex items-center gap-1.5 text-xs font-bold" style={{ color:a.color }}>
                  Read article <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-5 sm:px-8 text-center" style={{ background:'linear-gradient(135deg,#1e40af,#0f172a)' }}>
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Get trade insights weekly</h2>
        <p className="text-sm mb-8" style={{ color:'rgba(147,197,253,0.7)' }}>FX rates, commodity prices, deal flow, and supplier news every Monday.</p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input type="email" placeholder="your@business.com" className="flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none" style={{ backgroundColor:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', color:'white' }} />
          <button className="px-5 py-3 rounded-xl text-sm font-black" style={{ backgroundColor:'#fbbf24', color:'#0f172a' }}>Subscribe</button>
        </div>
      </section>
      <div className="border-t py-5 text-center text-xs" style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
        <Link href="/" className="hover:text-blue-600 transition-colors">← Back to AfriBizConnect</Link>
      </div>
    </div>
  )
}
