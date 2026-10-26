# 06 Interfaces

> Actual scenario API, event and configuration boundaries.

## Browser Or User-Facing APIs

- `GET /api/generate-agora-token`: optional uid/channel; returns `{ token, uid, channel }`; server credential/configuration errors return failure.
- `POST /api/invite-agent`: requester/channel are required. The invite body contains `requester_id` and `channel_name`. Returns Agent ID, creation time and state; input and runtime failures are reported explicitly.
- `POST /api/stop-conversation`: requires agent_id; already-stopping/not-found handling is idempotent.
- `POST /api/chat/completions`: optional custom-LLM proxy, not used by the default managed pipeline.

`lookup_order` sends `order_id` to `POST /api/scenarios/02-consumer-support/lookup-order`. AG-1001 is in warranty, AG-1002 is expired, and AG-1003 has delivered replacement AST-R3001 with an expected wall cord missing from the shipped-contents record. The customer's received contents remain a separate statement.

Product instructions and the fixed AG-1001, AG-1002 and AG-1003 records enter the prompt. The assistant does not query a live order system.

The read-only `lookup_order` REST tool retrieves the local order API response. Inline order records are omitted, and failed lookups cannot fall back to remembered fixtures.

Use the scenario-specific entry and persistent identity; starting voice requires a user action.



See [scenario guide](../../scenario/README.md) and the scenario source for exact business request shapes, validation errors and ownership rules.

## Events And Media

RTC carries microphone and synthesized audio. RTM/toolkit provides TRANSCRIPT_UPDATED, AGENT_STATE_CHANGED, AGENT_METRICS, completed-turn, error and SAL events where reported. Normalize toolkit local uid zero before display and retain interrupted turns. Preserve missing metric fields and data provenance; Inspector outcomes are manually confirmed.

## Environment Contract

Local Next.js reads `.env.local` from tracked `env.local.example`. Hosted/Docker servers inject runtime values; the public App ID must also be supplied to the browser build.

| Variable | Required | Owner / exposure | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_AGORA_APP_ID` | Required | Next.js build and runtime; public | App ID from the selected Agora project; Docker must receive the same value at build and runtime. |
| `NEXT_AGORA_APP_CERTIFICATE` | Required | Next.js server runtime; secret | Signs RTC/RTM credentials and authenticates managed Agent operations; never a build argument. |
| `TOP_TEN_SCENARIO_TOOL_BASE_URL` | Optional | Next.js server; non-secret | This same app's public HTTPS origin. Omit for default conversation; enabling tools requires actual cloud reachability. |

## External Services

The server uses agora-agents with the configured managed STT/LLM/TTS providers. The browser uses RTC, Signaling and the Agent Client Toolkit. Optional business tools call this same app over public HTTPS, and their returned success is required before reporting an action complete. Provider BYOK blocks are opt-in, server-only and require separate verification.

## Related Deep Dives

- [Tokens](L2/token_model.md)
- [Transcript pipeline](L2/transcript_pipeline.md)
- [Agent configuration](L2/invite_agent_config.md)
