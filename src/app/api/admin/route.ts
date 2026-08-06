import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAILS = ['demus23@gmail.com', 'hello@afribizconnect.com']

async function checkAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email || '')) return null
  return user
}

export async function GET(request: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const action = new URL(request.url).searchParams.get('action')

  try {
    if (action === 'stats') {
      const [users, businesses, pendingKYB, activeDeals, rfqs, messages] = await Promise.all([
        prisma.user.count(),
        prisma.business.count(),
        prisma.business.count({ where: { verificationStatus: 'UNVERIFIED' } }),
        prisma.investmentOpportunity.count({ where: { isActive: true } }),
        prisma.rFQ.count(),
        prisma.message.count(),
      ])
      return NextResponse.json({ users, businesses, pendingKYB, activeDeals, rfqs, messages })
    }

    if (action === 'pending') {
      const businesses = await prisma.business.findMany({
        where: { verificationStatus: { in: ['UNVERIFIED', 'PENDING'] } },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: { user: { select: { email: true, name: true } } }
      })
      return NextResponse.json({ businesses })
    }

    if (action === 'listings') {
      const opportunities = await prisma.investmentOpportunity.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: { business: { select: { name: true, country: true } } }
      })
      return NextResponse.json({ opportunities })
    }

    if (action === 'users') {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: { business: { select: { name: true, trustScore: true, verificationStatus: true } } }
      })
      return NextResponse.json({ users })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    console.error('Admin GET error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { type, id, value } = await request.json()

    if (type === 'verify') {
      await prisma.business.update({
        where: { id },
        data: {
          verificationStatus: value,
          verifiedAt: value === 'VERIFIED' ? new Date() : null,
          trustScore: value === 'VERIFIED' ? 85 : 10,
        }
      })

      // Send verification email
      if (value === 'VERIFIED') {
        const biz = await prisma.business.findUnique({
          where: { id },
          include: { user: { select: { email: true, name: true } } }
        })
        if (biz?.user?.email) {
          await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'welcome',
              to: biz.user.email,
              name: biz.user.name || 'there',
            })
          })
        }
      }
      return NextResponse.json({ success: true })
    }

    if (type === 'activate_listing') {
      await prisma.investmentOpportunity.update({
        where: { id },
        data: { isActive: value }
      })
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  } catch (error) {
    console.error('Admin POST error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
