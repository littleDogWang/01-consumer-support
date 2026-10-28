# Scenario Agent Configuration

> Read when changing Aster Power Adapter Support's prompt, tools, provider chain or turn detection.

## Source Files

- `lib/agent-config.ts`: role, workflow, guardrails and greeting.
- `lib/agent-config.ts`: selected prompt and default/tool mode context.
- `lib/agent-tools.ts`: optional tool origin validation, schemas and server-bound scope.
- `app/api/invite-agent/route.ts`: actual SDK builder and session options.
- `lib/runtime-profile.ts`: non-secret configured provider/model display.

There are no generic Ada/ADA_PROMPT constants to edit. Use the scenario config and prompt assembly actually imported by the invite route.

## Request And Startup

The invite body contains `requester_id` and `channel_name`.

The server reads the App ID and App Certificate, builds AgoraClient with the selected area, and creates an Agent. The configured pipeline is Deepgram nova-3, OpenAI gpt-4o-mini and MiniMax speech_2_6_turbo. Copy the route's current builder pattern and createSession options; do not add an extra client argument or reproduce older SDK signatures.

The browser and invite route share DEFAULT_AGENT_UID. RTM, transcript/error delivery and metrics remain enabled. Session startup returns the Agent ID, creation timestamp and state; ending uses that same Agent ID.

## Prompt And Tools

Default behavior: Product instructions and the fixed AG-1001, AG-1002 and AG-1003 records enter the prompt. The assistant does not query a live order system.

Tool behavior: The read-only `lookup_order` REST tool retrieves the local order API response. Inline order records are omitted, and failed lookups cannot fall back to remembered fixtures.

`lookup_order` sends `order_id` to `POST /api/scenarios/01-consumer-support/lookup-order`. AG-1001 is in warranty, AG-1002 is expired, and AG-1003 has delivered replacement AST-R3001 with an expected wall cord missing from the shipped-contents record. The customer's received contents remain a separate statement.

No ticket, replacement request, callback, shipment or actual transfer is created. Warranty status does not establish a warranty duration, repair price or entitlement to free service.

## Provider And Turn Detection Changes

Edit the actual constructor blocks and turnDetection.config fields in the invite route. Provider BYOK examples are opt-in; keys stay server-side and are not part of the default two-key environment contract. For recruitment, preserve the configured 1,500 ms end-of-speech pause and 50-message LLM history unless intentionally changing interview pacing.

## Verification

Run `pnpm run verify:api`, `pnpm run verify:scenario` and canonical `pnpm run verify`. Real microphone pacing, interruptions and cloud HTTP execution require separate acceptance; mock Agent startup cannot establish those outcomes.

## See Also

- [Interfaces](../06_interfaces.md)
- [Workflows](../05_workflows.md)
- [Token model](token_model.md)
