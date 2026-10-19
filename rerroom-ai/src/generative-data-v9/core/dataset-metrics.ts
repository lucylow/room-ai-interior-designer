import type { DatasetRecord } from "../core/types";

export interface DatasetMetrics { total: number; gold: number; silver: number; review: number; rooms: number; styles: number; palettes: number; avgPromptLength: number; }

export function metrics(records: DatasetRecord[]): DatasetMetrics {
  const rooms = new Set(records.map(r => r.roomType)).size;
  const styles = new Set(records.map(r => r.style)).size;
  const palettes = new Set(records.map(r => r.paletteId)).size;
  const avgPromptLength = records.length ? records.reduce((s,r) => s + r.prompt.length, 0) / records.length : 0;
  return { total: records.length, gold: records.filter(r=>r.qualityTier === "gold").length, silver: records.filter(r=>r.qualityTier === "silver").length, review: records.filter(r=>r.qualityTier === "review").length, rooms, styles, palettes, avgPromptLength: Number(avgPromptLength.toFixed(2)) };
}
