export interface GenerativeConfig { modelFamily: string; scheduler: string; steps: number; guidance: number; denoise: number; preserveGeometry: boolean; useDepth: boolean; useEdges: boolean; useMask: boolean; output: "concept" | "render" | "variant"; }

export const DEMO_GENERATION_CONFIGS: GenerativeConfig[] = [
  { modelFamily: "mock-diffusion-v8", scheduler: "ddim", steps: 24, guidance: 6.5, denoise: 0.42, preserveGeometry: true, useDepth: true, useEdges: true, useMask: true, output: "concept" },
  { modelFamily: "mock-diffusion-v8", scheduler: "euler-a", steps: 28, guidance: 7, denoise: 0.38, preserveGeometry: true, useDepth: true, useEdges: false, useMask: true, output: "render" },
  { modelFamily: "mock-img2img-v8", scheduler: "dpm++", steps: 20, guidance: 5.5, denoise: 0.30, preserveGeometry: true, useDepth: true, useEdges: true, useMask: true, output: "variant" },
];

export function chooseConfig(roomType: string, variationIndex: number): GenerativeConfig {
  const base = DEMO_GENERATION_CONFIGS[variationIndex % DEMO_GENERATION_CONFIGS.length];
  if (roomType === "kitchen" || roomType === "bathroom") return { ...base, useEdges: true, preserveGeometry: true, denoise: Math.min(base.denoise, 0.33) };
  if (roomType === "nursery") return { ...base, guidance: Math.min(base.guidance, 6), output: "concept" };
  return base;
}
