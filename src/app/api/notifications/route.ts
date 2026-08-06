import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Store push subscriptions in Supabase storage (simple approach)
export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { subscription, type } = await request.json()

    if (type === 'subscribe') {
      // Store subscription object for this user
      await supabase.storage.from('documents').upload(
        `push-subs/${user.id}.json`,
        JSON.stringify(subscription),
        { upsert: true, contentType: 'application/json' }
      )
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
