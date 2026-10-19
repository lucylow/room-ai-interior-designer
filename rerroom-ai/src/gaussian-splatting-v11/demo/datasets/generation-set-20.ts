import type { DatasetExample } from '../../core/types';
export const EXAMPLES_20: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-20-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'living-room', style: 'contemporary',
  text: `Create a contemporary living-room using clay; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['contemporary','living-room','clay','wall','window'], difficulty: 0.2 + ((n + 20) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_20[index % EXAMPLES_20.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_20[index % EXAMPLES_20.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
