import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { sendVerificationEmail } from '@/lib/email/sender'

const ADMIN_EMAILS = ['natnael@afribizconnect.com', process.env.ADMIN_EMAIL || '']

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email!)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { businessId, action, trustScore } = await request.json()

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    include: { user: true }
  })
  if (!business) return NextResponse.json({ error: 'Business not found' }, { status: 404 })

  if (action === 'approve') {
    await prisma.business.update({
      where: { id: businessId },
      data: { verificationStatus: 'VERIFIED', trustScore: trustScore || 75, verifiedAt: new Date() }
    })
    await sendVerificationEmail(business.user.email, business.user.name || 'there', business.name, trustScore || 75)
    return NextResponse.json({ success: true, message: 'Business verified and email sent' })
  }

  if (action === 'reject') {
    await prisma.business.update({ where: { id: businessId }, data: { verificationStatus: 'REJECTED' as any } })
    return NextResponse.json({ success: true, message: 'Business rejected' })
  }

  if (action === 'activate_opportunity') {
    await prisma.investmentOpportunity.update({ where: { id: businessId }, data: { isActive: true } })
    return NextResponse.json({ success: true, message: 'Opportunity activated' })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
