'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, AlertCircle, DollarSign, TrendingUp, Globe2, Calendar, FileText } from 'lucide-react'

const SECTORS = ['Agriculture','Technology','Manufacturing','Logistics & Transport','Real Estate','Energy & Utilities','Financial Services','Healthcare','Retail & FMCG','Mining & Resources','Tourism & Hospitality','Education']
const TYPES   = [{ id:'EQUITY', label:'Equity', desc:'Ownership stake in exchange for capital' },{ id:'DEBT', label:'Debt / Bond', desc:'Fixed return loan structure' },{ id:'TRADE_FINANCE', label:'Trade Finance', desc:'LC, invoice factoring, supply chain finance' },{ id:'JOINT_VENTURE', label:'Joint Venture', desc:'Partnership for a specific project or market' },{ id:'ACQUISITION', label:'Acquisition', desc:'Full or partial business acquisition' }]
const STAGES  = ['Pre-seed','Seed','Series A','Series B','Series C+','Growth','Mature','Turnaround']
const COUNTRIES = ['Nigeria','Kenya','Ghana','South Africa','Ethiopia','Tanzania','Uganda','Senegal','Côte d\'Ivoire','Morocco','Egypt','Rwanda','Zambia','Mozambique','Cameroon','Zimbabwe','Angola','Sudan','Madagascar','Mali']

