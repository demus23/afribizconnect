'use client'
import { useState, useEffect } from 'react'
import { User, Building2, Bell, Shield, CreditCard, Camera, Save, CheckCircle2, Zap, Lock, Loader2, AlertCircle } from 'lucide-react'
import { logout } from '@/lib/actions/auth'

const TABS = [
  { id:'profile',       label:'Profile',        icon:User },
  { id:'business',      label:'Business',        icon:Building2 },
  { id:'billing',       label:'Billing',         icon:CreditCard },
  { id:'notifications', label:'Notifications',   icon:Bell },
  { id:'security',      label:'Security',        icon:Shield },
]

const PLANS = [
  { id:'free',    name:'Free',    price:'$0',   per:'/mo', current:true,  features:['Basic profile','5 RFQs/month','20 contacts','Email support'] },
  { id:'starter', name:'Starter', price:'$49',  per:'/mo', current:false, features:['Verified badge','Unlimited RFQs','100 contacts','Priority support','Analytics'] },
  { id:'growth',  name:'Growth',  price:'$149', per:'/mo', current:false, features:['Everything in Starter','Unlimited contacts','Investment listings','Logistics quotes','Team access'], badge:'Most popular' },
  { id:'enterprise',name:'Enterprise',price:'Custom',per:'',current:false,features:['Everything in Growth','Dedicated manager','API access','White-label','SLA guarantee'] },
]

