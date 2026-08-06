import Link from 'next/link'

export default function RefundPage() {
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
        <h1 style={{ fontSize:'40px', fontWeight:900, letterSpacing:'-0.02em', marginBottom:'8px' }}>Refund Policy</h1>
        <p style={{ fontSize:'13px', color:'#4A5568', marginBottom:'48px', fontFamily:'monospace' }}>Last updated: June 2025</p>
        <div>
          
          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>1. Subscription refunds</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Paid plans (Starter and Growth) include a 14-day free trial. If you cancel within 14 days of your first paid charge, we will issue a full refund. After 14 days, subscriptions are non-refundable as they provide immediate access to all platform features.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>2. Annual plan refunds</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Annual subscriptions cancelled within 30 days of purchase are eligible for a full refund. Cancellations after 30 days will receive a pro-rata refund for unused complete months, less a 10% processing fee.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>3. How to request a refund</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>To request a refund, email billing@afribizconnect.com with your account email and reason for cancellation. We process all refund requests within 5 business days. Approved refunds are returned to the original payment method within 7-10 business days.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>4. Exceptions</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>Refunds will not be issued where the account was suspended for violating our Terms of Service, or where we can demonstrate significant platform usage during the subscription period. Featured listing fees and investment deal listing fees are non-refundable once the listing is live.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>5. Disputes</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>If you believe you have been charged in error, contact billing@afribizconnect.com within 30 days of the charge. We will investigate and respond within 3 business days. If unresolved, you may escalate to your card provider. We will cooperate with all legitimate chargeback disputes.</p>
          </div>

          <div style={{ borderBottom:'1px solid #1A2540', paddingBottom:'28px', marginBottom:'28px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:800, color:'#E8EDF5', marginBottom:'12px' }}>6. Currency</h2>
            <p style={{ fontSize:'14px', color:'#4A5568', lineHeight:1.8 }}>All refunds are processed in USD at the exchange rate on the date of the original transaction. We are not responsible for currency conversion losses on your end.</p>
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
