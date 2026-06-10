'use client'
import { useState, useEffect } from 'react'
import { Plus, Package, Clock, CheckCircle2, XCircle, Loader2, AlertCircle, ChevronDown, X, FileText, Globe2, DollarSign, Calendar } from 'lucide-react'

const CATEGORIES = ['Electronics','FMCG','Textiles','Auto Parts','Agriculture','Pharmaceuticals','Machinery','Building Materials','Food & Beverages','Chemicals','Medical Devices','Cosmetics','Steel & Metal']
const COUNTRIES  = ['UAE','China','Turkey','India','Saudi Arabia','Germany','Netherlands','South Africa','Kenya','Nigeria','Ghana','Egypt','Ethiopia']
const TERMS      = ['LC','TT','CAD','Net30','Net60','DP']

const STATUS_STYLES: Record<string,{bg:string,color:string,label:string}> = {
  OPEN:    { bg:'#f0fdf4', color:'#059669', label:'Open' },
  AWARDED: { bg:'#f5f3ff', color:'#7c3aed', label:'Awarded' },
  CLOSED:  { bg:'#f1f5f9', color:'#64748b', label:'Closed' },
  EXPIRED: { bg:'#fef2f2', color:'#dc2626', label:'Expired' },
}

export default function SourcingPage() {
  const [rfqs, setRfqs]       = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setForm]   = useState(false)
  const [submitting, setSub]  = useState(false)
  const [error, setError]     = useState<string|null>(null)
  const [success, setSuccess] = useState(false)

  const [form, setForm2] = useState({
    title: '', description: '', category: '', targetCountry: '',
    quantity: '', unit: '', budget: '', deadline: '', paymentTerms: [] as string[],
  })

  useEffect(() => { fetchRfqs() }, [])

  async function fetchRfqs() {
    setLoading(true)
    try {
      const res  = await fetch('/api/rfqs')
      const data = await res.json()
      setRfqs(data.rfqs || [])
    } catch { setRfqs([]) }
    finally  { setLoading(false) }
  }

  async function handleSubmit() {
    if (!form.title || !form.description || !form.category) {
      setError('Title, description, and category are required.')
      return
    }
    setSub(true); setError(null)
    try {
      const res  = await fetch('/api/rfqs', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setSuccess(true)
      setForm2({ title:'', description:'', category:'', targetCountry:'', quantity:'', unit:'', budget:'', deadline:'', paymentTerms:[] })
      setForm(false)
      fetchRfqs()
      setTimeout(() => setSuccess(false), 3000)
    } catch { setError('Failed to post RFQ. Try again.') }
    finally  { setSub(false) }
  }

  async function closeRfq(id: string) {
    await fetch('/api/rfqs', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id, status:'CLOSED' }) })
    fetchRfqs()
  }

  function toggleTerm(t: string) {
    setForm2(prev => ({
      ...prev,
      paymentTerms: prev.paymentTerms.includes(t) ? prev.paymentTerms.filter(x => x !== t) : [...prev.paymentTerms, t]
    }))
  }

  const openCount   = rfqs.filter(r => r.status === 'OPEN').length
  const totalQuotes = rfqs.reduce((a, r) => a + (r.quotes?.length || 0), 0)

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Sourcing & RFQs</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Post buyer requests and receive quotes from verified global suppliers</p>
        </div>
        <button onClick={() => setForm(true)}
          className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white"
          style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow:'0 4px 12px rgba(30,64,175,0.3)' }}>
          <Plus className="h-4 w-4" /> Post new RFQ
        </button>
      </div>

      {/* Success toast */}
      {success && (
        <div className="flex items-center gap-2.5 p-4 rounded-2xl text-sm" style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#059669' }}>
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          RFQ posted successfully! Verified suppliers will respond within 24-48 hours.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'Total RFQs',     val:String(rfqs.length), color:'#1e40af', bg:'#eff6ff', icon:FileText },
          { label:'Open',           val:String(openCount),   color:'#059669', bg:'#f0fdf4', icon:CheckCircle2 },
          { label:'Total quotes',   val:String(totalQuotes), color:'#7c3aed', bg:'#f5f3ff', icon:Package },
          { label:'Avg response',   val:'24h',               color:'#d97706', bg:'#fffbeb', icon:Clock },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-white border p-4 flex items-center gap-3" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:s.bg }}>
              <s.icon className="h-4 w-4" style={{ color:s.color }} />
            </div>
            <div>
              <div className="text-xl font-black" style={{ color:'#0f172a' }}>{s.val}</div>
              <div className="text-xs" style={{ color:'#64748b' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RFQ list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color:'#1e40af' }} />
        </div>
      ) : rfqs.length === 0 ? (
        <div className="rounded-2xl bg-white border p-16 text-center" style={{ borderColor:'#e8edf3' }}>
          <Package className="h-14 w-14 mx-auto mb-4" style={{ color:'#cbd5e1' }} />
          <h3 className="text-base font-black mb-2" style={{ color:'#0f172a' }}>No RFQs yet</h3>
          <p className="text-sm mb-6" style={{ color:'#64748b' }}>Post your first buyer request and get quotes from 3,200+ verified global suppliers.</p>
          <button onClick={() => setForm(true)}
            className="flex items-center gap-2 text-sm font-black px-6 py-3 rounded-xl text-white mx-auto"
            style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
            <Plus className="h-4 w-4" /> Post your first RFQ
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {rfqs.map((rfq: any) => {
            const s = STATUS_STYLES[rfq.status] || STATUS_STYLES['OPEN']
            return (
              <div key={rfq.id} className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                      <h3 className="text-sm font-black" style={{ color:'#0f172a' }}>{rfq.title}</h3>
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full" style={{ background:s.bg, color:s.color }}>{s.label}</span>
                      {rfq.category && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border" style={{ borderColor:'#e2e8f0', color:'#475569' }}>{rfq.category}</span>}
                    </div>
                    <p className="text-xs leading-relaxed mb-3 max-w-2xl" style={{ color:'#64748b' }}>{rfq.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color:'#94a3b8' }}>
                      {rfq.quantity && <span className="flex items-center gap-1"><Package className="h-3 w-3" />{rfq.quantity} {rfq.unit}</span>}
                      {rfq.budget    && <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />${Number(rfq.budget).toLocaleString()} budget</span>}
                      {rfq.targetCountry && <span className="flex items-center gap-1"><Globe2 className="h-3 w-3" />From: {rfq.targetCountry}</span>}
                      {rfq.deadline  && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due: {new Date(rfq.deadline).toLocaleDateString()}</span>}
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Posted: {new Date(rfq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center px-4 py-2 rounded-xl" style={{ background:'#f5f3ff' }}>
                      <div className="text-base font-black" style={{ color:'#7c3aed' }}>{rfq.quotes?.length || 0}</div>
                      <div className="text-[10px]" style={{ color:'#7c3aed' }}>Quotes</div>
                    </div>
                    {rfq.status === 'OPEN' && (
                      <button onClick={() => closeRfq(rfq.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border hover:bg-red-50 transition-colors"
                        style={{ borderColor:'#fecaca', color:'#dc2626' }}>
                        <XCircle className="h-3.5 w-3.5" /> Close
                      </button>
                    )}
                  </div>
                </div>

                {/* Quotes */}
                {rfq.quotes?.length > 0 && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor:'#f1f5f9' }}>
                    <div className="text-xs font-black mb-2" style={{ color:'#0f172a' }}>Supplier quotes received</div>
                    <div className="space-y-2">
                      {rfq.quotes.map((q: any) => (
                        <div key={q.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background:'#f8fafc', border:'1px solid #f1f5f9' }}>
                          <div className="h-7 w-7 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                            {q.supplier?.name?.[0] || 'S'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold" style={{ color:'#0f172a' }}>{q.supplier?.name || 'Supplier'}</div>
                            <div className="text-[10px]" style={{ color:'#94a3b8' }}>Trust score: {q.supplier?.trustScore || 'N/A'} · {q.supplier?.country}</div>
                          </div>
                          {q.price && <span className="text-xs font-black" style={{ color:'#059669' }}>${Number(q.price).toLocaleString()}</span>}
                          <button className="text-[10px] font-black px-3 py-1.5 rounded-lg text-white" style={{ background:'linear-gradient(135deg,#059669,#047857)' }}>View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* NEW RFQ MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}>
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden" style={{ maxHeight:'90vh', overflowY:'auto' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor:'#f1f5f9' }}>
              <h2 className="text-lg font-black" style={{ color:'#0f172a' }}>Post Buyer Request (RFQ)</h2>
              <button onClick={() => { setForm(false); setError(null) }} className="p-2 rounded-xl hover:bg-slate-100">
                <X className="h-5 w-5" style={{ color:'#64748b' }} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl text-sm" style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626' }}>
                  <AlertCircle className="h-4 w-4 shrink-0" />{error}
                </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>What are you looking to buy? *</label>
                <input type="text" placeholder="e.g. 500 units of Samsung 55-inch LED TVs" value={form.title} onChange={e => setForm2(p => ({...p, title:e.target.value}))}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none focus:ring-2" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Detailed requirements *</label>
                <textarea rows={3} placeholder="Describe specifications, certifications needed, packaging, delivery terms..." value={form.description} onChange={e => setForm2(p => ({...p, description:e.target.value}))}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Category *</label>
                  <select value={form.category} onChange={e => setForm2(p => ({...p, category:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Preferred supplier country</label>
                  <select value={form.targetCountry} onChange={e => setForm2(p => ({...p, targetCountry:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="">Any country</option>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Quantity</label>
                  <input type="number" placeholder="500" value={form.quantity} onChange={e => setForm2(p => ({...p, quantity:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Unit</label>
                  <input type="text" placeholder="units / MT / kg" value={form.unit} onChange={e => setForm2(p => ({...p, unit:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Budget (USD)</label>
                  <input type="number" placeholder="50000" value={form.budget} onChange={e => setForm2(p => ({...p, budget:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Required by</label>
                <input type="date" value={form.deadline} onChange={e => setForm2(p => ({...p, deadline:e.target.value}))}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }} />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Acceptable payment terms</label>
                <div className="flex gap-2 flex-wrap">
                  {TERMS.map(t => (
                    <button key={t} type="button" onClick={() => toggleTerm(t)}
                      className="text-xs font-bold px-3.5 py-2 rounded-xl border transition-all"
                      style={form.paymentTerms.includes(t)
                        ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderColor:'#1e40af' }
                        : { borderColor:'#e2e8f0', color:'#475569', background:'white' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => { setForm(false); setError(null) }}
                  className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-slate-50 transition-colors"
                  style={{ borderColor:'#e2e8f0', color:'#374151' }}>
                  Cancel
                </button>
                <button onClick={handleSubmit} disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white disabled:opacity-70"
                  style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Posting...</> : <>Post RFQ to 3,200+ suppliers</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
