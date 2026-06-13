import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type    = searchParams.get('type')    || ''
  const country = searchParams.get('country') || ''
  const sector  = searchParams.get('sector')  || ''

  try {
    const where: any = { isActive: true }
    if (type    && type    !== 'all') where.type    = type
    if (country && country !== 'all') where.country = country
    if (sector  && sector  !== 'all') where.sector  = sector

    const opportunities = await prisma.investmentOpportunity.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        business: {
          select: { name: true, country: true, trustScore: true, verificationStatus: true }
        }
      },
      take: 50,
    })

    const total    = opportunities.reduce((sum, o) => sum + (o.targetAmount || 0), 0)
    const avgReturn = opportunities.length > 0
      ? opportunities.reduce((sum, o) => sum + (o.expectedReturn || 0), 0) / opportunities.length
      : 0

    return NextResponse.json({ opportunities, total, avgReturn: Math.round(avgReturn) })
  } catch (error) {
    console.error('Opportunities GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { title, type, sector, country, stage, description, targetAmount, minimumTicket, expectedReturn, timeline, deadline, useOfFunds, highlights } = body

    if (!title || !type || !sector || !country || !targetAmount || !minimumTicket) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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
          slug: `biz-${dbUser!.id.slice(0,8)}-${Date.now()}`,
          type: 'INVESTOR',
          country: 'NG',
          trustScore: 10,
          verificationStatus: 'UNVERIFIED',
          paymentTerms: [], targetMarkets: [], categories: [], certifications: [],
        }
      })
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]/g,'-').slice(0,50) + '-' + Date.now()
    const fullDesc = [description, useOfFunds ? `\n\nUse of funds:\n${useOfFunds}` : '', highlights ? `\n\nKey highlights:\n${highlights}` : ''].join('')

    const opportunity = await prisma.investmentOpportunity.create({
      data: {
        businessId:    business.id,
        title,
        slug,
        type:          type as any,
        sector,
        country,
        stage:         stage || null,
        description:   fullDesc,
        targetAmount:  parseFloat(targetAmount),
        minimumTicket: parseFloat(minimumTicket),
        currency:      'USD',
        expectedReturn:expectedReturn ? parseFloat(expectedReturn) : null,
        timeline:      timeline || null,
        deadline:      deadline ? new Date(deadline) : null,
        isActive:      false,
      }
    })

    return NextResponse.json({ opportunity })
  } catch (error) {
    console.error('Opportunity POST error:', error)
    return NextResponse.json({ error: 'Failed to create opportunity' }, { status: 500 })
  }
}
