# 04 Conventions

> Runtime and change rules for this independent scenario.

## Code Style

Use English TypeScript/documentation and existing ESLint conventions. Keep examples fictional and U.S.-based, with explicit IANA time zones and date-correct offsets. Use pinned pnpm 9.15.9; do not rewrite the lockfile with another major.

## Runtime Patterns

Keep StrictMode `isReady` and stable RTC client ownership. Hook cleanup owns leave, microphone closing and publication. Toolkit initialization follows RTC join/RTM readiness. Preserve local-user UID remap and interrupted turns. Tailwind 4 scans actual components through app/globals.css; do not recreate old HSL-channel wrappers.

`lookup_order` sends `order_id` to `POST /api/scenarios/01-consumer-support/lookup-order`. AG-1001 is in warranty, AG-1002 is expired, and AG-1003 has delivered replacement AST-R3001 with an expected wall cord missing from the shipped-contents record. The customer's received contents remain a separate statement.

No ticket, replacement request, callback, shipment or actual transfer is created. Warranty status does not establish a warranty duration, repair price or entitlement to free service.

## Testing Patterns

Use mocked API/scenario checks for deterministic contracts and isolated temporary storage for writes. `pnpm run verify` is canonical; `pnpm run verify:docker` separately checks image/startup/route behavior. Real speech and cloud callbacks remain independent. For UI changes, render and inspect actual desktop/mobile states; do not infer visuals from source.

## Documentation Changes

Synchronize README, AGENTS, ARCHITECTURE, public/internal recipes and affected L1/L2 files when workflows, environment, state or interfaces change. Update L0's review date. Every L1 file ends in Related Deep Dives. Use conventional commits only when explicitly requested; remote writes need their own authorization.

## Related Deep Dives

- [StrictMode](L2/strict_mode_lifecycle.md)
- [Transcript pipeline](L2/transcript_pipeline.md)
