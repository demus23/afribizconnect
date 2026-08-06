import { NextResponse } from 'next/server'

let newsCache: { data: any; timestamp: number } | null = null
const CACHE_DURATION = 30 * 60 * 1000 // 30 min

const FALLBACK_NEWS = [
  { title:'AfCFTA tariff phase-2 begins — 90% of goods now duty-free between member states', source:'African Union', publishedAt: new Date(Date.now()-2*3600000).toISOString(), tag:'AfCFTA', url:'https://au.int' },
  { title:'Nigeria lifts import restrictions on 43 product categories to ease inflation pressure', source:'Central Bank of Nigeria', publishedAt: new Date(Date.now()-4*3600000).toISOString(), tag:'Nigeria', url:'https://cbn.gov.ng' },
  { title:'Maersk announces new direct service Lagos–Mombasa reducing transit time by 8 days', source:'Maersk', publishedAt: new Date(Date.now()-6*3600000).toISOString(), tag:'Logistics', url:'https://maersk.com' },
  { title:'Kenya shilling hits 3-month high as central bank raises benchmark rates to 13%', source:'Central Bank of Kenya', publishedAt: new Date(Date.now()-8*3600000).toISOString(), tag:'FX', url:'https://centralbank.go.ke' },
  { title:'Ghana cocoa board sets 2025/26 farmgate price at GHS 2,800 per bag', source:'COCOBOD', publishedAt: new Date(Date.now()-12*3600000).toISOString(), tag:'Commodities', url:'https://cocobod.gh' },
  { title:'Ethiopia opens new industrial park for textile exports — 20,000 jobs targeted', source:'Ethiopian Investment Commission', publishedAt: new Date(Date.now()-24*3600000).toISOString(), tag:'Ethiopia', url:'https://investethiopia.gov.et' },
  { title:'African Development Bank commits $2.3B to intra-African trade finance in 2025', source:'AfDB', publishedAt: new Date(Date.now()-36*3600000).toISOString(), tag:'Finance', url:'https://afdb.org' },
  { title:'South Africa removes port congestion surcharge as Durban terminal upgrades complete', source:'Transnet', publishedAt: new Date(Date.now()-48*3600000).toISOString(), tag:'Logistics', url:'https://transnet.net' },
]

export async function GET() {
  if (newsCache && Date.now() - newsCache.timestamp < CACHE_DURATION) {
    return NextResponse.json(newsCache.data)
  }

  const NEWS_KEY = process.env.NEWSAPI_KEY

  if (!NEWS_KEY) {
    return NextResponse.json({ articles: FALLBACK_NEWS, live: false })
  }

  try {
    const queries = [
      'African trade AfCFTA',
      'Nigeria Kenya Ghana import export',
      'Africa logistics shipping freight',
      'African commodities cocoa palm oil',
    ]

    const allArticles: any[] = []

    for (const q of queries) {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=publishedAt&pageSize=5&language=en`,
        { headers: { 'X-Api-Key': NEWS_KEY }, next: { revalidate: 1800 } }
      )
      if (res.ok) {
        const data = await res.json()
        allArticles.push(...(data.articles || []))
      }
    }

    // Deduplicate by title
    const seen = new Set<string>()
    const unique = allArticles.filter(a => {
      if (seen.has(a.title)) return false
      seen.add(a.title)
      return true
    })

    // Tag articles
    const tagged = unique.slice(0, 20).map(a => ({
      title: a.title,
      source: a.source?.name || 'News',
      publishedAt: a.publishedAt,
      url: a.url,
      tag: tagArticle(a.title),
    }))

    const result = { articles: tagged.length > 0 ? tagged : FALLBACK_NEWS, live: true }
    newsCache = { data: result, timestamp: Date.now() }
    return NextResponse.json(result)

  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json({ articles: FALLBACK_NEWS, live: false })
  }
}

function tagArticle(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('afcfta') || t.includes('free trade')) return 'AfCFTA'
  if (t.includes('logistics') || t.includes('shipping') || t.includes('freight') || t.includes('port')) return 'Logistics'
  if (t.includes('cocoa') || t.includes('palm') || t.includes('coffee') || t.includes('commodity')) return 'Commodities'
  if (t.includes('currency') || t.includes('exchange rate') || t.includes('naira') || t.includes('shilling')) return 'FX'
  if (t.includes('nigeria') || t.includes('nigerian')) return 'Nigeria'
  if (t.includes('kenya') || t.includes('kenyan')) return 'Kenya'
  if (t.includes('ghana') || t.includes('ghanaian')) return 'Ghana'
  if (t.includes('ethiopia') || t.includes('ethiopian')) return 'Ethiopia'
  if (t.includes('investment') || t.includes('fund') || t.includes('finance')) return 'Finance'
  return 'Africa'
}
