'use client'
import { useState } from 'react'
import { User, Building2, Bell, Shield, CreditCard, Globe2, Camera, Save, ChevronRight, CheckCircle2, Zap, BadgeCheck, Lock, Mail, Phone } from 'lucide-react'
import { logout } from '@/lib/actions/auth'

const TABS = [
  { id:'profile',   label:'Profile',       icon:User },
  { id:'business',  label:'Business',      icon:Building2 },
  { id:'billing',   label:'Billing',       icon:CreditCard },
  { id:'notifications',label:'Notifications',icon:Bell },
  { id:'security',  label:'Security',      icon:Shield },
]

const PLANS = [
  { id:'free',       name:'Free',       price:'$0',   period:'/mo', features:['Basic profile','5 RFQs/month','20 contacts','Email support'], current:true },
  { id:'starter',    name:'Starter',    price:'$49',  period:'/mo', features:['Verified badge','Unlimited RFQs','100 contacts','Priority support','Analytics'], current:false },
  { id:'growth',     name:'Growth',     price:'$149', period:'/mo', features:['Everything in Starter','Unlimited contacts','Investment listings','Logistics quotes','Team access'], current:false },
  { id:'enterprise', name:'Enterprise', price:'Custom',period:'',   features:['Everything in Growth','API access','White-label','SLA guarantee','Dedicated manager'], current:false },
]

