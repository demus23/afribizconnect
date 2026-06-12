import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
    if (!dbUser) return NextResponse.json({ connections: [], userId: null })

    // Get all users this person has messaged (proxy for connections until Connection table added)
    const messaged = await prisma.message.findMany({
      where: { OR: [{ senderId: dbUser.id }, { receiverId: dbUser.id }] },
      select: { senderId: true, receiverId: true },
      distinct: ['senderId', 'receiverId'],
    })

    const connectedIds = new Set<string>()
    for (const m of messaged) {
      if (m.senderId !== dbUser.id) connectedIds.add(m.senderId)
      if (m.receiverId !== dbUser.id) connectedIds.add(m.receiverId)
    }

    const connections = connectedIds.size > 0
      ? await prisma.user.findMany({
          where: { id: { in: Array.from(connectedIds) } },
          include: { business: { select: { name: true, type: true, country: true, trustScore: true, verificationStatus: true, asSupplier: true } } },
          take: 20,
        })
      : []

    return NextResponse.json({ connections, userId: dbUser.id })
  } catch (error) {
    console.error('Connections GET error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { targetUserId, message: msgContent } = await request.json()

    let dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Send a connection message
    const msg = await prisma.message.create({
      data: {
        senderId:   dbUser.id,
        receiverId: targetUserId,
        content:    msgContent || `Hi, I'd like to connect with you on AfriBizConnect.`,
      }
    })

    return NextResponse.json({ success: true, message: msg })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
