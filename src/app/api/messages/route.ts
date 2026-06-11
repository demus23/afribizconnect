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
    if (!dbUser) return NextResponse.json({ messages: [], conversations: [], userId: null })

    if (conversationWith) {
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

    // Get sent messages — include receiver
    const sent = await prisma.message.findMany({
      where: { senderId: dbUser.id },
      include: {
        receiver: {
          select: {
            id: true, name: true, avatarUrl: true,
            business: { select: { name: true, country: true, trustScore: true } }
          }
        },
      },
      orderBy: { createdAt: 'desc' },
      distinct: ['receiverId'],
      take: 20,
    })

    // Get received messages — include sender
    const received = await prisma.message.findMany({
      where: { receiverId: dbUser.id },
      include: {
        sender: {
          select: {
            id: true, name: true, avatarUrl: true,
            business: { select: { name: true, country: true, trustScore: true } }
          }
        },
      },
      orderBy: { createdAt: 'desc' },
      distinct: ['senderId'],
      take: 20,
    })

    // Build conversation map
    const conversations = new Map<string, any>()

    for (const m of sent) {
      const other = m.receiver
      if (!other || other.id === dbUser.id) continue
      if (!conversations.has(other.id)) {
        conversations.set(other.id, {
          user: other,
          lastMessage: m.content,
          lastTime: m.createdAt,
          unread: false,
        })
      }
    }

    for (const m of received) {
      const other = m.sender
      if (!other || other.id === dbUser.id) continue
      if (!conversations.has(other.id)) {
        conversations.set(other.id, {
          user: other,
          lastMessage: m.content,
          lastTime: m.createdAt,
          unread: !m.readAt,
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