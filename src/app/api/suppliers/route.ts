import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search   = searchParams.get('search')   || ''
  const country  = searchParams.get('country')  || ''
  const category = searchParams.get('category') || ''
  const type     = searchParams.get('type')      || ''
  const sort     = searchParams.get('sort')      || 'trustScore'
  const page     = parseInt(searchParams.get('page') || '1')
  const limit    = parseInt(searchParams.get('limit') || '20')
  const skip     = (page - 1) * limit

  try {
    // Build where clause — show SUPPLIER and LOGISTICS_PROVIDER and DISTRIBUTOR types
    const where: any = {
      verificationStatus: 'VERIFIED',
      NOT: { type: { in: ['INVESTOR', 'PRIVATE_EQUITY', 'IMPORTER'] } },
    }

    if (country)  where.country  = country
    if (type)     where.type     = type
    if (search) {
      where.OR = [
        { name:        { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city:        { contains: search, mode: 'insensitive' } },
        { categories:  { has: search } },
      ]
    }
    if (category && category !== 'All') {
      where.categories = { has: category }
    }

    const orderBy: any =
      sort === 'trustScore' ? { trustScore: 'desc' }
      : sort === 'name'     ? { name: 'asc' }
      : sort === 'newest'   ? { createdAt: 'desc' }
      : { trustScore: 'desc' }

    const [businesses, total] = await Promise.all([
      prisma.business.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          asSupplier: true,
        },
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
