import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: { subscription: true }
  })

  const apiKey = `afc_live_${dbUser?.id.replace(/-/g,'').slice(0,32)}`

  return NextResponse.json({
    apiKey,
    plan: (dbUser?.subscription as any)?.tier || 'FREE',
    endpoints: [
      { method:'GET', path:'/v1/suppliers',      desc:'List verified suppliers', auth:true },
      { method:'GET', path:'/v1/opportunities',  desc:'List investment deals',   auth:true },
      { method:'GET', path:'/v1/rates',          desc:'Live FX rates',           auth:false },
      { method:'GET', path:'/v1/commodities',    desc:'Commodity prices',        auth:false },
      { method:'POST',path:'/v1/rfqs',           desc:'Post an RFQ',            auth:true },
      { method:'GET', path:'/v1/intelligence',   desc:'Trade flow data',         auth:true },
    ],
    limits: { FREE:{ calls:'100/day', rate:'10/min' }, STARTER:{ calls:'5,000/day', rate:'100/min' }, GROWTH:{ calls:'50,000/day', rate:'1,000/min' } },
    docs: `${process.env.NEXT_PUBLIC_APP_URL}/docs`,
  })
}
