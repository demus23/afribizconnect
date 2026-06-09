import Link from 'next/link'
import { Globe2 } from 'lucide-react'

const SECTIONS = [
  { title:'1. Acceptance of terms', content:'By accessing or using AfriBizConnect, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our platform. These terms apply to all users including importers, exporters, suppliers, logistics providers, and investors.' },
  { title:'2. Platform description', content:'AfriBizConnect is a B2B trade infrastructure platform connecting African businesses with global suppliers, logistics providers, trade financiers, and investors. We facilitate connections and provide tools for trade management but are not a party to any transaction between users.' },
  { title:'3. User accounts', content:'You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorized access. One person or business entity may not maintain multiple accounts.' },
  { title:'4. Verified business profiles', content:'Verification badges are awarded after our KYB review process. Misrepresenting your business, providing false documents, or using the verified badge falsely will result in immediate account termination and may lead to legal action. Trust scores are calculated based on platform activity and verification data.' },
  { title:'5. Prohibited activities', content:'You may not use our platform for illegal trade, money laundering, fraud, or any activity that violates applicable laws. You may not circumvent our platform to transact directly with connections made through AfriBizConnect during an active subscription. Spam, abuse, or harassment of other users is strictly prohibited.' },
  { title:'6. Intellectual property', content:'AfriBizConnect and its content, features, and functionality are owned by AfriBizConnect Ltd and protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.' },
  { title:'7. Limitation of liability', content:'AfriBizConnect is a marketplace platform. We do not guarantee the quality, safety, or legality of products or services offered. We are not liable for losses arising from transactions between users, customs delays, payment disputes, or logistics issues. Our total liability is limited to fees paid in the 12 months prior to any claim.' },
  { title:'8. Governing law', content:'These terms are governed by the laws of the Dubai International Financial Centre (DIFC). Any disputes shall be subject to the exclusive jurisdiction of the DIFC Courts. If you are a consumer, you may also have rights under your local law.' },
]

export default function TermsPage() {
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
        <h1 className="text-4xl font-black tracking-tighter mb-3" style={{ color:'#0f172a' }}>Terms of Service</h1>
        <p className="text-sm mb-10" style={{ color:'#64748b' }}>Last updated: June 2025 · Effective date: January 2025</p>
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
