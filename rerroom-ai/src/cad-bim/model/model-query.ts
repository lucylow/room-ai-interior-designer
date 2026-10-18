import { AuthoritativeModel, SourceFeature } from '../core/types';
import { polygonArea, polygonCentroid } from '../core/geometry';

export class ModelQuery {
  constructor(private model: AuthoritativeModel) {}

  rooms() {
    return this.model.features.filter((feature) => feature.kind === 'room');
  }

  openings() {
    return this.model.features.filter(
      (feature) =>
        feature.kind === 'door' ||
        feature.kind === 'window' ||
        feature.kind === 'opening',
    );
  }

  featuresNear(
    point: { x: number; y: number; z?: number },
    radius: number,
  ): SourceFeature[] {
    return this.model.features.filter((feature) => {
      if (!feature.center) return false;
      return (
        Math.hypot(
          feature.center.x - point.x,
          feature.center.y - point.y,
        ) <= radius
      );
    });
  }

  areaOf(featureId: string): number {
    const feature = this.model.features.find((item) => item.id === featureId);
    return feature?.geometry2d ? polygonArea(feature.geometry2d) : 0;
  }

  centroidOf(featureId: string) {
    const feature = this.model.features.find((item) => item.id === featureId);
    return feature?.geometry2d
      ? polygonCentroid(feature.geometry2d)
      : undefined;
  }

  closestWall(point: { x: number; y: number }): SourceFeature | undefined {
    let best: SourceFeature | undefined;
    let bestDistance = Infinity;

    for (const feature of this.model.features) {
      if (feature.kind !== 'wall' || !feature.geometry2d) continue;

      const points = feature.geometry2d.points;
      for (let index = 0; index < points.length; index += 1) {
        const start = points[index];
        const end = points[(index + 1) % points.length];
        const segment = { x: end.x - start.x, y: end.y - start.y };
        const projection = Math.max(
          0,
          Math.min(
            1,
            ((point.x - start.x) * segment.x +
              (point.y - start.y) * segment.y) /
              (segment.x * segment.x + segment.y * segment.y + 1e-9),
          ),
        );
        const distance = Math.hypot(
          point.x - (start.x + segment.x * projection),
          point.y - (start.y + segment.y * projection),
        );

        if (distance < bestDistance) {
          bestDistance = distance;
          best = feature;
        }
      }
    }

    return best;
  }
}
