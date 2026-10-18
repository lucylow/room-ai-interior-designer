import { CreativeUserIntent } from "./types";
export interface CompiledPrompt { positive: string; negative: string; tokens: string[]; exclusions: string[]; diagnostics: string[]; }
export function compilePrompt(intent: CreativeUserIntent): CompiledPrompt {
  const style = intent.styles.join(", ") || "balanced contemporary";
  const palette = intent.paletteIds.join(", ") || "warm neutral";
  const positive = [intent.roomType, style, palette, ...intent.layoutGoals, intent.prompt, "architectural interior photography", "accurate proportions", "realistic material response"].filter(Boolean).join(", ");
  const exclusions = ["warped walls", "moved windows", "blocked doors", "impossible furniture", ...intent.avoid];
  const negative = exclusions.join(", ");
  const tokens = positive.toLowerCase().split(/[^a-z0-9-]+/).filter(Boolean);
  const diagnostics = [
    intent.mustKeep.length ? `mustKeep=${intent.mustKeep.length}` : "no mustKeep constraints",
    intent.avoid.length ? `avoid=${intent.avoid.length}` : "no avoid constraints",
    `styles=${intent.styles.length}`,
    `palettes=${intent.paletteIds.length}`,
  ];
  return { positive, negative, tokens, exclusions, diagnostics };
}
