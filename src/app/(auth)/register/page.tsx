'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Globe2, Eye, EyeOff, ArrowRight, CheckCircle2, Loader2, AlertCircle, Building2, User, Mail, Lock } from 'lucide-react'
import { register, loginWithGoogle } from '@/lib/actions/auth'

const BUSINESS_TYPES = [
  { value: 'IMPORTER',           label: 'Importer / Buyer' },
  { value: 'DISTRIBUTOR',        label: 'Distributor' },
  { value: 'SUPPLIER',           label: 'Supplier / Exporter' },
  { value: 'LOGISTICS_PROVIDER', label: 'Logistics Provider' },
  { value: 'INVESTOR',           label: 'Investor' },
  { value: 'PRIVATE_EQUITY',     label: 'Private Equity / Fund' },
]

const BENEFITS = [
  'Verified business trust badge',
  'Access to 3,200+ global suppliers',
  'Investment opportunity listings',
  'Logistics quote requests',
  'Cross-border trade management',
]

export default function RegisterPage() {
  const [showPw, setShowPw]   = useState(false)
  const [step, setStep]       = useState(1)
  const [error, setError]     = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Store step 1 data so it carries to step 2 submission
  const [step1Data, setStep1Data] = useState({
    name: '', email: '', password: ''
  })

  function handleStep1Next() {
    const name     = (document.getElementById('reg-name')     as HTMLInputElement)?.value?.trim()
    const email    = (document.getElementById('reg-email')    as HTMLInputElement)?.value?.trim()
    const password = (document.getElementById('reg-password') as HTMLInputElement)?.value

    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setError(null)
    setStep1Data({ name, email, password })
    setStep(2)
  }

  async function handleFinalSubmit(formData: FormData) {
    setError(null)

    // Inject step 1 data into formData
    formData.set('name',     step1Data.name)
    formData.set('email',    step1Data.email)
    formData.set('password', step1Data.password)

    startTransition(async () => {
      const result = await register(formData)
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

      {/* ── Form ── */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-white lg:max-w-[560px]">
        <div className="w-full max-w-sm mx-auto">

          <Link href="/" className="flex items-center gap-2.5 mb-8">
            <div className="relative h-9 w-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
              <Globe2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-lg" style={{ color: '#0f172a' }}>
              AfriBiz<span style={{ color: '#f59e0b' }}>Connect</span>
            </span>
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all"
                  style={{ backgroundColor: step >= s ? '#1e40af' : '#f1f5f9', color: step >= s ? 'white' : '#94a3b8' }}>
                  {step > s ? '✓' : s}
                </div>
                <span className="text-[11px] font-semibold" style={{ color: step >= s ? '#1e40af' : '#94a3b8' }}>
                  {s === 1 ? 'Your details' : 'Business info'}
                </span>
                {s < 2 && <div className="h-px w-8" style={{ backgroundColor: step > s ? '#1e40af' : '#e2e8f0' }} />}
              </div>
            ))}
          </div>

          <h1 className="text-2xl font-black tracking-tight mb-1" style={{ color: '#0f172a' }}>
            {step === 1 ? 'Create your account' : 'About your business'}
          </h1>
          <p className="text-sm mb-6" style={{ color: '#64748b' }}>
            {step === 1 ? 'Free forever. No credit card required.' : 'Help us verify and showcase your business.'}
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl mb-4 text-sm"
              style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
              <AlertCircle className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Google */}
              <button type="button" onClick={handleGoogle} disabled={isPending}
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 disabled:opacity-60"
                style={{ borderColor: '#e2e8f0', color: '#374151' }}>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{ borderColor: '#f1f5f9' }} /></div>
                <div className="relative flex justify-center"><span className="px-3 text-xs font-medium" style={{ background: 'white', color: '#94a3b8' }}>or with email</span></div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#374151' }}>Full name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#94a3b8' }} />
                  <input id="reg-name" type="text" placeholder="Amara Okonkwo" defaultValue={step1Data.name}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border focus:outline-none transition-all"
                    style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#374151' }}>Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#94a3b8' }} />
                  <input id="reg-email" type="email" placeholder="you@business.com" defaultValue={step1Data.email}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border focus:outline-none transition-all"
                    style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#374151' }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#94a3b8' }} />
                  <input id="reg-password" type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-12 py-3 text-sm rounded-xl border focus:outline-none transition-all"
                    style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }}>
                    {showPw ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <button type="button" onClick={handleStep1Next}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow: '0 4px 16px rgba(30,64,175,0.3)' }}>
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <form action={handleFinalSubmit} className="space-y-4">
              {/* Show who we're registering */}
              <div className="flex items-center gap-2 p-3 rounded-xl mb-2"
                style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-medium" style={{ color: '#059669' }}>
                  Registering: {step1Data.email}
                </span>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#374151' }}>Business name</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#94a3b8' }} />
                  <input name="businessName" type="text" placeholder="Lagos Prime Imports Ltd"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border focus:outline-none transition-all"
                    style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#374151' }}>Business type</label>
                <select name="businessType"
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none"
                  style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc', color: '#374151' }}>
                  <option value="">Select your business type</option>
                  {BUSINESS_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color: '#374151' }}>Country</label>
                <select name="country"
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none"
                  style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc', color: '#374151' }}>
                  <option value="">Select your country</option>
                  {['Nigeria','Ghana','Kenya','Ethiopia','South Africa','Egypt','Tanzania','Uganda','Senegal','Morocco','Rwanda','UAE','Saudi Arabia','Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input type="checkbox" required id="terms" className="mt-0.5 h-4 w-4 rounded" />
                <label htmlFor="terms" className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                  I agree to the{' '}
                  <Link href="/terms" className="font-semibold hover:underline" style={{ color: '#1e40af' }}>Terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="font-semibold hover:underline" style={{ color: '#1e40af' }}>Privacy Policy</Link>
                </label>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => { setStep(1); setError(null) }}
                  className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-slate-50 transition-colors"
                  style={{ borderColor: '#e2e8f0', color: '#374151' }}>
                  Back
                </button>
                <button type="submit" disabled={isPending}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg,#059669,#047857)', boxShadow: '0 4px 16px rgba(5,150,105,0.3)' }}>
                  {isPending
                    ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</>
                    : <>Create account ✓</>
                  }
                </button>
              </div>
            </form>
          )}

          <p className="mt-5 text-center text-xs" style={{ color: '#94a3b8' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-black hover:underline" style={{ color: '#1e40af' }}>Sign in →</Link>
          </p>
        </div>
      </div>

      {/* ── Benefits panel ── */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#1e40af 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-sm">
          <div className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: '#fbbf24' }}>
            What you get — free
          </div>
          <h2 className="text-3xl font-black text-white leading-tight mb-8 tracking-tight">
            Your verified business<br />profile, globally visible.
          </h2>
          <div className="space-y-4 mb-10">
            {BENEFITS.map(b => (
              <div key={b} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(52,211,153,0.2)' }}>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span className="text-sm" style={{ color: 'rgba(147,197,253,0.8)' }}>{b}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[{ val: '12,400+', label: 'Businesses' }, { val: '54', label: 'Countries' }, { val: '$2.8B', label: 'Trade vol.' }].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-black text-white">{s.val}</div>
                <div className="text-[10px]" style={{ color: 'rgba(147,197,253,0.5)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}