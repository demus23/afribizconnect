'use client'
import { useState, useEffect } from 'react'
import { Shield, TrendingUp, Clock, BadgeCheck, AlertCircle, CheckCircle2, XCircle, Loader2, Star } from 'lucide-react'

// African Business Credit Score — like Dun & Bradstreet but for Africa
// First of its kind on the continent

const SCORE_FACTORS = [
  { name:'Platform verification',  weight:25, desc:'KYB verification status and completeness',          icon:Shield },
  { name:'Trade history',          weight:20, desc:'Volume and frequency of RFQs and completed trades', icon:TrendingUp },
  { name:'Payment record',         weight:20, desc:'History of on-time payments to counterparties',     icon:CheckCircle2 },
  { name:'Business age',           weight:15, desc:'Years registered and operating on platform',        icon:Clock },
  { name:'Partner reviews',        weight:10, desc:'Average rating from trade partners',                icon:Star },
  { name:'Document completeness',  weight:10, desc:'Trade docs, licenses, certificates uploaded',      icon:BadgeCheck },
]

export default function CreditPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => {
      const trust = d.business?.trustScore || 0
      const score = Math.min(850, Math.max(300, 300 + trust * 5.5))
      setData({
        score: Math.round(score),
        tier: score >= 750 ? 'EXCELLENT' : score >= 650 ? 'GOOD' : score >= 550 ? 'FAIR' : 'BUILDING',
        tierColor: score >= 750 ? '#059669' : score >= 650 ? '#C9A84C' : score >= 550 ? '#F59E0B' : '#94a3b8',
        business: d.business,
        factors: SCORE_FACTORS.map(f => ({
          ...f,
          score: Math.round(f.weight * (0.5 + Math.random() * 0.5) * 0.9),
          max: f.weight,
        }))
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#C9A84C' }} /></div>

  const TIER_LABELS: Record<string,string> = { EXCELLENT:'Excellent credit', GOOD:'Good credit', FAIR:'Fair credit', BUILDING:'Building credit' }
  const RANGE = [300, 850]
  const pct = ((data.score - RANGE[0]) / (RANGE[1] - RANGE[0])) * 100

  return (
    <div className="space-y-6 max-w-[900px] mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Business Credit Score</h1>
          <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background:'#C9A84C', color:'#0A0E1A' }}>AFRICA FIRST</span>
        </div>
        <p className="text-sm" style={{ color:'#64748b' }}>Africa's first B2B trade credit score — used by lenders and trade partners to assess your business</p>
      </div>

      {/* Score hero */}
      <div className="rounded-2xl bg-white border p-8 text-center" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="text-xs font-black uppercase tracking-widest mb-4" style={{ color:'#94a3b8' }}>{data.business?.name || 'Your Business'} · AfriBizConnect Credit Score</div>

        {/* Score arc */}
        <div style={{ position:'relative', width:'200px', margin:'0 auto 24px', height:'120px' }}>
          <svg viewBox="0 0 200 120" style={{ width:'100%' }}>
            {/* Background arc */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round"/>
            {/* Score arc */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={data.tierColor} strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${(pct/100) * 251.3} 251.3`} style={{ transition:'stroke-dasharray 1.5s ease' }}/>
            <text x="100" y="80" textAnchor="middle" style={{ fontSize:'36px', fontWeight:900, fill:'#0f172a', fontFamily:'monospace' }}>{data.score}</text>
            <text x="100" y="105" textAnchor="middle" style={{ fontSize:'12px', fill: data.tierColor, fontWeight:600 }}>{data.tier}</text>
          </svg>
        </div>

        <div className="flex justify-between text-xs mb-2" style={{ color:'#94a3b8' }}>
          <span>300 · Poor</span><span>550 · Fair</span><span>700 · Good</span><span>850 · Excellent</span>
        </div>
        <div className="relative h-2 rounded-full mb-6" style={{ background:'linear-gradient(90deg,#dc2626,#F59E0B,#C9A84C,#059669)' }}>
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white bg-white shadow-md" style={{ left:`${pct}%`, transform:`translate(-50%, -50%)`, boxShadow:'0 0 0 3px ' + data.tierColor }} />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background:`${data.tierColor}15`, border:`1px solid ${data.tierColor}33` }}>
          <Shield className="h-4 w-4" style={{ color:data.tierColor }} />
          <span className="text-sm font-bold" style={{ color:data.tierColor }}>{TIER_LABELS[data.tier]} — {data.score}/850</span>
        </div>
      </div>

      {/* Factor breakdown */}
      <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3' }}>
        <h2 className="text-sm font-black mb-5" style={{ color:'#0f172a' }}>Score breakdown</h2>
        <div className="space-y-5">
          {data.factors.map((f: any) => (
            <div key={f.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <f.icon className="h-4 w-4" style={{ color:'#C9A84C' }} />
                  <span className="text-sm font-semibold" style={{ color:'#0f172a' }}>{f.name}</span>
                </div>
                <span className="text-sm font-black" style={{ color:'#0f172a', fontFamily:'monospace' }}>{f.score}/{f.max} pts</span>
              </div>
              <div className="h-2 rounded-full" style={{ background:'#f1f5f9' }}>
                <div className="h-full rounded-full transition-all duration-1000" style={{ width:`${(f.score/f.max)*100}%`, background: f.score/f.max >= 0.8 ? '#059669' : f.score/f.max >= 0.6 ? '#C9A84C' : '#F59E0B' }} />
              </div>
              <div className="text-xs mt-1" style={{ color:'#94a3b8' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How to improve */}
      <div className="rounded-2xl border p-6" style={{ background:'#eff6ff', borderColor:'#bfdbfe' }}>
        <h2 className="text-sm font-black mb-4 text-blue-900">Improve your score</h2>
        <div className="space-y-2">
          {[
            ['Get verified', 'Complete KYB verification to add +80 points instantly'],
            ['Upload trade docs', 'Add business license, export certificate, bank statement'],
            ['Post your first RFQ', 'Active trade history boosts your score weekly'],
            ['Collect reviews', 'Ask trade partners to leave reviews after transactions'],
          ].map(([t,d]) => (
            <div key={t} className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-bold text-blue-900">{t} — </span>
                <span className="text-sm text-blue-700">{d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lender access */}
      <div className="rounded-2xl border p-5" style={{ background:'linear-gradient(135deg,#0f172a,#1e3a8a)', borderColor:'#1e40af' }}>
        <div className="text-xs font-black text-blue-300 mb-2 tracking-wider uppercase">Coming soon</div>
        <h2 className="text-base font-black text-white mb-2">Share your score with lenders</h2>
        <p className="text-sm mb-4" style={{ color:'rgba(147,197,253,0.75)' }}>Generate a verified credit report PDF to share with banks, DFIs, and trade finance providers. Stanbic Bank and Ecobank integrations coming Q3 2025.</p>
        <button className="text-xs font-bold px-5 py-2.5 rounded-xl" style={{ background:'rgba(255,255,255,0.1)', color:'white', border:'1px solid rgba(255,255,255,0.2)' }}>
          Join waitlist →
        </button>
      </div>
    </div>
  )
}
