# Aster power adapter after-sales support

## Purpose and source

Scenario 02 handles two concrete customer calls: a laptop power adapter that no longer works, and a replacement shipment missing its wall power cord. The user selected this task on 2026-10-15 and requested a fictional brand.

The task is informed by a [public customer account of an adapter warranty call](https://www.reddit.com/r/HPOmen/comments/1v7ndtt/hp_ai_phone_system_needs_more_training_on/): repeated recognition errors, difficulty reaching the correct support team, and an incomplete replacement package. The post is a self-reported experience, not an official product specification or policy. The scenario's brand, products, instructions, and records below are locally defined examples.

## Product definition

| Item | Local definition |
| --- | --- |
| Brand | Aster, a fictional laptop brand for this scenario |
| Supported device | Aster Note 15 laptop |
| Supported accessory | Aster Power 65 power adapter set |
| Complete set | Aster Power 65 adapter, including its attached laptop lead, plus a detachable wall power cord |
| Product scope | Only this device and accessory combination; no specifications or compatibility claims for other models |
| Customer outcome | Explain the available order/warranty/replacement facts and a specific next step for human handling |

The Agent uses natural Aster support language. It does not proactively call the conversation or orders a demo, but answers explicit questions about provenance and live capabilities accurately. It never presents itself as a real manufacturer's official service.

## Call flows

### Adapter not working

1. Identify the device and whether the problem is failure to supply power, rather than a missing part in a replacement package.
2. Ask whether there is smoke, a burning smell, visible damage, or unusual heat. If reported, stop powered troubleshooting and recommend disconnecting only if safe and contacting human support.
3. For an undamaged, cool adapter, check the detachable wall cord's external connections and a known-working wall outlet, one step at a time. Skip completed checks and confirm each result.
4. If unresolved, or if warranty is requested directly, confirm the order ID and read the order's warranty status. Do not calculate coverage from purchase dates.
5. Explain the applicable human review path. Active coverage does not itself authorize free service or prove that the adapter is the failed component.

Do not open the adapter, touch exposed contacts, invent reset instructions, or recommend random replacement chargers. No repair price or warranty duration is defined.

### Missing part in a replacement

1. Ask what arrived and which part is missing: the adapter or the detachable wall cord. Do not restart electrical troubleshooting for a missing-item call.
2. Confirm the order ID and read any replacement record. The original order's delivered status is not evidence of a replacement delivery.
3. Compare expected and recorded shipped contents, then confirm what the customer actually received. Distinguish a recorded omission from a customer report that conflicts with the record.
4. Identify the missing component and explain the human follow-up needed. A delivered shipment does not guarantee that every component was received.
5. If there is no replacement record, say that its shipment status cannot be confirmed. Do not infer one from warranty coverage.

## Voice and accessibility

- Ask one question at a time and permit interruptions and corrections.
- Confirm order IDs in short groups and allow spelling or paced digits. Keep multiple order results separate and use the corrected value.
- If a customer volunteers a name or number, confirm it when needed; do not collect phone numbers or addresses for a callback/shipment that cannot be submitted here.
- On a request for slower or accommodated communication, use shorter turns, pauses, and the available transcript. Respect a request for human help immediately without requiring more troubleshooting.
- Human handling is a recommendation in this build. Do not claim a live transfer, callback booking, ticket, replacement request, or shipment has been completed.

## Local order data

| Order | Warranty | Replacement evidence |
| --- | --- | --- |
| AG-1001 | In warranty | No replacement record; first adapter warranty enquiry |
| AG-1002 | Expired | No replacement record; human review of paid options without a quote |
| AG-1003 | In warranty | AST-R3001 delivered; expected adapter and wall cord, recorded shipped contents contain the adapter only |

`orders.json` is the source of these fixed records. `orders.ts` returns an optional `replacement` object with `reference`, `status`, `expectedContents`, and `shippedContents`. Missing replacement data means unknown, not an empty or completed shipment. The prompt includes all available replacement fields in inline mode.

Default sessions use inline records and register no external tools. When the existing `TOP_TEN_SCENARIO_TOOL_BASE_URL` is configured, register only `lookup_order`, omit inline records, and require successful responses for order facts. Missing records, missing fields, and timeouts remain unresolved; do not fall back to remembered fixtures. No MCP, external knowledge base, tunnel, or new service is introduced.

## Completion and verification

This version supports issue identification, safe external checks, warranty/replacement lookup, and a precise human-handling recommendation. It does not implement state-changing after-sales operations. Preserve the existing RTC/RTM lifecycle and the shared UI baseline.

Extend existing API checks for all three orders and both invite modes. Verify that replacement contents survive the API and inline prompt, that orders without a replacement do not acquire one, and that tool mode contains no inline order fallback. Run `pnpm run verify:scenario`, `pnpm run verify`, and `git diff --check`. Prompt assertions verify configuration, not LLM compliance. Real microphone/RTC conversations remain necessary to accept recognition, corrections, accessibility behavior, and spoken call flows.
