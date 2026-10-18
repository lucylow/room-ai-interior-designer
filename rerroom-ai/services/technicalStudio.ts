import {
  generateCreativeStudio,
  refineCreativeStudio,
  runSeededDemo,
  validateStudio,
  PALETTE_CATALOG,
  STYLE_CATALOG,
  type CreativeConcept,
  type CreativeUserIntent,
  type MockGenerationResult,
  type RoomType,
} from "../src/generative-technical-v8";

export interface TechnicalStudioInput {
  room?: RoomType;
  style?: string;
  palette?: string;
  budget?: number;
  prompt?: string;
  seed?: number;
}

export interface TechnicalStudioResult {
  output: MockGenerationResult;
  topConcept: CreativeConcept | null;
  warnings: string[];
  geometryGuardrail: "preserved";
  mode: "mock";
}

const roomAliases: Record<string, RoomType> = {
  living_room: "living-room",
  bedroom: "bedroom",
  home_office: "home-office",
  dining_room: "dining-room",
};

const DEFAULT_BUDGET = 1200;
const MAX_PROMPT_LENGTH = 1_000;

function safeBudget(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.min(value, 1_000_000)
    : DEFAULT_BUDGET;
}

function safeSeed(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.trunc(value) : 80101;
}

function safePrompt(value: unknown): string {
  if (typeof value !== "string")
    return "Create a grounded, realistic room concept with reversible aesthetic changes.";
  const normalized = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, " ").trim();
  return (
    normalized.slice(0, MAX_PROMPT_LENGTH) ||
    "Create a grounded, realistic room concept with reversible aesthetic changes."
  );
}

function normalizeStyle(value: string | undefined): string {
  const candidate = (value ?? "modern").replaceAll("_", "-").toLowerCase();
  return STYLE_CATALOG.some((item) => item.id === candidate) ? candidate : "modern";
}

function normalizePalette(value: string | undefined): string {
  const numeric = Number(value?.match(/\d+/)?.[0] ?? 1);
  const index = Math.max(1, Math.min(PALETTE_CATALOG.length, Number.isFinite(numeric) ? numeric : 1));
  return PALETTE_CATALOG[index - 1]?.id ?? PALETTE_CATALOG[0].id;
}

export function buildTechnicalIntent(input: TechnicalStudioInput): CreativeUserIntent {
  return {
    roomType: roomAliases[input.room ?? "living_room"] ?? input.room ?? "living-room",
    styles: [normalizeStyle(input.style)],
    paletteIds: [normalizePalette(input.palette)],
    budgetCad: safeBudget(input.budget),
    mustKeep: ["walls", "windows", "doors", "ceiling proportions"],
    avoid: ["warped geometry", "blocked openings", "impossible dimensions", "floating furniture"],
    layoutGoals: ["clear circulation", "preserve architectural shell"],
    prompt: safePrompt(input.prompt),
    seed: safeSeed(input.seed),
  };
}

export function generateTechnicalCreative(input: TechnicalStudioInput = {}): TechnicalStudioResult {
  const intent = buildTechnicalIntent(input);
  const output = generateCreativeStudio({ intent, mode: "mock", count: 4 });
  return {
    output,
    topConcept: output.concepts[0] ?? null,
    warnings: validateStudio(output),
    geometryGuardrail: "preserved",
    mode: "mock",
  };
}

export function refineTechnicalCreative(
  concept: CreativeConcept,
  command: string,
  strength = 0.7,
): CreativeConcept {
  if (!concept || typeof concept.id !== "string" || !concept.id)
    throw new Error("Cannot refine an empty technical concept.");
  if (typeof command !== "string" || !command.trim()) throw new Error("A refinement command is required.");
  const boundedStrength =
    typeof strength === "number" && Number.isFinite(strength) ? Math.max(0, Math.min(1, strength)) : 0.7;
  return refineCreativeStudio(concept, {
    conceptId: concept.id,
    command: command.trim().slice(0, 240),
    strength: boundedStrength,
    preserve: ["walls", "windows", "doors", "ceiling proportions"],
    seed: concept.seed + 1,
  });
}

export function runTechnicalSeededDemo() {
  return runSeededDemo();
}
