import { describe, expect, it } from 'vitest';
import { polygonArea, pointInPolygon, rectangleCorners, pointToSegmentDistance } from '../../visualization/core/geometry';

describe('2D geometry', () => {
  it('computes a rectangle area', () => {
    expect(polygonArea([{x:0,y:0},{x:4,y:0},{x:4,y:3},{x:0,y:3}])).toBe(12);
  });
  it('detects a point inside a polygon', () => {
    expect(pointInPolygon({x:2,y:2}, [{x:0,y:0},{x:4,y:0},{x:4,y:4},{x:0,y:4}])).toBe(true);
  });
  it('detects a point outside a polygon', () => {
    expect(pointInPolygon({x:6,y:2}, [{x:0,y:0},{x:4,y:0},{x:4,y:4},{x:0,y:4}])).toBe(false);
  });
  it('rotates rectangle corners', () => {
    const points = rectangleCorners({x:1,y:1},2,2,Math.PI/2);
    expect(points.length).toBe(4);
  });
  it('measures point to segment', () => {
    expect(pointToSegmentDistance({x:2,y:1},{x:0,y:0},{x:4,y:0})).toBe(1);
  });
});
