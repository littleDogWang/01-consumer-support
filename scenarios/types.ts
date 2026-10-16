export interface ScenarioConfig {
  id: string;
  title: string;
  role: string;
  workflow: string;
  guardrails: string;
  greeting: string;
  fixtureSummary?: string;
}

export function formatScenarioPrompt(config: ScenarioConfig): string {
  return `You are the ${config.role}

# Goal and conversation flow
${config.workflow}

# Safety and truthfulness rules
${config.guardrails}

# Supported capabilities
Only use the capabilities described in this scenario. Never claim that an external action, booking, update, payment, transfer, or record write succeeded unless a configured tool returned that result.
${config.fixtureSummary ? `\n# Order data\n${config.fixtureSummary}` : ''}`;
}
