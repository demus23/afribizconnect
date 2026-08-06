import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' })

const PLANS: Record<string, { priceId: string }> = {
  starter: { priceId: process.env.STRIPE_STARTER_PRICE_ID! },
  growth:  { priceId: process.env.STRIPE_GROWTH_PRICE_ID!  },
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { plan } = await request.json()
    if (!PLANS[plan]) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: { subscription: true }
    })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    let customerId = dbUser.subscription?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name:  dbUser.name || undefined,
        metadata: { userId: dbUser.id },
      })
      customerId = customer.id

      // Create a placeholder subscription row so we have somewhere to store the customer id
      await prisma.subscription.upsert({
        where:  { userId: dbUser.id },
        create: { userId: dbUser.id, stripeCustomerId: customerId, tier: 'FREE' },
        update: { stripeCustomerId: customerId },
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: PLANS[plan].priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?tab=billing&success=1`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/settings?tab=billing`,
      metadata: { userId: dbUser.id, plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 })
  }
}