import Link from 'next/link'
import { Globe2, Mail, ArrowRight } from 'lucide-react'

export default function VerifyPage({ searchParams }: { searchParams: { email?: string } }) {
  const email = searchParams.email || 'your email'

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg,#f8fafc 0%,#eff6ff 100%)', fontFamily: "'Geist Sans',system-ui,sans-serif" }}>
      <div className="w-full max-w-sm text-center">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10">
          <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
            <Globe2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-lg" style={{ color: '#0f172a' }}>AfriBiz<span style={{ color: '#f59e0b' }}>Connect</span></span>
        </Link>

        <div className="bg-white rounded-3xl border p-10 shadow-sm" style={{ borderColor: '#e8edf3' }}>
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)' }}>
            <Mail className="h-8 w-8" style={{ color: '#1e40af' }} />
          </div>
          <h1 className="text-2xl font-black mb-2" style={{ color: '#0f172a' }}>Check your email</h1>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: '#64748b' }}>
            We sent a verification link to<br />
            <strong style={{ color: '#0f172a' }}>{email}</strong>
          </p>
          <p className="text-xs mb-6" style={{ color: '#94a3b8' }}>
            Click the link in the email to activate your account. Check your spam folder if you don't see it.
          </p>
          <Link href="/login"
            className="flex items-center justify-center gap-2 text-sm font-black py-3 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
            Back to sign in <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-6 text-xs" style={{ color: '#94a3b8' }}>
          Didn't receive it?{' '}
          <button className="font-semibold hover:underline" style={{ color: '#1e40af' }}>Resend email</button>
        </p>
      </div>
    </div>
  )
}
