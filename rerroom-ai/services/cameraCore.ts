export type ScanAngle = "front" | "left" | "right" | "corner" | "wide";
export interface ScanPhoto { uri: string; angle: ScanAngle; quality: number; timestamp: number; }
export interface CameraSession { id: string; photos: ScanPhoto[]; startedAt: number; completed: boolean; }
export interface PhotoQualityInput { width: number; height: number; bytes?: number; sharpness?: number; luma?: number; highlightRatio?: number; }
export const CAMERA_CONFIG = { quality: 0.92, minPhotos: 3, maxPhotos: 12, minCaptureIntervalMs: 700 } as const;
export function guidance(input: { blur?: boolean; dark?: boolean; close?: boolean; incomplete?: boolean }) { if (input.blur) return "Hold still"; if (input.dark) return "Add more light"; if (input.close) return "Step back"; if (input.incomplete) return "Include floor and ceiling"; return "Ready"; }
export function exposureHint(luma: number) { return luma < 0.25 ? "Dark room" : luma > 0.82 ? "Too bright" : "Exposure looks good"; }
export function validatePhoto(input: PhotoQualityInput) { const warnings: string[] = []; if (input.width < 768 || input.height < 768) warnings.push("Move closer or use a higher-resolution photo"); if (input.bytes && input.bytes > 12 * 1024 * 1024) warnings.push("Photo is too large to upload"); if (input.sharpness !== undefined && input.sharpness < 0.28) warnings.push("Hold still for a sharper photo"); if (input.luma !== undefined && input.luma < 0.22) warnings.push("Add more light to the room"); if (input.highlightRatio !== undefined && input.highlightRatio > 0.18) warnings.push("Reduce glare from windows or lamps"); return { ok: warnings.length === 0, warnings }; }
export function nextAngle(done: ScanAngle[]): ScanAngle { return (["front", "left", "right", "corner"] as const).find((angle) => !done.includes(angle)) ?? "wide"; }
export function scanComplete(count: number, minimum = CAMERA_CONFIG.minPhotos) { return count >= minimum; }
export function scanProgress(current: number, total = CAMERA_CONFIG.minPhotos) { return total ? Math.round((current / total) * 100) : 0; }
export function canCapture(now: number, lastCapture: number, interval = CAMERA_CONFIG.minCaptureIntervalMs) { return now - lastCapture >= interval; }
export function serializeSession(session: CameraSession) { return JSON.stringify(session); }
export function canResume(session: CameraSession | null) { return !!session && !session.completed && session.photos.length > 0; }
export function shouldConfirmExit(photoCount: number) { return photoCount > 0; }
