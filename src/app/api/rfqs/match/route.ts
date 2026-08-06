import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendRfqResponseEmail } from '@/lib/email/sender'

export async function POST(request: NextRequest) {
  try {
    const { rfqId } = await request.json()
    if (!rfqId) return NextResponse.json({ error: 'rfqId required' }, { status: 400 })

    const rfq = await prisma.rFQ.findUnique({
      where: { id: rfqId },
      include: { business: { include: { user: true } } }
    })
    if (!rfq) return NextResponse.json({ error: 'RFQ not found' }, { status: 404 })

    // Find matching suppliers by category
    const matchingSuppliers = await prisma.business.findMany({
      where: {
        verificationStatus: 'VERIFIED',
        type: { in: ['SUPPLIER', 'DISTRIBUTOR'] },
        categories: { hasSome: [rfq.category] },
        id: { not: rfq.businessId },
      },
      include: { user: true, asSupplier: true },
      take: 10,
      orderBy: { trustScore: 'desc' },
    })

    // Also match by country if delivery country specified
    const countryMatches = await prisma.business.findMany({
      where: {
        verificationStatus: 'VERIFIED',
        type: { in: ['SUPPLIER', 'DISTRIBUTOR'] },
        targetMarkets: { has: rfq.deliveryCountry },
        id: { notIn: [rfq.businessId, ...matchingSuppliers.map((s:any) => s.id)] },
      },
      include: { user: true, asSupplier: true },
      take: 5,
      orderBy: { trustScore: 'desc' },
    })

    const allMatches = [...matchingSuppliers, ...countryMatches]

    // Send notification emails to matched suppliers
    let emailsSent = 0
    for (const supplier of allMatches.slice(0, 8)) {
      try {
        if (supplier.user?.email) {
          await sendRfqResponseEmail(
            supplier.user.email,
            supplier.user.name || supplier.name,
            rfq.title,
            rfq.business.name
          )
          emailsSent++
        }
      } catch (e) {
        console.error('Email send failed for supplier:', supplier.id, e)
      }
    }

    // Store match records (using notes field on the RFQ as a simple log)
    await prisma.rFQ.update({
      where: { id: rfqId },
      data: { responseCount: allMatches.length }
    })

    return NextResponse.json({
      matched: allMatches.length,
      emailsSent,
      suppliers: allMatches.map((s:any) => ({
        id: s.id,
        name: s.name,
        country: s.country,
        trustScore: s.trustScore,
        categories: s.categories,
        slug: s.slug,
      }))
    })
  } catch (error) {
    console.error('RFQ matching error:', error)
    return NextResponse.json({ error: 'Matching failed' }, { status: 500 })
  }
}
