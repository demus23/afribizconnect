import { NextResponse } from 'next/server'

// Check real market prices against saved alerts
// Called by the alerts page to get current prices
export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/market-rates`)
    if (!res.ok) throw new Error('Failed to fetch rates')
    const data = await res.json()

    // Build a flat price map for alert checking
    const prices: Record<string, number> = {}

    for (const fx of (data.fx || [])) {
      prices[fx.code.toLowerCase()] = parseFloat(fx.rate)
    }
    for (const c of (data.commodities || [])) {
      prices[c.id] = parseFloat(c.rate)
    }

    return NextResponse.json({ prices, updatedAt: data.updatedAt, live: data.live })
  } catch (error) {
    return NextResponse.json({ prices: {}, live: false })
  }
}
