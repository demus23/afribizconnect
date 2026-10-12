import { prisma } from '@/lib/prisma'
import { runTradeAgent } from './run'

/** Runs the agent on one buyer message and logs the request, reply and tool trace. */
export async function handleBuyerMessage(opts: { channel: 'whatsapp' | 'test'; buyerPhone?: string; text: string }) {
  const started = Date.now()
  const record = await prisma.agentRequest.create({
    data: { channel: opts.channel, buyerPhone: opts.buyerPhone, inputText: opts.text },
  })

  try {
    const result = await runTradeAgent(opts.text)
    await prisma.agentRequest.update({
      where: { id: record.id },
      data: {
        replyText: result.replyText,
        quotes: result.options,
        toolTrace: result.trace as any,
        status: result.status,
        latencyMs: Date.now() - started,
      },
    })
    return { requestId: record.id, latencyMs: Date.now() - started, ...result }
  } catch (e: any) {
    await prisma.agentRequest.update({
      where: { id: record.id },
      data: { status: 'FAILED', replyText: e?.message?.slice(0, 500), latencyMs: Date.now() - started },
    })
    throw e
  }
}
