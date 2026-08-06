import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAILS = ['natnael@afribizconnect.com', process.env.ADMIN_EMAIL || '']

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email!)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const [
    totalUsers, totalBusinesses, verifiedBusinesses, pendingVerification,
    totalRfqs, openRfqs, totalMessages, totalOpportunities, activeOpportunities,
    totalLogisticsQuotes, recentUsers, pendingBusinesses
  ] = await Promise.all([
    prisma.user.count(),
    prisma.business.count(),
    prisma.business.count({ where: { verificationStatus: 'VERIFIED' } }),
    prisma.business.count({ where: { verificationStatus: 'PENDING' } }),
    prisma.rFQ.count(),
    prisma.rFQ.count({ where: { status: 'OPEN' } }),
    prisma.message.count(),
    prisma.investmentOpportunity.count(),
    prisma.investmentOpportunity.count({ where: { isActive: true } }),
    prisma.logisticsQuote.count(),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 10, include: { business: { select: { name: true, type: true, verificationStatus: true, trustScore: true } } } }),
    prisma.business.findMany({ where: { verificationStatus: 'UNVERIFIED' }, orderBy: { createdAt: 'desc' }, take: 20, include: { user: { select: { email: true, name: true } } } }),
  ])

  return NextResponse.json({
    stats: { totalUsers, totalBusinesses, verifiedBusinesses, pendingVerification, totalRfqs, openRfqs, totalMessages, totalOpportunities, activeOpportunities, totalLogisticsQuotes },
    recentUsers,
    pendingBusinesses,
  })
}
