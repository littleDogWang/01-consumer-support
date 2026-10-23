# 07 Gotchas

> High-impact setup and business-state pitfalls.

## Setup Pitfalls

- pnpm 8 does not match lockfile 9; use declared pnpm 9.15.9.
- Missing .env.local values fail doctor; do not log or paste credentials.
- Docker needs a running engine and the public App ID at build time. A runtime-only ID cannot repair an already-built client bundle.
- A private/localhost callback URL cannot be used as a cloud business-tool origin.

## Runtime Pitfalls

Product instructions and the fixed AG-1001, AG-1002 and AG-1003 records enter the prompt. The assistant does not query a live order system.

No ticket, replacement request, callback, shipment or actual transfer is created. Warranty status does not establish a warranty duration, repair price or entitlement to free service.

A single Next.js deployment can serve the voice app and read-only fixture API. No writable business store is required. This sample order endpoint is not customer authentication or a real manufacturer service.

Keep combined token privileges, StrictMode initialization, toolkit readiness and hook-owned cleanup. A missing transcript is an RTM/event question, not evidence that the model never responded. Tool failures cannot silently fall back to fixture success.

## Documentation Or Contract Drift

The repository identity must be `littleDogWang/02-consumer-support`, while upstream attribution remains separate. Keep invite fields, data paths, time zones, Docker volume behavior and pnpm/verification commands synchronized. Run `pnpm run verify:template` for structure/link drift and the canonical checks for source behavior.

## Related Deep Dives

- [Lifecycle](L2/conversation_lifecycle.md)
- [Transcript pipeline](L2/transcript_pipeline.md)
