import { NextResponse } from 'next/server'

// Cache rates for 5 minutes to avoid hitting API limits
let cache: { data: any; timestamp: number } | null = null
const CACHE_DURATION = 5 * 60 * 1000

const AFRICAN_CURRENCIES = ['NGN','KES','GHS','ZAR','EGP','ETB','TZS','UGX','XOF','MAD','DZD','AED','TND','GNF','MZN','ZMW','RWF','AOA','MUR','BWP']

const COMMODITY_SYMBOLS: Record<string,{label:string,unit:string,flag:string}> = {
  XAU: { label:'Gold',       unit:'/oz',    flag:'🥇' },
  XAG: { label:'Silver',     unit:'/oz',    flag:'⬜' },
  BRENT:{ label:'Crude Oil', unit:'/bbl',   flag:'🛢️' },
  COCOA:{ label:'Cocoa',     unit:'/tonne', flag:'🇬🇭' },
  COFFEE:{ label:'Coffee',   unit:'/lb',    flag:'🇪🇹' },
  COTTON:{ label:'Cotton',   unit:'/lb',    flag:'🌾' },
  WHEAT: { label:'Wheat',    unit:'/tonne', flag:'🌾' },
  CORN:  { label:'Corn',     unit:'/tonne', flag:'🌽' },
}

export async function GET() {
  // Return cache if still valid
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data)
  }

  try {
    const OER_KEY  = process.env.OPENEXCHANGERATES_API_KEY
    const COMM_KEY = process.env.COMMODITIES_API_KEY

    let fxRates:   Record<string, number> = {}
    let commRates: Record<string, number> = {}

    // Fetch FX rates
    if (OER_KEY) {
      const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${OER_KEY}&symbols=${AFRICAN_CURRENCIES.join(',')}`, { next: { revalidate: 300 } })
      if (res.ok) {
        const data = await res.json()
        fxRates = data.rates || {}
      }
    }

    // Fetch commodity prices
    if (COMM_KEY) {
      const res = await fetch(`https://commodities-api.com/api/latest?access_key=${COMM_KEY}&symbols=XAU,XAG,COCOA,COFFEE,COTTON,WHEAT,CORN`, { next: { revalidate: 300 } })
      if (res.ok) {
        const data = await res.json()
        commRates = data.data?.rates || {}
      }
    }

    // Build FX table
    const fx = AFRICAN_CURRENCIES.map(code => {
      const rate = fxRates[code]
      return {
        code,
        pair: `USD/${code}`,
        rate: rate ? rate.toFixed(code === 'XOF' || code === 'GNF' ? 1 : code === 'NGN' || code === 'TZS' || code === 'UGX' ? 2 : 4) : null,
        flag: getFlagEmoji(code),
        fullName: getCurrencyName(code),
      }
    }).filter(r => r.rate)

    // Build commodity table
    const commodities = [
      { id:'cocoa',   label:'Cocoa',    unit:'/tonne', flag:'🇬🇭', desc:'Ghana premium grade', rate: commRates['COCOA'] ? (1 / commRates['COCOA'] * 1000).toFixed(0) : null },
      { id:'coffee',  label:'Coffee',   unit:'/lb',    flag:'🇪🇹', desc:'Arabica C',            rate: commRates['COFFEE'] ? (1 / commRates['COFFEE']).toFixed(4) : null },
      { id:'cotton',  label:'Cotton',   unit:'/lb',    flag:'🌾',   desc:'ICE Cotton No.2',     rate: commRates['COTTON'] ? (1 / commRates['COTTON']).toFixed(4) : null },
      { id:'wheat',   label:'Wheat',    unit:'/tonne', flag:'🌾',   desc:'CBOT No.2',           rate: commRates['WHEAT'] ? (1 / commRates['WHEAT'] * 1000).toFixed(0) : null },
      { id:'corn',    label:'Corn',     unit:'/tonne', flag:'🌽',   desc:'CBOT corn',           rate: commRates['CORN'] ? (1 / commRates['CORN'] * 1000).toFixed(0) : null },
      { id:'gold',    label:'Gold',     unit:'/oz',    flag:'🥇',   desc:'COMEX spot',          rate: commRates['XAU'] ? (1 / commRates['XAU']).toFixed(2) : null },
      { id:'silver',  label:'Silver',   unit:'/oz',    flag:'⬜',   desc:'COMEX spot',          rate: commRates['XAG'] ? (1 / commRates['XAG']).toFixed(2) : null },
      // Static fallbacks for items not in API
      { id:'crude',   label:'Crude Oil',unit:'/bbl',   flag:'🛢️',  desc:'Brent crude',         rate: '78.42' },
      { id:'palm',    label:'Palm Oil', unit:'/tonne', flag:'🇲🇾',  desc:'CPO Rotterdam',       rate: '987' },
      { id:'sesame',  label:'Sesame',   unit:'/tonne', flag:'🇪🇹',  desc:'Ethiopian whitish',   rate: '1240' },
      { id:'cashew',  label:'Cashew',   unit:'/tonne', flag:'🇳🇬',  desc:'Grade W320',          rate: '3200' },
      { id:'rubber',  label:'Rubber',   unit:'/tonne', flag:'🇨🇮',  desc:'TSR20',               rate: '1680' },
    ]

    const result = {
      fx,
      commodities,
      updatedAt: new Date().toISOString(),
      live: !!(OER_KEY || COMM_KEY),
    }

    cache = { data: result, timestamp: Date.now() }
    return NextResponse.json(result)

  } catch (error) {
    console.error('Market rates error:', error)
    // Return fallback static data
    return NextResponse.json({
      fx: getFallbackFX(),
      commodities: getFallbackCommodities(),
      updatedAt: new Date().toISOString(),
      live: false,
    })
  }
}

