import { prisma } from '@/lib/prisma'
import { runTradeAgent, type ChatTurn } from './run'

/**
 * Runs the agent on one buyer message (or a conversation whose last turn is the
 * buyer's) and logs the request, reply and tool trace in AgentRequest.
 */
export async function handleBuyerMessage(opts: {
  channel: 'whatsapp' | 'test' | 'dashboard'
  buyerPhone?: string
  userEmail?: string
  text: string
  history?: ChatTurn[]
}) {
  const started = Date.now()
  const record = await prisma.agentRequest.create({
    data: { channel: opts.channel, buyerPhone: opts.buyerPhone, userEmail: opts.userEmail, inputText: opts.text },
  })

  try {
    const result = await runTradeAgent(opts.history?.length ? opts.history : opts.text)
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
