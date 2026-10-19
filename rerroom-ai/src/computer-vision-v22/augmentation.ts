import type { HardCase, SceneAnnotation } from "./types";
import { assertValidScene } from "./validation";

export function applyMetadataHardCase(scene: SceneAnnotation, kind: HardCase, seed: number): SceneAnnotation {
  if (!Number.isSafeInteger(seed)) throw new Error("augmentation_seed_must_be_a_safe_integer");
  assertValidScene(scene, "invalid_augmentation_scene");
  const augmented = {
    ...scene,
    hardCases: scene.hardCases.includes(kind) ? [...scene.hardCases] : [...scene.hardCases, kind],
    augmentations: [...scene.augmentations, { kind, seed, appliedAt: "metadata" }],
  };
  assertValidScene(augmented, "invalid_augmented_scene");
  return augmented;
}
