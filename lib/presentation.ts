import type { ScenarioPresentation } from '@/types/presentation';
export type { ScenarioPresentation } from '@/types/presentation';

export const presentation: ScenarioPresentation = {
  "id": "01-consumer-support",
  "name": "Consumer Support Assistant",
  "purpose": "Adapter checks and order guidance",
  "headline": [
    "Voice product support."
  ],
  "summary": "Troubleshoot your Aster adapter and check order or replacement details.",
  "featuresHeading": "Beyond starter",
  "features": [
    {
      "emoji": "🔌",
      "title": "Guided adapter checks"
    },
    {
      "emoji": "📦",
      "title": "Order & replacement lookup"
    },
    {
      "emoji": "🛟",
      "title": "Human-support guidance"
    }
  ],
  "builtWith": [
    "Agora Conversational AI",
    "Agents SDK",
    "Next.js"
  ],
  "startLabel": "Start product support",
  "boundaryShort": "Guidance and read-only records. No shipment, repair or live transfer.",
  "outcomes": [
    {
      "id": "resolved",
      "label": "My issue is resolved"
    },
    {
      "id": "needs-human",
      "label": "I need human support"
    },
    {
      "id": "not-resolved",
      "label": "I still need help"
    }
  ],
  "developer": {
    "sourceUrl": "https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs",
    "runCommand": "pnpm install\nagora login\nagora project use <your-project>\nagora project env write .env.local\npnpm dev",
    "skillsCommand": "npx skills add github:AgoraIO/skills",
    "assistantPrompt": "Use Agora Skills to work in the existing 01-consumer-support scenario checkout. Preserve the working Agora session lifecycle and business contracts. Help me adapt its business data and assistant instructions for my workflow.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://www.npmjs.com/package/agora-agents",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
    "skillsUrl": "https://github.com/AgoraIO/skills",
    "extensionPoints": [
      {
        "title": "Change assistant instructions",
        "path": "lib/agent-config.ts"
      },
      {
        "title": "Adapt product.ts",
        "path": "lib/consumer-support/product.ts"
      },
      {
        "title": "Adapt orders.json",
        "path": "lib/consumer-support/orders.json"
      },
      {
        "title": "Choose models and voice",
        "path": "app/api/invite-agent/route.ts"
      },
      {
        "title": "Adapt scenario UI content",
        "path": "lib/presentation.ts"
      }
    ]
  }
};

export function getScenarioPresentation(): ScenarioPresentation {
  return presentation;
}
