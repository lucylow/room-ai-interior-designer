import type { DatasetExample } from '../../core/types';
export const EXAMPLES_18: DatasetExample[] = Array.from({ length: 18 }, (_, n) => ({
  id: `v11-example-18-${n}`, task: n % 2 ? 'edit' : 'caption', roomType: 'entryway', style: 'organic-modern',
  text: `Create a organic-modern entryway using forest; preserve source geometry, maintain realistic scale, and keep construction anchors stable. Variant ${n}.`,
  expectedLabels: ['organic-modern','entryway','forest','wall','window'], difficulty: 0.2 + ((n + 18) % 9) * 0.08,
}));
export function exampleDifficulty(index: number): number { return EXAMPLES_18[index % EXAMPLES_18.length].difficulty; }
export function exampleFingerprint(index: number): string { const e=EXAMPLES_18[index % EXAMPLES_18.length]; return `${e.roomType}|${e.style}|${e.text.slice(0,32)}`; }