export default function SettingsPage() {
  const [activeTab, setTab]     = useState('profile')
  const [profile, setProfile]   = useState({ name:'', phone:'', country:'' })
  const [business, setBusiness] = useState({ businessName:'', businessType:'', country:'', city:'', description:'', annualRevenue:'', employeeCount:'', websiteUrl:'' })
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [error, setError]       = useState<string|null>(null)
  const [email, setEmail]       = useState('')
  const [trustScore, setTrust]  = useState(0)
  const [verified, setVerified] = useState(false)

  useEffect(() => { loadProfile() }, [])

  async function loadProfile() {
    setLoading(true)
    try {
      const res  = await fetch('/api/profile')
      const data = await res.json()
      if (data.user) {
        setProfile({ name: data.user.name || '', phone: data.user.phone || '', country: data.business?.country || '' })
      }
      if (data.business) {
        setBusiness({
          businessName:  data.business.name        || '',
          businessType:  data.business.type        || '',
          country:       data.business.country     || '',
          city:          data.business.city        || '',
          description:   data.business.description || '',
          annualRevenue: data.business.annualRevenue || '',
          employeeCount: data.business.employeeCount || '',
          websiteUrl:    data.business.websiteUrl   || '',
        })
        setTrust(data.business.trustScore || 0)
        setVerified(data.business.verificationStatus === 'VERIFIED')
      }
      setEmail(data.email || '')
    } catch {}
    finally { setLoading(false) }
  }

  async function save(section: 'profile' | 'business') {
    setSaving(true); setError(null); setSaved(false)
    try {
      const data = section === 'profile' ? profile : business
      const res  = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data })
      })
      const result = await res.json()
      if (result.error) { setError(result.error); return }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch { setError('Save failed. Try again.') }
    finally { setSaving(false) }
  }

  const trustColor = trustScore >= 80 ? '#059669' : trustScore >= 60 ? '#d97706' : trustScore > 0 ? '#dc2626' : '#94a3b8'

  if (loading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-6 w-6 animate-spin" style={{ color:'#1e40af' }} /></div>
  )

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color:'#64748b' }}>Manage your account, business profile, and preferences</p>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">

        {/* Sidebar tabs */}
        <div className="lg:w-48 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {TABS.map(t => (
              <button key={t.id} onClick={() => { setTab(t.id); setError(null); setSaved(false) }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0"
                style={activeTab===t.id ? { background:'#eff6ff', color:'#1e40af' } : { color:'#475569' }}>
                <t.icon className="h-4 w-4 shrink-0" />{t.label}
              </button>
            ))}
            <div className="border-t mt-2 pt-2 hidden lg:block" style={{ borderColor:'#f1f5f9' }}>
              <form action={logout}>
                <button type="submit" className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50">
                  Sign out
                </button>
              </form>
            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Feedback */}
          {(saved || error) && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl mb-4 text-sm"
              style={saved ? { background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#059669' } : { background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626' }}>
              {saved ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
              {saved ? 'Changes saved successfully!' : error}
            </div>
          )}

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="rounded-2xl bg-white border p-6 space-y-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 pb-4 border-b" style={{ borderColor:'#f1f5f9' }}>
                <User className="h-5 w-5" style={{ color:'#1e40af' }} />
                <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Personal profile</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-white text-xl font-black"
                    style={{ background:'linear-gradient(135deg,#1e40af,#0f172a)' }}>
                    {profile.name?.[0]?.toUpperCase() || email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <button className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white border flex items-center justify-center shadow-sm" style={{ borderColor:'#e2e8f0' }}>
                    <Camera className="h-3 w-3" style={{ color:'#64748b' }} />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color:'#0f172a' }}>{profile.name || 'Your name'}</p>
                  <p className="text-xs" style={{ color:'#94a3b8' }}>{email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Full name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile(p => ({...p, name:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Email</label>
                  <input type="email" value={email} disabled className="w-full px-4 py-3 text-sm rounded-xl border opacity-60" style={{ borderColor:'#e2e8f0', backgroundColor:'#f1f5f9' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Phone</label>
                  <input type="tel" placeholder="+234 800 000 0000" value={profile.phone} onChange={e => setProfile(p => ({...p, phone:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Country</label>
                  <input type="text" placeholder="Nigeria" value={profile.country} onChange={e => setProfile(p => ({...p, country:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>
              <button onClick={() => save('profile')} disabled={saving}
                className="flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-xl text-white disabled:opacity-70"
                style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving...</> : <><Save className="h-4 w-4" />Save profile</>}
              </button>
            </div>
          )}

          {/* BUSINESS */}
          {activeTab === 'business' && (
            <div className="rounded-2xl bg-white border p-6 space-y-5" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 pb-4 border-b" style={{ borderColor:'#f1f5f9' }}>
                <Building2 className="h-5 w-5" style={{ color:'#1e40af' }} />
                <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Business profile</h2>
              </div>

              {/* Trust score */}
              <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: verified ? '#f0fdf4' : '#fffbeb', border:`1px solid ${verified ? '#bbf7d0' : '#fde68a'}` }}>
                <div className="relative h-14 w-14 shrink-0">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                    <circle cx="28" cy="28" r="22" fill="none" strokeWidth="5" strokeDasharray="138"
                      strokeDashoffset={138 - (138 * trustScore) / 100} strokeLinecap="round" style={{ stroke:trustColor }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-black" style={{ color:trustColor }}>{trustScore}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-black" style={{ color:trustColor }}>
                    Trust Score: {trustScore}/100 {verified && '· Verified ✓'}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color:'#64748b' }}>
                    {verified ? 'Your business is KYB verified.' : 'Complete your profile and upload documents to get verified.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Business name</label>
                  <input type="text" value={business.businessName} onChange={e => setBusiness(p => ({...p, businessName:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Business type</label>
                  <select value={business.businessType} onChange={e => setBusiness(p => ({...p, businessType:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="">Select type</option>
                    {['IMPORTER','DISTRIBUTOR','SUPPLIER','LOGISTICS_PROVIDER','INVESTOR','PRIVATE_EQUITY'].map(t => <option key={t} value={t}>{t.replace('_',' ')}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Country</label>
                  <input type="text" placeholder="Nigeria" value={business.country} onChange={e => setBusiness(p => ({...p, country:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>City</label>
                  <input type="text" placeholder="Lagos" value={business.city} onChange={e => setBusiness(p => ({...p, city:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Annual revenue</label>
                  <select value={business.annualRevenue} onChange={e => setBusiness(p => ({...p, annualRevenue:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none appearance-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc', color:'#374151' }}>
                    <option value="">Select range</option>
                    {['Under $100K','$100K-$500K','$500K-$1M','$1M-$5M','$5M-$10M','$10M-$50M','$50M+'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Website</label>
                  <input type="url" placeholder="https://yourbusiness.com" value={business.websiteUrl} onChange={e => setBusiness(p => ({...p, websiteUrl:e.target.value}))}
                    className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Business description</label>
                <textarea rows={3} placeholder="Describe your business, products, and target markets..." value={business.description} onChange={e => setBusiness(p => ({...p, description:e.target.value}))}
                  className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none resize-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
              </div>

              <button onClick={() => save('business')} disabled={saving}
                className="flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-xl text-white disabled:opacity-70"
                style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving...</> : <><Save className="h-4 w-4" />Save business</>}
              </button>
            </div>
          )}

          {/* BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 pb-4 border-b mb-5" style={{ borderColor:'#f1f5f9' }}>
                  <CreditCard className="h-5 w-5" style={{ color:'#1e40af' }} />
                  <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Subscription plans</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {PLANS.map(plan => (
                    <div key={plan.id} className="relative rounded-2xl border p-5"
                      style={{ borderColor: plan.current ? '#1e40af' : '#e8edf3', background: plan.current ? '#eff6ff' : 'white' }}>
                      {plan.badge && <div className="absolute -top-2.5 left-4 text-[10px] font-black px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor:'#f59e0b' }}>★ {plan.badge}</div>}
                      {plan.current && <div className="absolute -top-2.5 right-4 text-[10px] font-black px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor:'#1e40af' }}>Current plan</div>}
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-2xl font-black" style={{ color:'#0f172a' }}>{plan.price}</span>
                        <span className="text-xs" style={{ color:'#94a3b8' }}>{plan.per}</span>
                      </div>
                      <div className="text-sm font-black mb-3" style={{ color:'#0f172a' }}>{plan.name}</div>
                      <ul className="space-y-1.5 mb-4">
                        {plan.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" /><span style={{ color:'#374151' }}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      {!plan.current && (
                        <button className="w-full py-2.5 rounded-xl text-sm font-black text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                          <Zap className="h-3.5 w-3.5 inline mr-1.5" />Upgrade to {plan.name}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 pb-4 border-b mb-5" style={{ borderColor:'#f1f5f9' }}>
                <Bell className="h-5 w-5" style={{ color:'#1e40af' }} />
                <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Notification preferences</h2>
              </div>
              <div className="space-y-4">
                {[
                  { label:'New RFQ responses',     desc:'When a supplier responds to your buyer request', def:true },
                  { label:'New messages',           desc:'When you receive a direct message',             def:true },
                  { label:'Investment updates',     desc:'New deals matching your interests',              def:true },
                  { label:'Market price alerts',    desc:'Commodity price and currency updates',           def:false },
                  { label:'Platform announcements', desc:'New features and platform updates',              def:true },
                  { label:'Weekly digest',          desc:'Weekly summary of your trade activity',         def:true },
                ].map(n => (
                  <div key={n.label} className="flex items-start justify-between gap-4 py-3 border-b last:border-0" style={{ borderColor:'#f8fafc' }}>
                    <div>
                      <div className="text-sm font-bold" style={{ color:'#0f172a' }}>{n.label}</div>
                      <div className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>{n.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" defaultChecked={n.def} className="sr-only peer" />
                      <div className="w-10 h-5 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" style={{ backgroundColor:'#e2e8f0' }} />
                    </label>
                  </div>
                ))}
              </div>
              <button className="mt-4 flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-xl text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                <Save className="h-4 w-4" />Save preferences
              </button>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 pb-4 border-b mb-5" style={{ borderColor:'#f1f5f9' }}>
                  <Shield className="h-5 w-5" style={{ color:'#1e40af' }} />
                  <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Security settings</h2>
                </div>
                <div className="space-y-4 max-w-sm">
                  {['Current password','New password','Confirm new password'].map((label, i) => (
                    <div key={label}>
                      <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>{label}</label>
                      <input type="password" placeholder="••••••••"
                        className="w-full px-4 py-3 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                    </div>
                  ))}
                  <button className="flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-xl text-white" style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                    <Lock className="h-4 w-4" />Update password
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border p-6" style={{ borderColor:'#fecaca', background:'#fef2f2' }}>
                <h3 className="text-sm font-black mb-2" style={{ color:'#dc2626' }}>Danger zone</h3>
                <p className="text-xs mb-4" style={{ color:'#991b1b' }}>Deleting your account is permanent and cannot be undone.</p>
                <button className="text-xs font-black px-4 py-2 rounded-xl border text-red-600 hover:bg-red-100 transition-all" style={{ borderColor:'#fecaca' }}>Delete account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
