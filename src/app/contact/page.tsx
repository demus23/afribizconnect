"use client"
import { useState } from 'react'
import Link from 'next/link'

const OFFICES = [
  { city:'Dubai HQ',  address:'DIFC, Dubai, UAE',           email:'hello@afribizconnect.com', phone:'+971 4 200 0000' },
  { city:'Lagos',     address:'Victoria Island, Lagos, NG', email:'nigeria@afribizconnect.com', phone:'+234 1 200 0000' },
  { city:'Nairobi',   address:'Westlands, Nairobi, KE',     email:'kenya@afribizconnect.com',   phone:'+254 20 200 0000' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name:'', company:'', email:'', reason:'List as supplier', message:'' })

  return (
    <div style={{ fontFamily:'"Inter",system-ui,sans-serif', background:'#0A0E1A', minHeight:'100vh', color:'#E8EDF5' }}>

    <nav style={{ background:'#0A0E1A', borderBottom:'1px solid #1A2540', padding:'0 48px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
        <div style={{ width:'28px', height:'28px', background:'#C9A84C', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:'12px', fontWeight:900, color:'#0A0E1A' }}>A</span></div>
        <span style={{ fontSize:'12px', fontWeight:800, color:'#E8EDF5', letterSpacing:'0.08em' }}>AFRIBIZCONNECT</span>
      </Link>
      <div style={{ display:'flex', gap:'10px' }}>
        <Link href="/login"    style={{ fontSize:'12px', color:'#C9A84C', textDecoration:'none', fontWeight:600, padding:'8px 18px', border:'1px solid #C9A84C44', borderRadius:'4px' }}>Sign in</Link>
        <Link href="/register" style={{ fontSize:'12px', color:'#0A0E1A', background:'#C9A84C', textDecoration:'none', fontWeight:700, padding:'8px 18px', borderRadius:'4px' }}>Get access</Link>
      </div>
    </nav>
      <section style={{ maxWidth:'1100px', margin:'0 auto', padding:'80px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>

        {/* Left */}
        <div>
          <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px', fontFamily:'monospace' }}>Get in touch</div>
          <h1 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'20px' }}>We're here<br />to help</h1>
          <p style={{ fontSize:'16px', color:'#4A5568', lineHeight:1.7, marginBottom:'48px' }}>
            Whether you're a supplier wanting to list, an investor looking for deals, or a business with trade questions — reach out.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'#1A2540' }}>
            {OFFICES.map(o => (
              <div key={o.city} style={{ background:'#0F1629', padding:'24px' }}>
                <div style={{ fontSize:'12px', fontWeight:700, color:'#C9A84C', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'8px', fontFamily:'monospace' }}>{o.city}</div>
                <div style={{ fontSize:'13px', color:'#4A5568', marginBottom:'4px' }}>{o.address}</div>
                <div style={{ fontSize:'13px', color:'#E8EDF5' }}>{o.email}</div>
                <div style={{ fontSize:'13px', color:'#4A5568' }}>{o.phone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ background:'#0F1629', border:'1px solid #1A2540', borderRadius:'12px', padding:'40px' }}>
          {sent ? (
            <div style={{ textAlign:'center', padding:'60px 20px' }}>
              <div style={{ fontSize:'48px', marginBottom:'16px' }}>✓</div>
              <h3 style={{ fontSize:'24px', fontWeight:900, color:'#00D4AA', marginBottom:'8px' }}>Message sent!</h3>
              <p style={{ fontSize:'14px', color:'#4A5568' }}>Our team will respond within 24 hours.</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize:'18px', fontWeight:800, color:'#E8EDF5', marginBottom:'28px' }}>Send us a message</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                  {[{field:'name',ph:'Full name'},{field:'company',ph:'Company name'}].map(({field,ph}) => (
                    <div key={field}>
                      <label style={{ display:'block', fontSize:'10px', fontWeight:700, color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'6px' }}>{ph}</label>
                      <input type="text" placeholder={ph} value={(form as any)[field]} onChange={e => setForm(f => ({...f,[field]:e.target.value}))}
                        style={{ width:'100%', padding:'10px 14px', background:'#0A0E1A', border:'1px solid #1A2540', borderRadius:'6px', fontSize:'13px', color:'#E8EDF5', outline:'none', boxSizing:'border-box', fontFamily:'inherit' }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'10px', fontWeight:700, color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'6px' }}>Email address</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))}
                    style={{ width:'100%', padding:'10px 14px', background:'#0A0E1A', border:'1px solid #1A2540', borderRadius:'6px', fontSize:'13px', color:'#E8EDF5', outline:'none', boxSizing:'border-box', fontFamily:'inherit' }} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'10px', fontWeight:700, color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'6px' }}>How can we help?</label>
                  <select value={form.reason} onChange={e => setForm(f => ({...f,reason:e.target.value}))}
                    style={{ width:'100%', padding:'10px 14px', background:'#0A0E1A', border:'1px solid #1A2540', borderRadius:'6px', fontSize:'13px', color:'#E8EDF5', outline:'none', boxSizing:'border-box', fontFamily:'inherit', appearance:'none' }}>
                    {['List as supplier','Find suppliers','Investment opportunities','Logistics & freight','Partnership','Technical support','Other'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'10px', fontWeight:700, color:'#4A5568', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'6px' }}>Message</label>
                  <textarea rows={4} placeholder="Tell us more..." value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))}
                    style={{ width:'100%', padding:'10px 14px', background:'#0A0E1A', border:'1px solid #1A2540', borderRadius:'6px', fontSize:'13px', color:'#E8EDF5', outline:'none', boxSizing:'border-box', fontFamily:'inherit', resize:'none' }} />
                </div>
                <button onClick={() => setSent(true)} style={{ width:'100%', padding:'12px', background:'#C9A84C', color:'#0A0E1A', border:'none', borderRadius:'6px', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                  Send message →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

    <footer style={{ borderTop:'1px solid #1A2540', padding:'28px 48px' }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
        <span style={{ fontSize:'11px', color:'#4A5568', fontFamily:'monospace' }}>© 2025 AfriBizConnect Ltd. DIFC, Dubai, UAE</span>
        <div style={{ display:'flex', gap:'20px' }}>
          {[['Privacy','/privacy'],['Terms','/terms'],['Contact','/contact'],['← Home','/']].map(([l,h]) => (
            <Link key={l} href={h} style={{ fontSize:'11px', color:'#4A5568', textDecoration:'none' }}>{l}</Link>
          ))}
        </div>
      </div>
    </footer>
    </div>
  )
}
