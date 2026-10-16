import { config as selected } from './02-consumer-support/config';
import { formatScenarioPrompt, type ScenarioConfig } from './types';

export function getScenarioConfig(): ScenarioConfig { return selected; }
export function getScenarioPrompt(_scenarioId?: string, orderLookupEnabled = false): string {
  return formatScenarioPrompt({
    ...selected,
    fixtureSummary: orderLookupEnabled
      ? 'Tool lookup mode: lookup_order is configured. Confirm the exact order ID, then call lookup_order before reporting any order, warranty, or replacement result. Use only successful tool response data, including replacement reference, status, expectedContents, and shippedContents when present. For missing records, missing fields, or tool timeouts, explain which details cannot be confirmed and recommend human support. Never infer a replacement from warranty or original delivery status. Do not fall back to remembered or inline sample orders after a failed lookup.'
      : selected.fixtureSummary,
  });
}
export function listScenarioConfigs(): ScenarioConfig[] { return [selected]; }
