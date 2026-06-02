import Link from 'next/link'
import {
  TrendingUp, ShoppingBag, Globe2, Truck, ArrowRight, BadgeCheck,
  ShieldCheck, Clock, FileText, MessageSquare, Zap, AlertCircle,
  DollarSign, Package, Users, BarChart3, ArrowUpRight, Bell,
  CheckCircle2, Circle, Star, MapPin, Building2
} from 'lucide-react'

const METRICS = [
  { label:'Trade Volume',       value:'$284K',  delta:'+12% vs last month', icon:DollarSign,  color:'#1e40af', bg:'#eff6ff', trend:'up' },
  { label:'Active RFQs',        value:'8',      delta:'3 new responses',     icon:FileText,    color:'#7c3aed', bg:'#f5f3ff', trend:'up' },
  { label:'Supplier Contacts',  value:'142',    delta:'+12 this month',      icon:ShoppingBag, color:'#059669', bg:'#f0fdf4', trend:'up' },
  { label:'Open Opportunities', value:'$2.4M',  delta:'4 deals active',      icon:TrendingUp,  color:'#d97706', bg:'#fffbeb', trend:'up' },
]

const ACTIVITY = [
  { type:'rfq',     label:'RFQ #1042 received 4 new quotes from UAE suppliers', time:'2 min ago',  icon:FileText,      color:'#1e40af', bg:'#eff6ff' },
  { type:'msg',     label:'Gulf Supplies LLC sent you a message',               time:'18 min ago', icon:MessageSquare, color:'#7c3aed', bg:'#f5f3ff' },
  { type:'verify',  label:'Your trade certificate was approved',                time:'1 hr ago',   icon:BadgeCheck,    color:'#059669', bg:'#f0fdf4' },
  { type:'trade',   label:'Shipment TRK-0082 cleared Dubai customs',            time:'3 hrs ago',  icon:Truck,         color:'#d97706', bg:'#fffbeb' },
  { type:'invest',  label:'New opportunity: Lagos Logistics Hub — $5M Series A',time:'Yesterday',  icon:TrendingUp,    color:'#dc2626', bg:'#fef2f2' },
]

const QUICK = [
  { href:'/sourcing',    label:'Post RFQ',          desc:'Request quotes from suppliers',       icon:Globe2,    grad:'from-blue-500 to-blue-700' },
  { href:'/marketplace', label:'Find Suppliers',     desc:'Browse 3,200+ verified suppliers',   icon:ShoppingBag,grad:'from-emerald-500 to-emerald-700' },
  { href:'/invest',      label:'Browse Deals',       desc:'Investment opportunities in Africa',  icon:TrendingUp,grad:'from-amber-500 to-orange-600' },
  { href:'/logistics',   label:'Get Freight Quote',  desc:'Compare logistics providers',         icon:Truck,     grad:'from-purple-500 to-purple-700' },
]

const SHIPMENTS = [
  { id:'TRK-0082', from:'Dubai, UAE', to:'Lagos, NG',   status:'In Transit', progress:65, eta:'Jun 8', color:'#1e40af' },
  { id:'TRK-0079', from:'Shenzhen, CN', to:'Accra, GH', status:'Customs',    progress:80, eta:'Jun 3', color:'#d97706' },
  { id:'TRK-0075', from:'Istanbul, TR', to:'Nairobi, KE',status:'Delivered',  progress:100,eta:'Done',  color:'#059669' },
]

