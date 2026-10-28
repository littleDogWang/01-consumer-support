# Scenario Baseline Copy Map

> Read when integrating Aster Power Adapter Support into another application.

## Baseline Rule

This checkout is the 01-consumer-support scenario derivative of the official Agora Next.js voice quickstart. Read its current source before adapting SDK, token or event behavior. Do not generate a replacement integration from memory.

## Implementation Map

| Need | Source of truth | Guidance |
| --- | --- | --- |
| Setup and env | package.json, env.local.example | [Setup](../01_setup.md) |
| Voice lifecycle | components/LandingPage.tsx, components/ConversationComponent.tsx | [Lifecycle](conversation_lifecycle.md) |
| Scenario prompt and fixtures | lib/agent-config.ts and local data | [Public recipe](../../../../RECIPE.md) |
| Agent providers and tools | app/api/invite-agent/route.ts, lib/agent-tools.ts | [Agent configuration](invite_agent_config.md) |
| API and call scope | app/api/scenarios, types/conversation.ts | [Interfaces](../06_interfaces.md) |
| Tokens and renewal | app/api/generate-agora-token/route.ts | [Token model](token_model.md) |
| State and deployment | ARCHITECTURE.md, Dockerfile | [Architecture](../../../../ARCHITECTURE.md) |

## Adaptation Sequence

1. Run the existing scenario using Node.js 22+, pnpm 9.15.9 and the documented .env.local contract.
2. Verify an actual call before declaring speech success; local contracts alone are not runtime evidence.
3. Map token, invite, stop, RTC join, RTM subscription and toolkit events into the target app's existing owners.
4. Preserve StrictMode initialization, hook-owned cleanup, combined token privileges, UID remap and interrupted turns.
5. The invite body contains `requester_id` and `channel_name`.
6. Start with default conversation: Product instructions and the fixed AG-1001, AG-1002 and AG-1003 records enter the prompt. The assistant does not query a live order system.
7. Add only requested business tools, preserving their exact call scope and confirmation semantics. No ticket, replacement request, callback, shipment or actual transfer is created. Warranty status does not establish a warranty duration, repair price or entitlement to free service.
8. Run pnpm run verify and the appropriate separate Docker/live acceptance checks.

## See Also

- [Internal recipe](../../RECIPE.md)
- [Workflows](../05_workflows.md)
- [Interfaces](../06_interfaces.md)
