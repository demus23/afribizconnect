import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: { businesses: { take: 1 } }
    })
    if (!dbUser?.businesses?.[0]) return NextResponse.json({ shipments: [], quotes: [] })

    const [shipments, quotes] = await Promise.all([
      prisma.shipment.findMany({
        where: { businessId: dbUser.businesses[0].id },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      prisma.logisticsQuote.findMany({
        where: { requesterId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: {
          provider: { select: { name: true, country: true, trustScore: true } }
        }
      })
    ])

    return NextResponse.json({ shipments, quotes })
  } catch (error) {
    console.error('Shipments GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { type, origin, destination, cargoType, weight, volume, notes } = body

    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: { businesses: { take: 1 } }
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          supabaseId: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || 'User',
        },
        include: { businesses: { take: 1 } }
      }) as any
    }

    // If user has no business, create a placeholder
    let business = (dbUser as any).businesses?.[0]
    if (!business) {
      business = await prisma.business.create({
        data: {
          userId: dbUser!.id,
          name: user.user_metadata?.full_name || 'My Business',
          slug: `user-${dbUser!.id.slice(0,8)}`,
          type: 'IMPORTER',
          country: 'NG',
          trustScore: 0,
          verificationStatus: 'UNVERIFIED',
          paymentTerms: [],
          targetMarkets: [],
          categories: [],
          certifications: [],
        }
      })
    }

    // Create quote request — simulate getting quotes from logistics providers
    const providers = await prisma.business.findMany({
      where: { type: 'LOGISTICS_PROVIDER', verificationStatus: 'VERIFIED' },
      take: 3,
    })

    const quoteRequests = []
    for (const provider of providers) {
      const basePrice = type === 'air' ? 1200 : type === 'sea_fcl' ? 2800 : 850
      const variation  = 0.8 + Math.random() * 0.4
      quoteRequests.push(
        prisma.logisticsQuote.create({
          data: {
            requesterId:  dbUser!.id,
            providerId:   provider.id,
            origin:       origin || '',
            destination:  destination || '',
            cargoType:    cargoType || '',
            weight:       weight ? parseFloat(weight) : null,
            volume:       volume ? parseFloat(volume) : null,
            price:        parseFloat((basePrice * variation).toFixed(0)),
            currency:     'USD',
            transitDays:  type === 'air' ? Math.floor(3 + Math.random()*4) : type === 'sea_fcl' ? Math.floor(18 + Math.random()*14) : Math.floor(5 + Math.random()*7),
            validUntil:   new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            notes:        notes || '',
            status:       'QUOTED',
          }
        })
      )
    }

    const quotes = await Promise.all(quoteRequests)
    return NextResponse.json({ quotes, message: `${quotes.length} quotes received` })
  } catch (error) {
    console.error('Shipments POST error:', error)
    return NextResponse.json({ error: 'Failed to request quotes' }, { status: 500 })
  }
}
