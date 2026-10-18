import type { SceneObject, SpatialScene, Vec3 } from './types';
import { canPlaceObject } from './constraints';
import { clampObjectToRoom } from './transform';

export interface PackingCandidate {
  object: SceneObject;
  score: number;
  position: Vec3;
}

export function generatePackingCandidates(scene: SpatialScene, object: SceneObject, step = 0.25): PackingCandidate[] {
  const candidates: PackingCandidate[] = [];
  for (let x = 0; x <= scene.room.width; x += step) {
    for (let z = 0; z <= scene.room.depth; z += step) {
      const candidate = clampObjectToRoom({
        ...object,
        transform: { ...object.transform, position: { ...object.transform.position, x, z } },
      }, scene.room.width, scene.room.depth);
      if (!canPlaceObject(scene, candidate)) continue;
      const edgePenalty = Math.min(candidate.transform.position.x, candidate.transform.position.z,
        scene.room.width - candidate.transform.position.x, scene.room.depth - candidate.transform.position.z);
      candidates.push({
        object: candidate,
        position: candidate.transform.position,
        score: edgePenalty,
      });
    }
  }
  return candidates.sort((a, b) => b.score - a.score).slice(0, 32);
}

export function choosePackingCandidate(candidates: PackingCandidate[]): SceneObject | null {
  return candidates[0]?.object ?? null;
}
