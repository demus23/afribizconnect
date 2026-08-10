'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import TradeAssistant from '@/components/ai/TradeAssistant'
import { Menu, X } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Close sidebar on route change
  useEffect(() => { setSidebarOpen(false) }, [pathname])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login')
      else setUser(user)
    })
  }, [])

  if (!user) return (
    <div style={{ background:'#f0f4f8', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:'32px', height:'32px', borderRadius:'50%', border:'3px solid #1e40af', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#f0f4f8' }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:40, display:'none' }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>

        {/* Mobile top bar */}
        <div className="mobile-topbar" style={{ display:'none', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'#0A0E1A', borderBottom:'1px solid #1A2540', flexShrink:0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background:'none', border:'none', cursor:'pointer', padding:'4px', color:'#E8EDF5' }}>
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'24px', height:'24px', background:'#C9A84C', borderRadius:'3px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:'10px', fontWeight:900, color:'#0A0E1A' }}>A</span>
            </div>
            <span style={{ fontSize:'12px', fontWeight:700, color:'#E8EDF5', letterSpacing:'0.05em' }}>AFRIBIZCONNECT</span>
          </div>
          <div style={{ width:'30px' }} />
        </div>

        {/* Desktop topbar */}
        <div className="desktop-topbar">
          <TopBar user={user} />
        </div>

        <main style={{ flex:1, overflowY:'auto', padding:'20px 16px' }} className="main-content">
          {children}
        </main>
      </div>

      <TradeAssistant />

      <style>{`
        .sidebar-wrapper {
          width: 220px;
          min-width: 220px;
          flex-shrink: 0;
          height: 100vh;
          position: relative;
          z-index: 50;
        }
        .mobile-overlay { display: none; }
        .mobile-topbar { display: none !important; }
        .desktop-topbar { display: block; }

        @media (max-width: 768px) {
          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            width: 260px;
            min-width: 260px;
            z-index: 50;
          }
          .sidebar-wrapper.sidebar-open {
            transform: translateX(0);
          }
          .mobile-overlay { display: block !important; }
          .mobile-topbar { display: flex !important; }
          .desktop-topbar { display: none; }
          .main-content { padding: 12px !important; }
        }
      `}</style>
    </div>
  )
}
