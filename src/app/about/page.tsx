import Link from 'next/link'
import { Globe2, MapPin, TrendingUp, Shield, ArrowRight } from 'lucide-react'

export default function AboutPage() {
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
          <div className="text-xs font-black uppercase tracking-[0.3em] mb-5" style={{ color:'#1e40af' }}>About AfriBizConnect</div>
          <h1 className="text-5xl font-black tracking-tighter mb-6" style={{ color:'#0f172a' }}>Building Africa's<br />trade infrastructure</h1>
          <p className="text-lg leading-relaxed" style={{ color:'#64748b' }}>Founded in Dubai with a single mission: eliminate the trust and information gaps that make cross-border African trade harder than it needs to be.</p>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-8 border-y" style={{ borderColor:'#f1f5f9' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon:Shield,     title:'Trust first',  desc:'Every business is KYB-verified with a public trust score. No more guessing if a supplier is legitimate.',                                 color:'#059669' },
            { icon:Globe2,     title:'54 markets',   desc:'Built for African trade corridors — UAE to Nigeria, China to Ghana, Turkey to Kenya and every route in between.',                      color:'#1e40af' },
            { icon:TrendingUp, title:'Capital access',desc:'African businesses deserve the same quality of trade finance and investment infrastructure as businesses anywhere else in the world.', color:'#7c3aed' },
          ].map(item => (
            <div key={item.title} className="text-center p-8 rounded-2xl border" style={{ borderColor:'#e8edf3' }}>
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor:`${item.color}15` }}>
                <item.icon className="h-7 w-7" style={{ color:item.color }} />
              </div>
              <h3 className="text-lg font-black mb-3" style={{ color:'#0f172a' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:'#64748b' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black tracking-tighter mb-3" style={{ color:'#0f172a' }}>Our team</h2>
          <p className="text-sm mb-12" style={{ color:'#64748b' }}>Built by trade finance veterans, technologists, and African business operators.</p>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { name:'Natnael Demus',  role:'Founder & CEO',                   location:'Dubai, UAE',       initials:'ND', color:'#1e40af' },
              { name:'Aisha Mohammed', role:'Head of Trust & Verification',    location:'Lagos, Nigeria',    initials:'AM', color:'#059669' },
              { name:'Chen Wei',       role:'Head of Supplier Relations',      location:'Shenzhen, China',   initials:'CW', color:'#7c3aed' },
              { name:'Omar Hassan',    role:'Head of Finance',                 location:'Nairobi, Kenya',    initials:'OH', color:'#d97706' },
            ].map(m => (
              <div key={m.name} className="rounded-2xl border p-6 text-center" style={{ borderColor:'#e8edf3' }}>
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-black text-lg" style={{ backgroundColor:m.color }}>{m.initials}</div>
                <div className="text-sm font-black mb-1" style={{ color:'#0f172a' }}>{m.name}</div>
                <div className="text-xs mb-2" style={{ color:'#64748b' }}>{m.role}</div>
                <div className="flex items-center justify-center gap-1 text-xs" style={{ color:'#94a3b8' }}><MapPin className="h-3 w-3" />{m.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-8 text-center border-t" style={{ borderColor:'#f1f5f9', background:'#fafbfc' }}>
        <h2 className="text-3xl font-black tracking-tighter mb-4" style={{ color:'#0f172a' }}>Ready to join us?</h2>
        <p className="text-sm mb-8" style={{ color:'#64748b' }}>Join 12,400+ businesses building the future of African trade.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/register" className="flex items-center gap-2 text-sm font-black px-8 py-4 rounded-2xl text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>Create free account <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/contact" className="flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-2xl border" style={{ borderColor:'#e2e8f0', color:'#374151' }}>Contact us</Link>
        </div>
      </section>
      <div className="border-t py-5 text-center text-xs" style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
        <Link href="/" className="hover:text-blue-600 transition-colors">← Back to AfriBizConnect</Link>
      </div>
    </div>
  )
}
