import { prisma } from '@/lib/prisma'
import { DEMO_DATA, DESTINATIONS, INSURANCE_RATE, resolveCountry, usdTo, type ShippingMode } from './rates'

/** Tool schemas sent to Claude. Implementations are in `runTool` below. */
export const TOOL_DEFINITIONS = [
  {
    name: 'search_catalog',
    description:
      'Search suppliers\' price lists for products matching the buyer\'s request. ' +
      'Returns catalog items with supplier name, trust score, unit price (USD), MOQ and weight. ' +
      'Use broad keywords in ONE call; only search again if it returns zero results.',
    input_schema: {
      type: 'object',
      properties: {
        keywords: { type: 'array', items: { type: 'string' }, description: 'English product keywords, e.g. ["solar", "lantern"]' },
        category: { type: 'string', description: 'Optional category, e.g. Electronics, Solar, Food, Textiles, Auto Parts' },
        quantity: { type: 'integer', description: 'Requested quantity, used to drop items whose MOQ is higher' },
      },
      required: ['keywords'],
    },
  },
  {
    name: 'calculate_landed_cost',
    description:
      'Compute the estimated landed cost of one catalog item delivered from Dubai to the buyer\'s country: ' +
      'goods + freight + insurance + duty + taxes + levies, in USD and local currency, with transit time. ' +
      'Always use this tool for prices — never calculate them yourself.',
    input_schema: {
      type: 'object',
      properties: {
        catalog_item_id: { type: 'string' },
        quantity: { type: 'integer' },
        destination_country: { type: 'string', description: 'ISO code or name: KE, UG, TZ, ET, NG, GH' },
        shipping_mode: { type: 'string', enum: ['air', 'sea'] },
      },
      required: ['catalog_item_id', 'quantity', 'destination_country', 'shipping_mode'],
    },
  },
  {
    name: 'get_duty_rates',
    description:
      'Look up the import duty, taxes and levies AfriBizConnect uses for a destination country and product category. ' +
      'Use this to answer general duty questions — never quote duty rates from memory.',
    input_schema: {
      type: 'object',
      properties: {
        destination_country: { type: 'string', description: 'ISO code or name: KE, UG, TZ, ET, NG, GH' },
        category: { type: 'string', description: 'Optional, e.g. Electronics, Solar, Food, Textiles, Auto Parts' },
      },
      required: ['destination_country'],
    },
  },
  {
    name: 'submit_reply',
    description:
      'Finish the task. Call exactly once, last. QUOTED = up to 3 ranked options; ' +
      'NEEDS_INFO = one short question when product, quantity or destination country is missing; ' +
      'ANSWERED = a general trade question answered (no options); NO_MATCH = nothing suitable in the catalog.',
    input_schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['QUOTED', 'NEEDS_INFO', 'ANSWERED', 'NO_MATCH'] },
        reply_text: { type: 'string', description: 'The WhatsApp message to the buyer, in the buyer\'s language' },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'integer' },
              catalog_item_id: { type: 'string' },
              supplier: { type: 'string' },
              quantity: { type: 'integer' },
              shipping_mode: { type: 'string' },
              landed_total_usd: { type: 'number' },
              reason: { type: 'string' },
            },
            required: ['rank', 'catalog_item_id', 'supplier', 'landed_total_usd', 'reason'],
          },
        },
      },
      required: ['status', 'reply_text'],
    },
  },
] as const

type Json = Record<string, any>

type CatalogRow = {
  id: string; name: string; category: string; unitPriceUsd: number; unit: string; moq: number
  weightKgPerUnit: number; leadTimeDays: number | null; inStockDubai: boolean
  business: { name: string; city: string | null; country: string; trustScore: number; verificationStatus: string }
}

export async function runTool(name: string, input: Json): Promise<Json> {
  switch (name) {
    case 'search_catalog':
      return searchCatalog(input)
    case 'calculate_landed_cost':
      return calculateLandedCost(input)
    case 'get_duty_rates':
      return getDutyRates(input)
    default:
      return { error: `Unknown tool ${name}` }
  }
}

