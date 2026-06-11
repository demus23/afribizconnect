import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: {
  business: {
    include: { asSupplier: true }
  }
}
    })

    return NextResponse.json({
      user: dbUser,
      business: dbUser?.business || null,
      email: user.email,
      name: user.user_metadata?.full_name || '',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { section, data } = body // section: 'profile' | 'business'

    let dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: { supabaseId: user.id, email: user.email || '', name: user.user_metadata?.full_name || '' }
      })
    }

    if (section === 'profile') {
      await prisma.user.update({
        where: { id: dbUser.id },
       data: {
  name: data.name || dbUser.name,
}
      })
      // Also update Supabase auth metadata
      await supabase.auth.updateUser({ data: { full_name: data.name } })
      return NextResponse.json({ success: true, message: 'Profile saved' })
    }

    if (section === 'business') {
      const existing = await prisma.business.findFirst({ where: { userId: dbUser.id } })

      const bizData = {
        name:          data.businessName || 'My Business',
        type:          data.businessType || 'IMPORTER',
        country:       data.country      || 'NG',
        city:          data.city         || '',
        description:   data.description  || '',
        annualRevenue: data.annualRevenue || '',
        employeeCount: data.employeeCount || '',
        websiteUrl:    data.websiteUrl    || '',
        paymentTerms:  data.paymentTerms  || [],
        targetMarkets: data.targetMarkets || [],
        categories:    data.categories    || [],
        certifications:data.certifications|| [],
      }

      if (existing) {
        await prisma.business.update({ where: { id: existing.id }, data: bizData })
      } else {
        const slug = (data.businessName || 'business').toLowerCase().replace(/[^a-z0-9]/g,'-') + '-' + dbUser.id.slice(0,6)
        await prisma.business.create({
          data: { ...bizData, userId: dbUser.id, slug, trustScore: 10, verificationStatus: 'UNVERIFIED' }
        })
      }
      return NextResponse.json({ success: true, message: 'Business profile saved' })
    }

    return NextResponse.json({ error: 'Unknown section' }, { status: 400 })
  } catch (error) {
    console.error('Profile save error:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
