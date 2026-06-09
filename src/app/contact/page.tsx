'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Globe2, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
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
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.3em] mb-5" style={{ color:'#1e40af' }}>Contact us</div>
            <h1 className="text-4xl font-black tracking-tighter mb-6" style={{ color:'#0f172a' }}>Get in touch with<br />our team</h1>
            <p className="text-sm leading-relaxed mb-10" style={{ color:'#64748b' }}>Whether you're a supplier wanting to list, an investor looking for deals, or a business with questions — we're here to help.</p>
            <div className="space-y-5">
              {[
                { icon:Mail,  label:'Email',    val:'hello@afribizconnect.com', color:'#1e40af' },
                { icon:Phone, label:'Phone',    val:'+971 4 200 0000 (Dubai HQ)',color:'#059669' },
                { icon:MapPin,label:'Address',  val:'DIFC, Dubai, United Arab Emirates', color:'#7c3aed' },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:`${c.color}15` }}>
                    <c.icon className="h-5 w-5" style={{ color:c.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wide mb-0.5" style={{ color:'#94a3b8' }}>{c.label}</div>
                    <div className="text-sm font-medium" style={{ color:'#0f172a' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border p-8 bg-white" style={{ borderColor:'#e8edf3', boxShadow:'0 8px 40px rgba(0,0,0,0.06)' }}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4"><CheckCircle2 className="h-7 w-7 text-emerald-600" /></div>
                <h3 className="text-xl font-black mb-2" style={{ color:'#0f172a' }}>Message sent!</h3>
                <p className="text-sm" style={{ color:'#64748b' }}>Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black mb-6" style={{ color:'#0f172a' }}>Send us a message</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {['Full name','Company name'].map(f => (
                      <div key={f}>
                        <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>{f}</label>
                        <input type="text" className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Email address</label>
                    <input type="email" className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>How can we help?</label>
                    <select className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                      <option>List my business as a supplier</option>
                      <option>I'm looking for suppliers</option>
                      <option>Investment opportunities</option>
                      <option>Logistics & freight</option>
                      <option>Partnership inquiry</option>
                      <option>General question</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Message</label>
                    <textarea rows={4} className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                  </div>
                  <button onClick={() => setSent(true)} className="w-full flex items-center justify-center gap-2 text-sm font-black py-3.5 rounded-xl text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                    Send message <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <div className="border-t py-5 text-center text-xs" style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
        <Link href="/" className="hover:text-blue-600 transition-colors">← Back to AfriBizConnect</Link>
      </div>
    </div>
  )
}
