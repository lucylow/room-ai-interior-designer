import type { DatasetExample } from '../../core/types';
export const EXAMPLES_11: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-11-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'den', style: 'coastal-modern',
  text: `Create a coastal-modern den using sand; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['coastal-modern','den','sand','wall','window'], difficulty: 0.2 + ((n + 11) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_11[index % EXAMPLES_11.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_11[index % EXAMPLES_11.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
