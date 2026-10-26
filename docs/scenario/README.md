# 02 Aster power adapter support

This demo uses the fictional Aster brand for two concrete after-sales calls: an Aster Power 65 adapter that is not working, and a replacement package missing its detachable wall power cord. The supported laptop is Aster Note 15. A complete accessory set contains the adapter with its attached laptop lead and a separate wall power cord.

`product.ts` holds the local product facts, call flows, voice correction/accessibility rules, and human follow-up boundaries. `config.ts` supplies the Agent role and greeting. Product instructions and orders stay local; no MCP, external knowledge base, or tunnel is required. Ordinary conversation uses natural Aster support language; explicit questions about the brand, data, or live capabilities receive an accurate answer.

## Try the two call flows

- First enquiry: "My Aster Note 15 power adapter stopped working. My order is AG-1001." The Agent checks for damage or heat before safe external connection checks, confirms results, and explains the recorded warranty status and human review path.
- Missing part: "My replacement arrived, but the wall power cord is missing. The order is AG-1003." The Agent confirms the missing component and compares expected and recorded shipped contents without restarting electrical troubleshooting.
- Correction/accessibility: "Please slow down. I said AG-1003, not AG-1001." The Agent should accept the correction, use shorter turns, and keep the records separate. Live conversation is required to verify this behavior.

If the customer asks for a human, recommend the seller's support channel from the original receipt or order confirmation. A real transfer, callback, ticket, replacement request, or shipment is not implemented. The Agent must explain the next step without claiming any of these happened.

## Fixed order examples

| Order | Product | Warranty | Replacement record |
| --- | --- | --- | --- |
| AG-1001 | Aster Power 65 set for Note 15 | In warranty | None available |
| AG-1002 | Aster Power 65 set for Note 15 | Expired | None available |
| AG-1003 | Aster Power 65 set for Note 15 | In warranty | AST-R3001 delivered; expected adapter and wall cord, recorded shipped contents contain the adapter only |

Coverage comes from the record, not a purchase-date calculation. No warranty duration or repair price is defined, and active coverage does not guarantee free service. Missing replacement data is unknown; delivery status alone does not establish a complete package. Confirm the customer's received contents separately from the record.

## Lookup modes

By default, the prompt contains the fixed local records and registers no tool. `orders.ts` serializes optional replacement fields into each prompt record.

The existing `POST /api/scenarios/02-consumer-support/lookup-order` accepts `{ "order_id": "AG-1003" }`. It trims whitespace and normalizes case before exact matching. Success returns `{ "order": ... }` with optional `replacement: { reference, status, expectedContents, shippedContents }`; unknown IDs return 404 and invalid IDs return 400. No state-changing operation is supported.

An optional `TOP_TEN_SCENARIO_TOOL_BASE_URL` registers the read-only `lookup_order` HTTP tool. Set it only for an already cloud-reachable endpoint. Tool mode omits inline orders and replacement records; missing fields and failures remain unresolved without fixture fallback. Leave it unset for the default demo.

## Verification

Run `pnpm run verify:scenario` and `pnpm run verify`. Existing API tests capture the actual invite configuration in both modes and check warranty and replacement data. They mock Agora session startup and do not prove LLM compliance, cloud tool reachability, microphone recognition, accessibility behavior, or live RTC operation. Use the cases in `acceptance.md` for a separate spoken-flow acceptance session.


## Local conversation and optional tools

Default conversations retain the existing Aster support instructions and exact-match local order records. A configured public HTTPS tool origin enables read-only lookup and omits inline orders; lookup failure must never fall back to fixed orders.

TOP_TEN_SCENARIO_TOOL_BASE_URL is optional. Only an explicitly configured public HTTPS endpoint enables tools; malformed, HTTP, localhost and local/private origins leave tools disabled. URL validation does not prove network reachability. No tunnel, knowledge base or database is needed for the default conversation. Local checks do not establish live speech or cloud callback acceptance.

## Source locations

This guide lives in documentation; executable code uses the standalone Next.js
Quickstart layout. Agent instructions and prompt assembly are in
[lib/agent-config.ts](../../lib/agent-config.ts), optional tool contracts are in
[lib/agent-tools.ts](../../lib/agent-tools.ts), and presentation content is in
[lib/presentation.ts](../../lib/presentation.ts). Business modules and fixtures
live in [lib/consumer-support/](../../lib/consumer-support/). File basenames in this guide
refer to these source locations, not to files next to this document.
