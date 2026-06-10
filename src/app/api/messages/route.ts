import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const conversationWith = searchParams.get('with')

  try {
    let dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } })
    if (!dbUser) return NextResponse.json({ messages: [], conversations: [] })

    if (conversationWith) {
      // Get messages between two users
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: dbUser.id, receiverId: conversationWith },
            { senderId: conversationWith, receiverId: dbUser.id },
          ]
        },
        include: {
          sender: { select: { id: true, name: true, avatarUrl: true } },
        },
        orderBy: { createdAt: 'asc' }
      })
      return NextResponse.json({ messages })
    }

    // Get all conversations (unique people messaged)
    const sent = await prisma.message.findMany({
      where: { senderId: dbUser.id },
      include: {
        receiver: { select: { id: true, name: true, avatarUrl: true, businesses: { select: { name: true, country: true, trustScore: true }, take: 1 } } },
      },
      orderBy: { createdAt: 'desc' },
      distinct: ['receiverId'],
      take: 20,
    })

    const received = await prisma.message.findMany({
      where: { receiverId: dbUser.id },
      include: {
        sender: { select: { id: true, name: true, avatarUrl: true, businesses: { select: { name: true, country: true, trustScore: true }, take: 1 } } },
      },
      orderBy: { createdAt: 'desc' },
      distinct: ['senderId'],
      take: 20,
    })

    // Get latest message for each conversation
    const conversations = new Map()
    for (const m of [...sent, ...received]) {
      const other = m.receiver || m.sender
      if (!other || other.id === dbUser.id) continue
      if (!conversations.has(other.id)) {
        conversations.set(other.id, {
          user: other,
          lastMessage: m.content,
          lastTime: m.createdAt,
          unread: !m.readAt && m.senderId !== dbUser.id,
        })
      }
    }

    return NextResponse.json({
      conversations: Array.from(conversations.values()),
      userId: dbUser.id
    })
  } catch (error) {
    console.error('Messages GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { receiverId, content } = body

    if (!receiverId || !content?.trim()) {
      return NextResponse.json({ error: 'Receiver and content required' }, { status: 400 })
    }

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

    const message = await prisma.message.create({
      data: {
        senderId: dbUser.id,
        receiverId,
        content: content.trim(),
      },
      include: {
        sender: { select: { id: true, name: true, avatarUrl: true } },
      }
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Messages POST error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
