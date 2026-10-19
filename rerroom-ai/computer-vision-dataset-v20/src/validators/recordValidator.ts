import { DatasetRecord } from "../core/types";
export interface ValidationIssue {
  code: string;
  severity: "warning" | "error";
  message: string;
}
const isFiniteNumber = (value: number) => Number.isFinite(value);
const isConfidence = (value: number) => isFiniteNumber(value) && value >= 0 && value <= 1;

export function validateRecordValidator(record: DatasetRecord): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!record.id) issues.push({ code: "MISSING_ID", severity: "error", message: "record id missing" });
  if (!record.sequenceId)
    issues.push({ code: "MISSING_SEQUENCE", severity: "error", message: "sequence id missing" });
  if (!Number.isSafeInteger(record.frameIndex) || record.frameIndex < 0)
    issues.push({
      code: "FRAME_INDEX",
      severity: "error",
      message: "frame index must be a non-negative integer",
    });
  if (
    !isFiniteNumber(record.room.areaM2) ||
    record.room.areaM2 <= 0 ||
    !isFiniteNumber(record.room.perimeterM) ||
    record.room.perimeterM <= 0
  )
    issues.push({
      code: "ROOM_GEOMETRY",
      severity: "error",
      message: "room area and perimeter must be finite and positive",
    });
  const depthValues = [
    record.depth.min,
    record.depth.max,
    record.depth.mean,
    record.depth.median,
    record.depth.p10,
    record.depth.p90,
  ];
  if (
    depthValues.some((value) => !isFiniteNumber(value)) ||
    record.depth.min <= 0 ||
    record.depth.max < record.depth.min ||
    record.depth.p10 < record.depth.min ||
    record.depth.p10 > record.depth.median ||
    record.depth.median > record.depth.p90 ||
    record.depth.p90 > record.depth.max
  )
    issues.push({
      code: "DEPTH_ORDER",
      severity: "error",
      message: "depth statistics must be finite, positive, and ordered",
    });
  if (!isConfidence(record.depth.validFraction) || !isConfidence(record.depth.confidence))
    issues.push({
      code: "DEPTH_CONFIDENCE",
      severity: "error",
      message: "depth confidence values must be in [0,1]",
    });

  const objectIds = new Set<string>();
  for (const object of record.objects) {
    if (!object.id || objectIds.has(object.id))
      issues.push({
        code: "OBJECT_ID",
        severity: "error",
        message: `object id missing or duplicated: ${object.id}`,
      });
    objectIds.add(object.id);
    if (!isConfidence(object.detectionConfidence) || !isConfidence(object.truncation))
      issues.push({
        code: "OBJECT_CONFIDENCE",
        severity: "error",
        message: `confidence or truncation invalid for ${object.id}`,
      });
    const box = object.box2D;
    if (
      ![box.x, box.y, box.width, box.height].every(isFiniteNumber) ||
      box.x < 0 ||
      box.y < 0 ||
      box.width <= 0 ||
      box.height <= 0 ||
      box.x + box.width > 1 ||
      box.y + box.height > 1
    )
      issues.push({
        code: "BOX2D_RANGE",
        severity: "error",
        message: `2D box must fit normalized image bounds for ${object.id}`,
      });
    if (object.depthMeters !== undefined && (!isFiniteNumber(object.depthMeters) || object.depthMeters <= 0))
      issues.push({
        code: "OBJECT_DEPTH",
        severity: "error",
        message: `object depth invalid for ${object.id}`,
      });
    if (object.box3D) {
      const { center, size } = object.box3D;
      if (
        ![center.x, center.y, center.z, size.width, size.height, size.depth, object.box3D.yaw].every(
          isFiniteNumber,
        ) ||
        size.width <= 0 ||
        size.height <= 0 ||
        size.depth <= 0
      )
        issues.push({
          code: "BOX3D_GEOMETRY",
          severity: "error",
          message: `3D box geometry invalid for ${object.id}`,
        });
    }
  }
  for (const relation of record.relations) {
    if (
      !objectIds.has(relation.subjectId) ||
      !objectIds.has(relation.objectId) ||
      relation.subjectId === relation.objectId ||
      !isConfidence(relation.confidence)
    )
      issues.push({
        code: "RELATION_REFERENCE",
        severity: "error",
        message: "relation references missing objects or has invalid confidence",
      });
  }
  for (const plane of record.planes) {
    if (
      !plane.id ||
      !isConfidence(plane.confidence) ||
      !isFiniteNumber(plane.area) ||
      plane.area <= 0 ||
      plane.polygon.length < 3
    )
      issues.push({
        code: "PLANE_GEOMETRY",
        severity: "error",
        message: `plane geometry invalid for ${plane.id}`,
      });
  }
  const { intrinsics, pose } = record.camera;
  if (
    ![intrinsics.fx, intrinsics.fy, intrinsics.cx, intrinsics.cy, intrinsics.width, intrinsics.height].every(
      isFiniteNumber,
    ) ||
    intrinsics.fx <= 0 ||
    intrinsics.fy <= 0 ||
    intrinsics.width <= 0 ||
    intrinsics.height <= 0 ||
    intrinsics.cx < 0 ||
    intrinsics.cx > intrinsics.width ||
    intrinsics.cy < 0 ||
    intrinsics.cy > intrinsics.height
  )
    issues.push({ code: "CAMERA_INTRINSICS", severity: "error", message: "camera intrinsics are invalid" });
  if (
    ![pose.position.x, pose.position.y, pose.position.z, pose.yaw, pose.pitch, pose.roll].every(
      isFiniteNumber,
    ) ||
    !isFiniteNumber(record.camera.distanceToFloorM) ||
    record.camera.distanceToFloorM <= 0 ||
    !isConfidence(record.camera.motionBlur) ||
    !isConfidence(record.camera.exposure) ||
    !isFiniteNumber(record.camera.whiteBalanceDrift) ||
    record.camera.whiteBalanceDrift < 0
  )
    issues.push({
      code: "CAMERA_POSE",
      severity: "error",
      message: "camera pose or capture metadata is invalid",
    });
  if (
    !isFiniteNumber(record.lighting.colorTemperatureK) ||
    record.lighting.colorTemperatureK <= 0 ||
    !isFiniteNumber(record.lighting.intensityLux) ||
    record.lighting.intensityLux < 0 ||
    !isFiniteNumber(record.lighting.dynamicRange) ||
    record.lighting.dynamicRange <= 0 ||
    !isConfidence(record.lighting.shadowStrength) ||
    !isConfidence(record.lighting.confidence)
  )
    issues.push({ code: "LIGHTING", severity: "error", message: "lighting metadata is invalid" });
  if (
    !record.room.boundary.every((point) => isFiniteNumber(point.x) && isFiniteNumber(point.y)) ||
    record.room.boundary.length < 3
  )
    issues.push({
      code: "ROOM_BOUNDARY",
      severity: "error",
      message: "room boundary must contain at least three finite points",
    });
  if (record.hardCase && !isConfidence(record.hardCase.severity))
    issues.push({
      code: "HARD_CASE_SEVERITY",
      severity: "error",
      message: "hard-case severity must be in [0,1]",
    });
  if (record.modalities.length < 2)
    issues.push({ code: "MODALITY_LOW", severity: "warning", message: "fewer than two modalities" });
  return issues;
}

export const validateRecordvalidator = validateRecordValidator;
