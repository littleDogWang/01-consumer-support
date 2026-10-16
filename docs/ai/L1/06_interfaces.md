# 06 Interfaces

> Contracts at repo boundaries: API routes, env vars, runtime events, and shared TypeScript payloads.

## HTTP Route Contracts

### `GET /api/generate-agora-token`

Query params:

- `uid` optional; invalid/zero resolves to random RTM-safe UID.
- `channel` optional; defaults to generated `ai-conversation-<ts>-<rand>`.

Success response:

```json
{ "token": "...", "uid": "1234", "channel": "ai-conversation-..." }
```

Failure response: `{ "error": string, "details"?: string }` with `500`.

### `POST /api/invite-agent`

Body (`ClientStartRequest`):

```json
{ "requester_id": "1234", "channel_name": "ai-conversation-..." }
```

Success (`AgentResponse`):

```json
{ "agent_id": "...", "create_ts": 1710000000, "state": "RUNNING" }
```

Validation failures return `400`; server failures return `500`.

Scenario 02 builds Aster adapter support instructions from the local scenario modules. By default the prompt contains inline sample orders and tool execution is disabled. When `TOP_TEN_SCENARIO_TOOL_BASE_URL` is set, the invite registers the existing read-only HTTP `lookup_order` tool and omits inline sample records; failed lookups must not fall back to them. RTM stays enabled in both modes.

### `POST /api/scenarios/02-consumer-support/lookup-order`

Body: `{ "order_id": "AG-1001" }`. The API trims whitespace and normalizes case before exact matching. Success returns `{ "order": { "orderId", "product", "status", "warrantyStatus", "supportPath", "replacement"? } }`. All records describe the Aster Power 65 set for Aster Note 15. AG-1001 is covered, AG-1002 is expired, and AG-1003 is covered with `replacement: { reference, status, expectedContents, shippedContents }`. Its delivered shipment AST-R3001 was recorded with only the adapter, although the expected set also includes a detachable wall power cord. AG-1001/1002 omit replacement data; this means unknown, not a completed or empty shipment. Unknown IDs return 404 with `order_not_found`; missing, blank, or non-string IDs return 400. No writes are supported.

### `POST /api/stop-conversation`

Body (`StopConversationRequest`): `{ "agent_id": "..." }`.

Responses:

- `{ "success": true }`
- `{ "success": true, "state": "already-stopping" }` for idempotent stop state
- `{ "error": string }` on failure

### `POST /api/chat/completions`

Optional SSE proxy path (not default runtime path). Requires `NEXT_LLM_API_KEY` and `NEXT_LLM_URL` when used.

## Event/Data Interfaces

- RTM transcript/state/metrics/errors consumed through `AgoraVoiceAI` event emitter.
- Raw RTM `message` event parsed as fallback for `message.error` and `message.sal_status` payloads.
- `AGENT_METRICS` payloads displayed by `QuickstartPipelineMetrics`.

## Environment Contract

Required:

- `NEXT_PUBLIC_AGORA_APP_ID`
- `NEXT_AGORA_APP_CERTIFICATE`

This is the complete base `.env.local` contract. The optional BYOK route and provider snippets use additional variables only when a developer explicitly enables them.

Optional existing scenario variable: `TOP_TEN_SCENARIO_TOOL_BASE_URL`, a server base URL already reachable by the cloud agent. Leave it unset for inline fixture mode. MCP, knowledge-base services, and tunnels are not required or added. Local product instructions and fixed warranty statuses are the demo's source of truth; no warranty duration is finalized.

## Test Coverage for Interfaces

- `scripts/verify-api-contracts.ts` asserts token generation, input validation, env failures, and SSE framing cases.

## Shared Client-Side Interfaces

From `types/conversation.ts` (high-use):

- `AgoraTokenData`: token bootstrap payload consumed by `LandingPage`.
- `AgoraRenewalTokens`: renewal callback result (`rtcToken`, `rtmToken`).
- `ConversationComponentProps`: runtime dependencies for in-call component.

## Interface Invariants

- Token payload must always include `token`, `uid`, `channel`.
- Invite route requires both `requester_id` and `channel_name`.
- Stop route requires `agent_id`; missing should never be tolerated silently.
- Token route should always return UID as string for downstream compatibility.

## Event Interface Notes

- Metrics stream entries are append-only in component state, capped to recent window.
- Connection issue records carry `source`, `agentUserId`, code/message, timestamp.
- SAL and signaling fallback payloads are parsed defensively because message schema can vary.

## Backward Compatibility Guidance

- If route response shape changes, update both client consumers and contract tests in same change.
- If adding fields, keep existing fields stable to avoid quickstart consumer breakage.
- Reflect interface changes in README and L1 docs to keep sample copyable.

## Related Deep Dives

- [conversation_lifecycle.md](L2/conversation_lifecycle.md) — How route contracts are used in sequence.
- [transcript_pipeline.md](L2/transcript_pipeline.md) — Event-level contract mapping.


## Local conversation and optional tools

Default conversations retain the existing Aster support instructions and exact-match local order records. A configured public HTTPS tool origin enables read-only lookup and omits inline orders; lookup failure must never fall back to fixed orders.

TOP_TEN_SCENARIO_TOOL_BASE_URL is optional. Only an explicitly configured public HTTPS endpoint enables tools; malformed, HTTP, localhost and local/private origins leave tools disabled. URL validation does not prove network reachability. No tunnel, knowledge base or database is needed for the default conversation. Local checks do not establish live speech or cloud callback acceptance.
