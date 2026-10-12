# Trade Agent (v1) — Create AI Agents Championship entry

A buyer sends a WhatsApp text or voice note ("Nahitaji taa za sola 200, Nairobi").
The agent finds Dubai suppliers, computes landed cost (goods + freight + insurance +
duty + taxes + FX) and replies with up to 3 ranked options.

```
WhatsApp ──► /api/agent/whatsapp ──► transcribe (voice) ──► runTradeAgent (Claude + tools) ──► reply
                                                              ├─ search_catalog        (CatalogItem table)
                                                              ├─ calculate_landed_cost (src/lib/agent/rates.ts)
                                                              └─ submit_reply          (ends the loop)
Every request is logged in AgentRequest with the full tool trace (use it for demo metrics).
```

## Files

| File | Purpose |
| --- | --- |
| `src/lib/agent/run.ts` | Agent loop: Claude plans, calls tools, finishes with `submit_reply` |
| `src/lib/agent/tools.ts` | Tool schemas + implementations |
| `src/lib/agent/rates.ts` | Freight, duty, tax and FX inputs — **placeholders, replace with real rates** |
| `src/lib/agent/whatsapp.ts` | WhatsApp Cloud API: signature check, send, media download, transcription |
| `src/lib/agent/handle.ts` | Runs the agent and logs to `AgentRequest` |
| `src/app/api/agent/whatsapp/route.ts` | Meta webhook (GET verify, POST messages) |
| `src/app/api/agent/quote/route.ts` | Test endpoint, no WhatsApp needed |
| `prisma/seed-catalog.ts` | Demo supplier price lists |

## Setup

1. Add tables: `pnpm prisma db push`
2. Seed demo price lists (after `pnpm db:seed`): `pnpm db:seed-catalog`
3. Env vars (`.env` locally, Vercel settings in production):

| Variable | Needed for |
| --- | --- |
| `ANTHROPIC_API_KEY` | Agent (already set) |
| `AGENT_MODEL` | Optional, default `claude-opus-5-5` |
| `AGENT_TEST_KEY` | Any random string; protects `/api/agent/quote` |
| `OPENEXCHANGERATES_API_KEY` | Live FX (already set; falls back to fixed rates) |
| `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` | Sending replies |
| `WHATSAPP_VERIFY_TOKEN` | Any string; same value in Meta webhook settings |
| `WHATSAPP_APP_SECRET` | Webhook signature check (required in production) |
| `OPENAI_API_KEY` | Voice-note transcription (optional; without it, voice notes get a "please type" reply) |

4. Test locally:

```bash
curl -X POST http://localhost:3000/api/agent/quote \
  -H "x-agent-key: $AGENT_TEST_KEY" -H "Content-Type: application/json" \
  -d '{"message":"Nahitaji taa za sola 200 kwa duka langu Nairobi"}'
```

5. WhatsApp: in Meta for Developers → WhatsApp → Configuration, set the callback URL to
   `https://<your-domain>/api/agent/whatsapp`, the verify token to `WHATSAPP_VERIFY_TOKEN`,
   and subscribe to `messages`.

## Before real buyers

- Replace every number in `rates.ts` with Aramex / CrossBorderCart contract rates and current tariffs.
- Replace demo catalog with real supplier price lists.
- Next steps: conversation memory ("reply 2 to order"), order + escrow, container pooling, customs docs, trade-credit offer.
