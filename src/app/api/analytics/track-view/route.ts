import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { businessId } = await request.json()
    if (!businessId) return NextResponse.json({ ok: false })

    // Increment view count on SupplierProfile
    await prisma.supplierProfile.updateMany({
      where: { businessId },
      data: { viewCount: { increment: 1 } }
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
