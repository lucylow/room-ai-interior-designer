import type { Box2D, HardCase, SceneAnnotation } from "./types";
import { assertValidScene } from "./validation";

export interface SceneEvaluation {
  detectionPrecision: number;
  detectionRecall: number;
  cuboidCenterErrorM: number;
  cuboidDimensionErrorM: number;
  furnitureOrientationErrorRadians: number;
  materialAccuracy: number;
  relationAccuracy: number;
  trackAssociationAccuracy: number;
  roomAreaErrorM2: number;
  floorplanAreaErrorM2: number;
  roomDimensionErrorM: number;
  measurementConfidence: number;
  collisionRisk: number;
  walkwayClearancePassRate: number;
  meshCompleteness: number;
  splatCoverage: number;
  textureCoverage: number;
  cameraPoseStability: number;
  depthConfidenceBrierScore: number;
  panoramaCoverage: number;
  panoramaSeamQuality: number;
  keyframeDiversity: number;
  tourTransitionQuality: number;
  hardCaseRecall: number;
}

function boxIoU(first: Box2D, second: Box2D): number {
  const overlapWidth = Math.max(
    0,
    Math.min(first.x + first.width, second.x + second.width) - Math.max(first.x, second.x),
  );
  const overlapHeight = Math.max(
    0,
    Math.min(first.y + first.height, second.y + second.height) - Math.max(first.y, second.y),
  );
  const intersection = overlapWidth * overlapHeight;
  const union = first.width * first.height + second.width * second.height - intersection;
  return union > 0 ? intersection / union : 0;
}

function collides(
  first: SceneAnnotation["instances"][number],
  second: SceneAnnotation["instances"][number],
): boolean {
  const a = first.cuboid3D;
  const b = second.cuboid3D;
  const axes = [
    [Math.cos(a.yawRadians), Math.sin(a.yawRadians)],
    [-Math.sin(a.yawRadians), Math.cos(a.yawRadians)],
    [Math.cos(b.yawRadians), Math.sin(b.yawRadians)],
    [-Math.sin(b.yawRadians), Math.cos(b.yawRadians)],
  ];
  const dx = b.center.x - a.center.x;
  const dz = b.center.z - a.center.z;
  for (const [axisX, axisZ] of axes) {
    const distance = Math.abs(dx * axisX + dz * axisZ);
    const radiusA =
      (Math.abs(Math.cos(a.yawRadians) * axisX + Math.sin(a.yawRadians) * axisZ) * a.size.x) / 2 +
      (Math.abs(-Math.sin(a.yawRadians) * axisX + Math.cos(a.yawRadians) * axisZ) * a.size.z) / 2;
    const radiusB =
      (Math.abs(Math.cos(b.yawRadians) * axisX + Math.sin(b.yawRadians) * axisZ) * b.size.x) / 2 +
      (Math.abs(-Math.sin(b.yawRadians) * axisX + Math.cos(b.yawRadians) * axisZ) * b.size.z) / 2;
    if (distance >= radiusA + radiusB) return false;
  }
  const verticalOverlap = Math.abs(b.center.y - a.center.y) < (a.size.y + b.size.y) / 2;
  return verticalOverlap;
}

