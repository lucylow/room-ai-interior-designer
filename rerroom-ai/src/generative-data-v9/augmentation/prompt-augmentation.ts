import type { DatasetRecord } from "../core/types";

export interface AugmentationResult { id: string; sourceId: string; operation: string; record: DatasetRecord; }

export function augmentPrompt(record: DatasetRecord, operation: string): AugmentationResult {
  const variants: Record<string,string> = {
    warmer: "shift lighting and materials toward warmer neutrals without changing room geometry",
    brighter: "increase daylight readability and use lighter surfaces without changing fixed openings",
    calmer: "reduce visual density and decorative repetition while preserving the chosen style",
    budgetAware: "favor compact, buyable, durable selections that fit the declared budget",
    moreScandinavian: "increase Nordic material language, pale woods, wool textures, and soft contrast",
    moreIndustrial: "increase steel, dark accents, utility expression, and graphic contrast",
  };
  const clause = variants[operation] ?? operation;
  const next: DatasetRecord = { ...record, id: `${record.id}-aug-${operation}`, prompt: `${record.prompt} ${clause}.`, normalizedPrompt: `${record.normalizedPrompt} ${clause}.`, softPreferences: [...record.softPreferences, clause], source: "simulation", qualityTier: "review" };
  return { id: next.id, sourceId: record.id, operation, record: next };
}
