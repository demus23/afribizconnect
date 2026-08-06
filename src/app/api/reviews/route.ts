import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

// We store reviews in LogisticsQuote.notes as JSON for now (no schema change needed)
// Format: REVIEW::{json}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('businessId')
  if (!businessId) return NextResponse.json({ reviews: [] })

  try {
    // Pull reviews stored in notes field
    const quotes = await prisma.logisticsQuote.findMany({
      where: { businessId, notes: { startsWith: 'REVIEW::' } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    const reviews = quotes.map(q => {
      try { return JSON.parse(q.notes!.replace('REVIEW::', '')) } catch { return null }
    }).filter(Boolean)

    const avgRating = reviews.length ? reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length : 0

    return NextResponse.json({ reviews, avgRating: Math.round(avgRating * 10) / 10, total: reviews.length })
  } catch (error) {
    return NextResponse.json({ reviews: [], avgRating: 0, total: 0 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { businessId, rating, title, body, tradeType } = await request.json()
    if (!businessId || !rating || !body) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const reviewData = JSON.stringify({
      id: Date.now().toString(),
      reviewerId: dbUser.id,
      reviewerName: dbUser.name || 'Verified buyer',
      businessId, rating, title, body, tradeType,
      date: new Date().toISOString(),
    })

    // Store review as a special LogisticsQuote record
    await prisma.logisticsQuote.create({
      data: {
        businessId,
        origin: 'REVIEW',
        destination: 'REVIEW',
        cargoType: 'REVIEW',
        weight: 0,
        incoterms: 'REVIEW',
        requestedDate: new Date(),
        notes: `REVIEW::${reviewData}`,
        status: 'REVIEW',
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Review error:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
