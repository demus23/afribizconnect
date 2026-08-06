import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
  if (!dbUser) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Generate referral code from user id
  const code = `AFC-${dbUser.id.slice(0, 8).toUpperCase()}`
  const referralUrl = `${process.env.NEXT_PUBLIC_APP_URL}/register?ref=${code}`

  // Count referrals (users who registered with this code stored in their name field as a hack)
  const referrals = await prisma.user.count({
    where: { name: { contains: `REF:${code}` } }
  })

  return NextResponse.json({
    code,
    referralUrl,
    referrals,
    creditsEarned: referrals * 30, // 30 days free pro per referral
    rewards: [
      { count: 1,  reward: '1 month free Starter ($49 value)' },
      { count: 3,  reward: '3 months free Growth ($447 value)' },
      { count: 10, reward: 'Lifetime Starter + featured listing' },
    ]
  })
}
