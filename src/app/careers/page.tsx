import Link from 'next/link'
import { Globe2, ArrowRight, MapPin, Clock } from 'lucide-react'

const JOBS = [
  { title:'Senior Full-Stack Engineer',      team:'Engineering', location:'Dubai / Remote', type:'Full-time',  color:'#1e40af' },
  { title:'Trade Finance Product Manager',   team:'Product',     location:'Lagos, Nigeria', type:'Full-time',  color:'#059669' },
  { title:'African Markets Growth Lead',      team:'Growth',      location:'Nairobi / Remote',type:'Full-time', color:'#7c3aed' },
  { title:'Supplier Verification Analyst',   team:'Trust & Safety',location:'Dubai, UAE',  type:'Full-time',  color:'#d97706' },
  { title:'Business Development Rep — MENA', team:'Sales',        location:'Dubai, UAE',   type:'Full-time',  color:'#dc2626' },
  { title:'Content & Trade Research Writer', team:'Marketing',    location:'Remote',        type:'Part-time',  color:'#0891b2' },
]

export default function CareersPage() {
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
          <div className="text-xs font-black uppercase tracking-[0.3em] mb-5" style={{ color:'#1e40af' }}>Careers</div>
          <h1 className="text-5xl font-black tracking-tighter mb-6" style={{ color:'#0f172a' }}>Help us build Africa's<br />trade infrastructure</h1>
          <p className="text-lg leading-relaxed" style={{ color:'#64748b' }}>We're a remote-first team building the operating system for African trade. Join us from Dubai, Lagos, Nairobi, or anywhere.</p>
        </div>
      </section>

      <section className="py-16 px-5 sm:px-8 border-y" style={{ borderColor:'#f1f5f9' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black tracking-tighter mb-8" style={{ color:'#0f172a' }}>Open positions</h2>
          <div className="space-y-4">
            {JOBS.map(job => (
              <div key={job.title} className="flex items-center justify-between gap-4 p-5 rounded-2xl border bg-white transition-all hover:shadow-md" style={{ borderColor:'#e8edf3' }}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-black" style={{ color:'#0f172a' }}>{job.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:`${job.color}15`, color:job.color }}>{job.team}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color:'#94a3b8' }}>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-xl text-white shrink-0" style={{ background:`linear-gradient(135deg,${job.color},${job.color}cc)` }}>
                  Apply <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-5 sm:px-8 text-center" style={{ background:'#fafbfc' }}>
        <h2 className="text-3xl font-black tracking-tighter mb-4" style={{ color:'#0f172a' }}>Don't see your role?</h2>
        <p className="text-sm mb-8" style={{ color:'#64748b' }}>We're always looking for exceptional people. Send us your resume.</p>
        <Link href="/contact" className="flex items-center justify-center gap-2 text-sm font-black px-8 py-4 rounded-2xl text-white w-fit mx-auto" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
          Send open application <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
      <div className="border-t py-5 text-center text-xs" style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
        <Link href="/" className="hover:text-blue-600 transition-colors">← Back to AfriBizConnect</Link>
      </div>
    </div>
  )
}
