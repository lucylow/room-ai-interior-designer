export interface Object3D { id: string; label: string; center: { x: number; y: number; z: number }; size: { width: number; depth: number; height: number }; yaw: number; }
export interface MaterialEstimate { material?: string; colorHex?: string; confidence?: number; texture?: string; }
export interface VisualProductQuery { category: string; approximateWidth: number; approximateDepth: number; approximateHeight: number; material?: string; dominantColor?: string; texture?: string; orientation: number; aspectRatio: number; scaleConfidence: number; visualTokens: string[]; }
const normalize = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
const colorTokens = (hex?: string) => hex ? [hex.toLowerCase(), hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].filter(Boolean) : [];

export function createVisualProductQuery(object: Object3D, material?: MaterialEstimate): VisualProductQuery {
  const dimensions = [object.size.width, object.size.depth, object.size.height].map(value => Math.max(0, value));
  const visualTokens = [normalize(object.label), material?.material, material?.texture, ...colorTokens(material?.colorHex)].filter((value): value is string => !!value);
  return { category: object.label, approximateWidth: dimensions[0], approximateDepth: dimensions[1], approximateHeight: dimensions[2], material: material?.material, dominantColor: material?.colorHex, texture: material?.texture, orientation: object.yaw, aspectRatio: dimensions[0] / Math.max(dimensions[1], 0.001), scaleConfidence: material?.confidence ?? 0.65, visualTokens };
}

export function scoreVisualProductMatch(query: VisualProductQuery, candidate: { category: string; width: number; depth: number; height: number; material?: string; color?: string; orientation?: number; }): number {
  const category = normalize(query.category) === normalize(candidate.category) ? 1 : normalize(candidate.category).includes(normalize(query.category)) || normalize(query.category).includes(normalize(candidate.category)) ? 0.65 : 0;
  const dimensions = [Math.abs(query.approximateWidth - candidate.width) / Math.max(query.approximateWidth, 0.1), Math.abs(query.approximateDepth - candidate.depth) / Math.max(query.approximateDepth, 0.1), Math.abs(query.approximateHeight - candidate.height) / Math.max(query.approximateHeight, 0.1)];
  const dimensionFit = Math.max(0, 1 - dimensions.reduce((sum, value) => sum + value, 0) / dimensions.length);
  const material = query.material && candidate.material ? normalize(query.material) === normalize(candidate.material) ? 1 : 0 : 0.5;
  const color = query.dominantColor && candidate.color ? normalize(query.dominantColor) === normalize(candidate.color) ? 1 : 0.5 : 0.5;
  const orientation = candidate.orientation === undefined ? 0.5 : Math.max(0, 1 - Math.abs(Math.sin(query.orientation - candidate.orientation)));
  return Math.max(0, Math.min(1, 0.35 * category + 0.3 * dimensionFit + 0.15 * material + 0.1 * color + 0.1 * orientation));
}
