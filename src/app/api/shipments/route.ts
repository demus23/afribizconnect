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

    let business = (dbUser as any).business
    if (!business) {
      business = await prisma.business.create({
        data: {
          userId: dbUser!.id,
          name: user.user_metadata?.full_name || 'My Business',
          slug: `user-${dbUser!.id.slice(0, 8)}-${Date.now()}`,
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

    // Create quote requests for each verified logistics provider
    const providers = await prisma.business.findMany({
      where: { type: 'LOGISTICS_PROVIDER', verificationStatus: 'VERIFIED' },
      take: 3,
    })

    const quotes = []
    for (const provider of providers) {
      const basePrice = type === 'air' ? 1200 : type === 'sea_fcl' ? 2800 : 850
      const price = Math.round(basePrice * (0.8 + Math.random() * 0.4))
      const transitDays = type === 'air'
        ? Math.floor(3 + Math.random() * 4)
        : type === 'sea_fcl'
        ? Math.floor(18 + Math.random() * 14)
        : Math.floor(5 + Math.random() * 7)

      const quote = await prisma.logisticsQuote.create({
        data: {
          businessId: business.id,
          origin: origin || '',
          destination: destination || '',
          cargoType: cargoType || '',
          weight: weight ? parseFloat(weight) : 0,
          volume: volume ? parseFloat(volume) : null,
          incoterms: type === 'air' ? 'DAP' : 'CIF',
          requestedDate: new Date(),
          notes: `Provider: ${provider.name} | Price: $${price} | Transit: ${transitDays} days | ${notes || ''}`,
          status: 'QUOTED',
        }
      })
      quotes.push({ ...quote, provider: { name: provider.name, country: provider.country, trustScore: provider.trustScore }, price, transitDays })
    }

    return NextResponse.json({ quotes, message: `${quotes.length} quotes received` })
  } catch (error) {
    console.error('Shipments POST error:', error)
    return NextResponse.json({ error: 'Failed to request quotes' }, { status: 500 })
  }
}