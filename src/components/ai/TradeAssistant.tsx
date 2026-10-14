'use client'
import { useState, useRef, useEffect, Fragment, type ReactNode } from 'react'
import { X, Send, Loader2, User, Minimize2, Maximize2, Sparkles, Plane, Ship, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Landed {
  product: string
  supplier: string
  quantity: number
  destination: string
  shipping_mode: 'air' | 'sea'
  transit_days: [number, number]
  breakdown_usd: {
    goods: number; freight: number; insurance: number; duty: number; duty_rate: number
    levies: { label: string; usd: number }[]
    taxes: { label: string; usd: number }[]
  }
  landed_total_usd: number
  landed_per_unit_usd: number
  landed_total_local: number
  landed_per_unit_local?: number
  local_currency: string
  fx_live: boolean
  demo_data?: boolean
}

interface QuoteOption {
  rank: number
  catalog_item_id: string
  supplier: string
  quantity?: number
  shipping_mode?: string
  landed_total_usd: number
  reason: string
  landed?: Landed
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  requestId?: string
  status?: string
  options?: QuoteOption[]
  orderedRank?: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = '#C9A84C', INK = '#E8EDF5', MUTED = '#8A94A8', PANEL = '#0F1629', CARD = '#1A2540', BASE = '#0A0E1A', GREEN = '#00D4AA'

const SUGGESTIONS = [
  { label: '200 solar lanterns to Nairobi', buy: true },
  { label: 'Nahitaji mafuta ya kupikia lita 5, vipande 300, Kampala', buy: true },
  { label: '50 brake pad sets to Addis Ababa', buy: true },
  { label: 'Import duty on electronics into Nigeria?', buy: false },
  { label: 'What Incoterm protects me as a buyer?', buy: false },
]

const usd = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const local = (n: number, cur: string) => `${cur} ${Math.round(n).toLocaleString('en-US')}`

// ─── Light formatter: *bold*, **bold**, "## heading", "- bullet" (no raw HTML) ─

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*)/g).map((part, i) =>
    /^\*\*[^*]+\*\*$/.test(part) ? <strong key={i}>{part.slice(2, -2)}</strong>
    : /^\*[^*\n]+\*$/.test(part) ? <strong key={i}>{part.slice(1, -1)}</strong>
    : <Fragment key={i}>{part}</Fragment>,
  )
}

function Formatted({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        const t = line.trim()
        if (!t) return <div key={i} style={{ height: '6px' }} />
        if (/^#{1,4}\s/.test(t)) return <div key={i} style={{ fontWeight: 700, fontSize: '13px', margin: '4px 0 2px' }}>{inline(t.replace(/^#{1,4}\s/, ''))}</div>
        if (/^[-•]\s/.test(t)) return <div key={i} style={{ display: 'flex', gap: '6px' }}><span style={{ color: GOLD }}>•</span><span>{inline(t.slice(2))}</span></div>
        return <div key={i}>{inline(line)}</div>
      })}
    </>
  )
}

// ─── Quote card ───────────────────────────────────────────────────────────────

