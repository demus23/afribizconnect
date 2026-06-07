import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

// Prisma 7 requires pg adapter
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg

const connectionString = process.env.DIRECT_URL!

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter } as any)

// ─── SUPPLIERS ────────────────────────────────────────────────────────────────

const SUPPLIERS = [
  {
    name: 'Gulf Electronics Trading LLC',
    country: 'AE', city: 'Dubai',
    type: 'SUPPLIER' as const,
    categories: ['Electronics', 'Technology'],
    description: 'Premier electronics distributor with 18 years exporting to Africa. TÜV, CE, ISO 9001 certified.',
    certifications: ['ISO 9001', 'CE', 'TÜV'],
    trustScore: 94, minOrderValue: 5000, leadTimeDays: 14,
    paymentTerms: ['LC', 'TT'], targetMarkets: ['NG', 'GH', 'KE'],
    annualRevenue: '$50M-$100M', employeeCount: '200-500',
    websiteUrl: 'https://gulfelectronics.ae',
    headline: 'Premium electronics for African markets',
    specializations: ['Consumer Electronics', 'Home Appliances', 'Solar Systems'],
  },
  {
    name: 'Al Madina FMCG Group',
    country: 'AE', city: 'Sharjah',
    type: 'SUPPLIER' as const,
    categories: ['FMCG', 'Food'],
    description: 'Halal-certified FMCG group supplying 24 African countries.',
    certifications: ['Halal Certified', 'ISO 22000', 'HACCP'],
    trustScore: 91, minOrderValue: 2000, leadTimeDays: 10,
    paymentTerms: ['TT', 'Net30'], targetMarkets: ['NG', 'GH', 'SN'],
    annualRevenue: '$20M-$50M', employeeCount: '100-200',
    websiteUrl: 'https://almadinafmcg.com',
    headline: 'Halal-certified FMCG for West Africa',
    specializations: ['Food Products', 'Personal Care', 'Beverages'],
  },
  {
    name: 'Emirates Auto Parts Trading',
    country: 'AE', city: 'Dubai',
    type: 'SUPPLIER' as const,
    categories: ['Auto Parts', 'Automotive'],
    description: 'OEM and aftermarket auto parts. 50,000+ SKUs shipped to 30+ African countries.',
    certifications: ['ISO 9001', 'TÜV Rheinland'],
    trustScore: 88, minOrderValue: 3000, leadTimeDays: 12,
    paymentTerms: ['LC', 'TT'], targetMarkets: ['NG', 'KE', 'ET'],
    annualRevenue: '$10M-$20M', employeeCount: '50-100',
    websiteUrl: 'https://emiratesautoparts.ae',
    headline: 'Complete auto parts supply for Africa',
    specializations: ['Japanese Parts', 'European Parts', 'Truck Spares'],
  },
  {
    name: 'Shenzhen TechExport Co. Ltd',
    country: 'CN', city: 'Shenzhen',
    type: 'SUPPLIER' as const,
    categories: ['Electronics', 'Solar'],
    description: 'Factory-direct electronics and solar equipment. OEM/ODM manufacturing for Africa.',
    certifications: ['ISO 9001', 'CE', 'RoHS'],
    trustScore: 85, minOrderValue: 2000, leadTimeDays: 21,
    paymentTerms: ['LC', 'TT'], targetMarkets: ['NG', 'KE', 'GH'],
    annualRevenue: '$20M-$50M', employeeCount: '200-500',
    websiteUrl: 'https://sztechexport.com',
    headline: 'OEM electronics and solar for Africa',
    specializations: ['Solar Panels', 'LED Lighting', 'Phone Accessories'],
  },
  {
    name: 'Istanbul Textile Hub A.Ş.',
    country: 'TR', city: 'Istanbul',
    type: 'SUPPLIER' as const,
    categories: ['Textiles', 'Apparel'],
    description: 'Premium Turkish cotton and synthetic fabrics. 300+ varieties for African fashion brands.',
    certifications: ['OEKO-TEX 100', 'GOTS Organic', 'ISO 9001'],
    trustScore: 87, minOrderValue: 1500, leadTimeDays: 18,
    paymentTerms: ['LC', 'TT'], targetMarkets: ['NG', 'GH', 'ZA'],
    annualRevenue: '$10M-$20M', employeeCount: '200-500',
    websiteUrl: 'https://istanbuiltextile.com',
    headline: 'Premium Turkish fabrics for African fashion',
    specializations: ['Cotton Fabrics', 'Denim', 'Knitwear'],
  },
  {
    name: 'Mumbai Agri Commodities Pvt Ltd',
    country: 'IN', city: 'Mumbai',
    type: 'SUPPLIER' as const,
    categories: ['Agriculture', 'Food'],
    description: 'Bulk agricultural commodities. Rice, pulses, spices. 25 years supplying African importers.',
    certifications: ['APEDA Certified', 'ISO 22000', 'Phytosanitary'],
    trustScore: 83, minOrderValue: 10000, leadTimeDays: 25,
    paymentTerms: ['LC', 'CAD'], targetMarkets: ['NG', 'GH', 'KE'],
    annualRevenue: '$50M-$100M', employeeCount: '100-200',
    websiteUrl: 'https://mumbaiagri.com',
    headline: 'Bulk agricultural commodities from India',
    specializations: ['Basmati Rice', 'Pulses', 'Spices'],
  },
  {
    name: 'Chennai Pharmaceutical Exports',
    country: 'IN', city: 'Chennai',
    type: 'SUPPLIER' as const,
    categories: ['Pharmaceuticals', 'Healthcare'],
    description: 'WHO-GMP certified generic medicines. Supplying hospitals across Africa.',
    certifications: ['WHO-GMP', 'ISO 9001', 'US FDA Registered'],
    trustScore: 90, minOrderValue: 5000, leadTimeDays: 20,
    paymentTerms: ['LC', 'TT'], targetMarkets: ['NG', 'GH', 'KE'],
    annualRevenue: '$20M-$50M', employeeCount: '500-1000',
    websiteUrl: 'https://chennaipharma.in',
    headline: 'WHO-GMP generic medicines for Africa',
    specializations: ['Generic Medicines', 'Antibiotics', 'Antimalarials'],
  },
  {
    name: 'Riyadh Food Industries Co.',
    country: 'SA', city: 'Riyadh',
    type: 'SUPPLIER' as const,
    categories: ['Food', 'FMCG'],
    description: 'Saudi halal food products. Dates, juices, dairy for African Muslim consumer market.',
    certifications: ['SFDA', 'Halal', 'ISO 22000'],
    trustScore: 88, minOrderValue: 5000, leadTimeDays: 14,
    paymentTerms: ['LC', 'TT'], targetMarkets: ['NG', 'SN', 'MA'],
    annualRevenue: '$50M-$100M', employeeCount: '500-1000',
    websiteUrl: 'https://riyadhfood.sa',
    headline: 'Saudi halal food products for Muslim Africa',
    specializations: ['Dates', 'Juices', 'Dairy Products'],
  },
]

