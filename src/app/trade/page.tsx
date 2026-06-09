import Link from 'next/link'
import { Globe2, ArrowRight, Truck, Package, FileText, BarChart3 } from 'lucide-react'

export default function TradePage() {
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
      <section className="py-28 px-5 sm:px-8 text-center" style={{ background:'linear-gradient(180deg,#f0f6ff,#fff)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-black uppercase tracking-[0.3em] mb-5" style={{ color:'#1e40af' }}>Trade Hub</div>
          <h1 className="text-5xl font-black tracking-tighter mb-6" style={{ color:'#0f172a' }}>Your complete<br />trade management hub</h1>
          <p className="text-lg leading-relaxed mb-12" style={{ color:'#64748b' }}>Everything you need to manage cross-border African trade — from sourcing to delivery.</p>
          <div className="grid md:grid-cols-2 gap-5 text-left max-w-2xl mx-auto">
            {[
              { icon:Package,  title:'Sourcing & RFQs',  desc:'Post buyer requests and connect with verified global suppliers.',  href:'/sourcing', color:'#1e40af' },
              { icon:Truck,    title:'Logistics Hub',    desc:'Freight quotes, shipment tracking, and customs documentation.',      href:'/logistics',color:'#7c3aed' },
              { icon:FileText, title:'Trade Finance',    desc:'Letters of credit, invoice factoring, and supply chain finance.',    href:'/invest',   color:'#059669' },
              { icon:BarChart3,title:'Market Data',      desc:'Live FX rates, commodity prices, and African business news.',        href:'/market',   color:'#d97706' },
            ].map(item => (
              <Link key={item.title} href={item.href} className="flex gap-4 p-5 rounded-2xl border bg-white transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ borderColor:'#e8edf3' }}>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:`${item.color}15` }}>
                  <item.icon className="h-5 w-5" style={{ color:item.color }} />
                </div>
                <div>
                  <div className="text-sm font-black mb-1" style={{ color:'#0f172a' }}>{item.title}</div>
                  <div className="text-xs leading-relaxed" style={{ color:'#64748b' }}>{item.desc}</div>
                  <div className="flex items-center gap-1 mt-2 text-xs font-bold" style={{ color:item.color }}>Go to {item.title} <ArrowRight className="h-3 w-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="border-t py-5 text-center text-xs" style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
        <Link href="/" className="hover:text-blue-600 transition-colors">← Back to AfriBizConnect</Link>
      </div>
    </div>
  )
}
