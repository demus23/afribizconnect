'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ShoppingBag, TrendingUp, Globe2, Truck,
  Ship, MessageSquare, Users, Settings, Globe, ChevronRight,
  Zap, BadgeCheck,BarChart3, Bot, Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard',   label: 'Dashboard',   icon: LayoutDashboard, badge: null },
  { href: '/marketplace', label: 'Marketplace',  icon: ShoppingBag,    badge: 'New' },
  { href: '/invest',      label: 'Invest',       icon: TrendingUp,     badge: null },
  { href: '/sourcing',    label: 'Sourcing',     icon: Globe2,         badge: null },
  { href: '/logistics',   label: 'Logistics',    icon: Truck,          badge: null },
  { href: '/trade',       label: 'Trade',        icon: Ship,           badge: null },
  { href: '/messages',    label: 'Messages',     icon: MessageSquare,  badge: '3' },
  { href: '/network',     label: 'Network',      icon: Users,          badge: null },
  { href: '/settings',    label: 'Settings',     icon: Settings,       badge: null },
  { href: '/market',    label: 'Market Data', icon: BarChart3,  badge: 'Live' },
  { href: '/assistant', label: 'AI Assistant', icon: Bot,        badge: 'New' },
  { label: 'Admin', href: '/admin', icon: Shield }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 h-screen">

      {/* Logo */}
      <div className="flex items-center gap-2.5 h-14 px-5 border-b border-neutral-100 dark:border-neutral-800">
        <div className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
          <Globe className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-none">AfriBizConnect</div>
          <div className="text-[10px] text-neutral-400 mt-0.5">Trade Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group',
                active
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', active ? 'text-emerald-600 dark:text-emerald-400' : '')} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className={cn(
                  'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                  badge === 'New'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400'
                )}>
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Trust score widget */}
      <div className="p-3 border-t border-neutral-100 dark:border-neutral-800">
        <div className="rounded-xl bg-neutral-50 dark:bg-neutral-800 p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-semibold">Trust Score</span>
            </div>
            <span className="text-xs font-bold text-emerald-600">72/100</span>
          </div>
          <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div className="h-full w-[72%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
          </div>
          <p className="text-[10px] text-neutral-400 mt-2">Complete your profile to reach 100</p>
          <Link
            href="/settings/billing"
            className="mt-2.5 flex items-center justify-center gap-1.5 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold py-1.5 rounded-lg transition-colors"
          >
            <Zap className="h-3 w-3" /> Upgrade plan
          </Link>
        </div>
      </div>
    </aside>
  )
}
