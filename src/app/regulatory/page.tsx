import Link from 'next/link'

export default function RegulatoryPage() {
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
        <h1 style={{ fontSize:'40px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'8px' }}>Regulatory & Compliance</h1>
        <p style={{ fontSize:'13px', color:'#4A5568', marginBottom:'48px', fontFamily:'monospace' }}>AfriBizConnect Ltd · DIFC, Dubai, UAE</p>
        <div>
          
          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>Company registration</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>AfriBizConnect Ltd is incorporated in the Dubai International Financial Centre (DIFC), a leading international financial centre in the Middle East. DIFC operates under its own civil and commercial laws based on English common law, providing a world-class legal and regulatory framework.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>Platform classification</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>AfriBizConnect operates as a B2B trade infrastructure platform and marketplace. We are a technology intermediary that facilitates connections between buyers, sellers, logistics providers, and investors. We do not hold funds, issue financial instruments, or provide regulated financial advice unless specifically stated.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>Trade compliance</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>All users of AfriBizConnect must comply with applicable international trade laws, export control regulations, and sanctions regimes. We screen users against OFAC, UN, EU, and UAE sanctions lists. Businesses from sanctioned countries or involved in prohibited activities will be denied access. We cooperate fully with legitimate regulatory inquiries.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>Anti-money laundering (AML)</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>AfriBizConnect maintains an AML compliance program in line with FATF recommendations. Our KYB (Know Your Business) verification process verifies business registration, beneficial ownership, and source of funds for businesses accessing trade finance features. We file Suspicious Activity Reports (SARs) as required by applicable law.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>Data protection</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We comply with DIFC Data Protection Law No. 5 of 2020 (DIFC DP Law). Our Data Protection Officer can be reached at dpo@afribizconnect.com. We are registered with the DIFC Commissioner of Data Protection. For EU users, we comply with GDPR via Standard Contractual Clauses.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>Payment services</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Payment processing on our platform is provided by Stripe Inc, which holds the necessary licenses to operate as a payment service provider in the jurisdictions where we operate. AfriBizConnect does not hold or process payment card data directly. All payment data is handled by Stripe in a PCI-DSS compliant environment.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>Investment activities</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>The investment deal listings on AfriBizConnect are provided for information purposes only and do not constitute financial advice, an offer to sell, or a solicitation to buy any security or financial instrument. Investors should conduct their own due diligence and seek independent professional advice before making any investment decision.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>Contact for regulatory matters</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>For regulatory inquiries, law enforcement requests, or compliance questions: compliance@afribizconnect.com. For DIFC regulatory matters: AfriBizConnect Ltd, Gate District Building, DIFC, PO Box 506501, Dubai, UAE. We aim to respond to all regulatory inquiries within 2 business days.</p>
          </div>
        </div>
      </div>

    <footer style={{ borderTop:'1px solid #1A2540', padding:'28px 48px' }}>
      <div style={{ maxWidth:'720px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
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