function QuoteCard({ option, ordered, disabled, onOrder }: { option: QuoteOption; ordered: boolean; disabled: boolean; onOrder: () => void }) {
  const [open, setOpen] = useState(false)
  const l = option.landed
  const mode = (l?.shipping_mode ?? option.shipping_mode) === 'sea' ? 'sea' : 'air'
  const b = l?.breakdown_usd

  return (
    <div style={{ background: BASE, border: `1px solid ${ordered ? GREEN : '#22304F'}`, borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: GOLD, color: BASE, fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{option.rank}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: INK, lineHeight: 1.35 }}>{l?.product ?? 'Option'}</div>
          <div style={{ fontSize: '11px', color: MUTED, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', flexWrap: 'wrap' }}>
            {l?.demo_data
              ? <><span>{option.supplier}</span><span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.04em', color: '#F5B041', border: '1px solid #F5B04155', borderRadius: '4px', padding: '1px 5px' }}>DEMO LISTING · NOT VERIFIED</span></>
              : <><ShieldCheck size={11} color={GREEN} /> {option.supplier}</>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
        <div>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', color: MUTED, marginBottom: '1px' }}>ESTIMATED LANDED COST</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: GOLD, fontFamily: '"JetBrains Mono",monospace' }}>
            {l ? local(l.landed_total_local, l.local_currency) : usd(option.landed_total_usd)}
          </div>
          <div style={{ fontSize: '11px', color: MUTED, fontFamily: '"JetBrains Mono",monospace' }}>
            {usd(option.landed_total_usd)}{l ? ` · ${l.landed_per_unit_local ? local(l.landed_per_unit_local, l.local_currency) : usd(l.landed_per_unit_usd)} / unit` : ''}
          </div>
        </div>
        {l && (
          <div style={{ fontSize: '11px', color: INK, display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            {mode === 'sea' ? <Ship size={12} color={GOLD} /> : <Plane size={12} color={GOLD} />}
            {l.transit_days[0]}–{l.transit_days[1]} days
          </div>
        )}
      </div>

      <div style={{ fontSize: '11px', color: MUTED, lineHeight: 1.45 }}>{option.reason}</div>

      {b && l && (
        <>
          <button onClick={() => setOpen(o => !o)} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: GOLD, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />} Cost breakdown
          </button>
          {open && (
            <div style={{ fontSize: '11px', color: INK, fontFamily: '"JetBrains Mono",monospace', display: 'flex', flexDirection: 'column', gap: '3px', borderTop: '1px solid #22304F', paddingTop: '8px' }}>
              {[
                [`Goods (${l.quantity})`, b.goods],
                [`Freight (${mode})`, b.freight],
                ['Insurance', b.insurance],
                [`Duty (${Math.round(b.duty_rate * 100)}%)`, b.duty],
                ...b.levies.map(x => [x.label, x.usd] as [string, number]),
                ...b.taxes.map(x => [x.label, x.usd] as [string, number]),
              ].map(([k, v]) => (
                <div key={String(k)} style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: MUTED }}>{k}</span><span>{usd(Number(v))}</span></div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid #22304F', paddingTop: '4px', marginTop: '2px' }}>
                <span>Landed total</span><span>{usd(l.landed_total_usd)}</span>
              </div>
              <div style={{ color: MUTED, fontFamily: 'inherit', fontSize: '10px', marginTop: '2px' }}>Estimate, not a confirmed offer · {l.fx_live ? 'live FX' : 'reference FX'} · to {l.destination}{l.demo_data ? ' · demo price list' : ''}</div>
            </div>
          )}
        </>
      )}

      <button onClick={onOrder} disabled={disabled || ordered}
        style={{ marginTop: '2px', padding: '8px', borderRadius: '8px', border: 'none', cursor: disabled || ordered ? 'default' : 'pointer', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          background: ordered ? `${GREEN}22` : GOLD, color: ordered ? GREEN : BASE, opacity: disabled && !ordered ? 0.35 : 1 }}>
        {ordered ? <><CheckCircle2 size={13} /> Pending confirmation</> : `Request order · option ${option.rank}`}
      </button>
    </div>
  )
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export default function TradeAssistant() {
  const [open, setOpen]         = useState(false)
  const [mini, setMini]         = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [ordering, setOrdering] = useState<string | null>(null)
  const [pulse, setPulse]       = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])
  useEffect(() => { if (open) { setTimeout(() => inputRef.current?.focus(), 100); setPulse(false) } }, [open])

  async function send(text?: string) {
    const content = (text || input).trim()
    if (!content || loading) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setLoading(true)
    try {
      const res  = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.content })) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setMessages(p => [...p, { role: 'assistant', content: data.replyText, requestId: data.requestId, status: data.status, options: data.options }])
    } catch (e: any) {
      setMessages(p => [...p, { role: 'assistant', content: e?.message || 'Sorry, something went wrong. Please try again.' }])
    } finally { setLoading(false) }
  }

  async function order(msgIndex: number, requestId: string, rank: number) {
    setOrdering(requestId)
    try {
      const res = await fetch('/api/agent/order', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId, rank }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Order failed')
      setMessages(p => [
        ...p.map((m, i) => (i === msgIndex ? { ...m, orderedRank: rank } : m)),
        { role: 'assistant', content: `Order request recorded for option ${rank} (${data.supplier}, estimated ${usd(data.landed_total_usd)} landed). Status: pending confirmation. No payment has been taken and nothing has shipped. Our team will confirm stock, final freight and price before anything moves.` },
      ])
    } catch (e: any) {
      setMessages(p => [...p, { role: 'assistant', content: e?.message || 'Could not place the order. Please try again.' }])
    } finally { setOrdering(null) }
  }

  const avatar = (role: Message['role']) => (
    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: role === 'user' ? CARD : `linear-gradient(135deg,${GOLD},#E8B84B)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {role === 'user' ? <User size={12} color={GOLD} /> : <Sparkles size={12} color={BASE} />}
    </div>
  )

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open trade agent"
          style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg,${GOLD},#E8B84B)`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(201,168,76,0.4)' }}>
          <Sparkles size={22} color={BASE} />
          {pulse && <span style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${GOLD}`, animation: 'pingAI 2s ease-out infinite', opacity: 0 }} />}
        </button>
      )}
      <style>{`@keyframes pingAI{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.6);opacity:0}}@keyframes spinAI{to{transform:rotate(360deg)}}`}</style>

      {open && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, width: mini ? '280px' : 'min(420px, calc(100vw - 32px))', height: mini ? '56px' : 'min(620px, calc(100vh - 48px))', background: PANEL, border: `1px solid ${CARD}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.6)', transition: 'all 0.3s', overflow: 'hidden', fontFamily: '"Inter",system-ui,sans-serif' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderBottom: mini ? 'none' : `1px solid ${CARD}`, flexShrink: 0 }}>
            {avatar('assistant')}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: INK }}>AfriBiz Trade Agent</div>
              {!mini && <div style={{ fontSize: '10px', color: GREEN }}>● Sources Dubai suppliers · estimates landed cost</div>}
            </div>
            <button onClick={() => setMini(m => !m)} aria-label={mini ? 'Expand' : 'Minimise'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#4A5568' }}>
              {mini ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#4A5568' }}>
              <X size={14} />
            </button>
          </div>

          {!mini && (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.length === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      {avatar('assistant')}
                      <div style={{ background: CARD, borderRadius: '12px 12px 12px 4px', padding: '12px 14px', fontSize: '13px', color: INK, lineHeight: 1.5 }}>
                        Tell me what you want to buy, how many, and where to deliver. I find Dubai suppliers and estimate the full cost to your door: freight, duty, VAT and FX. Any language works.
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {SUGGESTIONS.map(s => (
                        <button key={s.label} onClick={() => send(s.label)}
                          style={{ textAlign: 'left', padding: '8px 12px', background: 'transparent', border: `1px solid ${CARD}`, borderRadius: '8px', fontSize: '11px', color: s.buy ? GOLD : MUTED, cursor: 'pointer' }}
                          onMouseEnter={e => (e.currentTarget.style.background = CARD)}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          {s.buy ? '🛒 ' : '❓ '}{s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                      {avatar(m.role)}
                      <div style={{ background: m.role === 'user' ? `${GOLD}14` : CARD, border: m.role === 'user' ? `1px solid ${GOLD}33` : 'none', borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', padding: '10px 14px', fontSize: '12px', color: INK, lineHeight: 1.6, maxWidth: '85%' }}>
                        {m.role === 'assistant' && m.options?.length ? (
                          <span>{m.content.split('\n')[0]}</span>
                        ) : m.role === 'assistant' ? <Formatted text={m.content} /> : <span style={{ whiteSpace: 'pre-wrap' }}>{m.content}</span>}
                      </div>
                    </div>
                    {m.role === 'assistant' && m.requestId && !!m.options?.length && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '36px' }}>
                        {m.options.map(o => (
                          <QuoteCard key={o.rank} option={o} ordered={m.orderedRank === o.rank}
                            disabled={m.orderedRank !== undefined || ordering === m.requestId}
                            onOrder={() => order(i, m.requestId!, o.rank)} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    {avatar('assistant')}
                    <div style={{ background: CARD, borderRadius: '12px 12px 12px 4px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: MUTED }}>
                      <Loader2 size={14} color={GOLD} style={{ animation: 'spinAI 1s linear infinite' }} />
                      Searching suppliers and pricing delivery…
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div style={{ padding: '12px 16px', borderTop: `1px solid ${CARD}`, display: 'flex', gap: '8px', flexShrink: 0 }}>
                <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder="e.g. 300 power banks to Lagos"
                  style={{ flex: 1, background: BASE, border: `1px solid ${CARD}`, borderRadius: '8px', padding: '10px 12px', fontSize: '12px', color: INK, outline: 'none', fontFamily: 'inherit' }} />
                <button onClick={() => send()} disabled={!input.trim() || loading} aria-label="Send"
                  style={{ width: '36px', height: '36px', borderRadius: '8px', background: GOLD, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: input.trim() && !loading ? 1 : 0.4 }}>
                  <Send size={14} color={BASE} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
