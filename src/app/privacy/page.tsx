import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
      <div style={{ maxWidth:'720px', margin:'0 auto', padding:'80px 48px' }}>
        <div style={{ fontSize:'11px', color:'#C9A84C', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'12px', fontFamily:'monospace' }}>Legal</div>
        <h1 style={{ fontSize:'40px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'8px' }}>Privacy Policy</h1>
        <p style={{ fontSize:'13px', color:'#4A5568', marginBottom:'48px', fontFamily:'monospace' }}>Last updated: June 2025 · DIFC, Dubai, UAE</p>
        <div>
          
          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>1. Information we collect</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We collect information you provide directly (name, email, business details), information about your platform use (RFQs, messages, transactions), and technical data (IP address, browser, device identifiers). This data powers our KYB verification, supplier matching, and trade finance facilitation.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>2. How we use your information</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We use your data to operate and improve AfriBizConnect, process transactions, verify business identity, match buyers with suppliers, send service communications, and comply with legal obligations. We do not sell your personal data to third parties or advertisers.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>3. Information sharing</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Business profile information is shared with other verified platform users as part of marketplace functionality. We share data with service providers under confidentiality agreements. We may disclose data when required by law, court order, or regulatory request.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>4. Data security</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We implement TLS encryption for data in transit and AES-256 encryption at rest. Our platform is hosted on Supabase (Frankfurt region) with SOC 2 Type II certification. We conduct regular security reviews and maintain a responsible disclosure policy.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>5. Data retention</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We retain your data for as long as your account is active or as needed to provide services. You may request account and data deletion by emailing privacy@afribizconnect.com. Some data may be retained for up to 7 years for legal and regulatory compliance.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>6. Your rights</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>You have rights to access, correct, delete, and port your personal data. You may object to or restrict processing. To exercise these rights, email privacy@afribizconnect.com. We will respond within 30 days. You also have the right to lodge a complaint with the DIFC Commissioner of Data Protection.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>7. Cookies</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We use essential cookies (authentication, security), analytics cookies (anonymized usage data via Vercel Analytics), and preference cookies (dashboard settings). See our Cookie Policy for full details and management instructions.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>8. Contact</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Data Protection Officer: privacy@afribizconnect.com. AfriBizConnect Ltd, Gate District, DIFC, Dubai, United Arab Emirates. DIFC Data Protection Registration No: [pending].</p>
          </div>
        </div>
      </div>

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
