import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search   = searchParams.get('search') || ''
  const country  = searchParams.get('country') || ''
  const category = searchParams.get('category') || ''
  const type     = searchParams.get('type') || 'SUPPLIER'
  const page     = parseInt(searchParams.get('page') || '1')
  const limit    = parseInt(searchParams.get('limit') || '12')
  const sort     = searchParams.get('sort') || 'trustScore'

  try {
    const where: any = {
      verificationStatus: 'VERIFIED',
      type: type as any,
    }

    if (country) where.country = country
    if (category) where.categories = { has: category }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { categories: { has: search } },
      ]
    }

    const orderBy: any = sort === 'trustScore'
      ? { trustScore: 'desc' }
      : sort === 'name'
      ? { name: 'asc' }
      : { createdAt: 'desc' }

    const [businesses, total] = await Promise.all([
      prisma.business.findMany({
        where,
        include: {
          asSupplier: true,
          user: { select: { avatarUrl: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.business.count({ where }),
    ])

    return NextResponse.json({
      businesses,
      total,
      page,
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Suppliers API error:', error)
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 })
  }
}
