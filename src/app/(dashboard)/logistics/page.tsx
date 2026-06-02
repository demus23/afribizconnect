'use client'
import { useState } from 'react'
import { Truck, Package, Clock, MapPin, ArrowRight, CheckCircle2, Globe2, BarChart3, Ship, Plane, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const SHIPMENTS = [
  { id:'TRK-0082', from:'Dubai, UAE', to:'Lagos, Nigeria', carrier:'Emirates SkyCargo', status:'In Transit', progress:65, eta:'Jun 8, 2025', weight:'2.4 MT', type:'Air Freight', flag1:'🇦🇪', flag2:'🇳🇬', color:'#1e40af' },
  { id:'TRK-0079', from:'Shenzhen, China', to:'Accra, Ghana', carrier:'COSCO Shipping', status:'Customs Clearance', progress:80, eta:'Jun 3, 2025', weight:'18 MT', type:'Sea Freight', flag1:'🇨🇳', flag2:'🇬🇭', color:'#d97706' },
  { id:'TRK-0075', from:'Istanbul, Turkey', to:'Nairobi, Kenya', carrier:'Turkish Cargo', status:'Delivered', progress:100, eta:'Delivered', weight:'5.2 MT', type:'Air Freight', flag1:'🇹🇷', flag2:'🇰🇪', color:'#059669' },
]

const PROGRESS_STEPS = ['Order Confirmed','Picked Up','In Transit','Customs','Delivered']

const CARRIERS = [
  { name:'Emirates Logistics', type:'Air', rate:'$4.2/kg', transit:'3–5 days', score:94, logo:'🇦🇪' },
  { name:'COSCO Shipping', type:'Sea', rate:'$85/CBM', transit:'22–28 days', score:88, logo:'🇨🇳' },
  { name:'DHL Express', type:'Air', rate:'$5.8/kg', transit:'2–4 days', score:96, logo:'🌐' },
  { name:'MSC Mediterranean', type:'Sea', rate:'$72/CBM', transit:'18–24 days', score:91, logo:'🌊' },
]

export default function LogisticsPage() {
  const [mode, setMode] = useState<'air'|'sea'|'road'>('sea')
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Logistics & Shipping</h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>Track shipments, request quotes, and manage cross-border freight</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-xl text-white hover:opacity-90 transition-all"
          style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow:'0 4px 12px rgba(124,58,237,0.3)' }}>
          <Truck className="h-4 w-4" /> Request Quote
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label:'Active Shipments', value:'3', icon:Truck,    color:'#1e40af', bg:'#eff6ff' },
          { label:'In Customs',       value:'1', icon:AlertCircle,color:'#d97706', bg:'#fffbeb' },
          { label:'Delivered (30d)',  value:'8', icon:CheckCircle2,color:'#059669',bg:'#f0fdf4' },
          { label:'Avg Transit',     value:'14d',icon:Clock,    color:'#7c3aed', bg:'#f5f3ff' },
        ].map(s=>(
          <div key={s.label} className="rounded-2xl bg-white border p-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ backgroundColor:s.bg }}>
                <s.icon className="h-4.5 w-4.5" style={{ color:s.color }} />
              </div>
            </div>
            <div className="text-2xl font-black" style={{ color:'#0f172a' }}>{s.value}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color:'#64748b' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-5 gap-5">
        {/* Shipment tracking — 3 cols */}
        <div className="xl:col-span-3 space-y-4">
          <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Active Shipments</h2>
          {SHIPMENTS.map((s,i)=>{
            const stepIdx = s.progress===100?4:s.status==='Customs Clearance'?3:s.status==='In Transit'?2:1
            return (
              <div key={s.id} className="rounded-2xl bg-white border overflow-hidden" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor:'#f1f5f9' }}>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: s.progress===100?'#f0fdf4':s.status.includes('Custom')?'#fffbeb':'#eff6ff' }}>
                      {s.type==='Air Freight' ? <Plane className="h-4 w-4" style={{ color:s.color }} /> : <Ship className="h-4 w-4" style={{ color:s.color }} />}
                    </div>
                    <div>
                      <div className="text-xs font-black" style={{ color:'#0f172a' }}>{s.id}</div>
                      <div className="text-[11px]" style={{ color:'#94a3b8' }}>{s.carrier} · {s.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background:s.progress===100?'#f0fdf4':s.status.includes('Custom')?'#fffbeb':'#eff6ff',
                               color:s.progress===100?'#059669':s.status.includes('Custom')?'#d97706':'#1e40af' }}>
                      {s.status}
                    </div>
                    <div className="text-[11px] mt-1" style={{ color:'#94a3b8' }}>ETA: {s.eta}</div>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-4 text-xs" style={{ color:'#374151' }}>
                    <span className="font-semibold">{s.flag1} {s.from}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color:'#94a3b8' }} />
                    <span className="font-semibold">{s.flag2} {s.to}</span>
                    <span className="ml-auto" style={{ color:'#94a3b8' }}>{s.weight}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="relative mb-2">
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor:'#f1f5f9' }}>
                      <div className="h-full rounded-full transition-all" style={{ width:`${s.progress}%`, backgroundColor:s.color }} />
                    </div>
                  </div>
                  {/* Step labels */}
                  <div className="flex justify-between">
                    {PROGRESS_STEPS.map((step,j)=>(
                      <span key={step} className="text-[9px] font-semibold" style={{ color: j<=stepIdx ? s.color : '#cbd5e1' }}>{step.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quote Request — 2 cols */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Get Freight Quote</h2>
          <div className="rounded-2xl bg-white border p-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            {/* Mode selector */}
            <div className="flex gap-2 mb-5 p-1 rounded-xl" style={{ background:'#f8fafc' }}>
              {[{key:'sea',label:'Sea',icon:Ship},{key:'air',label:'Air',icon:Plane},{key:'road',label:'Road',icon:Truck}].map(m=>(
                <button key={m.key} onClick={()=>setMode(m.key as any)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-black transition-all"
                  style={mode===m.key?{ background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', boxShadow:'0 2px 8px rgba(30,64,175,0.25)' }:{ color:'#64748b' }}>
                  <m.icon className="h-3.5 w-3.5" /> {m.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {[{label:'Origin',placeholder:'Dubai, UAE'},{label:'Destination',placeholder:'Lagos, Nigeria'},{label:'Cargo Weight (KG)',placeholder:'e.g. 2,400'},{label:'CBM / Volume',placeholder:'e.g. 14.5 CBM'},{label:'Incoterms',placeholder:'FOB / CIF / EXW'}].map(f=>(
                <div key={f.label}>
                  <label className="block text-[10px] font-black uppercase tracking-wide mb-1" style={{ color:'#374151' }}>{f.label}</label>
                  <input type="text" placeholder={f.placeholder} className="w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', background:'#f8fafc' }} />
                </div>
              ))}
              <button className="w-full py-3 rounded-xl text-sm font-black text-white hover:opacity-90 transition-all mt-2"
                style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow:'0 4px 12px rgba(124,58,237,0.3)' }}>
                Get Instant Quotes →
              </button>
            </div>
          </div>

          {/* Carriers */}
          <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Top Carriers</h2>
          <div className="space-y-2">
            {CARRIERS.map(c=>(
              <div key={c.name} className="rounded-xl bg-white border p-3.5 flex items-center gap-3 hover:shadow-sm transition-all cursor-pointer"
                style={{ borderColor:'#e8edf3' }}>
                <div className="text-xl shrink-0">{c.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black" style={{ color:'#0f172a' }}>{c.name}</div>
                  <div className="text-[11px]" style={{ color:'#94a3b8' }}>{c.type} · {c.transit}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-black" style={{ color:'#1e40af' }}>{c.rate}</div>
                  <div className="text-[10px] font-bold" style={{ color:'#059669' }}>★ {c.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
