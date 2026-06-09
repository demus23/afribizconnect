import Link from 'next/link'
import { Globe2 } from 'lucide-react'

const SECTIONS = [
  { title:'1. Information we collect', content:'We collect information you provide directly to us (name, email, business details), information about your use of our platform (transaction data, RFQs, messages), and technical information (IP address, browser type, device identifiers). We use this information to provide, improve, and protect our services.' },
  { title:'2. How we use your information', content:'We use the information we collect to operate and improve the AfriBizConnect platform, process transactions, communicate with you about your account and our services, verify business identity (KYB), match buyers with suppliers, and comply with legal obligations. We do not sell your personal data to third parties.' },
  { title:'3. Information sharing', content:'We share your business profile information with other verified users as part of the marketplace functionality. We may share information with service providers who assist in operating our platform, with your consent, or when required by law. We never sell personal data to advertisers.' },
  { title:'4. Data security', content:'We implement industry-standard security measures including TLS encryption, AES-256 data encryption at rest, regular security audits, and ISO 27001 certified practices. We are registered in the Dubai International Financial Centre (DIFC) and comply with DIFC data protection regulations.' },
  { title:'5. Data retention', content:'We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting hello@afribizconnect.com. Certain data may be retained for legal compliance purposes.' },
  { title:'6. Your rights', content:'You have the right to access, correct, or delete your personal data. You may also object to processing, request data portability, or withdraw consent where processing is based on consent. To exercise these rights, contact us at hello@afribizconnect.com.' },
  { title:'7. Cookies', content:'We use essential cookies to operate the platform, analytics cookies to improve our service, and preference cookies to remember your settings. You can control cookie preferences in your browser settings. See our Cookie Policy for full details.' },
  { title:'8. Contact us', content:'For privacy-related questions or to exercise your data rights, contact our Data Protection Officer at privacy@afribizconnect.com or write to AfriBizConnect Ltd, DIFC, Dubai, United Arab Emirates.' },
]

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily:"'Geist Sans',system-ui,sans-serif" }}>
      <header className="border-b" style={{ borderColor:'#f1f5f9' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#1e40af,#0f172a)' }}><Globe2 className="h-4 w-4 text-white" /></div>
            <span className="font-black text-[15px]">AfriBiz<span style={{ color:'#f59e0b' }}>Connect</span></span>
          </Link>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16">
        <div className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color:'#1e40af' }}>Legal</div>
        <h1 className="text-4xl font-black tracking-tighter mb-3" style={{ color:'#0f172a' }}>Privacy Policy</h1>
        <p className="text-sm mb-10" style={{ color:'#64748b' }}>Last updated: June 2025 · Effective date: January 2025</p>
        <p className="text-sm leading-relaxed mb-10 p-5 rounded-2xl border" style={{ color:'#374151', borderColor:'#e8edf3', background:'#f8fafc' }}>
          AfriBizConnect Ltd ("AfriBizConnect", "we", "us") is committed to protecting your privacy. This policy explains how we collect, use, and share information about you when you use our platform at afribizconnect.vercel.app.
        </p>
        <div className="space-y-8">
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2 className="text-base font-black mb-3" style={{ color:'#0f172a' }}>{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color:'#64748b' }}>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs" style={{ borderColor:'#f1f5f9', color:'#94a3b8' }}>
        <Link href="/" className="hover:text-blue-600 transition-colors">← Back to AfriBizConnect</Link>
      </div>
    </div>
  )
}
