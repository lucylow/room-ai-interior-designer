import type { DatasetExample } from '../../core/types';
export const EXAMPLES_01: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-1-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'dining-room', style: 'minimalist',
  text: `Create a minimalist dining-room using charcoal; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['minimalist','dining-room','charcoal','wall','window'], difficulty: 0.2 + ((n + 1) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_01[index % EXAMPLES_01.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_01[index % EXAMPLES_01.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
