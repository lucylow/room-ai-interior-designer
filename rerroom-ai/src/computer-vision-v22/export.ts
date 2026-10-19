import { isSceneAnnotation, validateScene } from "./validation";
import type { SceneAnnotation } from "./types";

function assertExportableScenes(scenes: readonly SceneAnnotation[]): void {
  for (const [index, scene] of scenes.entries()) {
    const report = validateScene(scene);
    if (isSceneAnnotation(scene) && report.valid) continue;
    const id = isSceneAnnotation(scene) ? scene.id : "unknown";
    const code = report.issues.find(({ severity }) => severity === "error")?.code ?? "invalid_scene_shape";
    throw new Error(`invalid_scene_export:row_${index + 1}:${id}:${code}`);
  }
}

export function toJsonl(scenes: readonly SceneAnnotation[]): string {
  assertExportableScenes(scenes);
  return scenes.map((scene) => JSON.stringify(scene)).join("\n") + (scenes.length ? "\n" : "");
}

export function fromJsonl(input: string): SceneAnnotation[] {
  if (typeof input !== "string") throw new TypeError("jsonl_input_must_be_a_string");
  if (!input.trim()) return [];
  return input
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(line);
      } catch (error) {
        throw new Error(`invalid_jsonl_row:${index + 1}:${String(error)}`);
      }
      const report = validateScene(parsed);
      if (!isSceneAnnotation(parsed) || !report.valid) {
        throw new Error(`invalid_scene_row:${index + 1}:${report.issues[0].code}`);
      }
      return parsed;
    });
}

export interface CocoLikeExport {
  images: Array<{
    id: number;
    file_name: string;
    width: number;
    height: number;
    metadata: {
      scene_id: string;
      room: string;
      synthetic_metadata_only: boolean;
      split: string;
    };
  }>;
  annotations: Array<{
    id: number;
    image_id: number;
    category_id: number;
    bbox: [number, number, number, number];
    area: number;
    iscrowd: 0;
    attributes: {
      instance_id: string;
      material: string;
      cuboid3d_m: {
        center: SceneAnnotation["instances"][number]["cuboid3D"]["center"];
        size: SceneAnnotation["instances"][number]["cuboid3D"]["size"];
        yaw_radians: number;
      };
      occlusion: number;
      confidence: number;
    };
  }>;
  categories: Array<{ id: number; name: string }>;
}

export function toCocoLike(scenes: readonly SceneAnnotation[]): CocoLikeExport {
  assertExportableScenes(scenes);
  const privacy = auditPrivacy(scenes);
  if (!privacy.allowed) throw new Error(`privacy_audit_blocked:${privacy.errors.join(";")}`);
  const categoryIds = new Map<string, number>();
  for (const category of [
    ...new Set(scenes.flatMap((scene) => scene.instances.map((instance) => instance.category))),
  ].sort()) {
    categoryIds.set(category, categoryIds.size + 1);
  }
  const images: CocoLikeExport["images"] = [];
  const annotations: CocoLikeExport["annotations"] = [];
  let annotationId = 1;

  scenes.forEach((scene, sceneIndex) => {
    const imageId = sceneIndex + 1;
    images.push({
      id: imageId,
      file_name: `metadata/${encodeURIComponent(scene.id)}.json`,
      width: scene.camera.widthPx,
      height: scene.camera.heightPx,
      metadata: {
        scene_id: scene.id,
        room: scene.room.kind,
        synthetic_metadata_only: !scene.provenance.photographicPixelsIncluded,
        split: scene.split,
      },
    });
    for (const instance of scene.instances) {
      const bbox: [number, number, number, number] = [
        instance.box2D.x * scene.camera.widthPx,
        instance.box2D.y * scene.camera.heightPx,
        instance.box2D.width * scene.camera.widthPx,
        instance.box2D.height * scene.camera.heightPx,
      ];
      annotations.push({
        id: annotationId++,
        image_id: imageId,
        category_id: categoryIds.get(instance.category)!,
        bbox,
        area: bbox[2] * bbox[3],
        iscrowd: 0,
        attributes: {
          instance_id: instance.id,
          material: instance.material,
          cuboid3d_m: {
            center: instance.cuboid3D.center,
            size: instance.cuboid3D.size,
            yaw_radians: instance.cuboid3D.yawRadians,
          },
          occlusion: instance.occlusion,
          confidence: instance.confidence,
        },
      });
    }
  });

  return {
    images,
    annotations,
    categories: [...categoryIds].map(([name, id]) => ({ id, name })),
  };
}

export interface PrivacyAudit {
  allowed: boolean;
  checked: number;
  errors: string[];
}

export function auditPrivacy(scenes: readonly unknown[]): PrivacyAudit {
  const errors: string[] = [];
  scenes.forEach((scene, index) => {
    const report = validateScene(scene);
    if (!report.valid || !isSceneAnnotation(scene)) {
      const codes = report.issues
        .filter(({ severity }) => severity === "error")
        .map(({ code }) => code)
        .join(",");
      errors.push(`row ${index + 1} (unknown):invalid_scene_schema:${codes || "invalid_scene_shape"}`);
      return;
    }
    if (scene.source === "captured" && !scene.privacy.captureConsent) {
      errors.push(`row ${index + 1} (${scene.id}):captured_scene_missing_consent`);
    }
    if (scene.privacy.classification !== "exportable") {
      errors.push(`row ${index + 1} (${scene.id}):scene_not_approved_for_export`);
    }
    if (scene.privacy.containsPersonalData) {
      errors.push(`row ${index + 1} (${scene.id}):personal_data_present`);
    }
    if (scene.privacy.preciseLocationPresent) {
      errors.push(`row ${index + 1} (${scene.id}):precise_location_present`);
    }
  });
  return { allowed: errors.length === 0, checked: scenes.length, errors };
}

export function toPrivacyAuditedJsonl(scenes: readonly SceneAnnotation[]): string {
  const audit = auditPrivacy(scenes);
  if (!audit.allowed) throw new Error(`privacy_audit_blocked:${audit.errors.join(";")}`);
  return toJsonl(scenes);
}