async function searchCatalog({ keywords = [], category, quantity }: Json) {
  const words: string[] = (keywords as string[]).map(k => k.toLowerCase().trim()).filter(Boolean)
  const items = (await prisma.catalogItem.findMany({
    where: {
      isActive: true,
      ...(category ? { category: { equals: category, mode: 'insensitive' } } : {}),
      ...(words.length
        ? {
            OR: [
              { keywords: { hasSome: words } },
              ...words.map(w => ({ name: { contains: w, mode: 'insensitive' as const } })),
            ],
          }
        : {}),
    },
    include: { business: { select: { name: true, city: true, country: true, trustScore: true, verificationStatus: true } } },
    take: 25,
  })) as CatalogRow[]

  const results = items
    .filter(i => !quantity || i.moq <= quantity)
    .sort((a, b) => b.business.trustScore - a.business.trustScore)
    .slice(0, 8)
    .map(i => ({
      catalog_item_id: i.id,
      product: i.name,
      category: i.category,
      unit_price_usd: i.unitPriceUsd,
      unit: i.unit,
      moq: i.moq,
      weight_kg_per_unit: i.weightKgPerUnit,
      lead_time_days: i.leadTimeDays,
      in_stock_dubai: i.inStockDubai,
      supplier: i.business.name,
      supplier_city: i.business.city,
      supplier_verified: !DEMO_DATA && i.business.verificationStatus === 'VERIFIED',
      demo_listing: DEMO_DATA,
      supplier_trust_score: i.business.trustScore,
    }))

  const droppedForMoq = items.filter(i => quantity && i.moq > quantity).length
  return {
    count: results.length,
    results,
    dropped_for_moq: droppedForMoq,
    ...(DEMO_DATA ? { data_note: 'DEMO price lists: suppliers are not independently verified and prices are illustrative.' } : {}),
  }
}

async function calculateLandedCost({ catalog_item_id, quantity, destination_country, shipping_mode }: Json) {
  const code = resolveCountry(String(destination_country))
  if (!code) return { error: `Destination "${destination_country}" not supported yet. Supported: ${Object.keys(DESTINATIONS).join(', ')}` }
  const dest = DESTINATIONS[code]
  const mode: ShippingMode = shipping_mode === 'sea' ? 'sea' : 'air'

  const item = await prisma.catalogItem.findUnique({ where: { id: String(catalog_item_id) }, include: { business: { select: { name: true } } } })
  if (!item) return { error: 'Catalog item not found' }

  const qty = Math.max(1, Math.floor(Number(quantity)))
  if (qty < item.moq) return { error: `Quantity ${qty} is below MOQ ${item.moq}` }

  const r2 = (n: number) => Math.round(n * 100) / 100
  const goods = item.unitPriceUsd * qty
  const weightKg = item.weightKgPerUnit * qty
  const freight = Math.max(dest.freightMinUsd[mode], weightKg * dest.freightUsdPerKg[mode])
  const insurance = goods * INSURANCE_RATE
  const cif = goods + freight + insurance
  const dutyRate = dest.duty[item.category] ?? dest.duty.default
  const duty = cif * dutyRate
  const levies = dest.leviesOnCif.map(l => ({ label: l.label, usd: r2(cif * l.rate) }))
  const taxes = dest.taxesOnDutiable.map(t => ({ label: t.label, usd: r2((cif + duty) * t.rate) }))
  const total = cif + duty + levies.reduce((s, l) => s + l.usd, 0) + taxes.reduce((s, t) => s + t.usd, 0)
  const fx = await usdTo(dest.currency)

  return {
    product: item.name,
    supplier: item.business.name,
    quantity: qty,
    destination: dest.name,
    shipping_mode: mode,
    transit_days: dest.transitDays[mode],
    breakdown_usd: {
      goods: r2(goods),
      freight: r2(freight),
      insurance: r2(insurance),
      duty: r2(duty),
      duty_rate: dutyRate,
      levies,
      taxes,
    },
    landed_total_usd: r2(total),
    landed_per_unit_usd: r2(total / qty),
    landed_total_local: Math.round(total * fx.rate),
    landed_per_unit_local: Math.round((total / qty) * fx.rate),
    local_currency: dest.currency,
    fx_rate: fx.rate,
    fx_live: fx.live,
    is_estimate: true,
    demo_data: DEMO_DATA,
  }
}

function getDutyRates({ destination_country, category }: Json) {
  const code = resolveCountry(String(destination_country))
  if (!code) return { error: `Destination "${destination_country}" not supported yet. Supported: ${Object.keys(DESTINATIONS).join(', ')}` }
  const d = DESTINATIONS[code]
  const duty = category ? { [category]: d.duty[category] ?? d.duty.default } : d.duty
  return {
    destination: d.name,
    duty_on_cif: duty,
    levies_on_cif: d.leviesOnCif,
    taxes_on_cif_plus_duty: d.taxesOnDutiable,
    note: 'Indicative platform rates; confirm the exact HS code with a customs broker before shipping.',
  }
}
