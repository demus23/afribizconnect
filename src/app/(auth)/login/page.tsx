'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Globe2, Eye, EyeOff, ArrowRight, ShieldCheck, TrendingUp, Truck, BadgeCheck, Loader2, AlertCircle } from 'lucide-react'
import { login, loginWithGoogle } from '@/lib/actions/auth'

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) setError(result.error)
    })
  }

  async function handleGoogle() {
    setError(null)
    startTransition(async () => {
      const result = await loginWithGoogle()
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Geist Sans',system-ui,sans-serif" }}>

      {/* ── Form side ── */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-white lg:max-w-[520px]">
        <div className="w-full max-w-sm mx-auto">

          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <div className="relative h-9 w-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
              <Globe2 className="h-5 w-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <span className="font-black text-lg" style={{ color: '#0f172a' }}>
              AfriBiz<span style={{ color: '#f59e0b' }}>Connect</span>
            </span>
          </Link>

          <h1 className="text-3xl font-black tracking-tight mb-1" style={{ color: '#0f172a' }}>Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: '#64748b' }}>Sign in to your trade dashboard</p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl mb-5 text-sm"
              style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Google */}
          <button onClick={handleGoogle} disabled={isPending}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl text-sm font-semibold mb-5 transition-all hover:bg-slate-50 disabled:opacity-60"
            style={{ borderColor: '#e2e8f0', color: '#374151' }}>
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: '#f1f5f9' }} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs font-medium" style={{ background: 'white', color: '#94a3b8' }}>or sign in with email</span>
            </div>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#374151' }}>
                Email address
              </label>
              <input name="email" type="email" required placeholder="you@business.com"
                className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all"
                style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black uppercase tracking-wide" style={{ color: '#374151' }}>Password</label>
                <Link href="/forgot-password" className="text-xs font-semibold hover:underline" style={{ color: '#1e40af' }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input name="password" type={showPw ? 'text' : 'password'} required placeholder="••••••••"
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all pr-12"
                  style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1" style={{ color: '#94a3b8' }}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <input type="hidden" name="redirectTo" value={redirectTo} />

            <button type="submit" disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow: '0 4px 16px rgba(30,64,175,0.35)' }}>
              {isPending
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</>
                : <><span>Sign in to dashboard</span> <ArrowRight className="h-4 w-4" /></>
              }
            </button>
          </form>

          <p className="mt-6 text-center text-xs" style={{ color: '#94a3b8' }}>
            Don't have an account?{' '}
            <Link href="/register" className="font-black hover:underline" style={{ color: '#1e40af' }}>Create one free →</Link>
          </p>
        </div>
      </div>

      {/* ── Brand panel ── */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 40%,#1e40af 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(251,191,36,0.08) 0%,transparent 70%)' }} />

        <Link href="/" className="relative flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <Globe2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-black text-sm text-white">AfriBiz<span style={{ color: '#fbbf24' }}>Connect</span></span>
        </Link>

        <div className="relative">
          <div className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: '#fbbf24' }}>
            Pan-African Trade Platform
          </div>
          <h2 className="text-4xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            Africa's trade<br />infrastructure,<br />
            <span style={{ color: '#6ee7b7' }}>reimagined.</span>
          </h2>
          <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: 'rgba(147,197,253,0.65)' }}>
            Connect with verified suppliers, investors, and logistics providers across 54 African markets.
          </p>
          <div className="space-y-3">
            {[
              { icon: ShieldCheck, text: '3,200+ KYB-verified global suppliers', color: '#34d399' },
              { icon: TrendingUp,  text: '$2.8B in trade volume facilitated',    color: '#fbbf24' },
              { icon: Truck,       text: 'Logistics & customs in 54 countries',  color: '#60a5fa' },
              { icon: BadgeCheck,  text: 'ISO 27001 certified · DIFC licensed',  color: '#a78bfa' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <item.icon className="h-4 w-4" style={{ color: item.color }} />
                </div>
                <span className="text-sm" style={{ color: 'rgba(147,197,253,0.7)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}</div>
          <p className="text-xs leading-relaxed italic mb-3" style={{ color: 'rgba(147,197,253,0.7)' }}>
            "Cut our supplier sourcing time by 70%. Closed our first LC with a UAE partner in under 2 weeks."
          </p>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-emerald-700 flex items-center justify-center text-[10px] font-black text-white">AO</div>
            <div>
              <div className="text-xs font-black text-white">Adaeze Okonkwo</div>
              <div className="text-[10px]" style={{ color: 'rgba(147,197,253,0.5)' }}>CEO, Lagos Prime Imports · Nigeria</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
