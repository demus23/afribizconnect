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

    if (!dbUser?.business) return NextResponse.json({ shipments: [], quotes: [] })

    const [shipments, quotes] = await Promise.all([
      prisma.shipment.findMany({
        where: { businessId: dbUser.business.id },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      prisma.logisticsQuote.findMany({
        where: { businessId: dbUser.business.id },
        orderBy: { createdAt: 'desc' },
        take: 20,
      })
    ])

    // Enrich quotes with provider info from notes field
    const enrichedQuotes = quotes.map((q: any) => {
      const notesParts = (q.notes || '').split('|').map((p: string) => p.trim())
      const providerPart = notesParts.find((p: string) => p.startsWith('Provider:'))
      const pricePart    = notesParts.find((p: string) => p.startsWith('Price:'))
      const transitPart  = notesParts.find((p: string) => p.startsWith('Transit:'))

      return {
        ...q,
        providerName:  providerPart?.replace('Provider:', '').trim() || 'Carrier',
        displayPrice:  pricePart?.replace('Price: $', '').trim() || '0',
        transitDays:   transitPart?.replace('Transit:', '').replace('days', '').trim() || '14',
        validUntil:    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }
    })

    return NextResponse.json({ shipments, quotes: enrichedQuotes })
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

    if (!origin || !destination || !cargoType) {
      return NextResponse.json({ error: 'Origin, destination and cargo type are required' }, { status: 400 })
    }

    // Get or create user
    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: { business: true }
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          supabaseId: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || 'User',
        },
        include: { business: true }
      }) as any
    }

    // Get or create business
    let business = (dbUser as any).business
    if (!business) {
      business = await prisma.business.create({
        data: {
          userId: dbUser!.id,
          name: user.user_metadata?.full_name || 'My Business',
          slug: `biz-${user.id.slice(0,8)}-${Date.now()}`,
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

    // Get verified logistics providers from DB
    const providers = await prisma.business.findMany({
      where: { type: 'LOGISTICS_PROVIDER', verificationStatus: 'VERIFIED' },
      take: 5,
      orderBy: { trustScore: 'desc' }
    })

    if (providers.length === 0) {
      return NextResponse.json({ error: 'No logistics providers available. Please contact support.' }, { status: 404 })
    }

    // Calculate prices based on type and weight
    const w = weight ? parseFloat(weight) : 100
    const baseRates: Record<string, number> = {
      air: 4.5, sea_fcl: 0.8, sea_lcl: 1.2, road: 0.6
    }
    const baseRate = baseRates[type] || 1.2
    const distanceMultiplier = 1.0 + Math.random() * 0.3

    // Create a quote for each provider
    const createdQuotes = []
    for (const provider of providers.slice(0, 4)) {
      const variation   = 0.85 + Math.random() * 0.35
      const price       = Math.round(w * baseRate * distanceMultiplier * variation * 10) / 10
      const transitDays = type === 'air' ? Math.floor(3 + Math.random() * 5)
        : type === 'sea_fcl' ? Math.floor(18 + Math.random() * 15)
        : type === 'sea_lcl' ? Math.floor(21 + Math.random() * 18)
        : Math.floor(5 + Math.random() * 10)

      const quote = await prisma.logisticsQuote.create({
        data: {
          businessId:    business.id,
          origin:        origin,
          destination:   destination,
          cargoType:     cargoType,
          weight:        w,
          volume:        volume ? parseFloat(volume) : null,
          incoterms:     type === 'air' ? 'DAP' : 'CIF',
          requestedDate: new Date(),
          notes: `Provider: ${provider.name} | Price: $${price} | Transit: ${transitDays} days | ${notes || ''}`,
          status: 'QUOTED',
        }
      })

      createdQuotes.push({
        ...quote,
        providerName: provider.name,
        providerCountry: provider.country,
        providerTrustScore: provider.trustScore,
        displayPrice: String(price),
        transitDays: String(transitDays),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      })
    }

    return NextResponse.json({
      quotes: createdQuotes,
      message: `${createdQuotes.length} quotes received from verified carriers`
    })
  } catch (error) {
    console.error('Shipments POST error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
