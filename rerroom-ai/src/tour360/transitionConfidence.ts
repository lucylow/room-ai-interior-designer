export interface TourRoom { id: string; center: { x: number; z: number }; confidence?: number; }
export interface TourTransition { from: string; to: string; distance: number; confidence: number; reachable: boolean; warnings: string[]; }
export interface TransitionOptions { maxDistance?: number; minimumRoomConfidence?: number; }
const clamp = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

export function buildTransitions(rooms: TourRoom[], options: TransitionOptions = {}): TourTransition[] {
  const maxDistance = Math.max(0.1, options.maxDistance ?? 8);
  const minimumRoomConfidence = clamp(options.minimumRoomConfidence ?? 0.5);
  const transitions: TourTransition[] = [];
  for (let i = 0; i < rooms.length; i += 1) {
    for (let j = i + 1; j < rooms.length; j += 1) {
      const from = rooms[i], to = rooms[j];
      const distance = Math.hypot(from.center.x - to.center.x, from.center.z - to.center.z);
      if (distance > maxDistance) continue;
      const roomConfidence = Math.min(from.confidence ?? 1, to.confidence ?? 1);
      const distanceConfidence = clamp(1 - distance / maxDistance);
      const confidence = clamp(distanceConfidence * roomConfidence);
      const warnings = [roomConfidence < minimumRoomConfidence ? "room-confidence-low" : "", distance < 0.1 ? "room-centers-overlap" : ""].filter(Boolean);
      transitions.push({ from: from.id, to: to.id, distance, confidence, reachable: confidence >= 0.35 && roomConfidence >= minimumRoomConfidence, warnings });
    }
  }
  return transitions.sort((a, b) => b.confidence - a.confidence || a.distance - b.distance);
}
