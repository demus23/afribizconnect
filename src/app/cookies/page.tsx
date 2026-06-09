import Link from 'next/link'
import { Globe2 } from 'lucide-react'

export default function CookiesPage() {
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
        <h1 className="text-4xl font-black tracking-tighter mb-3" style={{ color:'#0f172a' }}>Cookie Policy</h1>
        <p className="text-sm mb-10" style={{ color:'#64748b' }}>Last updated: June 2025</p>
        <div className="space-y-8">
          {[
            { title:'What are cookies?', content:'Cookies are small text files stored on your device when you visit our platform. They help us recognise you, remember your preferences, and improve your experience on AfriBizConnect.' },
            { title:'Essential cookies', content:'These cookies are necessary for the platform to function. They enable core features like authentication, session management, and security. You cannot disable these cookies without affecting platform functionality. Examples: Supabase session cookie, CSRF protection token.' },
            { title:'Analytics cookies', content:'We use analytics cookies to understand how users interact with our platform, which pages are most visited, and how to improve performance. All analytics data is anonymised. We use Vercel Analytics for this purpose.' },
            { title:'Preference cookies', content:'These cookies remember your settings and preferences such as language, currency display, and dashboard layout. They improve your experience on return visits but are not essential to platform operation.' },
            { title:'Managing cookies', content:'You can control and/or delete cookies through your browser settings. Most browsers allow you to block or delete cookies. However, disabling essential cookies will prevent you from logging into AfriBizConnect. See your browser help documentation for cookie management instructions.' },
            { title:'Updates to this policy', content:'We may update this Cookie Policy periodically. We will notify you of significant changes via email or a platform notification. Continued use of AfriBizConnect after changes constitutes acceptance of the updated policy.' },
          ].map(s => (
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
