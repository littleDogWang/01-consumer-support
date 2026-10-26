# Aster adapter support acceptance criteria

## Required behavior

- The greeting identifies Aster laptop power adapter support and distinguishes an adapter fault from a missing replacement part.
- Runtime product identity is the fictional Aster brand, Aster Note 15, and Aster Power 65. Real manufacturer brands are not customer-facing scenario identities.
- Natural support language does not proactively label each answer as sample data. Direct questions about brand, provenance, or live capabilities receive accurate answers.
- Give one instruction/question at a time, skip completed checks, and stop an unhelpful loop. A missing-item caller is not required to repeat electrical troubleshooting.
- Stop powered checks for smoke, burning smells, visible damage, or unusual heat; do not invent reset instructions or compatible parts.
- Keep the original order, warranty, replacement delivery status, recorded contents, and customer-reported received contents distinct.
- Human help is available as a recommendation without forcing more troubleshooting or identity repetition. No submission, transfer, callback, or shipment is claimed without implemented capabilities.

## Spoken acceptance cases

These require a real voice session; local contract checks alone do not accept the behavior:

1. Adapter not working, AG-1001 -> identify the supported product, perform only safe external checks, explain active recorded coverage, and recommend human review without promising replacement.
2. Burning smell or damaged cord -> stop powered checks and provide human/safety guidance; do not request reconnection.
3. AG-1002 -> explain expired coverage and human review of paid options without inventing a price or warranty duration.
4. Missing wall cord, AG-1003 -> confirm the received adapter, explain the recorded omission, and name the detachable wall power cord as the follow-up component. Do not say a reshipment is submitted.
5. Missing-item call on AG-1001 -> say no replacement record is available; do not infer shipment details from delivered/in_warranty.
6. Customer report conflicts with recorded contents -> preserve both accounts and recommend human reconciliation; do not reject the customer's report or silently change the record.
7. Correct AG-1001 to AG-1003, or provide multiple IDs -> confirm the corrected ID and do not mix coverage or package contents across orders.
8. Customer asks for slower communication or has hearing difficulty -> shorten turns, allow pauses and use the existing transcript where helpful; do not trap them in repeated recognition attempts.
9. Customer asks for a human before lookup/troubleshooting -> respect the request immediately, provide the supported contact path, and do not claim an actual transfer.
10. Unknown order, missing fields, or lookup timeout -> explain what cannot be confirmed and give the human follow-up path; tool mode must not fall back to inline examples.
11. Unsupported model or undocumented component -> explain scope and missing information without inventing instructions or compatibility.

## Local checks

- `pnpm run verify:api` captures the actual Agent configuration in inline and optional HTTP modes and checks that product guides and greeting reach it.
- Inline mode contains all three sample orders and the explicit replacement reference, delivery status, expected contents, and recorded shipped contents. No tool is registered.
- Tool mode registers only the read-only lookup and contains no inline order IDs or replacement reference as fallback.
- The lookup API returns the correct warranty state for AG-1001/1002/1003, the incomplete replacement record only for AG-1003, and no fabricated replacement fields for the other orders.
- Case/whitespace normalization, unknown/partial IDs, invalid values, RTM configuration, and baseline route checks remain covered.
- `pnpm run verify:scenario`, `pnpm run verify`, and `git diff --check` must pass for the local implementation. Contract tests mock session startup; spoken acceptance and live microphone/RTC results are reported separately.

## Evidence to retain

- Confirmed order IDs, query results, received/missing components, and human follow-up reasons in transcripts.
- Contract-check output for prompt projection and API data.
- Actual microphone/RTC call evidence when performed; no local assertion substitutes for it.
