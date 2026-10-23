---
recipe_version: 0.2.0
recipe_status: draft
extension_points:
  - id: prompts.system
    name: Scenario role, workflow, guardrails and greeting
  - id: scenario.data
    name: Local business knowledge and fixtures
  - id: api.routes
    name: Scenario routes and optional server-bound tools
  - id: pipeline.providers
    name: Managed speech, model, voice and turn detection
  - id: ui.conversation
    name: Scenario presentation and real session evidence
invariants:
  - id: tokens.rtc-rtm
    summary: Keep combined RTC and RTM token privileges and server-only certificates
  - id: lifecycle.strict-mode
    summary: Preserve the initialization guard and hook-owned cleanup
  - id: transcript.uid-remap
    summary: Remap local user UID zero and retain interrupted turns
  - id: scenario.outcome
    summary: Report business success only from the corresponding successful result
stable_contracts:
  - id: env.required
    summary: Use NEXT_PUBLIC_AGORA_APP_ID and server-only NEXT_AGORA_APP_CERTIFICATE in .env.local
  - id: api.token
    summary: GET /api/generate-agora-token returns token, uid and channel
  - id: api.invite-agent
    summary: Preserve this scenario's startup fields and server-bound tool scope
  - id: api.stop-conversation
    summary: POST /api/stop-conversation accepts agent_id
  - id: verification.canonical
    summary: pnpm run verify covers local contracts and build; Docker and live speech are separate
---

# Quickstart Recipe Profile

For the eight-part user guide, read [Aster Power Adapter Support](../../RECIPE.md).

## Recipe Role

- Role: `base` standalone scenario recipe, derived from the official Agora Next.js voice quickstart.
- Audience: developers running or integrating Aster Power Adapter Support.
- Reuse: inspect this source, configure the documented project, verify default conversation, then enable requested business tools.

## Recipe Scope

A voice after-sales assistant for the fictional Aster Note 15 laptop and Aster Power 65 adapter set. It handles two concrete calls: an adapter that stopped working and a delivered replacement missing its detachable wall power cord.

Default conversation: Product instructions and the fixed AG-1001, AG-1002 and AG-1003 records enter the prompt. The assistant does not query a live order system.

Optional tools: The read-only `lookup_order` REST tool retrieves the local order API response. Inline order records are omitted, and failed lookups cannot fall back to remembered fixtures.

Limits: No ticket, replacement request, callback, shipment or actual transfer is created. Warranty status does not establish a warranty duration, repair price or entitlement to free service.

## Baseline Implementation Guidance

The upstream baseline is [AgoraIO-Conversational-AI/agent-quickstart-nextjs](https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs). This repository is its scenario derivative, not a replacement identity for upstream. Use current source and the [code map](L1/03_code_map.md); do not recreate SDK schemas, tokens or lifecycle from memory. [Bootstrap guidance](L1/L2/from_scratch_bootstrap.md) documents the copy map.

## Extension Points

| Surface | Source | Verification |
| --- | --- | --- |
| Product and support steps | `scenarios/02-consumer-support/product.ts` | pnpm run verify:scenario; verify the relevant acceptance case |
| Sample orders | `scenarios/02-consumer-support/orders.json` | pnpm run verify:scenario; verify the relevant acceptance case |
| Assistant behavior | `scenarios/02-consumer-support/config.ts` | pnpm run verify:scenario; verify the relevant acceptance case |

- `scenarios/index.ts`: default/tool prompt assembly.
- `scenarios/tool-contracts.ts`: available REST tools and parameter/call scope.
- `app/api/invite-agent/route.ts`: providers, turn detection and managed Agent lifecycle.
- `scenarios/presentation.ts` and scenario presentation: visible identity, start action and developer paths.
- `components/ScenarioInspector.tsx`, `lib/inspection.ts`: reported session evidence. Preserve missing values and manual outcome provenance.

## Invariants

- Keep `RtcTokenBuilder.buildTokenWithRtm` and the common Agent UID in `lib/agora.ts`.
- Preserve the StrictMode `isReady` guard and toolkit initialization after RTC join.
- Let `useJoin`, `useLocalMicrophoneTrack` and `usePublish` own leave, track cleanup and publication.
- Remap toolkit `uid="0"` to the local user; retain interrupted transcript turns.
- Keep certificates/provider keys on the server and business tools scoped to the appropriate call.
- Never infer a saved result from transcript text or replace failed tools with fixture success.
- No ticket, replacement request, callback, shipment or actual transfer is created. Warranty status does not establish a warranty duration, repair price or entitlement to free service.

## Stable Contracts

- `GET /api/generate-agora-token` returns `{ token, uid, channel }`.
- `POST /api/invite-agent` starts the scenario Agent. The invite body contains `requester_id` and `channel_name`.
- `POST /api/stop-conversation` accepts `{ agent_id }`; already-stopping states are idempotent.
- `lookup_order` sends `order_id` to `POST /api/scenarios/02-consumer-support/lookup-order`. AG-1001 is in warranty, AG-1002 is expired, and AG-1003 has delivered replacement AST-R3001 with an expected wall cord missing from the shipped-contents record. The customer's received contents remain a separate statement.
- Local environment: `env.local.example` → `.env.local`; required keys are the public App ID and server-only App Certificate. [All variables](L1/01_setup.md) include optional business-tool/storage paths.
- Node.js 22+, pnpm 9.15.9; canonical checks are `pnpm run verify`. `pnpm run verify:docker` is a separate image/startup/scenario-route check.
- A single Next.js deployment can serve the voice app and read-only fixture API. No writable business store is required. This sample order endpoint is not customer authentication or a real manufacturer service.

## Internal / Subject To Change

Component layout, presentation copy, model/provider defaults, UI diagnostics and internal storage implementation are not stable external APIs. Inspect source rather than importing undocumented internals.

## Consumer Onboarding Recipe

1. Clone `https://github.com/littleDogWang/02-consumer-support.git` and change into `02-consumer-support`.
2. With Node.js 22+ and pnpm 9.15.9, run `pnpm install --frozen-lockfile`.
3. Copy `env.local.example` to `.env.local` only on a clean clone; fill the two Agora project credentials. Alternatively use the ready CLI's template-aware `agora quickstart env write . --template nextjs --project <your-project> --json`.
4. Run `pnpm run doctor`, then `pnpm run dev`. Open http://localhost:3000 and choose the scenario start action.
5. Verify two-way speech/transcript with a real call. Product instructions and the fixed AG-1001, AG-1002 and AG-1003 records enter the prompt. The assistant does not query a live order system.
6. If requested, configure this same app's public HTTPS business-tool origin and start a fresh conversation; verify actual callbacks and result state.
7. Run `pnpm run verify`. For containers, follow [README Docker](../../README.md#docker) and run `pnpm run verify:docker`.
8. Customize only supported surfaces, synchronize this contract and the public guide, and repeat relevant checks. Repository edits do not register or publish a recipe automatically.
