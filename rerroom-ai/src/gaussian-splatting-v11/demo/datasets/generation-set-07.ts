import type { DatasetExample } from '../../core/types';
export const EXAMPLES_07: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-7-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'den', style: 'bohemian',
  text: `Create a bohemian den using oatmeal; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['bohemian','den','oatmeal','wall','window'], difficulty: 0.2 + ((n + 7) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_07[index % EXAMPLES_07.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_07[index % EXAMPLES_07.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
