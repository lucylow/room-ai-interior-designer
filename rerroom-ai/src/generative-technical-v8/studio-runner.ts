import { generateCreativeStudio, refineCreativeStudio, validateStudio } from "./studio-orchestrator";
import { MockGenerationRequest, CreativeUserIntent } from "./types";

export function runSeededDemo() {
  const cases: CreativeUserIntent[] = [
    { roomType: "living-room", styles: ["modern", "scandinavian"], paletteIds: ["p01", "p02"], budgetCad: 1500, mustKeep: ["windows", "floor"], avoid: ["visual clutter"], layoutGoals: ["open circulation"], prompt: "bright family living room", seed: 80101 },
    { roomType: "bedroom", styles: ["minimalist", "warm-minimal"], paletteIds: ["p01", "p07"], budgetCad: 1200, mustKeep: ["door"], avoid: ["high contrast"], layoutGoals: ["calm sleep zone"], prompt: "calm bedroom", seed: 80102 },
    { roomType: "home-office", styles: ["industrial", "soft-industrial"], paletteIds: ["p05", "p10"], budgetCad: 900, mustKeep: ["window"], avoid: ["blocking daylight"], layoutGoals: ["productive desk wall"], prompt: "compact creative office", seed: 80103 },
  ];
  return cases.map((intent) => {
    const request: MockGenerationRequest = { intent, mode: "mock", count: 4 };
    const result = generateCreativeStudio(request);
    const warnings = validateStudio(result);
    const refined = result.concepts[0] ? refineCreativeStudio(result.concepts[0], { conceptId: result.concepts[0].id, command: "make it warmer", strength: 0.7, preserve: intent.mustKeep }) : null;
    return { roomType: intent.roomType, generated: result.concepts.length, top: result.concepts[0]?.title, refined: refined?.title, warnings };
  });
}