const LOGISTICS = [
  {
    name: 'Emirates Cargo Solutions',
    country: 'AE', city: 'Dubai',
    type: 'LOGISTICS_PROVIDER' as const,
    categories: ['Air Freight', 'Express'],
    description: 'Air freight specialist. Daily flights to Lagos, Nairobi, Accra, Addis Ababa.',
    certifications: ['IATA', 'CEIV Pharma', 'ISO 9001'],
    trustScore: 95, minOrderValue: 500, leadTimeDays: 3,
    paymentTerms: ['TT', 'Account'], targetMarkets: ['NG', 'KE', 'GH'],
    annualRevenue: '$500M+', employeeCount: '5000+',
    websiteUrl: 'https://emiratescargo.com',
    headline: 'Air freight from Dubai to all African hubs',
    specializations: ['Air Freight', 'Express Delivery', 'Pharma Cargo'],
  },
  {
    name: 'DHL Express Africa',
    country: 'DE', city: 'Bonn',
    type: 'LOGISTICS_PROVIDER' as const,
    categories: ['Express', 'Courier'],
    description: 'World\'s leading express courier serving all 54 African countries.',
    certifications: ['IATA', 'ISO 9001', 'AEO'],
    trustScore: 97, minOrderValue: 50, leadTimeDays: 2,
    paymentTerms: ['Card', 'Account'], targetMarkets: ['NG', 'KE', 'GH'],
    annualRevenue: '$50B+', employeeCount: '500000+',
    websiteUrl: 'https://dhl.com/africa',
    headline: 'Express delivery to all 54 African nations',
    specializations: ['Express Documents', 'Parcels', 'Customs Brokerage'],
  },
  {
    name: 'Maersk Africa',
    country: 'DK', city: 'Copenhagen',
    type: 'LOGISTICS_PROVIDER' as const,
    categories: ['Sea Freight', 'Logistics'],
    description: 'End-to-end logistics. Sea freight, warehousing, customs in 28 African countries.',
    certifications: ['ISO 9001', 'ISO 14001', 'AEO'],
    trustScore: 94, minOrderValue: 3000, leadTimeDays: 24,
    paymentTerms: ['TT', 'Account'], targetMarkets: ['NG', 'KE', 'ZA'],
    annualRevenue: '$50B+', employeeCount: '80000+',
    websiteUrl: 'https://maersk.com/africa',
    headline: 'Integrated logistics across Africa',
    specializations: ['Ocean Freight', 'Supply Chain', 'Cold Chain'],
  },
]

