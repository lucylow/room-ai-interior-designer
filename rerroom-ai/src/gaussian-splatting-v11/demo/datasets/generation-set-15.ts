import type { DatasetExample } from '../../core/types';
export const EXAMPLES_15: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-15-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'den', style: 'industrial',
  text: `Create a industrial den using dusty-blue; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['industrial','den','dusty-blue','wall','window'], difficulty: 0.2 + ((n + 15) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_15[index % EXAMPLES_15.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_15[index % EXAMPLES_15.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
