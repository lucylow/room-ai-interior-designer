import type {  RoomType } from "../../generative-data-v9/core/types";
import type { Provenance, SpatialTruth, MultimodalAssetRef, SplitName, ExampleTier } from "./types";

export const VERSION = "v10.0.0";
export const GENERATED_AT = "2026-10-02T17:00:00.000Z";

export function provenance(seed: number, generator = "rerroom-v10-synthetic-generator"): Provenance {
  return {
    datasetVersion: VERSION,
    sourceKind: "synthetic",
    generator,
    seed,
    generatedAt: GENERATED_AT,
    piiFree: true,
    licenseSafe: true,
  };
}

export function asset(id: string, modality: MultimodalAssetRef["modality"], seed: number): MultimodalAssetRef {
  return {
    id,
    modality,
    uri: `demo://rerroom/${modality}/${id}`,
    width: modality === "text" ? undefined : 1024,
    height: modality === "text" ? undefined : 768,
    channels: modality === "image" ? 3 : modality === "depth" || modality === "mask" ? 1 : undefined,
    checksum: `sha256:demo-${seed.toString(16).padStart(8, "0")}`,
  };
}

export function spatialTruth(sceneId: string, i: number): SpatialTruth {
  return {
    sceneId,
    dimensionsM: { width: 4.2 + (i % 4) * 0.35, depth: 5.1 + (i % 3) * 0.4, height: 2.6 },
    fixedAnchors: [
      { id: `${sceneId}-window`, kind: "window", x: 1.2, y: 0, width: 1.4, depth: 0.12 },
      { id: `${sceneId}-door`, kind: "door", x: 0.05, y: 2.1, width: 0.82, depth: 0.18 },
    ],
    immutableFeatures: ["walls", "door_opening", "window_opening", "ceiling_height"],
    geometryToleranceMm: 12,
  };
}

export function splitFor(i: number): SplitName {
  return i % 23 === 0 ? "challenge" : i % 11 === 0 ? "test" : i % 7 === 0 ? "validation" : "train";
}

export function tierFor(i: number): ExampleTier {
  return i % 29 === 0 ? "review" : i % 5 === 0 ? "silver" : "gold";
}

export const STYLE_DESCRIPTORS: Record<string, string> = {
  modern: "clean silhouettes, balanced contrast, refined contemporary materials",
  minimalist: "reduced visual noise, restrained palette, intentional negative space",
  scandinavian: "light timber, soft textiles, daylight, practical warmth",
  industrial: "blackened metal, expressive structure, utilitarian detailing",
  japandi: "natural materials, quiet contrast, low visual complexity",
  mid_century: "tapered forms, warm wood, graphic accents",
  organic_modern: "soft geometry, natural stone, tactile neutrals",
  bohemian: "layered textiles, collected objects, warm eclectic color",
  contemporary: "current silhouettes, polished neutrals, edited accents",
  warm_minimal: "soft beige, oak, subtle curves, uncluttered comfort",
  quiet_luxury: "tailored fabrics, stone, brass, low-contrast sophistication",
  coastal_modern: "washed woods, linen, sea-glass blue, airy composition",
  modern_farmhouse: "painted millwork, oak, simple silhouettes, grounded texture",
  transitional: "classic proportions, contemporary materials, balanced symmetry",
  art_deco: "graphic geometry, lacquer, brass, jewel-tone accents",
  new_nordic: "pale timber, crisp planes, foggy tones, functional storage",
  soft_industrial: "metal structure softened by linen, oak, warm lighting",
  desert_modern: "clay tones, plaster, sculptural forms, sun-baked textures",
  moody_modern: "charcoal planes, dark timber, focused pools of warm light",
  eclectic_modern: "controlled contrast, vintage accents, contemporary anchors",
  craft_modern: "handmade surfaces, visible joinery, material tactility",
  heritage_modern: "traditional cues reinterpreted with clean modern geometry",
  urban_soft: "compact furniture, muted urban palette, flexible zoning",
  naturalist: "botanical textures, natural fibers, daylight-first composition",
};

export const PALETTE_DESCRIPTORS: Record<string, string> = {
  warm_white_sand: "warm white, sand, oat, muted brass",
  nordic_fog: "fog gray, pale oak, soft blue, off-white",
  sage_olive: "soft sage, olive, cream, natural walnut",
  forest_stone: "deep green, stone, oak, charcoal",
  clay_terracotta: "clay, terracotta, bone, aged oak",
  ink_brass: "ink navy, warm white, brass, walnut",
  navy_linen: "navy, linen, washed oak, soft gray",
  oatmeal_charcoal: "oatmeal, charcoal, oak, ivory",
  mist_blue: "mist blue, ivory, pale oak, graphite",
  soft_taupe: "taupe, cream, mushroom, brushed nickel",
  cedar_cream: "cedar, cream, olive, warm black",
  mushroom_cream: "mushroom, cream, clay, dark bronze",
};

export function normalizePrompt(prompt: string): string {
  return prompt.trim().replace(/\s+/g, " ").toLowerCase();
}

export function deterministicScore(seed: number, offset: number): number {
  const x = Math.sin(seed * 12.9898 + offset * 78.233) * 43758.5453;
  return Number((x - Math.floor(x)).toFixed(5));
}