const TRUST_STEPS = [
  { label:'Business registered',    done:true },
  { label:'Documents uploaded',     done:true },
  { label:'Bank account verified',  done:false },
  { label:'Trade references added', done:false },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>
            Good morning, Amara 👋
          </h1>
          <p className="text-sm mt-1" style={{ color:'#64748b' }}>
            Here's your trade activity overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border"
            style={{ background:'#fffbeb', borderColor:'#fde68a', color:'#d97706' }}>
            <AlertCircle className="h-3.5 w-3.5" />
            2 documents pending
          </div>
          <Link href="/sourcing"
            className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)', boxShadow:'0 4px 12px rgba(30,64,175,0.3)' }}>
            <Globe2 className="h-3.5 w-3.5" /> Post New RFQ
          </Link>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map((m,i) => (
          <div key={i} className="rounded-2xl bg-white border p-5 transition-all hover:shadow-md group"
            style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor:m.bg }}>
                <m.icon className="h-5 w-5" style={{ color:m.color }} />
              </div>
              <span className="text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1"
                style={{ background:'#f0fdf4', color:'#059669' }}>
                ↑ {m.delta.split(' ')[0]}
              </span>
            </div>
            <div className="text-2xl font-black tracking-tight mb-1" style={{ color:'#0f172a' }}>{m.value}</div>
            <div className="text-xs font-medium" style={{ color:'#64748b' }}>{m.label}</div>
            <div className="text-[11px] mt-1 font-medium" style={{ color:'#059669' }}>{m.delta}</div>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid xl:grid-cols-3 gap-5">

        {/* Trust Score */}
        <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Trust Score</h2>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background:'#fef3c7', color:'#d97706' }}>Pending verification</span>
          </div>
          {/* Ring */}
          <div className="flex items-center justify-center mb-5">
            <div className="relative">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="9" />
                <circle cx="50" cy="50" r="40" fill="none" strokeWidth="9"
                  strokeDasharray="251" strokeDashoffset={251 - (251*72)/100}
                  strokeLinecap="round"
                  style={{ stroke:'url(#grad)', filter:'drop-shadow(0 0 6px rgba(16,185,129,0.4))' }} />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black" style={{ color:'#0f172a' }}>72</span>
                <span className="text-[11px] font-medium" style={{ color:'#94a3b8' }}>/ 100</span>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            {TRUST_STEPS.map(step => (
              <div key={step.label} className="flex items-center gap-2.5 text-xs">
                {step.done
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  : <Circle className="h-4 w-4 shrink-0" style={{ color:'#e2e8f0' }} />
                }
                <span style={{ color: step.done ? '#374151' : '#94a3b8' }}>{step.label}</span>
                {!step.done && <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:'#eff6ff', color:'#1e40af' }}>Complete</span>}
              </div>
            ))}
          </div>
          <Link href="/settings"
            className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90"
            style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white' }}>
            Complete Profile <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Activity */}
        <div className="xl:col-span-2 rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Recent Activity</h2>
            <Link href="/messages" className="text-[11px] font-bold flex items-center gap-1 hover:underline" style={{ color:'#1e40af' }}>
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {ACTIVITY.map((a,i) => (
              <div key={i} className="flex items-start gap-3 group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-all">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor:a.bg }}>
                  <a.icon className="h-4 w-4" style={{ color:a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-snug" style={{ color:'#374151' }}>{a.label}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-2.5 w-2.5" style={{ color:'#cbd5e1' }} />
                    <span className="text-[10px]" style={{ color:'#94a3b8' }}>{a.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shipment Tracking */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
              <Truck className="h-3.5 w-3.5 text-white" />
            </div>
            <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Active Shipments</h2>
          </div>
          <Link href="/trade" className="text-[11px] font-bold flex items-center gap-1" style={{ color:'#7c3aed' }}>
            Manage all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="space-y-4">
          {SHIPMENTS.map(s => (
            <div key={s.id} className="p-4 rounded-2xl border" style={{ borderColor:'#f1f5f9', background:'#fafbfc' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full border" style={{ borderColor:'#e2e8f0', color:'#374151' }}>#{s.id}</span>
                  <span className="text-xs font-semibold" style={{ color:'#64748b' }}>{s.from} → {s.to}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full"
                    style={{ background: s.progress===100?'#f0fdf4':s.progress>=70?'#eff6ff':'#fffbeb',
                             color: s.progress===100?'#059669':s.progress>=70?'#1e40af':'#d97706' }}>
                    {s.status}
                  </span>
                  <span className="text-[11px] font-medium" style={{ color:'#94a3b8' }}>ETA: {s.eta}</span>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor:'#e2e8f0' }}>
                <div className="h-full rounded-full transition-all" style={{ width:`${s.progress}%`, backgroundColor:s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Quick Actions</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {QUICK.map(a => (
            <Link key={a.href} href={a.href}
              className="group relative rounded-2xl bg-white border p-5 flex items-start gap-4 transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
              style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${a.grad} shadow-lg`}>
                <a.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-black mb-0.5" style={{ color:'#0f172a' }}>{a.label}</div>
                <div className="text-xs leading-snug" style={{ color:'#64748b' }}>{a.desc}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:'#94a3b8' }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="rounded-2xl p-6 flex items-center justify-between gap-4 relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#1e40af 100%)' }}>
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full opacity-10 bg-white" style={{ transform:'translate(40%,-40%)' }} />
        <div className="absolute bottom-0 left-1/2 h-24 w-24 rounded-full opacity-5 bg-amber-400" style={{ transform:'translate(-50%,60%)' }} />
        <div className="flex items-center gap-4 relative">
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background:'rgba(255,255,255,0.1)' }}>
            <Zap className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <div className="text-sm font-black text-white mb-0.5">Upgrade to Growth Plan</div>
            <div className="text-xs text-blue-200/70">Unlock verified badge, unlimited supplier contacts, and full analytics</div>
          </div>
        </div>
        <Link href="/settings/billing"
          className="shrink-0 text-xs font-black px-6 py-3 rounded-xl transition-all hover:opacity-90 relative"
          style={{ background:'linear-gradient(135deg,#fbbf24,#f59e0b)', color:'#0f172a', boxShadow:'0 4px 16px rgba(251,191,36,0.4)' }}>
          Upgrade Now →
        </Link>
      </div>
    </div>
  )
}
