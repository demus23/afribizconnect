import crypto from 'node:crypto'

const GRAPH = `https://graph.facebook.com/${process.env.WHATSAPP_GRAPH_VERSION || 'v23.0'}`

function token() {
  const t = process.env.WHATSAPP_ACCESS_TOKEN
  if (!t) throw new Error('WHATSAPP_ACCESS_TOKEN is not set')
  return t
}

/** Verifies Meta's X-Hub-Signature-256 header against the raw request body. */
export function verifySignature(rawBody: string, header: string | null): boolean {
  const secret = process.env.WHATSAPP_APP_SECRET
  if (!secret) return process.env.NODE_ENV !== 'production' // allow unsigned only in local dev
  if (!header?.startsWith('sha256=')) return false
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  const given = header.slice(7)
  return given.length === expected.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected))
}

export async function sendText(to: string, body: string) {
  const res = await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: body.slice(0, 4000) } }),
  })
  if (!res.ok) console.error('WhatsApp send failed', res.status, await res.text())
}

export async function markRead(messageId: string) {
  await fetch(`${GRAPH}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: messageId }),
  }).catch(() => {})
}

/** Downloads a media attachment (e.g. a voice note) by its WhatsApp media id. */
export async function downloadMedia(mediaId: string): Promise<{ data: ArrayBuffer; mimeType: string }> {
  const meta = await fetch(`${GRAPH}/${mediaId}`, { headers: { Authorization: `Bearer ${token()}` } })
  if (!meta.ok) throw new Error(`Media lookup failed ${meta.status}`)
  const { url, mime_type } = await meta.json()
  const file = await fetch(url, { headers: { Authorization: `Bearer ${token()}` } })
  if (!file.ok) throw new Error(`Media download failed ${file.status}`)
  return { data: await file.arrayBuffer(), mimeType: mime_type }
}

/**
 * Speech-to-text for voice notes. Claude does not take audio input, so this uses a
 * separate transcription service (OpenAI Whisper-compatible endpoint). Returns null
 * when no transcription key is configured.
 */
export async function transcribe(audio: ArrayBuffer, mimeType: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null
  const form = new FormData()
  form.append('file', new Blob([audio], { type: mimeType }), 'voice.ogg')
  form.append('model', process.env.TRANSCRIBE_MODEL || 'whisper-1')
  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}` },
    body: form,
  })
  if (!res.ok) {
    console.error('Transcription failed', res.status, await res.text())
    return null
  }
  return ((await res.json()).text as string)?.trim() || null
}
