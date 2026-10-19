import type { DatasetExample } from '../../core/types';
export const EXAMPLES_09: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-9-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'dining-room', style: 'warm-minimal',
  text: `Create a warm-minimal dining-room using ink-brass; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['warm-minimal','dining-room','ink-brass','wall','window'], difficulty: 0.2 + ((n + 9) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_09[index % EXAMPLES_09.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_09[index % EXAMPLES_09.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
