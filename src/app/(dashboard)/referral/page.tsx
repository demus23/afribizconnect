'use client'
import { useState, useEffect } from 'react'
import { Copy, CheckCircle2, Users, Gift, Zap, Share2, Loader2 } from 'lucide-react'

export default function ReferralPage() {
  const [data, setData] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetch('/api/referral').then(r => r.json()).then(setData).finally(() => setLoading(false)) }, [])

  function copy(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#C9A84C' }} /></div>

  return (
    <div className="space-y-6 max-w-[800px] mx-auto">
      <div>
        <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Referral Program</h1>
        <p className="text-sm mt-1" style={{ color:'#64748b' }}>Invite businesses to AfriBizConnect and earn free Pro months</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Users, label:'Businesses referred',  val: data?.referrals || 0,          color:'#1e40af' },
          { icon: Gift,  label:'Free days earned',     val: `${data?.creditsEarned || 0}d`, color:'#059669' },
          { icon: Zap,   label:'Your referral code',   val: data?.code || '—',              color:'#C9A84C' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-white border p-5 text-center" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor:`${s.color}15` }}>
              <s.icon className="h-5 w-5" style={{ color:s.color }} />
            </div>
            <div className="text-2xl font-black mb-1" style={{ color:'#0f172a', fontFamily:'monospace' }}>{s.val}</div>
            <div className="text-xs" style={{ color:'#64748b' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Referral link */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Your referral link</h2>
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-3 rounded-xl text-sm font-mono" style={{ background:'#f8fafc', border:'1px solid #e2e8f0', color:'#374151', overflowX:'auto', whiteSpace:'nowrap' }}>
            {data?.referralUrl}
          </div>
          <button onClick={() => copy(data?.referralUrl)} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white" style={{ background: copied ? 'linear-gradient(135deg,#059669,#047857)' : 'linear-gradient(135deg,#1e40af,#2563eb)', whiteSpace:'nowrap' }}>
            {copied ? <><CheckCircle2 className="h-4 w-4" />Copied!</> : <><Copy className="h-4 w-4" />Copy link</>}
          </button>
        </div>
        <div className="flex gap-3 mt-4 flex-wrap">
          {['WhatsApp','LinkedIn','Email'].map(ch => (
            <button key={ch} onClick={() => {
              const msg = `Join AfriBizConnect — Africa's #1 B2B trade platform. Use my link: ${data?.referralUrl}`
              if (ch==='WhatsApp') window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`)
              else if (ch==='LinkedIn') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data?.referralUrl)}`)
              else window.open(`mailto:?subject=Join AfriBizConnect&body=${encodeURIComponent(msg)}`)
            }}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border" style={{ borderColor:'#e2e8f0', color:'#374151' }}>
              <Share2 className="h-3.5 w-3.5" />{ch}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <h2 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Rewards tiers</h2>
        <div className="space-y-3">
          {data?.rewards?.map((r: any, i: number) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: (data?.referrals||0) >= r.count ? '#f0fdf4' : '#f8fafc', border:`1px solid ${(data?.referrals||0) >= r.count ? '#bbf7d0' : '#f1f5f9'}` }}>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0" style={{ background:(data?.referrals||0) >= r.count ? '#059669' : '#e2e8f0', color:(data?.referrals||0) >= r.count ? 'white' : '#94a3b8' }}>{r.count}</div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color:'#0f172a' }}>{r.count} referral{r.count > 1 ? 's' : ''}</div>
                <div className="text-xs mt-0.5" style={{ color:'#64748b' }}>{r.reward}</div>
              </div>
              {(data?.referrals||0) >= r.count && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