function getFlagEmoji(code: string): string {
  const flags: Record<string,string> = {
    NGN:'🇳🇬', KES:'🇰🇪', GHS:'🇬🇭', ZAR:'🇿🇦', EGP:'🇪🇬', ETB:'🇪🇹',
    TZS:'🇹🇿', UGX:'🇺🇬', XOF:'🇸🇳', MAD:'🇲🇦', DZD:'🇩🇿', AED:'🇦🇪',
    TND:'🇹🇳', GNF:'🇬🇳', MZN:'🇲🇿', ZMW:'🇿🇲', RWF:'🇷🇼', AOA:'🇦🇴',
    MUR:'🇲🇺', BWP:'🇧🇼',
  }
  return flags[code] || '🌍'
}

function getCurrencyName(code: string): string {
  const names: Record<string,string> = {
    NGN:'Nigerian Naira', KES:'Kenyan Shilling', GHS:'Ghanaian Cedi', ZAR:'South African Rand',
    EGP:'Egyptian Pound', ETB:'Ethiopian Birr', TZS:'Tanzanian Shilling', UGX:'Ugandan Shilling',
    XOF:'West African CFA', MAD:'Moroccan Dirham', DZD:'Algerian Dinar', AED:'UAE Dirham',
    TND:'Tunisian Dinar', GNF:'Guinean Franc', MZN:'Mozambican Metical', ZMW:'Zambian Kwacha',
    RWF:'Rwandan Franc', AOA:'Angolan Kwanza', MUR:'Mauritian Rupee', BWP:'Botswanan Pula',
  }
  return names[code] || code
}

function getFallbackFX() {
  return [
    { code:'NGN', pair:'USD/NGN', rate:'1587.40', flag:'🇳🇬', fullName:'Nigerian Naira' },
    { code:'KES', pair:'USD/KES', rate:'129.85',  flag:'🇰🇪', fullName:'Kenyan Shilling' },
    { code:'GHS', pair:'USD/GHS', rate:'15.62',   flag:'🇬🇭', fullName:'Ghanaian Cedi' },
    { code:'ZAR', pair:'USD/ZAR', rate:'18.94',   flag:'🇿🇦', fullName:'South African Rand' },
    { code:'EGP', pair:'USD/EGP', rate:'48.72',   flag:'🇪🇬', fullName:'Egyptian Pound' },
    { code:'ETB', pair:'USD/ETB', rate:'56.30',   flag:'🇪🇹', fullName:'Ethiopian Birr' },
    { code:'MAD', pair:'USD/MAD', rate:'10.04',   flag:'🇲🇦', fullName:'Moroccan Dirham' },
    { code:'AED', pair:'USD/AED', rate:'3.672',   flag:'🇦🇪', fullName:'UAE Dirham' },
  ]
}

function getFallbackCommodities() {
  return [
    { id:'cocoa',  label:'Cocoa',    unit:'/tonne', flag:'🇬🇭', desc:'Ghana premium grade', rate:'6842' },
    { id:'gold',   label:'Gold',     unit:'/oz',    flag:'🥇',  desc:'COMEX spot',          rate:'2381' },
    { id:'crude',  label:'Crude Oil',unit:'/bbl',   flag:'🛢️', desc:'Brent crude',         rate:'78.42' },
    { id:'coffee', label:'Coffee',   unit:'/lb',    flag:'🇪🇹', desc:'Arabica C',           rate:'2.34' },
    { id:'cotton', label:'Cotton',   unit:'/lb',    flag:'🌾',  desc:'ICE Cotton No.2',     rate:'0.847' },
    { id:'wheat',  label:'Wheat',    unit:'/tonne', flag:'🌾',  desc:'CBOT No.2',           rate:'198' },
    { id:'palm',   label:'Palm Oil', unit:'/tonne', flag:'🇲🇾', desc:'CPO Rotterdam',       rate:'987' },
    { id:'sesame', label:'Sesame',   unit:'/tonne', flag:'🇪🇹', desc:'Ethiopian whitish',   rate:'1240' },
    { id:'cashew', label:'Cashew',   unit:'/tonne', flag:'🇳🇬', desc:'Grade W320',          rate:'3200' },
  ]
}
