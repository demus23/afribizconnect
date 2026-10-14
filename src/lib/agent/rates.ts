/**
 * Pricing inputs for the trade agent's landed-cost calculator.
 *
 * IMPORTANT: every number in this file is an INDICATIVE placeholder so the
 * agent can run end to end. Replace FREIGHT with your Aramex / CrossBorderCart
 * contract rates and check DUTY against each country's current tariff before
 * any quote goes to a real buyer. The agent always labels landed cost as an
 * estimate.
 */

export type ShippingMode = 'air' | 'sea'

export interface Destination {
  name: string
  currency: string
  /** Freight Dubai → main city, USD per chargeable kg. */
  freightUsdPerKg: Record<ShippingMode, number>
  /** Minimum freight charge per shipment, USD. */
  freightMinUsd: Record<ShippingMode, number>
  transitDays: Record<ShippingMode, [number, number]>
  /** Import duty by product category (fraction of CIF). `default` used when no match. */
  duty: Record<string, number>
  /** Taxes applied on (CIF + duty), e.g. VAT. */
  taxesOnDutiable: { label: string; rate: number }[]
  /** Levies applied on CIF, e.g. Kenya IDF / RDL. */
  leviesOnCif: { label: string; rate: number }[]
}

export const DESTINATIONS: Record<string, Destination> = {
  KE: {
    name: 'Kenya',
    currency: 'KES',
    freightUsdPerKg: { air: 4.5, sea: 1.2 },
    freightMinUsd: { air: 60, sea: 150 },
    transitDays: { air: [3, 6], sea: [18, 28] },
    duty: { Electronics: 0.25, Solar: 0, 'Auto Parts': 0.25, Textiles: 0.35, Apparel: 0.35, Food: 0.25, FMCG: 0.25, Pharmaceuticals: 0, Healthcare: 0, default: 0.25 },
    taxesOnDutiable: [{ label: 'VAT', rate: 0.16 }],
    leviesOnCif: [{ label: 'IDF', rate: 0.025 }, { label: 'RDL', rate: 0.02 }],
  },
  UG: {
    name: 'Uganda',
    currency: 'UGX',
    freightUsdPerKg: { air: 4.8, sea: 1.4 },
    freightMinUsd: { air: 60, sea: 180 },
    transitDays: { air: [3, 7], sea: [25, 35] },
    duty: { Electronics: 0.25, Solar: 0, Textiles: 0.35, Apparel: 0.35, Food: 0.25, default: 0.25 },
    taxesOnDutiable: [{ label: 'VAT', rate: 0.18 }],
    leviesOnCif: [{ label: 'Withholding', rate: 0.06 }, { label: 'Infrastructure levy', rate: 0.015 }],
  },
  TZ: {
    name: 'Tanzania',
    currency: 'TZS',
    freightUsdPerKg: { air: 4.6, sea: 1.2 },
    freightMinUsd: { air: 60, sea: 150 },
    transitDays: { air: [3, 6], sea: [18, 28] },
    duty: { Electronics: 0.25, Solar: 0, Textiles: 0.35, Apparel: 0.35, Food: 0.25, default: 0.25 },
    taxesOnDutiable: [{ label: 'VAT', rate: 0.18 }],
    leviesOnCif: [{ label: 'RDL', rate: 0.02 }],
  },
  ET: {
    name: 'Ethiopia',
    currency: 'ETB',
    freightUsdPerKg: { air: 3.8, sea: 1.6 },
    freightMinUsd: { air: 50, sea: 200 },
    transitDays: { air: [2, 5], sea: [25, 40] },
    duty: { Electronics: 0.3, Solar: 0, Textiles: 0.35, Apparel: 0.35, Food: 0.2, default: 0.3 },
    taxesOnDutiable: [{ label: 'VAT', rate: 0.15 }, { label: 'Surtax', rate: 0.1 }],
    leviesOnCif: [{ label: 'Withholding', rate: 0.03 }],
  },
  NG: {
    name: 'Nigeria',
    currency: 'NGN',
    freightUsdPerKg: { air: 5.5, sea: 1.5 },
    freightMinUsd: { air: 80, sea: 200 },
    transitDays: { air: [4, 8], sea: [25, 40] },
    duty: { Electronics: 0.2, Solar: 0.05, Textiles: 0.35, Apparel: 0.35, Food: 0.2, default: 0.2 },
    taxesOnDutiable: [{ label: 'VAT', rate: 0.075 }],
    leviesOnCif: [{ label: 'CISS', rate: 0.01 }, { label: 'ETLS', rate: 0.005 }],
  },
  GH: {
    name: 'Ghana',
    currency: 'GHS',
    freightUsdPerKg: { air: 5.2, sea: 1.5 },
    freightMinUsd: { air: 80, sea: 200 },
    transitDays: { air: [4, 8], sea: [25, 40] },
    duty: { Electronics: 0.2, Solar: 0, Textiles: 0.35, Apparel: 0.35, Food: 0.2, default: 0.2 },
    taxesOnDutiable: [{ label: 'VAT + levies', rate: 0.2 }],
    leviesOnCif: [{ label: 'ECOWAS / AU levies', rate: 0.007 }],
  },
}

/** Insurance as a fraction of goods value (part of CIF). */
export const INSURANCE_RATE = 0.005

/** Fallback FX (local per 1 USD) used only when no live rate is available. */
export const FALLBACK_FX: Record<string, number> = {
  AED: 3.6725, KES: 129, UGX: 3700, TZS: 2600, ETB: 155, NGN: 1550, GHS: 15.5,
}

let fxCache: { rates: Record<string, number>; at: number } | null = null

export async function usdTo(currency: string): Promise<{ rate: number; live: boolean }> {
  const key = process.env.OPENEXCHANGERATES_API_KEY
  if (key && (!fxCache || Date.now() - fxCache.at > 10 * 60 * 1000)) {
    try {
      const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${key}`)
      if (res.ok) fxCache = { rates: (await res.json()).rates ?? {}, at: Date.now() }
    } catch {
      // fall through to fallback
    }
  }
  const live = fxCache?.rates?.[currency]
  if (live) return { rate: live, live: true }
  return { rate: FALLBACK_FX[currency] ?? 1, live: false }
}

/** Accepts ISO codes or common names ("Kenya", "nairobi" is not resolved — ask the buyer). */
export function resolveCountry(input: string): string | null {
  const v = input.trim().toUpperCase()
  if (DESTINATIONS[v]) return v
  const byName = Object.entries(DESTINATIONS).find(([, d]) => d.name.toUpperCase() === v)
  return byName ? byName[0] : null
}

/**
 * While the catalog holds demo price lists (prisma/seed-catalog.ts), supplier
 * "verification" and prices are not commercial facts. Set AGENT_DEMO_DATA=false
 * only once real supplier price lists and verification are in place.
 */
export const DEMO_DATA = process.env.AGENT_DEMO_DATA !== 'false'
