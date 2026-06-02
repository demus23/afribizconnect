'use client'
import { Bell, Search, Globe, LogOut, Settings, User, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { logout } from '@/lib/actions/auth'

interface TopBarProps {
  user?: { email?: string; user_metadata?: { full_name?: string; avatar_url?: string } } | null
}

export function TopBar({ user }: TopBarProps) {
  const [dropOpen, setDropOpen] = useState(false)
  const name  = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <header className="h-14 border-b shrink-0 flex items-center px-5 gap-4"
      style={{ borderColor: '#e8edf3', backgroundColor: 'white' }}>

      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: '#94a3b8' }} />
          <input type="text" placeholder="Search suppliers, opportunities..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 transition-all"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#f8fafc' }} />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Currency */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs border rounded-lg px-2.5 py-1.5"
          style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
          <Globe className="h-3 w-3" /> USD
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <Bell className="h-4 w-4" style={{ color: '#64748b' }} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-black"
              style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold leading-none" style={{ color: '#0f172a' }}>{name}</div>
            </div>
            <ChevronDown className="h-3 w-3" style={{ color: '#94a3b8' }} />
          </button>

          {dropOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border bg-white shadow-lg z-20 py-1.5"
                style={{ borderColor: '#e8edf3' }}>
                <div className="px-4 py-2.5 border-b" style={{ borderColor: '#f1f5f9' }}>
                  <div className="text-xs font-black" style={{ color: '#0f172a' }}>{name}</div>
                  <div className="text-[11px]" style={{ color: '#94a3b8' }}>{user?.email}</div>
                </div>
                <Link href="/settings" onClick={() => setDropOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  style={{ color: '#374151' }}>
                  <Settings className="h-3.5 w-3.5" style={{ color: '#94a3b8' }} /> Settings
                </Link>
                <Link href="/profile" onClick={() => setDropOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  style={{ color: '#374151' }}>
                  <User className="h-3.5 w-3.5" style={{ color: '#94a3b8' }} /> Profile
                </Link>
                <div className="border-t mt-1 pt-1" style={{ borderColor: '#f1f5f9' }}>
                  <form action={logout}>
                    <button type="submit"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold hover:bg-red-50 transition-colors w-full text-left"
                      style={{ color: '#dc2626' }}>
                      <LogOut className="h-3.5 w-3.5" /> Sign out
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