export default function SettingsPage() {
  const [activeTab, setTab] = useState('profile')
  const [saved, setSaved]   = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight" style={{ color:'#0f172a' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color:'#64748b' }}>Manage your account, business profile, and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left"
                style={activeTab===t.id
                  ? { background:'#eff6ff', color:'#1e40af' }
                  : { color:'#475569' }}>
                <t.icon className="h-4 w-4 shrink-0" />
                {t.label}
              </button>
            ))}
            <div className="pt-4 border-t mt-4" style={{ borderColor:'#f1f5f9' }}>
              <form action={logout}>
                <button type="submit" className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all text-left">
                  Sign out
                </button>
              </form>
            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="rounded-2xl bg-white border p-6 space-y-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 pb-4 border-b" style={{ borderColor:'#f1f5f9' }}>
                <User className="h-5 w-5" style={{ color:'#1e40af' }} />
                <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Personal Profile</h2>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-white text-xl font-black"
                    style={{ background:'linear-gradient(135deg,#1e40af,#0f172a)' }}>N</div>
                  <button className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white border flex items-center justify-center shadow-sm"
                    style={{ borderColor:'#e2e8f0' }}>
                    <Camera className="h-3 w-3" style={{ color:'#64748b' }} />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color:'#0f172a' }}>Natnael</p>
                  <p className="text-xs" style={{ color:'#94a3b8' }}>Upload a photo to personalize your profile</p>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:'Full name', placeholder:'Natnael Demus', icon:User },
                  { label:'Email address', placeholder:'natnael@business.com', icon:Mail },
                  { label:'Phone number', placeholder:'+251 9xx xxx xxx', icon:Phone },
                  { label:'Country', placeholder:'Ethiopia', icon:Globe2 },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color:'#94a3b8' }} />
                      <input type="text" placeholder={f.placeholder}
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none transition-all"
                        style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleSave}
                className="flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background: saved ? '#059669' : 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save changes</>}
              </button>
            </div>
          )}

          {/* Business Tab */}
          {activeTab === 'business' && (
            <div className="rounded-2xl bg-white border p-6 space-y-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 pb-4 border-b" style={{ borderColor:'#f1f5f9' }}>
                <Building2 className="h-5 w-5" style={{ color:'#1e40af' }} />
                <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Business Profile</h2>
              </div>

              {/* Trust score */}
              <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background:'#f0fdf4', border:'1px solid #bbf7d0' }}>
                <div className="relative h-14 w-14 shrink-0">
                  <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="22" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                    <circle cx="28" cy="28" r="22" fill="none" strokeWidth="5" strokeDasharray="138" strokeDashoffset={138-(138*72)/100} strokeLinecap="round" style={{ stroke:'#10b981' }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-black" style={{ color:'#059669' }}>72</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-black" style={{ color:'#059669' }}>Trust Score: 72/100</div>
                  <p className="text-xs mt-0.5" style={{ color:'#047857' }}>Complete your profile to improve your score and get more inquiries.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label:'Business name', placeholder:'Your Business Ltd' },
                  { label:'Business type', placeholder:'Importer / Distributor' },
                  { label:'Country', placeholder:'Nigeria' },
                  { label:'City', placeholder:'Lagos' },
                  { label:'Annual revenue', placeholder:'$1M-$5M' },
                  { label:'Employee count', placeholder:'10-50' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>{f.label}</label>
                    <input type="text" placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none"
                      style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Business description</label>
                <textarea rows={3} placeholder="Describe your business, products, and target markets..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none resize-none"
                  style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
              </div>

              <button onClick={handleSave}
                className="flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-xl text-white"
                style={{ background: saved ? '#059669' : 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save changes</>}
              </button>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 pb-4 border-b mb-5" style={{ borderColor:'#f1f5f9' }}>
                  <CreditCard className="h-5 w-5" style={{ color:'#1e40af' }} />
                  <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Subscription Plans</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {PLANS.map(plan => (
                    <div key={plan.id} className="rounded-2xl border p-5 relative"
                      style={{ borderColor: plan.current ? '#1e40af' : '#e8edf3', background: plan.current ? '#eff6ff' : 'white' }}>
                      {plan.current && (
                        <span className="absolute -top-2.5 left-4 text-[10px] font-black px-2.5 py-1 rounded-full text-white" style={{ backgroundColor:'#1e40af' }}>
                          Current plan
                        </span>
                      )}
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-2xl font-black" style={{ color:'#0f172a' }}>{plan.price}</span>
                        <span className="text-xs" style={{ color:'#94a3b8' }}>{plan.period}</span>
                      </div>
                      <div className="text-sm font-black mb-3" style={{ color:'#0f172a' }}>{plan.name}</div>
                      <ul className="space-y-1.5 mb-4">
                        {plan.features.map(f => (
                          <li key={f} className="flex items-center gap-2 text-xs" style={{ color:'#374151' }}>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> {f}
                          </li>
                        ))}
                      </ul>
                      {!plan.current && (
                        <button className="w-full py-2.5 rounded-xl text-sm font-black text-white"
                          style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                          <Zap className="h-3.5 w-3.5 inline mr-1.5" />
                          Upgrade to {plan.name}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 pb-4 border-b mb-5" style={{ borderColor:'#f1f5f9' }}>
                <Bell className="h-5 w-5" style={{ color:'#1e40af' }} />
                <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Notification Preferences</h2>
              </div>
              <div className="space-y-4">
                {[
                  { label:'New RFQ responses',    desc:'When a supplier responds to your buyer request', default:true },
                  { label:'New messages',          desc:'When you receive a direct message',              default:true },
                  { label:'Investment updates',    desc:'New opportunities matching your interests',       default:true },
                  { label:'Market alerts',         desc:'Commodity price changes and currency updates',    default:false },
                  { label:'Supplier activity',     desc:'When saved suppliers post new products',          default:false },
                  { label:'Platform announcements',desc:'New features and platform updates',              default:true },
                  { label:'Weekly digest',         desc:'Weekly summary of your trade activity',          default:true },
                ].map(n => (
                  <div key={n.label} className="flex items-start justify-between gap-4 py-3 border-b last:border-0" style={{ borderColor:'#f8fafc' }}>
                    <div>
                      <div className="text-sm font-bold" style={{ color:'#0f172a' }}>{n.label}</div>
                      <div className="text-xs mt-0.5" style={{ color:'#94a3b8' }}>{n.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" defaultChecked={n.default} className="sr-only peer" />
                      <div className="w-10 h-5 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"
                        style={{ backgroundColor:'#e2e8f0' }} />
                    </label>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="mt-4 flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-xl text-white"
                style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                <Save className="h-4 w-4" /> Save preferences
              </button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 pb-4 border-b mb-5" style={{ borderColor:'#f1f5f9' }}>
                  <Shield className="h-5 w-5" style={{ color:'#1e40af' }} />
                  <h2 className="text-base font-black" style={{ color:'#0f172a' }}>Security Settings</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Current password</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none max-w-sm"
                      style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>New password</label>
                    <input type="password" placeholder="Min. 8 characters"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none max-w-sm"
                      style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wide mb-1.5" style={{ color:'#374151' }}>Confirm new password</label>
                    <input type="password" placeholder="Repeat new password"
                      className="w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none max-w-sm"
                      style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
                  </div>
                  <button className="flex items-center gap-2 text-sm font-black px-6 py-2.5 rounded-xl text-white"
                    style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                    <Lock className="h-4 w-4" /> Update password
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-white border p-6" style={{ borderColor:'#e8edf3', boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
                <h3 className="text-sm font-black mb-4" style={{ color:'#0f172a' }}>Two-factor authentication</h3>
                <p className="text-xs mb-4" style={{ color:'#64748b' }}>Add an extra layer of security to your account with 2FA.</p>
                <button className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl border transition-all hover:bg-slate-50"
                  style={{ borderColor:'#e2e8f0', color:'#374151' }}>
                  <Shield className="h-4 w-4" /> Enable 2FA
                </button>
              </div>

              <div className="rounded-2xl border p-6" style={{ borderColor:'#fecaca', background:'#fef2f2' }}>
                <h3 className="text-sm font-black mb-2" style={{ color:'#dc2626' }}>Danger zone</h3>
                <p className="text-xs mb-4" style={{ color:'#991b1b' }}>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="text-xs font-black px-4 py-2 rounded-xl border text-red-600 hover:bg-red-100 transition-all"
                  style={{ borderColor:'#fecaca' }}>Delete account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
