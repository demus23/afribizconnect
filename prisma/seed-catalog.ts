/**
 * Demo price lists for the trade agent. Attaches catalog items to suppliers
 * created by prisma/seed.ts. Prices are DEMO values — replace with real
 * supplier price lists before quoting real buyers.
 *
 *   pnpm db:seed-catalog
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const prisma = new PrismaClient({ adapter: new PrismaPg(new pg.Pool({ connectionString: process.env.DIRECT_URL! })) } as any)

type Item = {
  name: string; category: string; keywords: string[]; unitPriceUsd: number; unit?: string
  moq: number; weightKgPerUnit: number; hsCode?: string; leadTimeDays?: number; inStockDubai?: boolean
}

const CATALOG: Record<string, Item[]> = {
  'Gulf Electronics Trading LLC': [
    { name: 'Solar LED lantern with USB charging', category: 'Solar', keywords: ['solar', 'lantern', 'lamp', 'light', 'taa'], unitPriceUsd: 6.8, moq: 50, weightKgPerUnit: 0.45, hsCode: '8513.10', leadTimeDays: 2 },
    { name: 'Solar home kit 30W (panel, battery, 3 bulbs)', category: 'Solar', keywords: ['solar', 'kit', 'panel', 'home', 'light'], unitPriceUsd: 38, moq: 20, weightKgPerUnit: 4.2, hsCode: '8541.43', leadTimeDays: 3 },
    { name: 'Power bank 20,000 mAh', category: 'Electronics', keywords: ['power', 'bank', 'charger', 'battery', 'powerbank'], unitPriceUsd: 7.5, moq: 100, weightKgPerUnit: 0.42, hsCode: '8507.60', leadTimeDays: 2 },
    { name: 'Android smartphone 6.5" 4GB/64GB', category: 'Electronics', keywords: ['phone', 'smartphone', 'mobile', 'android', 'simu'], unitPriceUsd: 62, moq: 20, weightKgPerUnit: 0.38, hsCode: '8517.13', leadTimeDays: 3 },
  ],
  'Shenzhen TechExport Co. Ltd': [
    { name: 'Solar LED lantern, basic', category: 'Solar', keywords: ['solar', 'lantern', 'lamp', 'light', 'taa'], unitPriceUsd: 4.9, moq: 500, weightKgPerUnit: 0.4, hsCode: '8513.10', leadTimeDays: 25, inStockDubai: false },
    { name: 'Solar panel 100W monocrystalline', category: 'Solar', keywords: ['solar', 'panel'], unitPriceUsd: 41, moq: 20, weightKgPerUnit: 7.5, hsCode: '8541.43', leadTimeDays: 20, inStockDubai: false },
  ],
  'Al Madina FMCG Group': [
    { name: 'Sunflower cooking oil 5L', category: 'Food', keywords: ['oil', 'cooking', 'sunflower', 'mafuta'], unitPriceUsd: 7.9, moq: 200, weightKgPerUnit: 4.8, hsCode: '1512.19', leadTimeDays: 4 },
    { name: 'Basmati rice 25kg bag', category: 'Food', keywords: ['rice', 'basmati', 'mchele'], unitPriceUsd: 24, moq: 40, weightKgPerUnit: 25, hsCode: '1006.30', leadTimeDays: 4 },
    { name: 'Laundry detergent powder 1kg', category: 'FMCG', keywords: ['detergent', 'soap', 'washing', 'sabuni'], unitPriceUsd: 1.6, moq: 500, weightKgPerUnit: 1.05, hsCode: '3402.50', leadTimeDays: 3 },
  ],
  'Emirates Auto Parts Trading': [
    { name: 'Brake pads set (Toyota fitments)', category: 'Auto Parts', keywords: ['brake', 'pads', 'toyota', 'car', 'parts'], unitPriceUsd: 9.5, moq: 50, weightKgPerUnit: 1.2, hsCode: '8708.30', leadTimeDays: 3 },
    { name: 'Engine oil 5W-30, 4L', category: 'Auto Parts', keywords: ['engine', 'oil', 'motor', 'lubricant'], unitPriceUsd: 11, moq: 60, weightKgPerUnit: 3.7, hsCode: '2710.19', leadTimeDays: 3 },
  ],
}

async function main() {
  let created = 0
  for (const [supplierName, items] of Object.entries(CATALOG)) {
    const business = await prisma.business.findFirst({ where: { name: supplierName } })
    if (!business) {
      console.warn(`Skipping "${supplierName}" — run pnpm db:seed first`)
      continue
    }
    await prisma.catalogItem.deleteMany({ where: { businessId: business.id } })
    for (const item of items) {
      await prisma.catalogItem.create({ data: { ...item, businessId: business.id } })
      created++
    }
  }
  console.log(`Seeded ${created} catalog items`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