export default function NewOpportunityPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string|null>(null)

  const [form, setForm] = useState({
    title: '', type: '', sector: '', country: '', stage: '',
    description: '', targetAmount: '', minimumTicket: '', currency: 'USD',
    expectedReturn: '', timeline: '', deadline: '',
    useOfFunds: '', highlights: '',
  })

  function set(field: string, val: string) {
    setForm(p => ({ ...p, [field]: val }))
  }

  async function submit() {
    if (!form.title || !form.type || !form.sector || !form.country || !form.targetAmount || !form.minimumTicket) {
      setError('Please fill all required fields.'); return
    }
    setSaving(true); setError(null)
    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      router.push('/invest?listed=1')
    } catch { setError('Failed to submit. Try again.') }
    finally { setSaving(false) }
  }

  const stepTitles = ['Deal basics','Financial terms','Description & highlights']

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/invest" className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <ArrowLeft className="h-4 w-4" style={{ color:'#64748b' }} />
        </Link>
        <div>
          <h1 className="text-xl font-black" style={{ color:'#0f172a' }}>List Investment Opportunity</h1>
          <p className="text-xs mt-0.5" style={{ color:'#64748b' }}>Reach 480+ active investors on AfriBizConnect</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {stepTitles.map((t, i) => (
          <div key={t} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                style={step > i+1 ? { background:'#059669', color:'white' } : step === i+1 ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white' } : { background:'#f1f5f9', color:'#94a3b8' }}>
                {step > i+1 ? '✓' : i+1}
              </div>
              <span className="text-xs font-semibold hidden sm:block" style={{ color: step===i+1 ? '#0f172a' : '#94a3b8' }}>{t}</span>
            </div>
            {i < 2 && <div className="flex-1 h-px mx-2" style={{ background: step > i+1 ? '#059669' : '#e2e8f0' }} />}
          </div>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl mb-5 text-sm" style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626' }}>
          <AlertCircle className="h-4 w-4 shrink-0" />{error}
        </div>
      )}

      <div className="rounded-2xl bg-white border p-6 space-y-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Deal title *</label>
              <input type="text" placeholder="e.g. Series A — Lagos Cold Chain Logistics" value={form.title} onChange={e => set('title', e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wide mb-2" style={{ color:'#374151' }}>Deal type *</label>
              <div className="grid grid-cols-1 gap-2">
                {TYPES.map(t => (
                  <button key={t.id} type="button" onClick={() => set('type', t.id)}
                    className="flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all"
                    style={form.type===t.id ? { borderColor:'#1e40af', background:'#eff6ff' } : { borderColor:'#e2e8f0', background:'white' }}>
                    <div className="h-4 w-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center"
                      style={{ borderColor: form.type===t.id ? '#1e40af' : '#cbd5e1' }}>
                      {form.type===t.id && <div className="h-2 w-2 rounded-full bg-blue-700" />}
                    </div>
                    <div>
                      <div className="text-sm font-black" style={{ color:'#0f172a' }}>{t.label}</div>
                      <div className="text-xs mt-0.5" style={{ color:'#64748b' }}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Sector *</label>
                <select value={form.sector} onChange={e => set('sector', e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                  <option value="">Select sector</option>
                  {SECTORS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Country *</label>
                <select value={form.country} onChange={e => set('country', e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                  <option value="">Select country</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Business stage</label>
              <div className="flex flex-wrap gap-2">
                {STAGES.map(s => (
                  <button key={s} type="button" onClick={() => set('stage', s)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl border transition-all"
                    style={form.stage===s ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' } : { borderColor:'#e2e8f0', color:'#475569' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Target raise amount (USD) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color:'#94a3b8' }} />
                  <input type="number" placeholder="5000000" value={form.targetAmount} onChange={e => set('targetAmount', e.target.value)}
                    className="w-full pl-9 pr-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Minimum ticket (USD) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color:'#94a3b8' }} />
                  <input type="number" placeholder="100000" value={form.minimumTicket} onChange={e => set('minimumTicket', e.target.value)}
                    className="w-full pl-9 pr-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Expected return (%)</label>
                <input type="number" placeholder="22" value={form.expectedReturn} onChange={e => set('expectedReturn', e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Investment horizon</label>
                <select value={form.timeline} onChange={e => set('timeline', e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                  <option value="">Select timeline</option>
                  {['6-12 months','1-2 years','2-3 years','3-5 years','5-7 years','7+ years'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Deadline for expressions of interest</label>
              <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }} />
            </div>

            {/* Preview card */}
            <div className="rounded-2xl border p-4" style={{ background:'linear-gradient(135deg,#f0f6ff,#eff6ff)', borderColor:'#bfdbfe' }}>
              <div className="text-xs font-black uppercase tracking-wide mb-3" style={{ color:'#1e40af' }}>Deal preview</div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label:'Target raise', val: form.targetAmount ? `$${Number(form.targetAmount).toLocaleString()}` : '—' },
                  { label:'Min ticket',   val: form.minimumTicket ? `$${Number(form.minimumTicket).toLocaleString()}` : '—' },
                  { label:'Expected IRR', val: form.expectedReturn ? `${form.expectedReturn}%` : '—' },
                ].map(m => (
                  <div key={m.label} className="text-center p-2 rounded-xl bg-white">
                    <div className="text-sm font-black" style={{ color:'#1e40af' }}>{m.val}</div>
                    <div className="text-[10px]" style={{ color:'#94a3b8' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Deal description *</label>
              <textarea rows={4} placeholder="Describe your business, the opportunity, market size, traction, and why investors should care..." value={form.description} onChange={e => set('description', e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Use of funds</label>
              <textarea rows={3} placeholder="e.g. 40% fleet expansion, 35% working capital, 25% technology..." value={form.useOfFunds} onChange={e => set('useOfFunds', e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Key investment highlights</label>
              <textarea rows={3} placeholder="e.g. • 3x revenue growth YoY&#10;• Exclusive contract with Lagos Port Authority&#10;• $2.1M ARR, 92% retention" value={form.highlights} onChange={e => set('highlights', e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
            </div>

            <div className="rounded-2xl p-4 border" style={{ background:'#f0fdf4', borderColor:'#bbf7d0' }}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-black text-emerald-700">What happens after you submit</span>
              </div>
              <ul className="space-y-1 text-xs" style={{ color:'#065f46' }}>
                <li>• Our team reviews your listing within 24 hours</li>
                <li>• Once approved, it's visible to 480+ verified investors</li>
                <li>• Investors express interest directly through the platform</li>
                <li>• You receive notifications and can manage all inquiries in your dashboard</li>
              </ul>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button onClick={() => setStep(s => s-1)}
              className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-slate-50 transition-colors"
              style={{ borderColor:'#e2e8f0', color:'#374151' }}>
              Back
            </button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep(s => s+1)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white"
              style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={submit} disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white disabled:opacity-70"
              style={{ background:'linear-gradient(135deg,#059669,#047857)' }}>
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting...</> : <>Submit for review <CheckCircle2 className="h-4 w-4" /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
