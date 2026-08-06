import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendSubscriptionEmail } from '@/lib/email/sender'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' })

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig  = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId  = session.metadata?.userId
        const plan    = session.metadata?.plan
        if (!userId || !plan) break

        await prisma.subscription.upsert({
          where:  { userId },
          create: {
            userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            tier: plan.toUpperCase() as any,
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30*24*60*60*1000),
          },
          update: {
            stripeSubscriptionId: session.subscription as string,
            tier: plan.toUpperCase() as any,
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30*24*60*60*1000),
          },
        })

        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (user) await sendSubscriptionEmail(user.email, user.name || 'there', plan)
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const existing = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: sub.id }
        })
        if (existing) {
          await prisma.subscription.update({
            where: { id: existing.id },
            data: { status: 'cancelled', tier: 'FREE' as any }
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const custId  = invoice.customer as string
        const existing = await prisma.subscription.findFirst({
          where: { stripeCustomerId: custId }
        })
        if (existing) {
          await prisma.subscription.update({
            where: { id: existing.id },
            data: { status: 'past_due' }
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}