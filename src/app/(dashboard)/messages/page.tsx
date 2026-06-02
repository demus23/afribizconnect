'use client'
import { useState } from 'react'
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile, ArrowLeft, BadgeCheck, Circle } from 'lucide-react'

const CONVERSATIONS = [
  { id:1, name:'Gulf Electronics Trading', country:'UAE', last:'Thanks for your interest. We can offer...', time:'2m', unread:3, online:true, avatar:'GE', color:'#1e40af' },
  { id:2, name:'Al Madina FMCG Group', country:'UAE', last:'Invoice attached. Payment via TT preferred.', time:'1h', unread:0, online:true, avatar:'AM', color:'#059669' },
  { id:3, name:'Shenzhen Mega Exports', country:'China', last:'MOQ for this product is 500 units minimum.', time:'3h', unread:1, online:false, avatar:'SM', color:'#7c3aed' },
  { id:4, name:'Istanbul Textile Hub', country:'Turkey', last:'We have the fabric in stock. Lead time 18 days.', time:'1d', unread:0, online:false, avatar:'IT', color:'#d97706' },
  { id:5, name:'AfriBizConnect Support', country:'Platform', last:'Your verification documents have been approved!', time:'2d', unread:0, online:true, avatar:'AB', color:'#0f172a' },
]

const MESSAGES = [
  { id:1, from:'them', text:'Hello! Thank you for your inquiry about LED TVs. We have 55" 4K UHD units in stock at Dubai warehouse.', time:'10:12 AM' },
  { id:2, from:'them', text:'Our MOQ is 500 units. For 1,000 units, we can offer $82 per unit CIF Lagos.', time:'10:13 AM' },
  { id:3, from:'me', text:'That sounds competitive. Can you share your product specifications and certifications?', time:'10:25 AM' },
  { id:4, from:'them', text:'Absolutely! Attached you will find our full spec sheet. We are CE, FCC, and ISO 9001 certified.', time:'10:28 AM' },
  { id:5, from:'me', text:'Great. What are your payment terms? We prefer LC at sight.', time:'10:35 AM' },
  { id:6, from:'them', text:'We accept LC at sight, TT 30% advance, and for trusted partners we can do Net 30. Which works best for you?', time:'10:37 AM' },
  { id:7, from:'me', text:'LC at sight works for us. Can you provide a pro forma invoice for 800 units to start?', time:'11:02 AM' },
]

export default function MessagesPage() {
  const [active, setActive] = useState(CONVERSATIONS[0])
  const [msg, setMsg] = useState('')

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="rounded-2xl bg-white border overflow-hidden flex" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)', height:'calc(100vh - 140px)' }}>

        {/* Sidebar */}
        <div className="w-80 shrink-0 border-r flex flex-col" style={{ borderColor:'#f1f5f9' }}>
          <div className="p-4 border-b" style={{ borderColor:'#f1f5f9' }}>
            <h2 className="text-sm font-black mb-3" style={{ color:'#0f172a' }}>Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color:'#94a3b8' }} />
              <input type="text" placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', background:'#f8fafc' }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map(c=>(
              <div key={c.id} onClick={()=>setActive(c)}
                className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all hover:bg-slate-50 border-b"
                style={{ borderColor:'#f8fafc', background: active.id===c.id?'#eff6ff':undefined }}>
                <div className="relative shrink-0">
                  <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor:c.color }}>{c.avatar}</div>
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-black truncate" style={{ color:'#0f172a' }}>{c.name}</span>
                    <span className="text-[10px] shrink-0 ml-1" style={{ color:'#94a3b8' }}>{c.time}</span>
                  </div>
                  <div className="text-[11px] truncate" style={{ color:'#94a3b8' }}>{c.last}</div>
                </div>
                {c.unread>0 && (
                  <div className="h-5 w-5 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0" style={{ background:'#1e40af' }}>{c.unread}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor:'#f1f5f9' }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor:active.color }}>{active.avatar}</div>
                {active.online && <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white" />}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black" style={{ color:'#0f172a' }}>{active.name}</span>
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
                </div>
                <div className="text-[11px]" style={{ color:'#94a3b8' }}>{active.online?'🟢 Online':'⚫ Offline'} · {active.country}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl hover:bg-slate-50 transition-colors"><Phone className="h-4 w-4" style={{ color:'#64748b' }} /></button>
              <button className="p-2 rounded-xl hover:bg-slate-50 transition-colors"><Video className="h-4 w-4" style={{ color:'#64748b' }} /></button>
              <button className="p-2 rounded-xl hover:bg-slate-50 transition-colors"><MoreVertical className="h-4 w-4" style={{ color:'#64748b' }} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ background:'#fafbfc' }}>
            {MESSAGES.map(m=>(
              <div key={m.id} className={`flex ${m.from==='me'?'justify-end':''}`}>
                {m.from!=='me' && (
                  <div className="h-7 w-7 rounded-xl flex items-center justify-center text-white text-[10px] font-black shrink-0 mr-2 mt-1" style={{ backgroundColor:active.color }}>{active.avatar}</div>
                )}
                <div className="max-w-[70%]">
                  <div className="px-4 py-2.5 rounded-2xl text-xs leading-relaxed"
                    style={m.from==='me'
                      ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white', borderBottomRightRadius:4 }
                      : { background:'white', color:'#374151', border:'1px solid #f1f5f9', borderBottomLeftRadius:4, boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }
                    }>
                    {m.text}
                  </div>
                  <div className="text-[10px] mt-1 px-1" style={{ color:'#94a3b8', textAlign:m.from==='me'?'right':'left' }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t" style={{ borderColor:'#f1f5f9' }}>
            <div className="flex items-center gap-2 rounded-2xl border px-4 py-2.5" style={{ borderColor:'#e2e8f0', background:'white' }}>
              <button className="p-1 hover:text-blue-600 transition-colors"><Paperclip className="h-4 w-4" style={{ color:'#94a3b8' }} /></button>
              <input type="text" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type a message..."
                className="flex-1 text-sm focus:outline-none bg-transparent" style={{ color:'#0f172a' }} />
              <button className="p-1 hover:text-blue-600 transition-colors"><Smile className="h-4 w-4" style={{ color:'#94a3b8' }} /></button>
              <button className="h-8 w-8 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90"
                style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
