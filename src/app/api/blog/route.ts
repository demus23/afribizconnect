import { NextRequest, NextResponse } from 'next/server'

// Hashnode GraphQL API — fetches your published articles automatically
// Set HASHNODE_USERNAME in Vercel env vars to your Hashnode username
// Set HASHNODE_HOST to your blog host e.g. "blog.afribizconnect.com"

const HASHNODE_API = 'https://gql.hashnode.com'

const STATIC_POSTS = [
  {
    slug: 'afcfta-complete-guide-2025',
    title: 'AfCFTA 2025: The Complete Guide for African Importers & Exporters',
    date: '2025-07-15',
    readTime: '10 min',
    category: 'AfCFTA',
    excerpt: 'Everything you need to know about the African Continental Free Trade Area — rules of origin, tariff schedules, sensitive goods, and how to qualify for duty-free trade across 54 markets.',
    content: `The African Continental Free Trade Area (AfCFTA) is the world's largest free trade area by number of participating countries, covering all 54 African Union member states with a combined GDP of $3.4 trillion and a market of 1.4 billion people.

## What AfCFTA Actually Means for Your Business

Under AfCFTA, tariffs on 90% of goods traded between member states will be eliminated. The remaining 10% — classified as "sensitive" goods — covers items like textiles in some countries, agricultural products, and pharmaceuticals where domestic industries need protection.

The phase-down schedule differs by country type:
- **Non-Least Developed Countries (non-LDCs)**: 5-year tariff phase-down (started 2021)
- **Least Developed Countries (LDCs)**: 10-year phase-down (started 2021)
- **Sensitive goods**: 10-13 year phase-down across all countries

## Rules of Origin — The Critical Requirement

This is where most traders get caught out. To claim AfCFTA preferential tariffs, your goods must meet **Rules of Origin (RoO)** requirements. Two ways to qualify:

**1. Wholly Obtained Criterion**
The product must be entirely produced in Africa — applies to agricultural products grown in Africa, minerals extracted in Africa, or livestock born and raised in Africa.

**2. Substantial Transformation Criterion**
For manufactured goods, at least **30-35% of the value must be added within Africa**. This is calculated as:
> (Production cost in Africa / Total ex-factory price) × 100 ≥ 30%

## How to Claim AfCFTA Preferences — Step by Step

1. **Determine your HS code** — the 6-digit Harmonized System code for your product
2. **Check the tariff offer** — your exporting country's tariff schedule at the AfCFTA Secretariat
3. **Prove origin** — obtain a Certificate of Origin from your national chamber of commerce or revenue authority
4. **Complete Form C** — the AfCFTA declaration form required at customs
5. **Present at border** — customs officer verifies and applies preferential rate

## Most Important Duty Reductions by Sector

| Sector | HS Chapters | Standard Duty | AfCFTA Rate | Saving |
|--------|------------|---------------|-------------|--------|
| Electronics | 84-85 | 20-35% | 0-5% | $200-350 per $1,000 |
| Textiles | 50-63 | 25-45% | 0-10% | $250-350 per $1,000 |
| Pharmaceuticals | 30 | 5-20% | 0% | $50-200 per $1,000 |
| Auto Parts | 87 | 25-35% | 5-10% | $200-250 per $1,000 |
| Food Products | 02-24 | 10-50% | 0-5% | $100-450 per $1,000 |

## Common Mistakes That Get AfCFTA Claims Rejected

**1. Insufficient value addition** — buying Chinese goods, reboxing them in Nigeria, and claiming Nigerian origin. Customs are increasingly sophisticated at detecting this.

**2. Wrong Certificate of Origin** — the AfCFTA requires a specific Certificate of Origin (Form AfCFTA/COO). Generic ECOWAS or Arab League certificates don't qualify.

**3. Missing back-to-back documentation** — if you're a trader (not manufacturer), you need proof of the entire supply chain showing origin.

**4. Sensitive goods misclassification** — checking if your product is on the sensitive goods list is essential. Claiming preferences on a sensitive good will result in seizure and penalty.

## Practical Action Plan

If you're an importer or exporter, here's what to do this week:

1. List your top 5 traded products and find their HS codes
2. Go to the AfCFTA Secretariat portal (AfCFTA.au.int) and check if they're on the tariff offer
3. Calculate your current annual duty spend — this is your savings potential
4. Contact your national revenue authority about Certificate of Origin procedures
5. Brief your freight forwarder — they need to declare AfCFTA preference at customs

Use AfriTrade AI in your AfriBizConnect dashboard to check specific products, HS codes, and which markets have the best tariff reductions for your trade corridor.`,
  },
  {
    slug: 'letter-of-credit-guide',
    title: 'Letter of Credit in African Trade: Complete Practical Guide',
    date: '2025-07-12',
    readTime: '8 min',
    category: 'Trade Finance',
    excerpt: 'How Letters of Credit protect both buyers and sellers in cross-border trade. Types, costs, step-by-step process, and when to use them in African B2B transactions.',
    content: `A Letter of Credit (LC) is the gold standard payment instrument for international trade. It's a bank's written commitment to pay a seller a specified amount when the seller presents specific documents proving shipment of goods.

## Why LCs Matter in African Trade

African cross-border trade carries higher counterparty risk than trade between established markets. A buyer in Lagos may not know a supplier in Shenzhen. A Kenyan exporter may not trust a new buyer in Morocco. The LC solves this by replacing the counterparty relationship with bank creditworthiness.

**Without LC:** Seller ships goods → hopes buyer pays → dispute if they don't
**With LC:** Bank guarantees payment → seller ships → bank pays on document presentation

## The 6-Step LC Process

**Step 1: Sales Contract**
Buyer and seller agree on the LC terms in the sales contract: amount, currency, documents required, expiry date, and port of shipment.

**Step 2: LC Application**
Buyer applies to their bank (the Issuing Bank) to open an LC. The bank assesses the buyer's creditworthiness and requires collateral or a credit facility.

**Step 3: LC Issuance**
The Issuing Bank sends the LC via SWIFT to the seller's bank (the Advising Bank) in the seller's country.

**Step 4: LC Advising**
The Advising Bank checks the LC's authenticity and notifies the seller. The seller now has a bank guarantee and can proceed with production/shipment.

**Step 5: Shipment and Document Presentation**
Seller ships the goods and collects the required documents:
- Bill of Lading (original, 3 copies)
- Commercial Invoice
- Packing List
- Certificate of Origin
- Insurance Certificate
- Inspection Certificate (if required)

**Step 6: Payment**
Seller presents documents to the Advising Bank within the LC's validity period. Bank checks documents against LC terms. If compliant → payment is made. Simple.

## Types of Letters of Credit

**Sight LC** — Payment made immediately when compliant documents are presented. Best for sellers who need fast payment.

**Usance LC (Deferred Payment)** — Payment deferred 30, 60, 90, or 120 days after document presentation. Gives the buyer time to sell goods before paying. Common in FMCG trade.

**Confirmed LC** — The Advising Bank adds its own payment guarantee on top of the Issuing Bank's guarantee. Used when the seller doesn't trust the Issuing Bank (common for smaller African banks).

**Revolving LC** — Automatically reinstates after each use for a set period. Efficient for regular monthly shipments between the same parties.

**Transferable LC** — The original beneficiary (usually a trading house) can transfer the LC to a secondary supplier. Common in back-to-back trade structures.

## LC Costs — What to Budget

| Fee | Who Pays | Typical Cost |
|-----|----------|-------------|
| LC Opening fee | Buyer's bank | 0.5-2% of LC value |
| Advising fee | Seller's bank | $100-500 flat |
| Confirmation fee | Advising Bank | 0.5-1.5% per annum |
| Amendment fee | Requesting party | $50-200 per amendment |
| Document checking fee | Bank | $100-300 |

**Typical total cost: 1-3% of transaction value.** Well worth it for transactions over $50,000 or with unfamiliar counterparties.

## When to Insist on an LC

Always use an LC when:
- Trading with a new counterparty for the first time
- Transaction value exceeds $50,000
- The buyer is in a market with currency controls (Nigeria, Ethiopia, Egypt)
- You've had payment disputes with this buyer before
- The buyer's bank is unknown to you

Consider alternatives (TT, Open Account) only when:
- You have a 2+ year trading relationship with zero defaults
- The buyer has a strong credit rating
- Transaction is under $10,000

## Common LC Discrepancies — and How to Avoid Them

70% of LC document presentations have discrepancies. Most common:
1. **Late shipment** — vessel sailed after LC shipment deadline
2. **Short shipment** — quantity on B/L doesn't match LC
3. **Wrong description** — goods described differently on invoice vs LC
4. **Missing documents** — forgot the certificate of origin or inspection cert
5. **Expired LC** — presented documents after LC expiry date

**Prevention:** Brief your freight forwarder on LC terms before shipment. Check every document against the LC before presenting to the bank.`,
  },
  {
    slug: 'incoterms-2020-africa-guide',
    title: 'Incoterms 2020 Explained: Which One Protects You in African Trade?',
    date: '2025-07-10',
    readTime: '7 min',
    category: 'Logistics',
    excerpt: 'FOB, CIF, DAP, DDP, EXW — the right Incoterm can save you thousands in African trade. This guide explains each in plain language with real African trade examples.',
    content: `Incoterms (International Commercial Terms) define who pays for shipping, who bears the risk of goods being lost or damaged, and at exactly which point responsibility transfers from seller to buyer. Choosing the wrong Incoterm costs African importers millions every year.

## The 11 Incoterms 2020 Explained Simply

### EXW — Ex Works
**Risk transfers:** At the seller's factory gate
**Who arranges transport:** Buyer arranges everything
**Who pays:** Buyer pays all transport, export customs, import customs

Best for: Buyers with their own freight forwarder who want maximum control. Rarely used in African imports because the buyer has to clear export customs in China/UAE — very complex.

### FOB — Free On Board
**Risk transfers:** When goods are on the vessel at the port of origin
**Who arranges transport:** Buyer arranges main shipment
**Who pays:** Seller pays to get goods to the port and loaded. Buyer pays sea freight, insurance, import customs.

Best for: Experienced importers who have good freight rates. Most common Incoterm for China-Africa sea freight. You can negotiate your own shipping rates which are often cheaper than what the seller charges.

### CIF — Cost Insurance Freight
**Risk transfers:** When goods are on the vessel at port of origin (same as FOB!)
**Who arranges transport:** Seller arranges main shipment
**Who pays:** Seller pays sea freight AND minimum insurance to destination port. Buyer pays import customs and inland delivery.

**Critical warning:** Risk transfers at origin, but buyer pays at destination. This means the seller's insurance covers the voyage but the buyer bears the risk after the goods leave the origin port. If goods are damaged at sea, buyer has to claim on the seller's insurance policy — complicated and slow.

### CPT — Carriage Paid To
Like CIF but for any transport mode (air, road, rail). Seller pays freight to named destination. Risk transfers at origin when handed to first carrier.

### CIP — Carriage and Insurance Paid To
Like CPT but seller must provide **all-risks insurance** (not just minimum). Better than CIF for buyer because insurance coverage is comprehensive.

### DAP — Delivered at Place
**Risk transfers:** At the named destination (your warehouse/port)
**Who arranges transport:** Seller arranges everything to your door
**Who pays:** Seller pays all transport. Buyer pays import customs and unloading.

Best for: Buyers who don't want to deal with freight. Very common for UAE-Nigeria trade. Seller delivers to Lagos port, buyer clears customs and takes delivery.

### DDP — Delivered Duty Paid
**Risk transfers:** At your door, after customs clearance
**Who arranges transport:** Seller does everything
**Who pays:** Seller pays transport, export customs, AND import customs. Buyer pays nothing extra.

Best for: Buyers who want zero logistics hassle. More expensive (seller builds customs cost into price). Common for e-commerce and small B2B orders.

## Which Incoterm for Each African Trade Scenario?

| Scenario | Recommended Incoterm | Why |
|----------|---------------------|-----|
| First-time import from China | CIP or DAP | Seller handles complexity, better insurance |
| Regular bulk import from China | FOB | Negotiate your own freight rates |
| UAE to Nigeria FMCG | DAP | Standard in that corridor |
| South Africa to Kenya | DAP or CPT | Regional road transport |
| Air freight pharmaceuticals | CIP | Comprehensive insurance required |
| Small sample orders | DDP | Zero hassle, one price |

## The FOB vs CIF Debate

Most African importers default to CIF because "the seller handles shipping." This is usually a mistake:

**CIF disadvantages for buyers:**
- Seller marks up freight (profit center for them)
- Seller buys minimum insurance (not all-risks)
- You still bear risk from origin port
- Less control over vessel selection and ETAs

**FOB advantages for buyers:**
- Your freight forwarder negotiates better rates
- You choose all-risks insurance
- Better control over shipment timing
- Clearer liability if something goes wrong

**Exception:** If you're importing small volumes (less than 1 FCL), CIF is often better because you don't have the buying power to negotiate competitive freight rates.`,
  },
  {
    slug: 'nigeria-import-duties-2025',
    title: 'Nigeria Import Duties 2025: Complete Guide by Product Category',
    date: '2025-07-08',
    readTime: '9 min',
    category: 'Customs',
    excerpt: 'Updated Nigeria Customs Tariff guide covering electronics, pharmaceuticals, machinery, textiles, FMCG, and auto parts — with real duty rates, levies, and total landed cost calculations.',
    content: `Nigeria is Africa's largest economy and one of its busiest import markets. Understanding Nigeria Customs duties is essential for any importer — the wrong classification can mean a 35% duty instead of 5%, a difference of hundreds of thousands of naira per container.

## How Nigerian Import Duties Work

Total import cost in Nigeria = Customs Duty + VAT + CISS Levy + ETLS Levy + Port Charges

**Customs Duty** — calculated on CIF value (Cost + Insurance + Freight)
**VAT** — 7.5% on (CIF value + Customs Duty)
**CISS Levy** — 1% of FOB value (Comprehensive Import Supervision Scheme)
**ETLS Levy** — 0.5% of CIF value (ECOWAS Trade Liberalization Scheme)

## Duty Rates by Major Category

### Electronics (HS Chapters 84-85)
| Product | HS Code | Duty Rate | Total with levies |
|---------|---------|-----------|------------------|
| Mobile phones | 8517.12 | 5% | ~14% |
| Laptops | 8471.30 | 5% | ~14% |
| LED TVs | 8528.72 | 20% | ~30% |
| Generators | 8502.11 | 5% | ~14% |
| Air conditioners | 8415.10 | 20% | ~30% |
| Refrigerators | 8418.10 | 20% | ~30% |

### Pharmaceuticals (HS Chapter 30)
Most pharmaceutical products attract **0% duty** to encourage healthcare access, but VAT (7.5%) still applies.

Exceptions:
- Cosmetic/toiletry products: 20% duty
- Medical devices: 5% duty
- Vitamins and supplements: 10-20% duty

### Textiles & Apparel (HS Chapters 50-63)
Nigeria applies the highest duties on textiles to protect domestic manufacturing:
- Fabrics: 20-35% duty
- Garments: 35% duty
- Footwear: 35% duty

**Note:** Nigeria banned many textile imports entirely. Always check the prohibited items list before ordering.

### Auto Parts (HS Chapter 87)
- Engine parts: 5-10% duty
- Body parts: 10-35% duty
- Tyres: 20% duty
- Vehicle batteries: 10% duty
- Lubricants: 10% duty

### Food & FMCG (HS Chapters 02-24)
- Rice: **110% duty** (heavily protected)
- Frozen chicken/turkey: **Banned entirely**
- Cooking oil: 20% duty
- Flour: 5% duty
- Tomato paste: 50% duty
- Beverages: 20-35% duty

### Machinery & Equipment (HS Chapters 84-85)
- Industrial machinery: 0-5% duty
- Construction equipment: 5% duty
- Agricultural machinery: 0% duty
- Power tools: 5-10% duty

## Sample Landed Cost Calculation

**Importing a 40ft FCL of smartphones (1,000 units at $200 each):**

| Item | Calculation | Amount |
|------|-------------|--------|
| CIF Value | 1,000 × $200 + $3,000 freight + $500 insurance | $203,500 |
| Customs Duty (5%) | $203,500 × 5% | $10,175 |
| VAT (7.5%) | ($203,500 + $10,175) × 7.5% | $16,025 |
| CISS (1% of FOB) | $200,000 × 1% | $2,000 |
| ETLS (0.5% of CIF) | $203,500 × 0.5% | $1,018 |
| **Total import cost** | | **$29,218** |
| **Total landed cost** | | **$232,718** |
| **Per unit landed** | | **$232.72** |

## Key Tips to Reduce Duty Legally

1. **Use correct HS codes** — misclassification is the biggest cause of overpaying
2. **Apply for ECOWAS ETLS certificate** — reduces levy to 0% for qualifying goods
3. **Check AfCFTA schedules** — if importing from another African country, you may qualify for reduced duties
4. **Use bonded warehouses** — defer duty payment until you sell the goods
5. **Check for duty waivers** — Nigeria regularly issues special duty waiver lists for priority sectors`,
  },
  {
    slug: 'how-to-verify-suppliers-china',
    title: 'How to Verify Chinese Suppliers Before Sending Money',
    date: '2025-07-05',
    readTime: '6 min',
    category: 'Sourcing',
    excerpt: 'A step-by-step guide for African importers on verifying Chinese suppliers — checking business licenses, factory audits, sample orders, and payment protection methods.',
    content: `Trade fraud targeting African importers from China costs the continent an estimated $1.8 billion per year. Most of it is avoidable with proper supplier verification. Here is the exact process used by experienced African import traders.

## Step 1: Verify the Business License (Free, Takes 10 Minutes)

Every legitimate Chinese company has a **Unified Social Credit Code** (统一社会信用代码) — an 18-digit business registration number. Ask the supplier for this number and verify it at:

**National Enterprise Credit Information Publicity System:** gsxt.gov.cn

Enter the code and you'll see:
- Company name and legal representative
- Registration date (how old the company is)
- Registered capital
- Business scope (what they're licensed to do)
- Any penalties or violations

**Red flags:**
- Company registered less than 1 year ago
- Registered capital under RMB 500,000
- Business scope doesn't include your product
- Penalties or violations listed

## Step 2: Check Alibaba/Global Sources Profile Age

If you found the supplier on Alibaba, check:
- **Gold Supplier** membership duration — longer is better
- **Verified Supplier** badge — means Alibaba conducted an audit
- **Response rate** — below 80% is a warning sign
- **Trade Assurance** — always use it, it protects your payment

Minimum requirements: Gold Supplier for 3+ years, Verified badge, >90% response rate.

## Step 3: Video Call the Factory

Request a **live video call at the factory floor**, not their office. Ask them to:
- Walk through the production line
- Show you your specific product being made
- Show the inventory you'll be buying
- Show their export packaging

Any legitimate factory will do this happily. If they refuse or only show a showroom, walk away.

## Step 4: Order a Sample First

Always order samples before placing a full container order. Budget $200-500 for samples including courier (DHL or FedEx air) to your door.

Inspect samples for:
- Quality matches specification exactly
- Labelling and packaging matches what was agreed
- Certificates (CE, FCC, RoHS etc.) are real (verify certificate numbers online)
- Dimensions and weight match spec sheet

## Step 5: Factory Audit

For orders above $50,000, hire a third-party inspection company to audit the factory:

- **SGS** — most recognized globally
- **Bureau Veritas** — strong in Africa
- **Intertek** — good for consumer goods
- **QIMA** — fastest, cheapest, app-based

Cost: $300-600 for a one-day audit. Worth every dollar on large orders.

## Step 6: Payment Structure

**Never pay 100% upfront to a new supplier.** Standard structure:

- 30% deposit by TT before production
- 70% balance by TT after pre-shipment inspection (before release of B/L)

For first-time orders under $20,000, consider **Alibaba Trade Assurance** — your money is held in escrow and released only when you confirm goods received in good condition.

For orders over $50,000 with new suppliers, use a **Letter of Credit** — the supplier only gets paid when they present clean shipping documents.

## Red Flags That Mean Walk Away

🚩 Supplier asks for 100% payment upfront
🚩 Price is more than 30% below market average
🚩 They push you to communicate on WhatsApp instead of Alibaba
🚩 Business license address is a residential building
🚩 They can't provide a factory video call
🚩 Product certifications look different from official templates
🚩 They ask you to pay to a personal bank account, not the company account`,
  },
  {
    slug: 'trade-finance-options-africa',
    title: 'Trade Finance Options for African Businesses in 2025',
    date: '2025-07-01',
    readTime: '8 min',
    category: 'Trade Finance',
    excerpt: 'LC, invoice factoring, supply chain finance, trade loans — a complete guide to financing African cross-border trade, with costs, eligibility, and which instrument fits which situation.',
    content: `Access to trade finance is the number one barrier to growth for African importers and exporters. 80% of global trade is financed — but only 40% of African trade requests are approved, compared to 80% globally. This guide explains every option available to you.

## 1. Letter of Credit (LC)

**What it is:** Bank guarantees payment to seller when shipping documents are presented.
**Best for:** Importers with bank relationships, orders over $50,000, first-time supplier relationships.
**Cost:** 1-3% of transaction value.
**Timeline:** 3-7 days to open, 30-90 day payment terms.
**Providers:** All tier-1 African banks (Stanbic, GTBank, Zenith, NCBA, Equity Bank).

## 2. Invoice Factoring

**What it is:** Sell your outstanding invoices to a finance company for immediate cash (70-90% of invoice value upfront). Factor collects from your customer.
**Best for:** Exporters waiting 30-90 days for payment from international buyers.
**Cost:** 2-5% of invoice value per month.
**Timeline:** Cash in 24-48 hours.
**Providers in Africa:** Pezesha (Kenya), Lidya (Nigeria), GetEquity.

## 3. Supply Chain Finance (Reverse Factoring)

**What it is:** A large buyer (like Shoprite or MTN) offers their suppliers early payment through a bank facility, at the buyer's lower credit rate.
**Best for:** Suppliers to large corporations who want to offer extended payment terms.
**Cost:** 0.5-2% per month (buyer's credit rate, not supplier's).
**Timeline:** Immediate payment once buyer approves invoice.

## 4. Pre-Export Finance

**What it is:** Bank lends you money before you ship, secured against your confirmed export order.
**Best for:** Exporters with confirmed purchase orders from creditworthy international buyers.
**Cost:** 8-18% per annum.
**Timeline:** 5-15 days for approval.
**Providers:** African Export-Import Bank (Afreximbank), Trade & Development Bank.

## 5. AfCFTA Trade Finance Facility

**What it is:** Special facility created under AfCFTA to fund intra-African trade at preferential rates.
**Best for:** Businesses trading between African countries.
**Cost:** 1-3% below normal market rates.
**Timeline:** 2-4 weeks for approval.
**Provider:** Afreximbank via partner banks.

## 6. Warehouse Receipt Finance

**What it is:** Store commodities (cocoa, sesame, maize) in a certified warehouse and borrow against them as collateral.
**Best for:** Commodity traders who need working capital while waiting for better prices.
**Cost:** 10-15% per annum.
**Providers:** Ethiopia Commodity Exchange (ECX), Kenya ACE.

## Eligibility Requirements

Most African trade finance requires:
- 2+ years in business (some accept 1 year)
- Audited financial statements for last 2-3 years
- A confirmed purchase order or LC from buyer
- Clean credit record with local banks
- Import/export licenses for your product category

## The AfriBizConnect Trade Finance Process

1. Go to Trade Hub in your dashboard
2. Select the finance product you need
3. Complete the application (10 minutes)
4. Our partner financial institutions review within 48 hours
5. Approved facilities are disbursed within 5 business days

We work with 12 financial institutions across Nigeria, Kenya, Ghana, South Africa, and Egypt to match you with the right facility for your trade.`,
  },
  {
    slug: 'african-trade-routes-2025',
    title: 'Top 10 Most Profitable African Trade Routes in 2025',
    date: '2025-06-28',
    readTime: '7 min',
    category: 'Intelligence',
    excerpt: 'Data-driven analysis of the highest-volume and most profitable import/export corridors in Africa — from China-Nigeria electronics to UAE-East Africa FMCG to intra-African agricultural trade.',
    content: `Africa's trade landscape is shifting rapidly. AfCFTA implementation, infrastructure investment, and growing middle classes are creating new profitable trade corridors. Here are the 10 routes generating the most opportunity for B2B traders in 2025.

## 1. China → Nigeria (Electronics & Consumer Goods)
**Volume:** $8.2B annually | **Growth:** +14% YoY

The dominant trade corridor in Africa. Electronics, machinery, textiles, and consumer goods flow from Chinese factories (primarily Guangdong, Zhejiang, Fujian) to Lagos. The corridor is well-established with regular container services on COSCO, MSC, and Maersk.

**Key products:** Smartphones, LED TVs, generators, power banks, electronics accessories
**Margin potential:** 30-60% for established importers
**Main risk:** Naira devaluation and FX access for importers

## 2. UAE → East Africa (FMCG & Food)
**Volume:** $4.8B annually | **Growth:** +22% YoY

Dubai serves as the re-export hub for food, FMCG, and consumer goods to Kenya, Ethiopia, Tanzania, and Uganda. Dubai's free zones (Jebel Ali, DMCC) offer competitive re-export pricing.

**Key products:** Rice, sugar, cooking oil, dairy, personal care
**Margin potential:** 25-45%
**Advantage:** Halal certification widely available, strong trust in UAE origin

## 3. India → Nigeria/Ghana (Pharmaceuticals)
**Volume:** $2.4B annually | **Growth:** +18% YoY

India supplies 70% of Africa's generic pharmaceutical needs. Mumbai and Hyderabad are the export hubs. Growing significantly as healthcare investment increases across Africa.

**Key products:** Generic medicines, APIs, medical devices, vitamins
**Margin potential:** 40-80%
**Key requirement:** WHO-GMP certification for all suppliers

## 4. Turkey → West Africa (Textiles)
**Volume:** $1.8B annually | **Growth:** +31% YoY

Turkey has emerged as the preferred textile supplier for the West African market, displacing China in the mid-to-high quality segment. Istanbul's Grand Bazaar and textile districts supply everything from raw fabric to finished garments.

**Key products:** Denim, cotton fabric, garments, home textiles
**Margin potential:** 35-55%
**Competitive advantage:** Shorter transit (18-22 days vs 35+ from China), better quality

## 5. Nigeria → Europe (Agricultural Exports)
**Volume:** $1.2B annually | **Growth:** +8% YoY

Nigerian sesame, cashew, cocoa, and ginger exports to EU markets. Growing significantly as European food companies seek diversified African supply chains.

**Key products:** Sesame seeds, cashew nuts, ginger, cocoa butter
**Margin for exporters:** 15-25% net
**Challenge:** Meeting EU food safety standards (RASFF compliance)

## 6. South Africa → Sub-Saharan Africa (Manufacturing)
**Volume:** $6.4B annually | **Growth:** +5% YoY

South Africa is the continent's manufacturing hub, supplying processed food, beverages, chemicals, and light manufacturing to 15 Sub-Saharan countries via road and rail.

**Key products:** Food products, beverages, chemicals, packaged goods
**Advantage:** SADC free trade means zero duties to Zimbabwe, Zambia, Mozambique, Botswana

## 7. Ethiopia → China (Coffee & Sesame)
**Volume:** $0.9B annually | **Growth:** +28% YoY

Ethiopia is the world's 5th largest coffee producer and a major sesame exporter. Chinese demand for Ethiopian specialty coffee is exploding following the global specialty coffee trend.

**Key products:** Arabica coffee, sesame seeds, leather
**Margin potential for exporters:** 20-35%
**Government support:** Ethiopian Investment Commission offers export incentives

## 8. Egypt → Middle East (Processed Food)
**Volume:** $2.1B annually | **Growth:** +12% YoY

Egypt's strategic location and competitive manufacturing costs make it the preferred food processing hub for the Arab world. Products range from pasta and biscuits to processed tomatoes and juices.

**Key products:** Pasta, biscuits, processed tomatoes, citrus, potatoes
**Advantage:** Proximity to Gulf markets, Arabic language advantage

## 9. Kenya → East African Community (Manufactured Goods)
**Volume:** $1.6B annually | **Growth:** +9% YoY

Kenya manufactures for the EAC market (Uganda, Tanzania, Rwanda, Burundi, DRC) with zero duty under the EAC common external tariff.

**Key products:** Cement, steel products, food processing, pharmaceuticals
**Advantage:** Zero duty within EAC, strong banking infrastructure

## 10. Morocco → West Africa via Road (FMCG)
**Volume:** $0.7B annually | **Growth:** +41% YoY — fastest growing corridor

Morocco's free trade agreements with EU and US, combined with its position as Africa's Atlantic gateway, make it a growing re-export hub for West Africa. The new Tangier Med port handles 7.5 million TEUs annually.

**Key products:** Phosphate fertilizers, processed food, automobiles
**Strategic opportunity:** AfCFTA implementation will make Morocco-West Africa trade duty-free`,
  },
  {
    slug: 'afribizconnect-platform-guide',
    title: 'Getting the Most Out of AfriBizConnect: Full Platform Guide',
    date: '2025-06-25',
    readTime: '5 min',
    category: 'Platform',
    excerpt: 'How to use every feature of AfriBizConnect — from posting RFQs and getting freight quotes to browsing investment deals and using the AI trade assistant.',
    content: `AfriBizConnect is Africa's first integrated B2B trade infrastructure platform. This guide walks through every feature and how to use each one to grow your business.

## Your Trust Score — Start Here

Your Trust Score (0-100) is your reputation on the platform. Higher scores get more inquiries, better visibility in marketplace search results, and access to premium trade finance rates.

**How to improve your score:**
1. Complete your business profile (adds 20 points)
2. Upload your business registration certificate (adds 15 points)
3. Get KYB verified by our team (adds 25 points)
4. Complete your first trade and get a review (adds 10 points)
5. Post 5+ RFQs (adds 10 points)

## Marketplace — Finding Verified Suppliers

The Marketplace shows all verified suppliers across 54 markets. Each supplier has a Trust Score, verification badge, and detailed profile.

**Best practices:**
- Filter by category (Electronics, FMCG, Textiles, Auto Parts, etc.)
- Sort by Trust Score to see most reliable suppliers first
- Click a supplier's name to see their full profile with OEM capabilities, certifications, minimum orders, and payment terms
- Use the Contact button to send a direct message

## Sourcing & RFQs — Getting Competitive Quotes

Post an RFQ to get quotes from multiple suppliers simultaneously. Our matching engine automatically notifies relevant verified suppliers.

**How to write a strong RFQ:**
- Be specific about product specifications (dimensions, materials, quality standards)
- State your target price range
- Specify required certifications (CE, ISO, FDA, Halal etc.)
- Give a realistic delivery timeline
- Mention your order frequency (one-time vs monthly)

Typically receive 3-8 quotes within 24-48 hours.

## Logistics Hub — Freight Quotes

Get instant freight quotes from DHL, Maersk, Emirates SkyCargo, MSC, FedEx, Aramex, Bolloré, and COSCO.

Select your:
- Transport mode (Air Freight, Sea FCL, Sea LCL)
- Origin and destination
- Cargo type and weight

Quotes are generated within seconds based on real carrier rates.

## Investment Deals — Finding Capital

Browse $46M+ in active investment opportunities across equity, debt, trade finance, and joint venture structures.

Click **List Opportunity** to submit your own deal for review. Our team verifies and activates approved listings within 24 hours.

## AI Trade Assistant — Your Expert

The AfriTrade AI (gold sparkle button, bottom right) answers any trade question instantly:

- "What import duty applies to [product] in [country]?"
- "Explain the difference between FOB and CIF"
- "Which Incoterm should I use for air freight pharmaceuticals?"
- "What documents do I need to export sesame from Ethiopia?"
- "Is my product eligible for AfCFTA preferential rates?"

The AI has deep knowledge of AfCFTA, Incoterms 2020, customs procedures for all 54 African markets, trade finance instruments, and commodity markets.

## Market Data — Live Prices

Access live FX rates for 20 African currencies and commodity prices for 12 agricultural and mineral commodities. Set price alerts to be notified when prices hit your target.

## Referral Program — Earn Free Pro

Share your referral link from the Referral page. Every business that joins using your link earns you 30 days of free Pro — worth $49 per referral.`,
  },
  {
    slug: 'east-africa-import-guide',
    title: 'Importing into East Africa: Kenya, Ethiopia, Tanzania Complete Guide',
    date: '2025-06-20',
    readTime: '9 min',
    category: 'Customs',
    excerpt: 'Duties, customs procedures, restricted goods, and import timelines for Kenya, Ethiopia, and Tanzania — the three largest East African import markets.',
    content: `East Africa is one of Africa's fastest growing import markets, driven by rapid urbanisation, a growing middle class, and significant infrastructure investment. Here's what every importer needs to know about the three largest markets.

## Kenya

### Key Facts
- **Port of entry:** Port of Mombasa (main), Nairobi ICD, JKIA (air)
- **Currency:** Kenyan Shilling (KES) — relatively stable
- **VAT:** 16% on most imported goods
- **Average customs clearance time:** 3-5 days for sea, 1-2 days for air

### Duty Rates (Key Categories)
| Product | HS Chapter | Import Duty |
|---------|-----------|-------------|
| Electronics | 84-85 | 0-25% |
| Pharmaceuticals | 30 | 0% |
| Textiles | 50-63 | 25-35% |
| Food products | 02-24 | 0-100% |
| Machinery | 84 | 0-10% |
| Vehicles | 87 | 25% |

### EAC Common External Tariff
Kenya applies the EAC Common External Tariff (CET) which has 3 bands:
- 0% for raw materials and capital goods
- 10% for intermediate goods
- 25% for finished goods

### Key Documents Required
- Commercial Invoice (4 copies)
- Packing List
- Bill of Lading / Airway Bill
- Certificate of Origin
- Import Declaration Form (IDF) — obtained from KRA portal
- KEBS pre-export verification (for regulated products)
- Customs Entry (prepared by licensed clearing agent)

## Ethiopia

### Key Facts
- **Port of entry:** Djibouti Port (landlocked — all sea freight via Djibouti)
- **Currency:** Ethiopian Birr (ETB) — multiple exchange rates
- **VAT:** 15%
- **Challenge:** Forex shortage — importers need CBE forex allocation

### The Forex Challenge
Ethiopia has strict foreign exchange controls. Importers must:
1. Register with the Commercial Bank of Ethiopia
2. Apply for forex allocation through the Priority Forex System
3. Wait for approval (can take 2-8 weeks)
4. Use allocated forex within specified timeframe

**Priority sectors** (faster forex approval): pharmaceuticals, edible oil, fuel, agricultural inputs, capital goods for manufacturing.

### Duty Rates
Ethiopia applies a 5-band tariff structure: 0%, 5%, 10%, 20%, 30%, 35%
- Capital goods and inputs for manufacturing: 0-5%
- Pharmaceuticals and medical equipment: 0%
- FMCG consumer goods: 20-35%
- Luxury goods: 30-35%

## Tanzania

### Key Facts
- **Port of entry:** Port of Dar es Salaam (main), Kilimanjaro Airport (air)
- **Currency:** Tanzanian Shilling (TZS)
- **VAT:** 18%
- **Average clearance:** 4-7 days sea, 2-3 days air

### Tanzania Revenue Authority (TRA)
Tanzania uses a **risk-based customs system**. Green channel (30% of shipments): automatic release. Yellow: document verification. Red: physical inspection (takes 3-5 extra days).

### Key Requirements
- Tanzania Bureau of Standards (TBS) pre-shipment conformity assessment for electronics, food, and building materials
- SGS/Bureau Veritas/Intertek certificate required for TBS-regulated products
- All invoices must be in USD or EUR (TZS invoices not accepted for customs)

### EAC Benefits
Tanzania, Kenya, Uganda, Rwanda, Burundi, and DRC are all EAC members. This means **zero duty** on goods of EAC origin traded between member states — a major advantage for regional traders.`,
  },
  {
    slug: 'commodity-trading-africa',
    title: 'Agricultural Commodity Trading in Africa: Cocoa, Sesame, Cashew & Coffee',
    date: '2025-06-15',
    readTime: '8 min',
    category: 'Commodities',
    excerpt: 'How to trade African agricultural commodities — pricing benchmarks, quality grades, certification requirements, payment methods, and the key buyers for cocoa, sesame, cashew, and coffee.',
    content: `African agricultural commodities — cocoa, sesame, cashew, and coffee — are among the world's most traded soft commodities. Africa produces 70% of the world's cocoa, 40% of its sesame, and is the birthplace of Arabica coffee. Yet African traders often receive the lowest prices in the supply chain. This guide explains how to trade these commodities profitably.

## Cocoa — Ghana & Côte d'Ivoire

### Key Facts
- **World production:** 5.5 million tonnes/year
- **Africa share:** 75% (Ghana 20%, Côte d'Ivoire 45%)
- **Price benchmark:** ICE Cocoa Futures (NYSE: CC)
- **Current price:** ~$6,800-7,000/tonne
- **Quality grades:** Grade 1 (premium), Grade 2, Grade 3

### How Cocoa Pricing Works
Cocoa is priced as a differential to the ICE futures price. A trader in Accra might offer "ICE + $50/tonne" for Grade 1 cocoa. The ICE price fluctuates daily based on global supply/demand, weather in West Africa, and currency movements.

### Key Buyers
- Barry Callebaut (Switzerland)
- Cargill Cocoa & Chocolate (USA)
- Olam International (Singapore)
- JB Foods (Singapore)
- Touton (France)

### Certifications That Add Premium
- Rainforest Alliance: +$200-300/tonne premium
- UTZ Certified: +$150-200/tonne
- Fairtrade: +$240/tonne minimum premium
- Organic: +$500-800/tonne

## Sesame — Ethiopia, Sudan, Nigeria

### Key Facts
- **World production:** 6.5 million tonnes/year
- **Africa share:** 50% (Ethiopia 15%, Sudan 20%, Nigeria 5%)
- **Price range:** $1,100-1,400/tonne (whitish grade)
- **Key varieties:** Ethiopian whitish (premium), Sudanese mixed (standard)

### Quality Specifications
Buyers typically require:
- Purity: minimum 99.5%
- Moisture: maximum 6%
- FFA: maximum 2%
- Admixture: maximum 0.5%

### Key Markets
- China: buys 40% of global sesame (mostly pressed for oil)
- Japan: premium market for white sesame (food ingredient)
- South Korea, Turkey: large import markets
- EU: growing demand for organic and food-grade sesame

### Payment Terms
Most sesame trades use:
- 100% TT in advance (small parcels)
- 30% deposit, 70% against B/L copy (established relationships)
- LC at sight (large parcels, new relationships)

## Cashew — Nigeria, Côte d'Ivoire, Tanzania

### Key Facts
- **World production:** 3.7 million tonnes/year (raw)
- **Africa share:** 55%
- **Key grades:** W180 (super), W210, W240, W320 (most traded), W450
- **Price range:** $2,800-3,600/tonne depending on grade

### Why W320 is the Most Traded Grade
W320 means 320 cashew kernels per pound. It's the most versatile size for food manufacturers and commands the best balance of volume and price. Supermarkets prefer W240 for premium products.

### Mozambique Advantage
Mozambique cashews command a 5-10% premium over West African cashews in Asian markets due to larger kernel size and lower moisture content. Worth noting for buyers sourcing from multiple origins.

## Coffee — Ethiopia

### Key Facts
- **Ethiopia production:** 500,000-550,000 tonnes/year
- **Varieties:** Yirgacheffe (floral, citrus), Sidamo (berry, wine), Harrar (wild, fruity)
- **Price:** Arabica C futures + origin differential
- **Current Arabica C:** ~$2.30-2.50/lb

### Ethiopian Coffee Export Procedure
All Ethiopian coffee must be exported through the **Ethiopian Commodity Exchange (ECX)**:
1. Register with ECX as an exporter
2. Submit coffee samples for grading
3. List on ECX trading floor
4. Receive payment in USD through Commercial Bank of Ethiopia

**Direct trade (specialty segment):** Some specialty roasters (Blue Bottle, Stumptown) buy directly from washing stations under the Direct Trade system. This commands significant premiums ($0.50-2.00/lb above market) but requires strong roaster relationships.

### Specialty vs Commercial Coffee
- **Commercial grade:** ECX-traded, $2.30-2.50/lb
- **Specialty grade (85+ cupping score):** $3.50-6.00/lb
- **Ultra-specialty (90+ score, micro-lot):** $8-20/lb

The premium for specialty is significant. If you have access to well-processed, traceable Ethiopian coffee, specialty buyers in the US, EU, Japan, and China will pay dramatically above commodity prices.`,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  // Try Hashnode first if configured
  const HASHNODE_USERNAME = process.env.HASHNODE_USERNAME
  const HASHNODE_HOST     = process.env.HASHNODE_HOST

  if (HASHNODE_USERNAME || HASHNODE_HOST) {
    try {
      const query = slug ? `
        query { publication(host: "${HASHNODE_HOST || `${HASHNODE_USERNAME}.hashnode.dev`}") {
          post(slug: "${slug}") {
            title slug publishedAt readTimeInMinutes content { html }
            tags { name } coverImage { url } brief
          }
        }}
      ` : `
        query { publication(host: "${HASHNODE_HOST || `${HASHNODE_USERNAME}.hashnode.dev`}") {
          posts(first: 20) { edges { node {
            title slug publishedAt readTimeInMinutes brief
            tags { name } coverImage { url }
          }}}
        }}
      `
      const res = await fetch(HASHNODE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 }
      })
      const data = await res.json()
      if (slug) {
        const post = data?.data?.publication?.post
        if (post) return NextResponse.json({ post, source: 'hashnode' })
      } else {
        const posts = data?.data?.publication?.posts?.edges?.map((e:any) => e.node)
        if (posts?.length > 0) return NextResponse.json({ posts, source: 'hashnode' })
      }
    } catch (e) {
      console.error('Hashnode error:', e)
    }
  }

  // Fall back to static posts
  if (slug) {
    const post = STATIC_POSTS.find(p => p.slug === slug)
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ post, source: 'static' })
  }

  return NextResponse.json({ posts: STATIC_POSTS.map(p => ({ ...p, content: undefined })), source: 'static' })
}
