export type AssetKind = "image" | "video" | "audio";
export type EditOp = "crop" | "rotate" | "adjust" | "mask" | "remove" | "replace" | "inpaint" | "expand" | "stylize" | "trim" | "speed" | "transition";
export interface MediaAsset { id: string; kind: AssetKind; uri: string; width: number; height: number; durationMs?: number; }
export interface EditCommand { id: string; op: EditOp; payload: Record<string, unknown>; createdAt: number; }
export interface CropRect { x: number; y: number; width: number; height: number; }
export interface DetectedObject { id: string; label: string; confidence: number; box: [number, number, number, number]; maskUri?: string; }

export const RATIOS = { original: null, square: 1, "4:5": 0.8, "4:3": 4 / 3, "16:9": 16 / 9, "9:16": 9 / 16 } as const;
export function clampCrop(crop: CropRect): CropRect { return { x: Math.max(0, crop.x), y: Math.max(0, crop.y), width: Math.max(0.01, crop.width), height: Math.max(0.01, crop.height) }; }
export function fitCrop(ratio: number, sourceW: number, sourceH: number): CropRect { const source = sourceW / sourceH; if (source > ratio) { const width = ratio * sourceH; return { x: (sourceW - width) / 2, y: 0, width, height: sourceH }; } const height = sourceW / ratio; return { x: 0, y: (sourceH - height) / 2, width: sourceW, height }; }
export function normalizeRotation(degrees: number) { return ((degrees % 360) + 360) % 360; }
export function pickClosest(objects: DetectedObject[], x: number, y: number) { return objects.filter((object) => x >= object.box[0] && y >= object.box[1] && x <= object.box[0] + object.box[2] && y <= object.box[1] + object.box[3]).sort((a, b) => b.confidence - a.confidence)[0] ?? null; }
export function createEditCommand(op: EditOp, payload: Record<string, unknown>, now = Date.now()): EditCommand { return { id: `edit-${now}-${Math.random().toString(36).slice(2, 8)}`, op, payload, createdAt: now }; }

export class History<T> {
  private past: T[] = [];
  private future: T[] = [];
  constructor(private present: T) {}
  current() { return this.present; }
  commit(next: T) { this.past.push(this.present); this.present = next; this.future = []; return this.present; }
  undo() { const previous = this.past.pop(); if (previous === undefined) return this.present; this.future.push(this.present); this.present = previous; return this.present; }
  redo() { const next = this.future.pop(); if (next === undefined) return this.present; this.past.push(this.present); this.present = next; return this.present; }
}

export function createAutosaver(save: (state: unknown) => Promise<void>, delay = 800) { let timer: ReturnType<typeof setTimeout> | undefined; return (state: unknown) => { if (timer) clearTimeout(timer); timer = setTimeout(() => void save(state), delay); }; }
