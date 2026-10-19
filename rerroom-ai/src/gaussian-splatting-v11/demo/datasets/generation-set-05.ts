import type { DatasetExample } from '../../core/types';
export const EXAMPLES_05: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-5-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'dining-room', style: 'mid-century',
  text: `Create a mid-century dining-room using greige; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['mid-century','dining-room','greige','wall','window'], difficulty: 0.2 + ((n + 5) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_05[index % EXAMPLES_05.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_05[index % EXAMPLES_05.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
