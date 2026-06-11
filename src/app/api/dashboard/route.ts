import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: { business: { include: { asSupplier: true } } }
    })

    if (!dbUser) {
      return NextResponse.json({
        rfqCount: 0, rfqOpen: 0, messageCount: 0, unreadMessages: 0,
        shipmentCount: 0, trustScore: 0, verificationStatus: 'UNVERIFIED',
        businessName: null, recentActivity: [],
        platformStats: { suppliers: 23, opportunities: 8, countries: 54 }
      })
    }

    const business = dbUser.business

    const [rfqCount, rfqOpen, messageCount, unreadMessages, shipmentCount, recentRfqs, platformCount] = await Promise.all([
      business ? prisma.rFQ.count({ where: { businessId: business.id } }) : Promise.resolve(0),
      business ? prisma.rFQ.count({ where: { businessId: business.id, status: 'OPEN' } }) : Promise.resolve(0),
      prisma.message.count({ where: { OR: [{ senderId: dbUser.id }, { receiverId: dbUser.id }] } }),
      prisma.message.count({ where: { receiverId: dbUser.id, readAt: null } }),
      business ? prisma.shipment.count({ where: { businessId: business.id } }) : Promise.resolve(0),
      business ? prisma.rFQ.findMany({
        where: { businessId: business.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, title: true, status: true, createdAt: true, category: true }
      }) : Promise.resolve([]),
      prisma.business.count({ where: { verificationStatus: 'VERIFIED' } }),
    ])

    const recentActivity = recentRfqs.map((r: any) => ({
      type: 'rfq', text: `RFQ posted: ${r.title}`,
      status: r.status, time: r.createdAt, category: r.category,
    }))

    return NextResponse.json({
      rfqCount, rfqOpen, messageCount, unreadMessages, shipmentCount,
      trustScore: business?.trustScore || 0,
      verificationStatus: business?.verificationStatus || 'UNVERIFIED',
      businessName: business?.name || null,
      recentActivity,
      platformStats: { suppliers: platformCount, opportunities: 8, countries: 54 }
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}