const OPPORTUNITIES = [
  {
    title: 'Nairobi Cold Chain Logistics Hub',
    sector: 'Logistics', country: 'KE', type: 'EQUITY' as const,
    stage: 'Series A', targetAmount: 8000000, minimumTicket: 250000,
    expectedReturn: 28, timeline: '4-6 years',
    description: 'East Africa\'s fastest-growing cold-chain operator. $3.2M ARR, 180% YoY growth.',
  },
  {
    title: 'Ghana Cocoa Processing Facility',
    sector: 'Agriculture', country: 'GH', type: 'TRADE_FINANCE' as const,
    stage: 'Growth', targetAmount: 3500000, minimumTicket: 100000,
    expectedReturn: 14, timeline: '18 months',
    description: 'Trade finance for cocoa processor supplying Callebaut and Valrhona. 12-year track record.',
  },
  {
    title: 'Lagos PropTech Platform — Series A',
    sector: 'Real Estate Tech', country: 'NG', type: 'EQUITY' as const,
    stage: 'Series A', targetAmount: 5000000, minimumTicket: 150000,
    expectedReturn: 35, timeline: '5 years',
    description: 'SaaS platform processing $120M in property transactions monthly. 18,000 users.',
  },
  {
    title: 'Morocco Green Hydrogen Project',
    sector: 'Energy', country: 'MA', type: 'DEBT' as const,
    stage: 'Infrastructure', targetAmount: 25000000, minimumTicket: 500000,
    expectedReturn: 11, timeline: '12 years',
    description: 'Green hydrogen production with EU industrial offtake agreement. Government backed.',
  },
  {
    title: 'Ethiopia Textile Factory JV',
    sector: 'Manufacturing', country: 'ET', type: 'JOINT_VENTURE' as const,
    stage: 'Operational', targetAmount: 4000000, minimumTicket: 200000,
    expectedReturn: 22, timeline: '3-4 years',
    description: 'Garment factory serving H&M and Primark in Hawassa Industrial Park. AGOA/EBA access.',
  },
  {
    title: 'South Africa Fintech Lending Platform',
    sector: 'Financial Services', country: 'ZA', type: 'EQUITY' as const,
    stage: 'Series B', targetAmount: 15000000, minimumTicket: 500000,
    expectedReturn: 32, timeline: '4-5 years',
    description: 'AI-powered SME lending. R850M loan book, 94% repayment rate. FSCA licensed.',
  },
  {
    title: 'Kenya AgriTech Input Distribution',
    sector: 'AgriTech', country: 'KE', type: 'EQUITY' as const,
    stage: 'Pre-Series A', targetAmount: 2000000, minimumTicket: 75000,
    expectedReturn: 40, timeline: '4-6 years',
    description: '85,000 smallholder farmers connected to quality inputs and credit via mobile.',
  },
  {
    title: 'Rwanda Eco-Tourism Resort Portfolio',
    sector: 'Hospitality', country: 'RW', type: 'EQUITY' as const,
    stage: 'Growth', targetAmount: 6000000, minimumTicket: 200000,
    expectedReturn: 24, timeline: '5-7 years',
    description: '4 premium eco-lodges near Volcanoes National Park. 94% occupancy, $850 avg/night.',
  },
]

