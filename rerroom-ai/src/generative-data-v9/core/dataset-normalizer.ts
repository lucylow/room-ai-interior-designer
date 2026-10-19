import type { DatasetRecord } from "../core/types";

export function normalizeRecord(input: DatasetRecord): DatasetRecord {
  const trim = (s: string) => s.trim().replace(/\s+/g, " ");
  return { ...input, prompt: trim(input.prompt), normalizedPrompt: trim(input.normalizedPrompt), hardConstraints: input.hardConstraints.map(trim), softPreferences: input.softPreferences.map(trim), avoid: input.avoid.map(trim), spatialAnchors: input.spatialAnchors.map(trim), expectedSignals: input.expectedSignals.map(trim), response: trim(input.response), rationale: trim(input.rationale) };
}
