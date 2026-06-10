'use client'
import { useState, useEffect, useRef } from 'react'
import { Send, Search, Loader2, MessageSquare, Users, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const FLAG: Record<string,string> = { AE:'🇦🇪', CN:'🇨🇳', NG:'🇳🇬', KE:'🇰🇪', GH:'🇬🇭', ZA:'🇿🇦', IN:'🇮🇳', TR:'🇹🇷', DE:'🇩🇪', DK:'🇩🇰' }

function Avatar({ name, size = 9 }: { name: string; size?: number }) {
  const initials = name?.split(' ').map((n:string) => n[0]).join('').toUpperCase().slice(0,2) || '??'
  const colors = ['#1e40af','#059669','#7c3aed','#d97706','#dc2626','#0891b2']
  const color  = colors[initials.charCodeAt(0) % colors.length]
  return (
    <div className={`h-${size} w-${size} rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0`}
      style={{ backgroundColor: color, minWidth: size*4, minHeight: size*4 }}>
      {initials}
    </div>
  )
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<any[]>([])
  const [messages, setMessages]           = useState<any[]>([])
  const [activeConv, setActiveConv]       = useState<any>(null)
  const [input, setInput]                 = useState('')
  const [loading, setLoading]             = useState(true)
  const [sending, setSending]             = useState(false)
  const [myId, setMyId]                   = useState<string>('')
  const [myName, setMyName]               = useState<string>('')
  const [search, setSearch]               = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase  = createClient()

  useEffect(() => {
    loadConversations()
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setMyName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'Me')
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Supabase Realtime — listen for new messages
  useEffect(() => {
    if (!activeConv || !myId) return
    const channel = supabase.channel(`messages-${activeConv.user.id}-${myId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'Message',
        filter: `OR(and(senderId.eq.${myId},receiverId.eq.${activeConv.user.id}),and(senderId.eq.${activeConv.user.id},receiverId.eq.${myId}))`
      }, () => { loadMessages(activeConv.user.id) })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [activeConv, myId])

  async function loadConversations() {
    setLoading(true)
    try {
      const res  = await fetch('/api/messages')
      const data = await res.json()
      setConversations(data.conversations || [])
      setMyId(data.userId || '')
    } catch { setConversations([]) }
    finally  { setLoading(false) }
  }

  async function loadMessages(userId: string) {
    try {
      const res  = await fetch(`/api/messages?with=${userId}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch { setMessages([]) }
  }

  async function openConversation(conv: any) {
    setActiveConv(conv)
    await loadMessages(conv.user.id)
  }

  async function sendMessage() {
    if (!input.trim() || !activeConv || sending) return
    setSending(true)
    const text = input.trim()
    setInput('')

    // Optimistic update
    setMessages(prev => [...prev, {
      id: 'temp-' + Date.now(),
      senderId: myId,
      content: text,
      createdAt: new Date().toISOString(),
      sender: { name: myName }
    }])

    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: activeConv.user.id, content: text })
      })
      loadConversations()
    } catch { console.error('Send failed') }
    finally { setSending(false) }
  }

  const filteredConvs = conversations.filter(c =>
    c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.user?.businesses?.[0]?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-120px)] rounded-2xl overflow-hidden border bg-white" style={{ borderColor:'#e8edf3', boxShadow:'0 4px 24px rgba(0,0,0,0.06)' }}>

      {/* Sidebar — conversation list */}
      <div className={`${activeConv ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 lg:w-96 border-r shrink-0`} style={{ borderColor:'#f1f5f9' }}>
        {/* Search */}
        <div className="px-4 py-4 border-b" style={{ borderColor:'#f1f5f9' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black" style={{ color:'#0f172a' }}>Messages</h2>
            {conversations.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:'#eff6ff', color:'#1e40af' }}>{conversations.length} chats</span>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color:'#94a3b8' }} />
            <input type="text" placeholder="Search conversations..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none" style={{ borderColor:'#e2e8f0', backgroundColor:'#f8fafc' }} />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="h-5 w-5 animate-spin" style={{ color:'#1e40af' }} /></div>
          ) : filteredConvs.length === 0 ? (
            <div className="text-center py-12 px-6">
              <MessageSquare className="h-10 w-10 mx-auto mb-3" style={{ color:'#e2e8f0' }} />
              <p className="text-sm font-semibold mb-1" style={{ color:'#0f172a' }}>No conversations yet</p>
              <p className="text-xs" style={{ color:'#94a3b8' }}>Connect with suppliers and investors from the Marketplace to start messaging.</p>
            </div>
          ) : (
            filteredConvs.map(conv => {
              const biz     = conv.user?.businesses?.[0]
              const isActive = activeConv?.user?.id === conv.user?.id
              return (
                <button key={conv.user.id} onClick={() => openConversation(conv)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 border-b"
                  style={{ borderColor:'#f8fafc', backgroundColor: isActive ? '#eff6ff' : 'transparent' }}>
                  <Avatar name={conv.user?.name || 'User'} size={10} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-black truncate" style={{ color:'#0f172a' }}>{biz?.name || conv.user?.name}</span>
                      <span className="text-[10px] shrink-0 ml-2" style={{ color:'#94a3b8' }}>{conv.lastTime ? new Date(conv.lastTime).toLocaleDateString() : ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] truncate flex-1" style={{ color:'#64748b' }}>{conv.lastMessage || 'Start a conversation'}</p>
                      {conv.unread && <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 ml-2" />}
                    </div>
                    {biz && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px]">{FLAG[biz.country] || '🌍'}</span>
                        <span className="text-[10px]" style={{ color:'#94a3b8' }}>{biz.country}</span>
                        {biz.trustScore > 0 && <span className="text-[10px] font-bold" style={{ color:'#059669' }}>· {biz.trustScore}</span>}
                      </div>
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Main chat area */}
      {activeConv ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b shrink-0" style={{ borderColor:'#f1f5f9' }}>
            <button className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 mr-1" onClick={() => setActiveConv(null)}>
              <ArrowLeft className="h-4 w-4" style={{ color:'#64748b' }} />
            </button>
            <Avatar name={activeConv.user?.name || 'User'} size={9} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-black truncate" style={{ color:'#0f172a' }}>
                {activeConv.user?.businesses?.[0]?.name || activeConv.user?.name}
              </div>
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color:'#94a3b8' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Active on platform
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-10 w-10 mx-auto mb-3" style={{ color:'#e2e8f0' }} />
                <p className="text-sm font-semibold mb-1" style={{ color:'#0f172a' }}>Start the conversation</p>
                <p className="text-xs" style={{ color:'#94a3b8' }}>Send a message to connect with this business.</p>
              </div>
            ) : messages.map((msg, i) => {
              const isMe = msg.senderId === myId
              return (
                <div key={msg.id || i} className={`flex items-end gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                  {!isMe && <Avatar name={msg.sender?.name || 'User'} size={7} />}
                  <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe ? 'rounded-tr-md' : 'rounded-tl-md'}`}
                      style={isMe
                        ? { background:'linear-gradient(135deg,#1e40af,#2563eb)', color:'white' }
                        : { backgroundColor:'#f8fafc', color:'#374151', border:'1px solid #f1f5f9' }
                      }>
                      {msg.content}
                    </div>
                    <span className="text-[10px]" style={{ color:'#94a3b8' }}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                    </span>
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t px-4 py-3" style={{ borderColor:'#f1f5f9' }}>
            <div className="flex gap-3 items-end rounded-2xl border p-2" style={{ borderColor:'#e2e8f0' }}>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                placeholder="Type a message... (Enter to send)"
                rows={1} className="flex-1 text-sm resize-none focus:outline-none bg-transparent py-1 px-2" style={{ color:'#0f172a', maxHeight:100 }} />
              <button onClick={sendMessage} disabled={!input.trim() || sending}
                className="h-9 w-9 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90 disabled:opacity-40 shrink-0"
                style={{ background:'linear-gradient(135deg,#1e40af,#2563eb)' }}>
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col gap-4" style={{ background:'#fafbfc' }}>
          <div className="h-16 w-16 rounded-2xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#eff6ff,#dbeafe)' }}>
            <MessageSquare className="h-8 w-8" style={{ color:'#1e40af' }} />
          </div>
          <div className="text-center">
            <p className="text-sm font-black mb-1" style={{ color:'#0f172a' }}>Select a conversation</p>
            <p className="text-xs" style={{ color:'#94a3b8' }}>Choose a contact from the list to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )
}
