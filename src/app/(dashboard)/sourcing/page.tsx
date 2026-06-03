'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Clock, Globe2, Package, ArrowRight, ChevronDown, BadgeCheck, MessageSquare, AlertCircle, CheckCircle2, X } from 'lucide-react'

const STATUS_STYLES: Record<string,{bg:string,color:string}> = {
  'Open':      { bg:'#f0fdf4', color:'#059669' },
  'In Review': { bg:'#eff6ff', color:'#1e40af' },
  'Awarded':   { bg:'#f5f3ff', color:'#7c3aed' },
  'Closed':    { bg:'#f1f5f9', color:'#64748b' },
}

const RFQS = [
  { id:'RFQ-1042', title:'1,000 Units LED TVs 55" 4K UHD', cat:'Electronics', qty:'1,000 units', target:'$85,000', country:'Nigeria', flag:'🇳🇬', status:'Open', responses:4, deadline:'Jun 15', posted:'2 days ago', urgent:true },
  { id:'RFQ-1039', title:'500 MT Refined Palm Oil — Halal Certified', cat:'Agri / Food', qty:'500 MT', target:'$320,000', country:'Ghana', flag:'🇬🇭', status:'In Review', responses:7, deadline:'Jun 10', posted:'5 days ago', urgent:false },
  { id:'RFQ-1035', title:'2,000 Cartons Cosmetics Assorted', cat:'Cosmetics', qty:'2,000 cartons', target:'$45,000', country:'Kenya', flag:'🇰🇪', status:'Open', responses:2, deadline:'Jun 20', posted:'1 week ago', urgent:false },
  { id:'RFQ-1028', title:'Heavy Machinery — Excavators x3', cat:'Machinery', qty:'3 units', target:'$180,000', country:'Ethiopia', flag:'🇪🇹', status:'Awarded', responses:5, deadline:'Done', posted:'2 weeks ago', urgent:false },
  { id:'RFQ-1021', title:'Office Stationery Bundle — 150 Staff', cat:'Stationery', qty:'150 sets', target:'$12,000', country:'Uganda', flag:'🇺🇬', status:'Closed', responses:3, deadline:'Done', posted:'1 month ago', urgent:false },
]

const STATS = [
  { label: 'Active RFQs',      value: '8',  color: '#1e40af', bg: '#eff6ff' },
  { label: 'Total responses',  value: '34', color: '#059669', bg: '#f0fdf4' },
  { label: 'Awarded',          value: '3',  color: '#7c3aed', bg: '#f5f3ff' },
  { label: 'Avg response time',value: '6h', color: '#d97706', bg: '#fffbeb' },
]

export default function SourcingPage() {
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('All')

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Sourcing Requests</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Post RFQs and receive quotes from verified global suppliers</p>
        </div>
        <button onClick={()=>setShowForm(true)}
          className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
          style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow:'0 4px 12px rgba(30,64,175,0.3)' }}>
          <Plus className="h-4 w-4" /> Post New RFQ
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map(s=>(
          <div key={s.label} className="rounded-2xl bg-white border p-4 flex items-center gap-3" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:s.bg }}>
              <span className="text-base font-black" style={{ color:s.color }}>{s.value}</span>
            </div>
            <span className="text-xs font-semibold" style={{ color:'#64748b' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filter + Search */}
      <div className="rounded-2xl bg-white border p-4 flex gap-3 flex-wrap" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color:'#94a3b8' }} />
          <input type="text" placeholder="Search RFQs..." className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', background:'#f8fafc' }} />
        </div>
        {['All','Open','In Review','Awarded','Closed'].map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            className="text-xs font-bold px-4 py-2.5 rounded-xl border transition-all"
            style={filter===s?{ background:'#1e40af', color:'white', borderColor:'#1e40af' }:{ borderColor:'#e2e8f0', color:'#475569', background:'white' }}>
            {s}
          </button>
        ))}
      </div>

      {/* RFQ List */}
      <div className="space-y-3">
        {RFQS.filter(r=>filter==='All'||r.status===filter).map(r=>{
          const ss = STATUS_STYLES[r.status]
          return (
            <div key={r.id} className="rounded-2xl bg-white border p-5 flex items-center gap-5 group hover:shadow-md transition-all"
              style={{ borderColor: r.urgent?'#fde68a':'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full" style={{ background:'#f1f5f9', color:'#475569' }}>{r.id}</span>
                  {r.urgent && <span className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background:'#fef2f2', color:'#dc2626' }}><AlertCircle className="h-2.5 w-2.5" /> Urgent</span>}
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background:ss.bg, color:ss.color }}>{r.status}</span>
                </div>
                <h3 className="text-sm font-black mb-1 group-hover:text-blue-700 transition-colors" style={{ color:'#0f172a' }}>{r.title}</h3>
                <div className="flex items-center gap-4 text-[11px] flex-wrap" style={{ color:'#94a3b8' }}>
                  <span className="flex items-center gap-1"><Package className="h-3 w-3" /> {r.qty}</span>
                  <span className="flex items-center gap-1"><Globe2 className="h-3 w-3" /> {r.flag} {r.country}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Posted {r.posted}</span>
                  {r.deadline!=='Done' && <span className="flex items-center gap-1">Deadline: {r.deadline}</span>}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-sm font-black" style={{ color:'#0f172a' }}>{r.target}</span>
                <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl" style={{ background:'#f0fdf4', color:'#059669' }}>
                  <MessageSquare className="h-3 w-3" /> {r.responses} quotes
                </div>
                <Link href={`/sourcing/${r.id}`} className="text-[11px] font-black px-3 py-1.5 rounded-xl text-white hover:opacity-90 transition-all" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                  View quotes →
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* RFQ Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor:'#f1f5f9' }}>
              <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Post New RFQ</h2>
              <button onClick={()=>setShowForm(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[{label:'Product / Item',placeholder:'e.g. LED TVs 55" 4K UHD'},{label:'Category',placeholder:'e.g. Electronics'},{label:'Quantity',placeholder:'e.g. 1,000 units'},{label:'Target Budget',placeholder:'e.g. $85,000'}].map(f=>(
                <div key={f.label}>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>{f.label}</label>
                  <input type="text" placeholder={f.placeholder} className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', background:'#f8fafc' }} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Delivery Country</label>
                <select className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', background:'#f8fafc', color:'#374151' }}>
                  <option>Nigeria</option><option>Ghana</option><option>Kenya</option><option>Ethiopia</option><option>Uganda</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Requirements / Notes</label>
                <textarea rows={3} placeholder="Specify certifications, quality standards, packaging requirements..." className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', background:'#f8fafc' }} />
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button onClick={()=>setShowForm(false)} className="flex-1 py-3 rounded-xl text-sm font-bold border hover:bg-slate-50 transition-colors" style={{ borderColor:'#e2e8f0', color:'#374151' }}>Cancel</button>
              <button className="flex-1 py-3 rounded-xl text-sm font-black text-white hover:opacity-90 transition-all" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow:'0 4px 12px rgba(30,64,175,0.3)' }}>
                Post RFQ →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
