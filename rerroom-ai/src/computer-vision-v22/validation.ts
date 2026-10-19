import type { HardCase, SceneAnnotation, ValidationIssue, ValidationReport, Vec3 } from "./types";

const hardCases = new Set<HardCase>([
  "glass_reflection",
  "mirror_reflection",
  "heavy_occlusion",
  "low_light",
  "backlighting",
  "repeated_furniture",
  "clutter",
  "thin_objects",
  "wide_angle_distortion",
  "depth_dropout",
  "partial_room_scan",
]);
const confidenceFields = ["visibility", "occlusion", "confidence"] as const;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const isVec3 = (value: unknown): value is Vec3 =>
  isObject(value) && finite(value.x) && finite(value.y) && finite(value.z);
const inUnitRange = (value: number): boolean => value >= 0 && value <= 1;

function polygonArea(points: Array<{ x: number; z: number }>): number {
  return (
    Math.abs(
      points.reduce((sum, point, index) => {
        const next = points[(index + 1) % points.length];
        return sum + point.x * next.z - next.x * point.z;
      }, 0),
    ) / 2
  );
}

function segmentsIntersect(
  a: { x: number; z: number },
  b: { x: number; z: number },
  c: { x: number; z: number },
  d: { x: number; z: number },
): boolean {
  const orient = (p: typeof a, q: typeof a, r: typeof a) =>
    (q.x - p.x) * (r.z - p.z) - (q.z - p.z) * (r.x - p.x);
  const abC = orient(a, b, c);
  const abD = orient(a, b, d);
  const cdA = orient(c, d, a);
  const cdB = orient(c, d, b);
  return abC * abD < 0 && cdA * cdB < 0;
}

function issue(
  issues: ValidationIssue[],
  code: string,
  path: string,
  message: string,
  severity: ValidationIssue["severity"] = "error",
): void {
  issues.push({ code, path, severity, message });
}

export function isSceneAnnotation(value: unknown): value is SceneAnnotation {
  if (!isObject(value)) return false;
  return (
    value.schemaVersion === "room-ai-cv-v22" &&
    typeof value.id === "string" &&
    typeof value.split === "string" &&
    isObject(value.room) &&
    isObject(value.camera) &&
    isObject(value.depth) &&
    Array.isArray(value.instances) &&
    Array.isArray(value.materials) &&
    Array.isArray(value.relations) &&
    Array.isArray(value.structuralPlanes) &&
    isObject(value.topology) &&
    Array.isArray(value.topology.floorplan) &&
    Array.isArray(value.topology.openings) &&
    Array.isArray(value.topology.walkways) &&
    Array.isArray(value.topology.connectedRoomIds) &&
    Array.isArray(value.tracks) &&
    isObject(value.reconstruction) &&
    isObject(value.tour) &&
    Array.isArray(value.hardCases) &&
    isObject(value.privacy) &&
    isObject(value.provenance) &&
    Array.isArray(value.augmentations)
  );
}

function checkConfidence(issues: ValidationIssue[], value: unknown, path: string): void {
  if (!finite(value) || !inUnitRange(value)) {
    issue(issues, "confidence_out_of_range", path, "Expected a finite value in [0, 1].");
  }
}

function checkVec3(issues: ValidationIssue[], value: unknown, path: string): void {
  if (!isVec3(value)) issue(issues, "invalid_vector", path, "Expected finite x, y, and z coordinates.");
}

