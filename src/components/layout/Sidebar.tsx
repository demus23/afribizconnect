'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, ShoppingBag, TrendingUp, Globe2,
  Truck, RefreshCw, MessageSquare, Users, Settings,
  BarChart3, Shield, Zap, Bell, Gift, Code2, ShieldCheck,
  PieChart, Lightbulb, BookOpen
} from 'lucide-react'

const NAV = [
  { href: '/dashboard',    label: 'Overview',       icon: LayoutDashboard },
  { href: '/marketplace',  label: 'Suppliers',      icon: ShoppingBag,   badge: 'NEW' },
  { href: '/invest',       label: 'Deal Flow',      icon: TrendingUp },
  { href: '/sourcing',     label: 'RFQ Desk',       icon: Globe2 },
  { href: '/logistics',    label: 'Logistics',      icon: Truck },
  { href: '/trade',        label: 'Trade Hub',      icon: RefreshCw },
  { href: '/messages',     label: 'Messages',       icon: MessageSquare, count: true },
  { href: '/network',      label: 'Network',        icon: Users },
  { href: '/market-data',  label: 'Market Data',    icon: BarChart3,     badge: 'LIVE' },
  { href: '/analytics',    label: 'Analytics',      icon: PieChart },
  { href: '/intelligence', label: 'Intelligence',   icon: Lightbulb,     badge: 'NEW' },
  { href: '/alerts',       label: 'Price Alerts',   icon: Bell },
  { href: '/credit',       label: 'Credit Score',   icon: ShieldCheck },
  { href: '/referral',     label: 'Referral',       icon: Gift },
  { href: '/developer',    label: 'Developer API',  icon: Code2 },
  { href: '/blog', label: 'Trade Insights', icon: BookOpen, badge: 'NEW' },
  { href: '/settings',     label: 'Settings',       icon: Settings },
  { href: '/admin',        label: 'Admin',          icon: Shield },
]

const MARKETS = [
  { pair: 'USD/NGN', val: '1,587', chg: '+0.3%', up: true  },
  { pair: 'USD/KES', val: '129.8', chg: '+0.1%', up: true  },
  { pair: 'CRUDE',   val: '$78.4', chg: '+1.2%', up: true  },
  { pair: 'COCOA',   val: '$6,842',chg: '-0.9%', up: false },
]

export function Sidebar({
  unreadMessages = 0,
  trustScore = 0,
  plan = 'FREE',
}: {
  unreadMessages?: number
  trustScore?: number
  plan?: string
}) {
  const pathname = usePathname()
  const [time, setTime] = useState('')
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }))
      setBlink(b => !b)
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const planColor =
    plan === 'GROWTH'  ? '#00D4AA' :
    plan === 'STARTER' ? '#C9A84C' : '#4A5568'

  return (
    <aside style={{
      width: '220px', minWidth: '220px', height: '100vh', position: 'sticky', top: 0,
      background: '#0A0E1A', borderRight: '1px solid #1A2540',
      display: 'flex', flexDirection: 'column',
      fontFamily: '"Inter", system-ui, sans-serif',
      overflow: 'hidden',
    }}>

      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid #1A2540', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '28px', height: '28px', background: '#C9A84C', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#0A0E1A' }}>A</span>
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#E8EDF5', letterSpacing: '0.05em' }}>AFRIBIZ</div>
          <div style={{ fontSize: '9px', color: '#4A5568', letterSpacing: '0.1em' }}>CONNECT PRO</div>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '10px', color: blink ? '#00D4AA' : '#4A5568', fontFamily: 'monospace', transition: 'color 0.2s' }}>
          {time}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {NAV.map(({ href, label, icon: Icon, badge, count }: any) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 16px', textDecoration: 'none',
              background: active ? '#0F1629' : 'transparent',
              borderLeft: active ? '2px solid #C9A84C' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#0F162988' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}>
              <Icon size={13} color={active ? '#C9A84C' : '#4A5568'} />
              <span style={{ fontSize: '12px', fontWeight: active ? 600 : 400, color: active ? '#E8EDF5' : '#64748B', flex: 1, letterSpacing: '0.01em' }}>{label}</span>
              {badge && (
                <span style={{ fontSize: '8px', padding: '2px 5px', borderRadius: '2px', fontWeight: 700, letterSpacing: '0.1em', background: badge === 'LIVE' ? '#00D4AA22' : '#C9A84C22', color: badge === 'LIVE' ? '#00D4AA' : '#C9A84C' }}>
                  {badge}
                </span>
              )}
              {count && unreadMessages > 0 && (
                <span style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '10px', background: '#C9A84C', color: '#0A0E1A', fontWeight: 700 }}>
                  {unreadMessages}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Live market mini-strip */}
      <div style={{ borderTop: '1px solid #1A2540', padding: '12px 0' }}>
        <div style={{ padding: '0 16px 8px', fontSize: '9px', color: '#4A5568', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#00D4AA' }}>●</span> Markets
        </div>
        {MARKETS.map(m => (
          <div key={m.pair} style={{ display: 'flex', alignItems: 'center', padding: '5px 16px', gap: '6px' }}>
            <span style={{ fontSize: '9px', color: '#4A5568', fontFamily: 'monospace', width: '52px' }}>{m.pair}</span>
            <span style={{ fontSize: '10px', color: '#E8EDF5', fontFamily: 'monospace', flex: 1 }}>{m.val}</span>
            <span style={{ fontSize: '9px', color: m.up ? '#00D4AA' : '#FF4D6D', fontFamily: 'monospace' }}>{m.chg}</span>
          </div>
        ))}
      </div>

      {/* Trust score + plan */}
      <div style={{ borderTop: '1px solid #1A2540', padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '9px', color: '#4A5568', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Trust Score</span>
          <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'monospace', color: trustScore >= 80 ? '#00D4AA' : trustScore >= 60 ? '#C9A84C' : '#4A5568' }}>
            {trustScore}/100
          </span>
        </div>
        <div style={{ height: '2px', background: '#1A2540', borderRadius: '1px', marginBottom: '12px' }}>
          <div style={{ height: '100%', width: `${trustScore}%`, background: trustScore >= 80 ? '#00D4AA' : '#C9A84C', borderRadius: '1px', transition: 'width 1s ease' }} />
        </div>

        {plan === 'FREE' ? (
          <Link href="/settings?tab=billing" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            padding: '8px', background: '#C9A84C14', border: '1px solid #C9A84C33',
            borderRadius: '3px', textDecoration: 'none', width: '100%',
          }}>
            <Zap size={10} color="#C9A84C" />
            <span style={{ fontSize: '10px', color: '#C9A84C', fontWeight: 700, letterSpacing: '0.08em' }}>UPGRADE TO PRO</span>
          </Link>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 8px', background: '#0F1629', borderRadius: '3px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: planColor }} />
            <span style={{ fontSize: '10px', color: planColor, fontWeight: 700, letterSpacing: '0.1em' }}>{plan} PLAN</span>
          </div>
        )}
      </div>
    </aside>
  )
}