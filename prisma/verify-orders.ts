/**
 * Verifies trade-agent order requests against the real database.
 *
 *   pnpm agent:verify-orders                # report + duplicate test (read-only except a temporary test row)
 *   pnpm agent:verify-orders --fix-legacy   # also migrates old ORDER_REQUESTED rows to PENDING_CONFIRMATION
 *
 * The duplicate test creates ONE temporary AgentRequest (channel "verify-script"),
 * fires parallel order calls through the same code the API uses, then deletes it.
 */
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const TEST_EMAIL = 'verify-script@afribizconnect.test'
let failures = 0
const pass = (m: string) => console.log(`  PASS  ${m}`)
const fail = (m: string) => { failures++; console.log(`  FAIL  ${m}`) }
const info = (m: string) => console.log(`  ....  ${m}`)

async function main() {
  // Import after dotenv so DATABASE_URL is set; uses the exact module the API route uses.
  const { prisma } = await import('../src/lib/prisma')
  const { requestOrder, ORDER_PENDING } = await import('../src/lib/agent/order')
  const fixLegacy = process.argv.includes('--fix-legacy')

  // ── 1. Order records ──────────────────────────────────────────────────────
  console.log('\n1. Order records in AgentRequest')
  const orders = await prisma.agentRequest.findMany({
    where: { status: { in: [ORDER_PENDING, 'ORDER_REQUESTED'] }, channel: { not: 'verify-script' } },
    orderBy: { orderedAt: 'desc' },
  })
  info(`${orders.length} order request(s) found`)

  for (const o of orders) {
    const sel = (o.selectedOption ?? {}) as any
    const quotes = (o.quotes ?? []) as any[]
    console.log(`\n  Order ${o.id}`)
    console.log(`    status      ${o.status}`)
    console.log(`    channel     ${o.channel}`)
    console.log(`    buyer       ${o.userEmail ?? o.buyerPhone ?? '(none)'}`)
    console.log(`    ordered at  ${o.orderedAt?.toISOString() ?? '(missing)'}`)
    console.log(`    request     "${o.inputText}"`)
    console.log(`    option      #${sel.rank} · ${sel.landed?.product ?? '?'} · ${sel.supplier}`)
    console.log(`    quantity    ${sel.landed?.quantity ?? sel.quantity ?? '?'} · ${sel.landed?.shipping_mode ?? sel.shipping_mode ?? '?'}`)
    console.log(`    est. total  $${sel.landed_total_usd} (${sel.landed?.local_currency ?? ''} ${sel.landed?.landed_total_local ?? ''})`)

    o.orderedAt ? pass('orderedAt set') : fail('orderedAt missing')
    o.status === ORDER_PENDING ? pass(`status is ${ORDER_PENDING}`) : fail(`status is ${o.status} (legacy) — run with --fix-legacy`)

    const quoted = quotes.find(q => q?.rank === sel.rank)
    quoted && JSON.stringify(quoted) === JSON.stringify(sel)
      ? pass('selected option matches the quote shown to the buyer')
      : fail('selected option does not match any quoted option')

    if (o.userEmail) {
      const user = await prisma.user.findUnique({ where: { email: o.userEmail } })
      user ? pass(`buyer is a registered user (${user.id})`) : fail(`no User row for buyer ${o.userEmail}`)
    } else fail('order has no buyer email')

    const item = sel.catalog_item_id
      ? await prisma.catalogItem.findUnique({ where: { id: sel.catalog_item_id }, include: { business: { select: { name: true } } } })
      : null
    if (!item) fail('catalog item not found')
    else {
      pass(`product exists in catalog (${item.name})`)
      item.business.name === sel.supplier ? pass('supplier matches the catalog item\'s business') : fail(`supplier mismatch: ${sel.supplier} vs ${item.business.name}`)
      if (sel.landed?.quantity != null) {
        sel.landed.quantity >= item.moq ? pass(`quantity ${sel.landed.quantity} meets MOQ ${item.moq}`) : fail(`quantity below MOQ ${item.moq}`)
      } else fail('quantity missing from selected option')
    }
  }

  const legacy = orders.filter((o: { status: string }) => o.status === 'ORDER_REQUESTED')
  if (legacy.length && fixLegacy) {
    const { count } = await prisma.agentRequest.updateMany({ where: { status: 'ORDER_REQUESTED' }, data: { status: ORDER_PENDING } })
    info(`migrated ${count} legacy ORDER_REQUESTED row(s) to ${ORDER_PENDING}`)
  }

  // ── 2. Duplicate prevention + no side effects ─────────────────────────────
  console.log('\n2. Duplicate prevention (parallel requests) and side effects')
  const item = await prisma.catalogItem.findFirst({ include: { business: { select: { name: true } } } })
  if (!item) { fail('no catalog items — run pnpm db:seed-catalog'); return }

  const before = {
    shipments: await prisma.shipment.count(),
    subscriptions: await prisma.subscription.count(),
    rfqs: await prisma.rFQ.count(),
    logisticsQuotes: await prisma.logisticsQuote.count(),
  }

  const option = { rank: 1, catalog_item_id: item.id, supplier: item.business.name, landed_total_usd: 100, reason: 'verify-script test' }
  const test = await prisma.agentRequest.create({
    data: { channel: 'verify-script', userEmail: TEST_EMAIL, inputText: 'verify-script duplicate test', status: 'QUOTED', quotes: [option] },
  })

  try {
    const wrongUser = await requestOrder({ requestId: test.id, rank: 1, userEmail: 'someone-else@example.com' })
    !wrongUser.ok && wrongUser.code === 'NOT_FOUND' ? pass('another user cannot order this quote') : fail('another user was able to order this quote')

    const badRank = await requestOrder({ requestId: test.id, rank: 9, userEmail: TEST_EMAIL })
    !badRank.ok && badRank.code === 'OPTION_NOT_FOUND' ? pass('non-existent option rejected') : fail('non-existent option was accepted')

    const results = await Promise.all(Array.from({ length: 5 }, () => requestOrder({ requestId: test.id, rank: 1, userEmail: TEST_EMAIL })))
    const ok = results.filter(r => r.ok).length
    const dup = results.filter(r => !r.ok && r.code === 'ALREADY_ORDERED').length
    ok === 1 && dup === 4 ? pass('5 parallel requests → exactly 1 order, 4 rejected as duplicates') : fail(`5 parallel requests → ${ok} succeeded, ${dup} rejected`)

    const again = await requestOrder({ requestId: test.id, rank: 1, userEmail: TEST_EMAIL })
    !again.ok && again.code === 'ALREADY_ORDERED' ? pass('repeat request after ordering rejected') : fail('repeat request after ordering accepted')

    const row = await prisma.agentRequest.findUnique({ where: { id: test.id } })
    row?.status === ORDER_PENDING ? pass(`status set to ${ORDER_PENDING}`) : fail(`status is ${row?.status}`)
    row?.orderedAt ? pass('orderedAt recorded') : fail('orderedAt not recorded')

    const after = {
      shipments: await prisma.shipment.count(),
      subscriptions: await prisma.subscription.count(),
      rfqs: await prisma.rFQ.count(),
      logisticsQuotes: await prisma.logisticsQuote.count(),
    }
    JSON.stringify(after) === JSON.stringify(before)
      ? pass('no shipment, payment/subscription, RFQ or logistics record created')
      : fail(`side effects detected: before ${JSON.stringify(before)} after ${JSON.stringify(after)}`)
  } finally {
    await prisma.agentRequest.delete({ where: { id: test.id } })
    info('temporary test row deleted')
  }

  // ── 3. Where orders surface ───────────────────────────────────────────────
  console.log('\n3. Visibility')
  info('No dashboard or admin page lists agent orders yet. Review them in Supabase → Table editor → AgentRequest,')
  info(`filter status = ${ORDER_PENDING}, or re-run this script.`)

  console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}\n`)
}

main()
  .catch(e => { console.error(e); failures++ })
  .finally(async () => {
    const { prisma } = await import('../src/lib/prisma')
    await prisma.$disconnect()
    process.exit(failures ? 1 : 0)
  })
