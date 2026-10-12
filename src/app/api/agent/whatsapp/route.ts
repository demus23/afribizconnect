import { after, NextRequest, NextResponse } from 'next/server'
import { handleBuyerMessage } from '@/lib/agent/handle'
import { downloadMedia, markRead, sendText, transcribe, verifySignature } from '@/lib/agent/whatsapp'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// WhatsApp retries webhooks; skip message ids already seen by this instance.
const seen = new Set<string>()

/** Meta webhook verification handshake. */
export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams
  if (p.get('hub.mode') === 'subscribe' && p.get('hub.verify_token') === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(p.get('hub.challenge') ?? '', { status: 200 })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

export async function POST(request: NextRequest) {
  const raw = await request.text()
  if (!verifySignature(raw, request.headers.get('x-hub-signature-256'))) {
    return new NextResponse('Invalid signature', { status: 401 })
  }

  const body = JSON.parse(raw)
  const messages: any[] = body?.entry?.flatMap((e: any) => e.changes?.flatMap((c: any) => c.value?.messages ?? []) ?? []) ?? []

  for (const msg of messages) {
    if (seen.has(msg.id)) continue
    seen.add(msg.id)
    if (seen.size > 5000) seen.clear()

    // Reply after responding 200 so Meta doesn't time out and retry.
    after(() => processMessage(msg))
  }

  return NextResponse.json({ ok: true })
}

async function processMessage(msg: any) {
  const from: string = msg.from
  try {
    await markRead(msg.id)

    let text: string | null = null
    if (msg.type === 'text') {
      text = msg.text?.body
    } else if (msg.type === 'audio') {
      const media = await downloadMedia(msg.audio.id)
      text = await transcribe(media.data, media.mimeType)
      if (!text) {
        await sendText(from, 'Sorry, I could not hear that voice note. Please type what you need, how many, and your country.')
        return
      }
    } else if (msg.type === 'image') {
      // Photo search comes later; use the caption if there is one.
      text = msg.image?.caption ?? null
      if (!text) {
        await sendText(from, 'Thanks for the photo. Please add a short description, the quantity and your country.')
        return
      }
    }

    if (!text) {
      await sendText(from, 'Please send a text or voice message describing what you want to buy, how many, and your country.')
      return
    }

    const result = await handleBuyerMessage({ channel: 'whatsapp', buyerPhone: from, text })
    await sendText(from, result.replyText)
  } catch (e) {
    console.error('Trade agent failed', e)
    await sendText(from, 'Sorry, something went wrong on our side. A team member will follow up shortly.').catch(() => {})
  }
}
