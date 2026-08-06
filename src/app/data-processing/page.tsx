import Link from 'next/link'

export default function DataProcessingPage() {
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
        <h1 style={{ fontSize:'40px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'8px' }}>Data Processing Agreement</h1>
        <p style={{ fontSize:'13px', color:'#4A5568', marginBottom:'48px', fontFamily:'monospace' }}>Last updated: June 2025 · DIFC, Dubai, UAE</p>
        <div>
          
          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>1. Scope and purpose</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>This Data Processing Agreement (DPA) applies when AfriBizConnect processes personal data on behalf of business customers using our platform. It supplements our Privacy Policy and Terms of Service. This DPA is incorporated by reference into all AfriBizConnect service agreements.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>2. Definitions</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>"Data Controller" means the business customer who determines the purposes and means of processing. "Data Processor" means AfriBizConnect Ltd, which processes data on behalf of the Controller. "Personal Data" means any information relating to an identified or identifiable natural person. "Processing" means any operation performed on Personal Data.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>3. Processing instructions</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>AfriBizConnect processes personal data only on documented instructions from the Controller, which are set out in the service agreement and platform terms. We will not process personal data for any purpose other than providing the AfriBizConnect platform services.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>4. Security measures</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>AfriBizConnect implements appropriate technical and organizational measures including: TLS 1.3 encryption in transit, AES-256 encryption at rest, access controls and audit logs, regular penetration testing, SOC 2 Type II certified hosting (Supabase/AWS Frankfurt), and a formal incident response procedure.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>5. Sub-processors</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We use the following sub-processors: Supabase Inc (database, EU-Frankfurt region), Vercel Inc (hosting, EU edge network), Anthropic PBC (AI assistant, opt-in feature only), Stripe Inc (payment processing), Resend Inc (transactional email). We will notify you 30 days before adding new sub-processors.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>6. Data subject rights</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>We will assist Controllers in fulfilling data subject rights requests (access, correction, deletion, portability) within 5 business days of receiving a request. We will not respond directly to data subjects without Controller authorization except where required by law.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>7. Data transfers</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Personal data is primarily stored in the EU (Frankfurt). Where data is transferred outside the EU/EEA or DIFC, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission. On request, we will provide copies of applicable SCCs.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>8. Breach notification</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>In the event of a personal data breach affecting Controller data, we will notify the Controller without undue delay and within 72 hours of becoming aware. Notification will include the nature of the breach, categories and approximate number of data subjects affected, and measures taken to address the breach.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>9. Audit rights</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Controllers may audit our data processing activities once per calendar year with 30 days written notice. Audits will be conducted during business hours and at the Controller's expense. We will provide all information reasonably necessary to demonstrate compliance with this DPA.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>10. Governing law</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>This DPA is governed by DIFC law. For EU customers, it incorporates the EU Standard Contractual Clauses for Controller-to-Processor transfers. For questions, contact our Data Protection Officer at dpo@afribizconnect.com.</p>
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
