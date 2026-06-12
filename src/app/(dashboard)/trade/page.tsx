'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, RefreshCw, FileText, Package, Plus, X, Loader2, CheckCircle2, Zap, TrendingUp, Truck, Globe2, AlertCircle } from 'lucide-react'

const SWAP_CATEGORIES = ['Agriculture & Food','Electronics','Textiles & Apparel','Auto Parts','Building Materials','Chemicals','Machinery','Pharmaceuticals','Energy Products','Metals & Steel']
const COUNTRIES = ['Nigeria','Kenya','Ghana','South Africa','Ethiopia','Egypt','Morocco','Tanzania','Uganda','Senegal','Côte d\'Ivoire','Rwanda','UAE','China','Turkey','India']

const SAMPLE_SWAPS = [
  { id:'1', offer:'200MT Cashew Nuts', want:'Electronics (Mobile phones / Laptops)', country:'🇬🇭 Ghana', poster:'Accra Trading Co.', value:'$280,000', date:'2 days ago', verified:true },
  { id:'2', offer:'500MT Palm Oil',    want:'Machinery & Equipment',                 country:'🇳🇬 Nigeria', poster:'Lagos Agro Ltd',    value:'$420,000', date:'3 days ago', verified:true },
  { id:'3', offer:'1,200MT Cotton',    want:'Textiles (Finished goods)',             country:'🇪🇹 Ethiopia',poster:'Addis Export Co.',  value:'$650,000', date:'5 days ago', verified:false },
  { id:'4', offer:'Copper Cathodes 80MT',want:'Auto Parts & Components',            country:'🇿🇲 Zambia',  poster:'Copperbelt Exports',value:'$180,000', date:'1 week ago', verified:true },
  { id:'5', offer:'300MT Sesame Seeds',want:'FMCG Consumer Goods',                  country:'🇸🇩 Sudan',   poster:'Khartoum Traders', value:'$195,000', date:'1 week ago', verified:false },
]

const FINANCE_PRODUCTS = [
  { icon:FileText,   title:'Letter of Credit (LC)',      desc:'Bank-guaranteed payment instrument for international trade. Protect both buyer and seller.',     color:'#1e40af', bg:'#eff6ff', cta:'Request LC' },
  { icon:TrendingUp, title:'Invoice Factoring',          desc:'Convert outstanding invoices to immediate cash. Up to 90% advance within 48 hours.',              color:'#7c3aed', bg:'#f5f3ff', cta:'Factor invoice' },
  { icon:Package,    title:'Supply Chain Finance',        desc:'Extend payment terms while your suppliers get paid early. Win-win for both sides.',               color:'#059669', bg:'#f0fdf4', cta:'Apply now' },
  { icon:Truck,      title:'Import / Export Finance',     desc:'Pre-shipment and post-shipment finance facilities for verified African importers and exporters.', color:'#d97706', bg:'#fffbeb', cta:'Get quote' },
  { icon:Globe2,     title:'AfCFTA Preferential Finance', desc:'Special financing rates for intra-African trade under the African Continental Free Trade Area.',  color:'#0891b2', bg:'#ecfeff', cta:'Learn more' },
  { icon:Zap,        title:'Escrow for First Trades',     desc:'Protect your first transaction with a new counterpart. Funds released on delivery confirmation.', color:'#dc2626', bg:'#fef2f2', cta:'Set up escrow' },
]

