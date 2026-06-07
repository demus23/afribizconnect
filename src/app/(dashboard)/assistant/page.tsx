'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Zap, Globe2, DollarSign, Truck, BarChart3, ShieldCheck } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  { icon: DollarSign, text: 'What are the import duties on electronics in Nigeria?' },
  { icon: Truck,      text: 'Explain Incoterms — what is the difference between FOB and CIF?' },
  { icon: Globe2,     text: 'How does a Letter of Credit work for African importers?' },
  { icon: BarChart3,  text: 'What is AfCFTA and how can my business benefit?' },
  { icon: ShieldCheck,text: 'What documents do I need to import goods into Kenya?' },
  { icon: Zap,        text: 'What are the best payment terms for importing from China to Ghana?' },
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm **AfriBiz AI**, your expert trade assistant. 🌍

I can help you with:
- **Import/export duties** for any African country
- **HS codes** and tariff classifications
- **Trade finance** — LC, documentary collections, bank guarantees
- **Incoterms** and shipping terms explained
- **AfCFTA** benefits and rules of origin
- **Customs procedures** and required documents
- **Payment strategies** and currency risk management

What trade question can I help you with today?`,
    },
  ])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text?: string) {
    const messageText = text || input.trim()
    if (!messageText || loading) return

    const userMessage: Message = { role: 'user', content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-10), // Last 10 messages for context
        }),
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please try again in a moment.',
      }])
    } finally {
      setLoading(false)
    }
  }

  function formatMessage(text: string) {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/^- /gm, '• ')
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-5 shrink-0">
        <div className="h-10 w-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight" style={{ color: '#0f172a' }}>AfriBiz AI Assistant</h1>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs" style={{ color: '#059669' }}>Online · Expert in African trade & finance</span>
          </div>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
          style={{ background: '#eff6ff', color: '#1e40af' }}>
          <Zap className="h-3 w-3" />
          Powered by Claude AI
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl border bg-white p-5 space-y-5 mb-4"
        style={{ borderColor: '#e8edf3', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className="shrink-0">
              {msg.role === 'assistant' ? (
                <div className="h-8 w-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
                  <Bot className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white text-xs font-black"
                  style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'rounded-tr-md'
                : 'rounded-tl-md'
            }`}
              style={msg.role === 'user'
                ? { background: 'linear-gradient(135deg,#1e40af,#2563eb)', color: 'white' }
                : { backgroundColor: '#f8fafc', color: '#374151', border: '1px solid #f1f5f9' }
              }
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
            />
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#1e40af,#0f172a)' }}>
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-md"
              style={{ backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <Loader2 className="h-4 w-4 animate-spin" style={{ color: '#1e40af' }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions — show only at start */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4 shrink-0">
          {SUGGESTED.map((s, i) => (
            <button key={i} onClick={() => sendMessage(s.text)}
              className="flex items-start gap-2 p-3 rounded-xl border text-left text-xs font-medium transition-all hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
              style={{ borderColor: '#e8edf3', color: '#374151' }}>
              <s.icon className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: '#1e40af' }} />
              <span className="line-clamp-2">{s.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="shrink-0">
        <div className="flex gap-3 items-end rounded-2xl border p-3 bg-white"
          style={{ borderColor: '#e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Ask about import duties, trade finance, shipping terms, AfCFTA..."
            rows={1}
            className="flex-1 text-sm resize-none focus:outline-none bg-transparent"
            style={{ color: '#0f172a', maxHeight: 120 }}
          />
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
            className="h-9 w-9 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90 disabled:opacity-40 shrink-0"
            style={{ background: 'linear-gradient(135deg,#1e40af,#2563eb)' }}>
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-center text-[10px] mt-2" style={{ color: '#94a3b8' }}>
          AfriBiz AI can make mistakes. Verify important trade and legal information with professionals.
        </p>
      </div>
    </div>
  )
}