export function validateScene(value: unknown): ValidationReport {
  const issues: ValidationIssue[] = [];
  if (!isSceneAnnotation(value)) {
    return {
      valid: false,
      issues: [
        {
          code: "invalid_scene_shape",
          path: "$",
          severity: "error",
          message: "Missing required scene fields or invalid field containers.",
        },
      ],
    };
  }
  const scene = value;

  if (!scene.id.trim()) issue(issues, "missing_scene_id", "id", "Scene ID must not be empty.");
  if (!["train", "validation", "test", "challenge"].includes(scene.split)) {
    issue(issues, "invalid_split", "split", "Split must be train, validation, test, or challenge.");
  }
  if (!["synthetic", "captured", "rendered"].includes(scene.source)) {
    issue(issues, "invalid_source", "source", "Source must be synthetic, captured, or rendered.");
  }
  if (
    ![
      "living_room",
      "bedroom",
      "kitchen",
      "bathroom",
      "office",
      "dining_room",
      "hallway",
      "studio",
      "nursery",
    ].includes(scene.room.kind)
  ) {
    issue(issues, "invalid_room_kind", "room.kind", "Room type must use a supported ontology value.");
  }
  for (const key of ["widthM", "lengthM", "heightM", "areaM2"] as const) {
    if (!finite(scene.room[key]) || scene.room[key] <= 0) {
      issue(
        issues,
        "invalid_room_dimension",
        `room.${key}`,
        "Room dimensions and area must be finite and positive.",
      );
    }
  }
  if (!finite(scene.room.measurementUncertaintyM) || scene.room.measurementUncertaintyM < 0) {
    issue(
      issues,
      "invalid_measurement_uncertainty",
      "room.measurementUncertaintyM",
      "Measurement uncertainty must be finite and non-negative.",
    );
  }
  checkConfidence(issues, scene.room.measurementConfidence, "room.measurementConfidence");

  if (!Number.isInteger(scene.camera.widthPx) || scene.camera.widthPx <= 0) {
    issue(issues, "invalid_camera_dimensions", "camera.widthPx", "Camera width must be a positive integer.");
  }
  if (!Number.isInteger(scene.camera.heightPx) || scene.camera.heightPx <= 0) {
    issue(
      issues,
      "invalid_camera_dimensions",
      "camera.heightPx",
      "Camera height must be a positive integer.",
    );
  }
  checkVec3(issues, scene.camera.positionM, "camera.positionM");
  for (const key of ["yawRadians", "pitchRadians", "rollRadians"] as const) {
    if (!finite(scene.camera[key]))
      issue(issues, "invalid_camera_pose", `camera.${key}`, "Camera pose values must be finite.");
  }
  for (const key of ["horizontalFovDegrees", "verticalFovDegrees"] as const) {
    if (!finite(scene.camera[key]) || scene.camera[key] <= 0 || scene.camera[key] >= 180) {
      issue(
        issues,
        "invalid_camera_fov",
        `camera.${key}`,
        "Field of view must be between 0 and 180 degrees.",
      );
    }
  }

  const depthValues = [scene.depth.minM, scene.depth.medianM, scene.depth.p90M, scene.depth.maxM];
  if (
    !depthValues.every(finite) ||
    depthValues.some((depth) => depth <= 0) ||
    depthValues.some((depth, index) => index > 0 && depth < depthValues[index - 1])
  ) {
    issue(
      issues,
      "invalid_depth_range",
      "depth",
      "Depth quantiles must be finite, positive, and monotonically increasing.",
    );
  }
  checkConfidence(issues, scene.depth.validFraction, "depth.validFraction");
  checkConfidence(issues, scene.depth.confidence, "depth.confidence");

  const instanceIds = new Set<string>();
  for (const [index, instance] of scene.instances.entries()) {
    const path = `instances[${index}]`;
    if (!isObject(instance)) {
      issue(issues, "invalid_instance", path, "Instance annotation must be an object.");
      continue;
    }
    if (typeof instance.id !== "string" || !instance.id.trim() || instanceIds.has(instance.id)) {
      issue(issues, "invalid_instance_id", `${path}.id`, "Instance IDs must be non-empty and unique.");
    } else {
      instanceIds.add(instance.id);
    }
    if (typeof instance.category !== "string" || !instance.category.trim()) {
      issue(issues, "missing_category", `${path}.category`, "Object category must not be empty.");
    }
    const box = instance.box2D;
    if (!isObject(box) || !["x", "y", "width", "height"].every((key) => finite(box[key]))) {
      issue(issues, "invalid_2d_box", `${path}.box2D`, "2D box values must be finite.");
    } else if (
      box.x < 0 ||
      box.y < 0 ||
      box.width <= 0 ||
      box.height <= 0 ||
      box.x + box.width > 1 ||
      box.y + box.height > 1
    ) {
      issue(
        issues,
        "2d_box_out_of_bounds",
        `${path}.box2D`,
        "Normalized box must have positive area and remain within [0, 1].",
      );
    }
    if (!isObject(instance.cuboid3D)) {
      issue(issues, "invalid_cuboid", `${path}.cuboid3D`, "Cuboid annotation is required.");
    } else {
      checkVec3(issues, instance.cuboid3D.center, `${path}.cuboid3D.center`);
      checkVec3(issues, instance.cuboid3D.size, `${path}.cuboid3D.size`);
      if (
        isVec3(instance.cuboid3D.size) &&
        [instance.cuboid3D.size.x, instance.cuboid3D.size.y, instance.cuboid3D.size.z].some(
          (size) => size <= 0,
        )
      ) {
        issue(
          issues,
          "invalid_cuboid_size",
          `${path}.cuboid3D.size`,
          "Cuboid dimensions must all be positive.",
        );
      }
      if (!finite(instance.cuboid3D.yawRadians)) {
        issue(issues, "invalid_cuboid_yaw", `${path}.cuboid3D.yawRadians`, "Cuboid yaw must be finite.");
      }
    }
    if (
      ![
        "wood",
        "metal",
        "glass",
        "stone",
        "ceramic",
        "fabric",
        "leather",
        "plastic",
        "paint",
        "marble",
        "concrete",
        "mixed",
        "unknown",
      ].includes(instance.material)
    ) {
      issue(issues, "invalid_material", `${path}.material`, "Material must use a supported ontology value.");
    }
    for (const key of confidenceFields) checkConfidence(issues, instance[key], `${path}.${key}`);
  }

  const instanceIdSet = new Set(instanceIds);
  for (const [index, relation] of scene.relations.entries()) {
    const path = `relations[${index}]`;
    if (
      !isObject(relation) ||
      !instanceIdSet.has(relation.subjectId) ||
      !instanceIdSet.has(relation.objectId)
    ) {
      issue(
        issues,
        "dangling_relation",
        path,
        "Spatial relation endpoints must reference existing instances.",
      );
      continue;
    }
    if (
      relation.subjectId === relation.objectId ||
      typeof relation.predicate !== "string" ||
      !relation.predicate.trim()
    ) {
      issue(issues, "invalid_relation", path, "Relations require distinct endpoints and a predicate.");
    }
    checkConfidence(issues, relation.confidence, `${path}.confidence`);
  }
  for (const [index, material] of scene.materials.entries()) {
    const path = `materials[${index}]`;
    if (!isObject(material) || !instanceIdSet.has(material.instanceId)) {
      issue(
        issues,
        "dangling_material_annotation",
        path,
        "Material annotation must reference an existing instance.",
      );
      continue;
    }
    if (
      material.material !==
      scene.instances.find((instance) => isObject(instance) && instance.id === material.instanceId)?.material
    ) {
      issue(
        issues,
        "material_cross_modal_mismatch",
        `${path}.material`,
        "Material annotation disagrees with the instance label.",
      );
    }
    checkConfidence(issues, material.confidence, `${path}.confidence`);
  }
  const materialInstanceIds = new Set(
    scene.materials.map((material) =>
      isObject(material) && typeof material.instanceId === "string" ? material.instanceId : "",
    ),
  );
  for (const instanceId of instanceIds) {
    if (!materialInstanceIds.has(instanceId)) {
      issue(
        issues,
        "missing_material_annotation",
        "materials",
        `Instance ${instanceId} has no material confidence annotation.`,
      );
    }
  }

  const planeIds = new Set<string>();
  for (const [index, plane] of scene.structuralPlanes.entries()) {
    const path = `structuralPlanes[${index}]`;
    if (!isObject(plane) || typeof plane.id !== "string" || !plane.id.trim() || planeIds.has(plane.id)) {
      issue(issues, "invalid_plane_id", `${path}.id`, "Structural plane IDs must be unique.");
      continue;
    }
    planeIds.add(plane.id);
    checkVec3(issues, plane.normal, `${path}.normal`);
    checkVec3(issues, plane.point, `${path}.point`);
    if (!finite(plane.areaM2) || plane.areaM2 <= 0) {
      issue(issues, "invalid_plane_area", `${path}.areaM2`, "Structural plane area must be positive.");
    }
    if (
      isVec3(plane.normal) &&
      Math.abs(Math.hypot(plane.normal.x, plane.normal.y, plane.normal.z) - 1) > 0.02
    ) {
      issue(issues, "non_unit_plane_normal", `${path}.normal`, "Structural plane normal must be normalized.");
    }
    checkConfidence(issues, plane.confidence, `${path}.confidence`);
  }

  const floorplan = scene.topology.floorplan;
  if (
    !Array.isArray(floorplan) ||
    floorplan.length < 3 ||
    floorplan.some((point) => !isObject(point) || !finite(point.x) || !finite(point.z))
  ) {
    issue(
      issues,
      "invalid_floorplan",
      "topology.floorplan",
      "Floorplan must contain at least three finite 2D vertices.",
    );
  } else {
    const areaM2 = polygonArea(floorplan);
    let selfIntersection = false;
    if (areaM2 <= 0 || Math.abs(areaM2 - scene.room.areaM2) > Math.max(0.1, scene.room.areaM2 * 0.05)) {
      issue(
        issues,
        "floorplan_area_mismatch",
        "topology.floorplan",
        "Floorplan polygon area differs from the measured room area by more than 5%.",
      );
    }
    for (const [index, point] of floorplan.entries()) {
      if (
        Math.abs(point.x) > scene.room.widthM / 2 + scene.room.measurementUncertaintyM ||
        Math.abs(point.z) > scene.room.lengthM / 2 + scene.room.measurementUncertaintyM
      ) {
        issue(
          issues,
          "floorplan_out_of_bounds",
          `topology.floorplan[${index}]`,
          "Floorplan vertices must lie within the measured room extents.",
        );
      }
      const nextIndex = (index + 1) % floorplan.length;
      for (let otherIndex = index + 1; otherIndex < floorplan.length; otherIndex += 1) {
        const otherNext = (otherIndex + 1) % floorplan.length;
        if (index === otherIndex || nextIndex === otherIndex || otherNext === index) continue;
        if (segmentsIntersect(point, floorplan[nextIndex], floorplan[otherIndex], floorplan[otherNext])) {
          selfIntersection = true;
          break;
        }
      }
    }
    if (selfIntersection) {
      issue(
        issues,
        "self_intersecting_floorplan",
        "topology.floorplan",
        "Floorplan boundary must not self-intersect.",
      );
    }
  }
  const openingIds = new Set<string>();
  for (const [index, opening] of scene.topology.openings.entries()) {
    const path = `topology.openings[${index}]`;
    if (
      !isObject(opening) ||
      typeof opening.id !== "string" ||
      !opening.id.trim() ||
      openingIds.has(opening.id)
    ) {
      issue(issues, "invalid_opening_id", `${path}.id`, "Opening IDs must be unique.");
      continue;
    }
    openingIds.add(opening.id);
    if (opening.kind !== "door" && opening.kind !== "window") {
      issue(issues, "invalid_opening_kind", `${path}.kind`, "Opening kind must be door or window.");
    }
    if (!planeIds.has(opening.wallId)) {
      issue(
        issues,
        "dangling_opening_wall",
        `${path}.wallId`,
        "Opening must reference an annotated structural plane.",
      );
    }
  }
  for (const [index, walkway] of scene.topology.walkways.entries()) {
    const path = `topology.walkways[${index}]`;
    if (
      !isObject(walkway) ||
      !finite(walkway.clearanceM) ||
      !finite(walkway.requiredClearanceM) ||
      walkway.clearanceM < 0 ||
      walkway.requiredClearanceM <= 0
    ) {
      issue(
        issues,
        "invalid_walkway_clearance",
        path,
        "Clearance must be non-negative and required clearance positive.",
      );
    } else if (walkway.clearanceM < walkway.requiredClearanceM) {
      issue(
        issues,
        "insufficient_walkway_clearance",
        path,
        "Measured walkway clearance is below its required minimum.",
        "warning",
      );
    }
  }

  const trackIds = new Set<string>();
  for (const [index, track] of scene.tracks.entries()) {
    const path = `tracks[${index}]`;
    if (!isObject(track) || typeof track.id !== "string" || !track.id.trim() || trackIds.has(track.id)) {
      issue(issues, "invalid_track_id", `${path}.id`, "Track IDs must be unique.");
      continue;
    }
    trackIds.add(track.id);
    if (!Array.isArray(track.instanceIds) || track.instanceIds.some((id) => !instanceIdSet.has(id))) {
      issue(
        issues,
        "dangling_track_instance",
        `${path}.instanceIds`,
        "Tracks must reference existing instances.",
      );
    }
    if (
      !Array.isArray(track.timestampsMs) ||
      track.timestampsMs.some(
        (timestamp, i) => !finite(timestamp) || (i > 0 && timestamp <= track.timestampsMs[i - 1]),
      )
    ) {
      issue(
        issues,
        "invalid_track_timestamps",
        `${path}.timestampsMs`,
        "Track timestamps must be finite and strictly increasing.",
      );
    }
    if (
      Array.isArray(track.instanceIds) &&
      Array.isArray(track.timestampsMs) &&
      track.instanceIds.length !== track.timestampsMs.length
    ) {
      issue(
        issues,
        "track_frame_count_mismatch",
        path,
        "Each tracked instance must have one matching timestamp.",
      );
    }
    if (Array.isArray(track.instanceIds) && new Set(track.instanceIds).size !== track.instanceIds.length) {
      issue(
        issues,
        "duplicate_track_instance",
        `${path}.instanceIds`,
        "A track must not reference the same instance more than once.",
      );
    }
  }
  for (const [index, instance] of scene.instances.entries()) {
    if (isObject(instance) && typeof instance.trackId === "string" && !trackIds.has(instance.trackId)) {
      issue(
        issues,
        "dangling_instance_track",
        `instances[${index}].trackId`,
        "Instance track ID must reference a declared track.",
      );
    }
  }
  for (const key of [
    "meshCompleteness",
    "splatCoverage",
    "textureCoverage",
    "cameraPoseStability",
    "confidence",
  ] as const) {
    checkConfidence(issues, scene.reconstruction[key], `reconstruction.${key}`);
  }
  for (const key of ["seamQuality", "keyframeDiversity", "transitionQuality"] as const) {
    checkConfidence(issues, scene.tour[key], `tour.${key}`);
  }
  if (
    !finite(scene.tour.panoramaCoverageDegrees) ||
    scene.tour.panoramaCoverageDegrees < 0 ||
    scene.tour.panoramaCoverageDegrees > 360
  ) {
    issue(
      issues,
      "invalid_panorama_coverage",
      "tour.panoramaCoverageDegrees",
      "Panorama coverage must be in [0, 360] degrees.",
    );
  }

  for (const [index, hardCase] of scene.hardCases.entries()) {
    if (!hardCases.has(hardCase))
      issue(
        issues,
        "unknown_hard_case",
        `hardCases[${index}]`,
        "Hard-case label is not in the supported taxonomy.",
      );
  }
  if (scene.source === "synthetic" && scene.provenance.photographicPixelsIncluded) {
    issue(
      issues,
      "synthetic_pixel_provenance_mismatch",
      "provenance.photographicPixelsIncluded",
      "Synthetic metadata cannot claim photographic pixels.",
    );
  }
  if (!Number.isSafeInteger(scene.provenance.seed)) {
    issue(issues, "invalid_provenance_seed", "provenance.seed", "Provenance seed must be a safe integer.");
  }
  if (typeof scene.provenance.sceneGroupId !== "string" || !scene.provenance.sceneGroupId.trim()) {
    issue(
      issues,
      "missing_scene_group_id",
      "provenance.sceneGroupId",
      "Scene group ID is required for split-leakage checks.",
    );
  }
  if (!["local_only", "review_required", "exportable"].includes(scene.privacy.classification)) {
    issue(
      issues,
      "invalid_privacy_classification",
      "privacy.classification",
      "Privacy classification must be explicit.",
    );
  }
  if (
    scene.source === "captured" &&
    scene.privacy.classification === "exportable" &&
    !scene.privacy.captureConsent
  ) {
    issue(
      issues,
      "captured_scene_missing_consent",
      "privacy.captureConsent",
      "Captured scenes require documented consent before export approval.",
    );
  }
  for (const [index, augmentation] of scene.augmentations.entries()) {
    if (
      !isObject(augmentation) ||
      !hardCases.has(augmentation.kind) ||
      !Number.isSafeInteger(augmentation.seed) ||
      augmentation.appliedAt !== "metadata"
    ) {
      issue(
        issues,
        "invalid_augmentation_record",
        `augmentations[${index}]`,
        "Augmentation records require a supported hard case, safe seed, and metadata-only marker.",
      );
    } else if (!scene.hardCases.includes(augmentation.kind)) {
      issue(
        issues,
        "augmentation_label_missing",
        `augmentations[${index}].kind`,
        "Augmentation audit record is missing its hard-case tag.",
      );
    }
  }
  return { valid: !issues.some(({ severity }) => severity === "error"), issues };
}

export function assertValidScene(value: unknown, context: string): asserts value is SceneAnnotation {
  const report = validateScene(value);
  if (report.valid) return;
  const details = report.issues
    .filter(({ severity }) => severity === "error")
    .map(({ code, path }) => `${path}:${code}`)
    .join(",");
  throw new Error(`${context}:${details || "invalid_scene"}`);
}