export default function TradePage() {
  const [activeTab, setTab] = useState<'finance'|'swap'>('finance')
  const [showSwapForm, setSwapForm] = useState(false)
  const [submitting, setSub] = useState(false)
  const [success, setSuccess] = useState(false)
  const [swapForm, setSwapForm2] = useState({ offer:'', offerCategory:'', offerQty:'', want:'', wantCategory:'', country:'', estimatedValue:'', notes:'' })

  async function postSwap() {
    if (!swapForm.offer || !swapForm.want || !swapForm.country) return
    setSub(true)
    await new Promise(r => setTimeout(r, 1200))
    setSub(false); setSuccess(true); setSwapForm(false)
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Trade Hub</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Trade finance products and countertrade / barter exchange board</p>
        </div>
        {activeTab === 'swap' && (
          <button onClick={() => setSwapForm(true)}
            className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white"
            style={{ background:'linear-gradient(135deg,#059669,#047857)', boxShadow:'0 4px 12px rgba(5,150,105,0.35)' }}>
            <Plus className="h-4 w-4" /> Post trade swap
          </button>
        )}
      </div>

      {success && (
        <div className="flex items-center gap-2.5 p-4 rounded-2xl text-sm" style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#059669' }}>
          <CheckCircle2 className="h-4 w-4 shrink-0" />Your trade swap has been posted! Matched businesses will contact you through Messages.
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background:'#f1f5f9' }}>
        {[{ id:'finance', label:'Trade Finance' },{ id:'swap', label:'Trade Swap Board' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)}
            className="text-sm font-bold px-5 py-2 rounded-lg transition-all"
            style={activeTab===t.id ? { background:'white', color:'#0f172a', boxShadow:'0 1px 4px rgba(0,0,0,0.08)' } : { color:'#64748b' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* TRADE FINANCE */}
      {activeTab === 'finance' && (
        <div className="space-y-5">
          <div className="rounded-2xl p-5 border" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a8a)', borderColor:'#1e40af' }}>
            <div className="flex items-start gap-4 flex-wrap">
              <div className="flex-1">
                <div className="text-xs font-black uppercase tracking-widest mb-2 text-blue-300">Powered by AfriBizConnect Finance Network</div>
                <h2 className="text-xl font-black text-white mb-2">Trade Finance for African Businesses</h2>
                <p className="text-sm" style={{ color:'rgba(147,197,253,0.75)' }}>
                  Access letters of credit, invoice financing, and supply chain finance from our network of vetted financial institutions across 54 African markets.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                {[{ val:'$2.8B', label:'Facilitated' },{ val:'54', label:'Markets' },{ val:'48h', label:'Approval' }].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl font-black text-white">{s.val}</div>
                    <div className="text-[10px]" style={{ color:'rgba(147,197,253,0.6)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FINANCE_PRODUCTS.map(p => (
              <div key={p.title} className="rounded-2xl bg-white border p-5 flex flex-col" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor:p.bg }}>
                  <p.icon className="h-5 w-5" style={{ color:p.color }} />
                </div>
                <h3 className="text-sm font-black mb-2" style={{ color:'#0f172a' }}>{p.title}</h3>
                <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color:'#64748b' }}>{p.desc}</p>
                <button className="flex items-center gap-1.5 text-xs font-black px-4 py-2.5 rounded-xl text-white"
                  style={{ background:`linear-gradient(135deg,${p.color},${p.color}cc)` }}>
                  {p.cta} <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-5 border" style={{ background:'#fffbeb', borderColor:'#fde68a' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-black text-amber-800">AfCFTA Advantage</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color:'#92400e' }}>
              Under the African Continental Free Trade Area, intra-African trade qualifies for preferential tariff rates and expedited customs procedures. Our finance partners offer special rates for AfCFTA-eligible transactions. <span className="font-bold">Ask about AfCFTA rates when applying for any finance product.</span>
            </p>
          </div>
        </div>
      )}

      {/* TRADE SWAP BOARD */}
      {activeTab === 'swap' && (
        <div className="space-y-4">
          <div className="rounded-2xl p-5 border" style={{ background:'linear-gradient(135deg,#f0fdf4,#dcfce7)', borderColor:'#86efac' }}>
            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-black mb-1 text-emerald-800">What is Trade Swap / Countertrade?</h2>
                <p className="text-xs leading-relaxed" style={{ color:'#065f46' }}>
                  Exchange your goods directly for other goods without cash. Common in African trade where FX is limited.
                  Post what you have and what you want — our platform matches you with compatible trading partners.
                  <span className="font-bold"> No cash required, just verified goods.</span>
                </p>
              </div>
            </div>
          </div>

          {SAMPLE_SWAPS.map(s => (
            <div key={s.id} className="rounded-2xl bg-white border p-5 flex items-center gap-4 flex-wrap" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Offer */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-wide mb-1" style={{ color:'#059669' }}>Offering</div>
                  <div className="text-sm font-black truncate" style={{ color:'#0f172a' }}>{s.offer}</div>
                  <div className="text-xs mt-0.5" style={{ color:'#64748b' }}>Est. value: {s.value}</div>
                </div>
                {/* Arrow */}
                <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0" style={{ background:'linear-gradient(135deg,#059669,#047857)' }}>
                  <RefreshCw className="h-3.5 w-3.5 text-white" />
                </div>
                {/* Want */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-wide mb-1" style={{ color:'#1e40af' }}>Wants</div>
                  <div className="text-sm font-black truncate" style={{ color:'#0f172a' }}>{s.want}</div>
                  <div className="text-xs mt-0.5" style={{ color:'#64748b' }}>{s.country}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold" style={{ color:'#0f172a' }}>{s.poster}</span>
                    {s.verified && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ background:'#059669' }}>✓</span>}
                  </div>
                  <div className="text-[10px]" style={{ color:'#94a3b8' }}>{s.date}</div>
                </div>
                <button className="text-xs font-black px-4 py-2 rounded-xl text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SWAP FORM MODAL */}
      {showSwapForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}>
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden" style={{ maxHeight:'90vh', overflowY:'auto' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor:'#f1f5f9' }}>
              <div>
                <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Post Trade Swap / Countertrade</h2>
                <p className="text-xs mt-0.5" style={{ color:'#64748b' }}>List what you have and what you want to exchange for</p>
              </div>
              <button onClick={() => setSwapForm(false)} className="p-2 rounded-xl hover:bg-slate-100">
                <X className="h-5 w-5" style={{ color:'#64748b' }} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#059669' }}>What you're offering *</label>
                  <input type="text" placeholder="e.g. 200MT Cashew Nuts (Grade A)" value={swapForm.offer} onChange={e => setSwapForm2(p => ({...p, offer:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Category</label>
                  <select value={swapForm.offerCategory} onChange={e => setSwapForm2(p => ({...p, offerCategory:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="">Select</option>
                    {SWAP_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Quantity / volume</label>
                  <input type="text" placeholder="e.g. 200MT" value={swapForm.offerQty} onChange={e => setSwapForm2(p => ({...p, offerQty:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background:'#e2e8f0' }} />
                <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ background:'linear-gradient(135deg,#059669,#047857)' }}>
                  <RefreshCw className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex-1 h-px" style={{ background:'#e2e8f0' }} />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#1e40af' }}>What you want in exchange *</label>
                <input type="text" placeholder="e.g. Electronics — mobile phones, laptops" value={swapForm.want} onChange={e => setSwapForm2(p => ({...p, want:e.target.value}))}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Your country *</label>
                  <select value={swapForm.country} onChange={e => setSwapForm2(p => ({...p, country:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="">Select</option>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Estimated value (USD)</label>
                  <input type="number" placeholder="280000" value={swapForm.estimatedValue} onChange={e => setSwapForm2(p => ({...p, estimatedValue:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Additional notes</label>
                <textarea rows={2} placeholder="Quality standards, delivery terms, timeline, special requirements..." value={swapForm.notes} onChange={e => setSwapForm2(p => ({...p, notes:e.target.value}))}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setSwapForm(false)} className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-slate-50" style={{ borderColor:'#e2e8f0', color:'#374151' }}>Cancel</button>
                <button onClick={postSwap} disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white disabled:opacity-70"
                  style={{ background:'linear-gradient(135deg,#059669,#047857)' }}>
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Posting...</> : <>Post swap offer <RefreshCw className="h-4 w-4" /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
