import Link from 'next/link'

export default function TermsofServicePage() {
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
        <h1 style={{ fontSize:'40px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'8px' }}>Terms of Service</h1>
        <p style={{ fontSize:'13px', color:'#4A5568', marginBottom:'48px', fontFamily:'monospace' }}>Last updated: June 2025 · Effective: January 2025</p>
        <div>
          
          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>1. Acceptance</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>By using AfriBizConnect you agree to these Terms. If you disagree, do not use our platform. These Terms apply to all users: importers, exporters, suppliers, logistics providers, and investors. We may update these Terms and will notify you by email of material changes.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>2. Platform description</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>AfriBizConnect is a B2B trade infrastructure platform. We provide tools for supplier discovery, RFQ management, logistics quoting, investment deal flow, and trade finance access. We facilitate connections between parties but are not a party to any transaction.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>3. User accounts</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>You must provide accurate, complete information when registering. You are responsible for maintaining the confidentiality of your credentials and all activity under your account. Notify us immediately of unauthorized access at security@afribizconnect.com.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>4. Verification and trust</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Verified badges are awarded after our KYB review. Providing false documents or misrepresenting your business will result in immediate termination and may trigger legal action. Trust Scores are calculated from platform activity and may change over time.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>5. Prohibited activities</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>You may not use our platform for illegal trade, sanctions violations, money laundering, fraud, spam, or harassment. You may not reverse-engineer our platform, scrape data without permission, or circumvent platform fees by transacting directly with connections made through AfriBizConnect.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>6. Intellectual property</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>AfriBizConnect, its trade intelligence data, Trust Score algorithm, and all platform content are owned by AfriBizConnect Ltd and protected by international IP law. You may not reproduce or distribute our content without written permission.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>7. Limitation of liability</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We do not guarantee the accuracy of supplier information, delivery of goods, or payment by buyers. We are not liable for losses from user transactions, customs issues, or logistics failures. Our total liability is capped at fees paid in the prior 12 months.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>8. Governing law</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>These Terms are governed by DIFC law. Disputes are subject to the exclusive jurisdiction of the DIFC Courts. If you are a consumer, you may have additional rights under your local law which we will honor.</p>
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