async function main() {
  console.log('🌱 Starting AfriBizConnect seed...')

  await prisma.supplierProfile.deleteMany()
  await prisma.investmentOpportunity.deleteMany()
  await prisma.business.deleteMany()
  await prisma.user.deleteMany()
  console.log('🗑️  Cleared existing data')

  for (const s of [...SUPPLIERS, ...LOGISTICS]) {
    const slug = s.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').slice(0, 40)
      + '-' + Math.random().toString(36).slice(2, 6)

    const user = await prisma.user.create({
      data: {
        supabaseId: `seed-${slug.slice(0, 30)}`,
        email: `info@${slug.slice(0, 20).replace(/-/g, '')}.biz`,
        name: s.name,
      },
    })

    const business = await prisma.business.create({
      data: {
        userId: user.id,
        name: s.name, slug, type: s.type,
        country: s.country, city: s.city,
        description: s.description,
        categories: s.categories,
        certifications: s.certifications,
        trustScore: s.trustScore,
        verificationStatus: 'VERIFIED',
        verifiedAt: new Date(),
        minOrderValue: s.minOrderValue,
        leadTimeDays: s.leadTimeDays,
        paymentTerms: s.paymentTerms,
        targetMarkets: s.targetMarkets,
        annualRevenue: s.annualRevenue,
        employeeCount: s.employeeCount,
        websiteUrl: s.websiteUrl,
      },
    })

    if (s.type === 'SUPPLIER') {
      await prisma.supplierProfile.create({
        data: {
          businessId: business.id,
          headline: (s as any).headline,
          specializations: (s as any).specializations,
          exportLicenses: [],
          qualityStandards: s.certifications.slice(0, 2),
          sampleAvailable: true,
          oemCapable: true,
          privateLabel: Math.random() > 0.5,
          featured: s.trustScore >= 90,
          viewCount: Math.floor(Math.random() * 5000) + 100,
          inquiryCount: Math.floor(Math.random() * 500) + 10,
        },
      })
    }
  }
  console.log(`✅ Seeded ${SUPPLIERS.length} suppliers + ${LOGISTICS.length} logistics providers`)

  for (const opp of OPPORTUNITIES) {
    const slug = opp.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').slice(0, 40)
      + '-' + Math.random().toString(36).slice(2, 6)

    const user = await prisma.user.create({
      data: {
        supabaseId: `seed-opp-${slug.slice(0, 25)}`,
        email: `invest@${slug.slice(0, 15).replace(/-/g, '')}.fund`,
        name: `${opp.title} Fund`,
      },
    })

    const business = await prisma.business.create({
      data: {
        userId: user.id,
        name: `${opp.country} ${opp.sector} Holdings`,
        slug: `holding-${slug}`,
        type: 'INVESTOR', country: opp.country,
        categories: [opp.sector],
        trustScore: 85,
        verificationStatus: 'VERIFIED',
        verifiedAt: new Date(),
        description: opp.description,
        paymentTerms: ['Wire Transfer'],
        targetMarkets: [opp.country],
      },
    })

    await prisma.investmentOpportunity.create({
      data: {
        businessId: business.id,
        title: opp.title, slug,
        type: opp.type,
        description: opp.description,
        sector: opp.sector, country: opp.country,
        targetAmount: opp.targetAmount,
        minimumTicket: opp.minimumTicket,
        expectedReturn: opp.expectedReturn,
        timeline: opp.timeline, stage: opp.stage,
        isActive: true,
        viewCount: Math.floor(Math.random() * 2000) + 50,
      },
    })
  }
  console.log(`✅ Seeded ${OPPORTUNITIES.length} investment opportunities`)
  console.log('🎉 Seed complete!')
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect(); await pool.end() })