import Link from 'next/link'

const SECTIONS = [
  { t:'What are cookies?',          c:'Cookies are small text files placed on your device when you visit AfriBizConnect. They enable core platform functionality, help us remember your preferences, and improve your experience over time.' },
  { t:'Essential cookies',          c:'Required for the platform to function. Examples: Supabase authentication session cookie (keeps you logged in), CSRF protection token (prevents cross-site attacks). These cannot be disabled without breaking core functionality.' },
  { t:'Analytics cookies',          c:'Help us understand how users navigate the platform so we can improve it. We use Vercel Analytics which collects anonymized, aggregated data only. No personal identifiers are stored in analytics cookies.' },
  { t:'Preference cookies',         c:'Remember your settings such as currency display (USD/NGN/KES) and dashboard layout. These improve your return experience but are not required for core functionality.' },
  { t:'Third-party cookies',        c:'Stripe (payment processing) and Supabase (authentication) may set their own cookies required to process payments and maintain secure sessions. These are governed by their respective privacy policies.' },
  { t:'Managing your preferences',  c:'You can manage cookies through your browser settings. Chrome: Settings → Privacy → Cookies. Firefox: Preferences → Privacy. Safari: Preferences → Privacy. Disabling essential cookies will prevent login to AfriBizConnect.' },
  { t:'Updates to this policy',     c:'We may update this Cookie Policy periodically. We will notify you of significant changes via email or a platform notification. Continued use of AfriBizConnect after changes constitutes acceptance of the updated policy.' },
]

export default function CookiesPage() {
  return (
    <div style={{ fontFamily:'"Inter",system-ui,sans-serif', background:'#0A0E1A', minHeight:'100vh', color:'#E8EDF5' }}>
      <nav style={{ background:'#0A0E1A', borderBottom:'1px solid #1A2540', padding:'0 48px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          <div style={{ width:'28px', height:'28px', background:'#C9A84C', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontSize:'12px', fontWeight:900, color:'#0A0E1A' }}>A</span></div>
          <span style={{ fontSize:'12px', fontWeight:800, color:'#E8EDF5', letterSpacing:'0.08em' }}>AFRIBIZCONNECT</span>
        </Link>
        <Link href="/privacy" style={{ fontSize:'12px', color:'#4A5568', textDecoration:'none' }}>← Privacy Policy</Link>
      </nav>
      <div style={{ maxWidth:'720px', margin:'0 auto', padding:'80px 48px' }}>
        <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'12px', fontFamily:'monospace' }}>Legal</div>
        <h1 style={{ fontSize:'40px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'8px' }}>Cookie Policy</h1>
        <p style={{ fontSize:'13px', color:'#4A5568', marginBottom:'48px', fontFamily:'monospace' }}>Last updated: June 2025</p>
        <div>
          {SECTIONS.map(s => (
            <div key={s.t} style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
              <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>{s.t}</h2>
              <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>{s.c}</p>
            </div>
          ))}
        </div>
      </div>
      <footer style={{ borderTop:'1px solid #1A2540', padding:'28px 48px' }}>
        <div style={{ maxWidth:'720px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <span style={{ fontSize:'11px', color:'#4A5568', fontFamily:'monospace' }}>© 2025 AfriBizConnect Ltd.</span>
          <div style={{ display:'flex', gap:'20px' }}>
            {[['Privacy','/privacy'],['Terms','/terms'],['← Home','/']].map(([l,h]) => (
              <Link key={l} href={h} style={{ fontSize:'11px', color:'#4A5568', textDecoration:'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
