import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const oppType = searchParams.get('oppType') || ''
  const sector  = searchParams.get('sector')  || ''
  const country = searchParams.get('country') || ''
  const limit   = parseInt(searchParams.get('limit') || '20')

  try {
    const where: any = { isActive: true }
    if (oppType) where.type    = oppType
    if (sector)  where.sector  = { contains: sector,  mode: 'insensitive' }
    if (country) where.country = country

    const opportunities = await prisma.investmentOpportunity.findMany({
      where,
      include: { business: { select: { name: true, trustScore: true, verificationStatus: true } } },
      orderBy: [{ viewCount: 'desc' }, { targetAmount: 'desc' }],
      take: limit,
    })

    return NextResponse.json({ opportunities, total: opportunities.length })
  } catch (error) {
    console.error('Opportunities API error:', error)
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 })
  }
}
