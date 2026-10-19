import type { DatasetExample } from '../../core/types';
export const EXAMPLES_16: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-16-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'living-room', style: 'japandi',
  text: `Create a japandi living-room using terracotta; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['japandi','living-room','terracotta','wall','window'], difficulty: 0.2 + ((n + 16) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_16[index % EXAMPLES_16.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_16[index % EXAMPLES_16.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