function mean(values: number[]): number {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function polygonArea(points: SceneAnnotation["topology"]["floorplan"]): number {
  return (
    Math.abs(
      points.reduce((sum, point, index) => {
        const next = points[(index + 1) % points.length];
        return sum + point.x * next.z - next.x * point.z;
      }, 0),
    ) / 2
  );
}

export function evaluateScene(prediction: SceneAnnotation, groundTruth: SceneAnnotation): SceneEvaluation {
  assertValidScene(prediction, "invalid_prediction_scene");
  assertValidScene(groundTruth, "invalid_ground_truth_scene");

  const candidates = prediction.instances
    .flatMap((predicted) =>
      groundTruth.instances
        .filter((truth) => truth.category === predicted.category)
        .map((truth) => ({ predicted, truth, iou: boxIoU(predicted.box2D, truth.box2D) })),
    )
    .sort((a, b) => b.iou - a.iou);
  const matchedPredictions = new Set<string>();
  const matchedTruth = new Set<string>();
  const matches: typeof candidates = [];
  for (const candidate of candidates) {
    if (
      candidate.iou < 0.5 ||
      matchedPredictions.has(candidate.predicted.id) ||
      matchedTruth.has(candidate.truth.id)
    )
      continue;
    matchedPredictions.add(candidate.predicted.id);
    matchedTruth.add(candidate.truth.id);
    matches.push(candidate);
  }

  const truthRelations = new Set(
    groundTruth.relations.map(
      (relation) => `${relation.subjectId}|${relation.predicate}|${relation.objectId}`,
    ),
  );
  const predictedRelations = new Set(
    prediction.relations.map(
      (relation) => `${relation.subjectId}|${relation.predicate}|${relation.objectId}`,
    ),
  );
  const relationIntersection = [...predictedRelations].filter((relation) =>
    truthRelations.has(relation),
  ).length;
  const collisionPairs = prediction.instances.reduce(
    (count, instance, index, all) =>
      count + all.slice(index + 1).filter((other) => collides(instance, other)).length,
    0,
  );
  const pairCount = (prediction.instances.length * (prediction.instances.length - 1)) / 2;
  const expectedHardCases = new Set<HardCase>(groundTruth.hardCases);
  const hardCaseIntersection = prediction.hardCases.filter((tag) => expectedHardCases.has(tag)).length;
  const trackedMatches = matches.filter(({ predicted, truth }) => predicted.trackId && truth.trackId);
  const predictedFloorplanArea = polygonArea(prediction.topology.floorplan);
  const truthFloorplanArea = polygonArea(groundTruth.topology.floorplan);

  return {
    detectionPrecision: prediction.instances.length ? matches.length / prediction.instances.length : 0,
    detectionRecall: groundTruth.instances.length ? matches.length / groundTruth.instances.length : 0,
    cuboidCenterErrorM: mean(
      matches.map(({ predicted, truth }) => {
        const a = predicted.cuboid3D.center;
        const b = truth.cuboid3D.center;
        return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      }),
    ),
    cuboidDimensionErrorM: mean(
      matches.flatMap(({ predicted, truth }) => [
        Math.abs(predicted.cuboid3D.size.x - truth.cuboid3D.size.x),
        Math.abs(predicted.cuboid3D.size.y - truth.cuboid3D.size.y),
        Math.abs(predicted.cuboid3D.size.z - truth.cuboid3D.size.z),
      ]),
    ),
    furnitureOrientationErrorRadians: mean(
      matches.map(({ predicted, truth }) => {
        const difference =
          Math.abs(predicted.cuboid3D.yawRadians - truth.cuboid3D.yawRadians) % (Math.PI * 2);
        return Math.min(difference, Math.PI * 2 - difference);
      }),
    ),
    materialAccuracy: matches.length
      ? matches.filter(({ predicted, truth }) => predicted.material === truth.material).length /
        matches.length
      : 0,
    relationAccuracy: predictedRelations.size ? relationIntersection / predictedRelations.size : 0,
    trackAssociationAccuracy: trackedMatches.length
      ? trackedMatches.filter(({ predicted, truth }) => predicted.trackId === truth.trackId).length /
        trackedMatches.length
      : 0,
    roomAreaErrorM2: Math.abs(prediction.room.areaM2 - groundTruth.room.areaM2),
    floorplanAreaErrorM2: Math.abs(predictedFloorplanArea - truthFloorplanArea),
    roomDimensionErrorM: mean([
      Math.abs(prediction.room.widthM - groundTruth.room.widthM),
      Math.abs(prediction.room.lengthM - groundTruth.room.lengthM),
      Math.abs(prediction.room.heightM - groundTruth.room.heightM),
    ]),
    measurementConfidence: prediction.room.measurementConfidence,
    collisionRisk: pairCount ? collisionPairs / pairCount : 0,
    walkwayClearancePassRate: prediction.topology.walkways.length
      ? prediction.topology.walkways.filter((path) => path.clearanceM >= path.requiredClearanceM).length /
        prediction.topology.walkways.length
      : 1,
    meshCompleteness: prediction.reconstruction.meshCompleteness,
    splatCoverage: prediction.reconstruction.splatCoverage,
    textureCoverage: prediction.reconstruction.textureCoverage,
    cameraPoseStability: prediction.reconstruction.cameraPoseStability,
    depthConfidenceBrierScore: (prediction.depth.confidence - prediction.depth.validFraction) ** 2,
    panoramaCoverage: Math.min(1, prediction.tour.panoramaCoverageDegrees / 360),
    panoramaSeamQuality: prediction.tour.seamQuality,
    keyframeDiversity: prediction.tour.keyframeDiversity,
    tourTransitionQuality: prediction.tour.transitionQuality,
    hardCaseRecall: expectedHardCases.size ? hardCaseIntersection / expectedHardCases.size : 1,
  };
}
