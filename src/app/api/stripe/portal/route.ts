import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-04-22.dahlia' })

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
    const customerId = (dbUser as any)?.stripeCustomerId
    if (!customerId) return NextResponse.json({ error: 'No billing account found' }, { status: 404 })

    const session = await stripe.billingPortal.sessions.create({
      customer:   customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?tab=billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to open billing portal' }, { status: 500 })
  }
}
