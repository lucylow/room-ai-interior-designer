import type { DatasetExample } from '../../core/types';
export const EXAMPLES_19: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-19-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'den', style: 'bohemian',
  text: `Create a bohemian den using oatmeal; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['bohemian','den','oatmeal','wall','window'], difficulty: 0.2 + ((n + 19) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_19[index % EXAMPLES_19.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_19[index % EXAMPLES_19.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
