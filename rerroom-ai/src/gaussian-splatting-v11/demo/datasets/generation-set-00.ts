import type { DatasetExample } from '../../core/types';
export const EXAMPLES_00: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-0-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'living-room', style: 'modern',
  text: `Create a modern living-room using warm-white; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['modern','living-room','warm-white','wall','window'], difficulty: 0.2 + ((n + 0) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_00[index % EXAMPLES_00.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_00[index % EXAMPLES_00.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
