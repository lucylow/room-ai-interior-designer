import type { DatasetExample } from '../../../core/types';
export const STYLE = 'mid-century';
export const MID_CENTURY_TECHNICAL_EXAMPLES: DatasetExample[] = Array.from({ length: 24 }, (_, i) => ({
  id: `v11-style-mid-century-${i}`,
  task: i % 4 === 0 ? 'caption' : i % 4 === 1 ? 'grounding' : i % 4 === 2 ? 'edit' : 'ranking',
  roomType: ['living-room','bedroom','kitchen','home-office'][i % 4],
  style: STYLE,
  text: `Design a ${['living room','bedroom','kitchen','office'][i % 4]} in mid-century while preserving walls, openings, camera consistency, and construction anchors; variation ${i}`,
  expectedLabels: ['wall','window',i % 2 ? 'sofa' : 'table',STYLE],
  difficulty: 0.25 + (i % 8) * 0.09,
}));
export function scoremid_century(tokens: string[]): number {
  const normalized = tokens.map(t => t.toLowerCase().replace(/[-_]/g, ' '));
  const target = STYLE.replace(/[-_]/g, ' ');
  return normalized.filter(t => t === target).length > 0 ? 1 : 0;
}
export function recommendedStyleRules() {
  const palettes = ['warm-white','greige','oatmeal','charcoal'];
  return { style: STYLE, geometryPolicy: 'preserve', paletteFlexibility: 0.87, materialFlexibility: 0.81, lightingFlexibility: 0.86, palettes };
}
