'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Send, Loader2, User, Minimize2, Maximize2, Sparkles } from 'lucide-react'

interface Message { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'What Incoterm protects me as a buyer?',
  'Import duty on electronics into Nigeria?',
  'How does a Letter of Credit work?',
  'Is my product AfCFTA eligible?',
  'Best payment method for first trade?',
  'How to verify a supplier in China?',
]

export default function TradeAssistant() {
  const [open, setOpen]         = useState(false)
  const [mini, setMini]         = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [pulse, setPulse]       = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 100); setPulse(false) }
  }, [open])

  async function send(text?: string) {
    const content = (text || input).trim()
    if (!content || loading) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res  = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      if (data.message) setMessages(p => [...p, { role: 'assistant', content: data.message }])
    } catch { setMessages(p => [...p, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]) }
    finally { setLoading(false) }
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button onClick={() => setOpen(true)}
          style={{ position:'fixed', bottom:'24px', right:'24px', zIndex:1000, width:'56px', height:'56px', borderRadius:'50%', background:'linear-gradient(135deg,#C9A84C,#E8B84B)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(201,168,76,0.4)' }}>
          <Sparkles size={22} color="#0A0E1A" />
          {pulse && <span style={{ position:'absolute', inset:'-4px', borderRadius:'50%', border:'2px solid #C9A84C', animation:'pingAI 2s ease-out infinite', opacity:0 }} />}
        </button>
      )}
      <style>{`@keyframes pingAI{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.6);opacity:0}}`}</style>

      {/* Chat panel */}
      {open && (
        <div style={{ position:'fixed', bottom:'24px', right:'24px', zIndex:1000, width: mini ? '280px' : '400px', height: mini ? '56px' : '560px', background:'#0F1629', border:'1px solid #1A2540', borderRadius:'16px', display:'flex', flexDirection:'column', boxShadow:'0 24px 80px rgba(0,0,0,0.6)', transition:'all 0.3s', overflow:'hidden', fontFamily:'"Inter",system-ui,sans-serif' }}>

          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'14px 16px', borderBottom: mini ? 'none' : '1px solid #1A2540', flexShrink:0 }}>
            <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'linear-gradient(135deg,#C9A84C,#E8B84B)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Sparkles size={14} color="#0A0E1A" />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:'13px', fontWeight:700, color:'#E8EDF5' }}>AfriTrade AI</div>
              {!mini && <div style={{ fontSize:'10px', color:'#00D4AA' }}>● Trade expert · Online</div>}
            </div>
            <button onClick={() => setMini(m => !m)} style={{ background:'none', border:'none', cursor:'pointer', padding:'4px', color:'#4A5568' }}>
              {mini ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', padding:'4px', color:'#4A5568' }}>
              <X size={14} />
            </button>
          </div>

          {!mini && (
            <>
              {/* Messages */}
              <div style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:'12px' }}>

                {/* Welcome */}
                {messages.length === 0 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                      <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'linear-gradient(135deg,#C9A84C,#E8B84B)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Sparkles size={12} color="#0A0E1A" />
                      </div>
                      <div style={{ background:'#1A2540', borderRadius:'12px 12px 12px 4px', padding:'12px 14px', fontSize:'13px', color:'#E8EDF5', lineHeight:1.5, maxWidth:'90%' }}>
                        I'm AfriTrade AI — your expert on African trade, customs duties, Incoterms, Letters of Credit, and AfCFTA. Ask me anything.
                      </div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                      {SUGGESTIONS.map(s => (
                        <button key={s} onClick={() => send(s)}
                          style={{ textAlign:'left', padding:'8px 12px', background:'transparent', border:'1px solid #1A2540', borderRadius:'8px', fontSize:'11px', color:'#C9A84C', cursor:'pointer', transition:'all 0.15s' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#1A2540')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((m, i) => (
                  <div key={i} style={{ display:'flex', gap:'8px', alignItems:'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', background: m.role === 'user' ? '#1A2540' : 'linear-gradient(135deg,#C9A84C,#E8B84B)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      {m.role === 'user' ? <User size={12} color="#C9A84C" /> : <Sparkles size={12} color="#0A0E1A" />}
                    </div>
                    <div style={{ background: m.role === 'user' ? '#C9A84C14' : '#1A2540', border: m.role === 'user' ? '1px solid #C9A84C33' : 'none', borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', padding:'10px 14px', fontSize:'12px', color:'#E8EDF5', lineHeight:1.6, maxWidth:'85%', whiteSpace:'pre-wrap' }}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div style={{ display:'flex', gap:'8px', alignItems:'flex-start' }}>
                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'linear-gradient(135deg,#C9A84C,#E8B84B)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Sparkles size={12} color="#0A0E1A" />
                    </div>
                    <div style={{ background:'#1A2540', borderRadius:'12px 12px 12px 4px', padding:'12px 16px' }}>
                      <Loader2 size={14} color="#C9A84C" style={{ animation:'spin 1s linear infinite' }} />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div style={{ padding:'12px 16px', borderTop:'1px solid #1A2540', display:'flex', gap:'8px', flexShrink:0 }}>
                <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder="Ask about duties, AfCFTA, Incoterms..."
                  style={{ flex:1, background:'#0A0E1A', border:'1px solid #1A2540', borderRadius:'8px', padding:'10px 12px', fontSize:'12px', color:'#E8EDF5', outline:'none', fontFamily:'inherit' }} />
                <button onClick={() => send()} disabled={!input.trim() || loading}
                  style={{ width:'36px', height:'36px', borderRadius:'8px', background:'#C9A84C', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', opacity: input.trim() && !loading ? 1 : 0.4 }}>
                  <Send size={14} color="#0A0E1A" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
