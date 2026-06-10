import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    // Find the user's business
    const dbUser = await prisma.user.findUnique({
      where: { supabaseId: user.id },
      include: { businesses: { take: 1 } }
    })

    if (!dbUser) return NextResponse.json({ rfqs: [] })

    const rfqs = await prisma.rFQ.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' },
      include: {
        quotes: {
          include: { supplier: { select: { name: true, country: true, trustScore: true } } }
        }
      }
    })

    return NextResponse.json({ rfqs })
  } catch (error) {
    console.error('RFQ GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch RFQs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { title, description, category, targetCountry, quantity, unit, budget, deadline, paymentTerms } = body

    if (!title || !description || !category) {
      return NextResponse.json({ error: 'Title, description and category are required' }, { status: 400 })
    }

    // Find or create DB user
    let dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          supabaseId: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || 'User',
        }
      })
    }

    const rfq = await prisma.rFQ.create({
      data: {
        userId: dbUser.id,
        title,
        description,
        category,
        targetCountry: targetCountry || '',
        quantity: quantity ? parseFloat(quantity) : null,
        unit: unit || '',
        budget: budget ? parseFloat(budget) : null,
        deadline: deadline ? new Date(deadline) : null,
        paymentTerms: paymentTerms || [],
        status: 'OPEN',
      }
    })

    return NextResponse.json({ rfq })
  } catch (error) {
    console.error('RFQ POST error:', error)
    return NextResponse.json({ error: 'Failed to create RFQ' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { id, status } = body

    const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const rfq = await prisma.rFQ.updateMany({
      where: { id, userId: dbUser.id },
      data: { status }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update RFQ' }, { status: 500 })
  }
}
