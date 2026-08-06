import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: { business: true }
    })
    if (!dbUser?.business) return NextResponse.json({ rfqs: [], stats: { total:0, open:0, quotes:0 } })

    const rfqs = await prisma.rFQ.findMany({
      where: { businessId: dbUser.business.id },
      orderBy: { createdAt: 'desc' },
    })

    const open   = rfqs.filter((r:any) => r.status === 'OPEN').length
    const quotes = rfqs.reduce((sum:number, r:any) => sum + (r.responseCount || 0), 0)

    return NextResponse.json({ rfqs, stats: { total: rfqs.length, open, quotes } })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RFQs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { title, description, category, quantity, unit, targetPrice, currency, deliveryCountry, deliveryDate, requirements } = body

    if (!title || !category || !quantity) {
      return NextResponse.json({ error: 'Title, category, and quantity are required' }, { status: 400 })
    }

    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: { business: true }
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: { supabaseId: user.id, email: user.email || '', name: user.user_metadata?.full_name || '' },
        include: { business: true }
      }) as any
    }

    let business = (dbUser as any).business
    if (!business) {
      business = await prisma.business.create({
        data: {
          userId: dbUser!.id,
          name: user.user_metadata?.full_name || 'My Business',
          slug: `biz-${user.id.slice(0,8)}-${Date.now()}`,
          type: 'IMPORTER',
          country: deliveryCountry || 'NG',
          trustScore: 0,
          verificationStatus: 'UNVERIFIED',
          paymentTerms: [], targetMarkets: [], categories: [], certifications: [],
        }
      })
    }

    const rfq = await prisma.rFQ.create({
      data: {
        businessId:      business.id,
        title,
        description:     description || '',
        category,
        quantity:        String(quantity),
        unit:            unit || 'units',
        targetPrice:     targetPrice ? parseFloat(targetPrice) : null,
        currency:        currency || 'USD',
        deliveryCountry: deliveryCountry || 'NG',
        deliveryDate:    deliveryDate ? new Date(deliveryDate) : null,
        requirements:    requirements || [],
        status:          'OPEN',
        expiresAt:       new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      }
    })

    // Trigger matching engine in background (fire and forget)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/rfqs/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rfqId: rfq.id }),
    }).catch(console.error)

    return NextResponse.json({ rfq, message: 'RFQ posted and suppliers are being notified' })
  } catch (error) {
    console.error('RFQ POST error:', error)
    return NextResponse.json({ error: 'Failed to create RFQ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { rfqId, status } = await request.json()
    const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id }, include: { business: true } })
    const rfq = await prisma.rFQ.findFirst({ where: { id: rfqId, businessId: (dbUser as any)?.business?.id } })
    if (!rfq) return NextResponse.json({ error: 'RFQ not found' }, { status: 404 })
    const updated = await prisma.rFQ.update({ where: { id: rfqId }, data: { status } })
    return NextResponse.json({ rfq: updated })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update RFQ' }, { status: 500 })
  }
}
