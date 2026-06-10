import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    let dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: {
        businesses: {
          take: 1,
          include: { asSupplier: true }
        }
      }
    })

    if (!dbUser) {
      // New user — return empty stats
      return NextResponse.json({
        rfqCount: 0, rfqOpen: 0,
        messageCount: 0, unreadMessages: 0,
        shipmentCount: 0,
        trustScore: 0,
        verificationStatus: 'UNVERIFIED',
        businessName: null,
        recentActivity: [],
        platformStats: { suppliers: 23, opportunities: 8, countries: 54 }
      })
    }

    const business = dbUser.businesses[0]

    // Parallel DB queries
    const [rfqCount, rfqOpen, messageCount, unreadMessages, shipmentCount, recentRfqs] = await Promise.all([
      prisma.rFQ.count({ where: { userId: dbUser.id } }),
      prisma.rFQ.count({ where: { userId: dbUser.id, status: 'OPEN' } }),
      prisma.message.count({ where: { OR: [{ senderId: dbUser.id }, { receiverId: dbUser.id }] } }),
      prisma.message.count({ where: { receiverId: dbUser.id, readAt: null } }),
      business ? prisma.shipment.count({ where: { businessId: business.id } }) : Promise.resolve(0),
      prisma.rFQ.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, title: true, status: true, createdAt: true, category: true }
      }),
    ])

    const platformStats = await prisma.business.count({ where: { verificationStatus: 'VERIFIED' } })

    // Build activity feed
    const recentActivity = recentRfqs.map(r => ({
      type: 'rfq',
      text: `RFQ posted: ${r.title}`,
      status: r.status,
      time: r.createdAt,
      category: r.category,
    }))

    return NextResponse.json({
      rfqCount,
      rfqOpen,
      messageCount,
      unreadMessages,
      shipmentCount,
      trustScore: business?.trustScore || 0,
      verificationStatus: business?.verificationStatus || 'UNVERIFIED',
      businessName: business?.name || null,
      recentActivity,
      platformStats: {
        suppliers: platformStats,
        opportunities: 8,
        countries: 54,
      }
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
