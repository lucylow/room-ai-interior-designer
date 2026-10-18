import { describe, expect, it } from 'vitest';
import { distanceMeasurement, pathLength, roomArea, occupiedFloorArea } from '../../visualization/core/measurements';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('measurement tools', () => {
  it('creates a distance measurement', () => {
    const m = distanceMeasurement('d',{x:0,y:0,z:0},{x:3,y:0,z:4});
    expect(m.value).toBe(5);
    expect(m.unit).toBe('m');
  });
  it('computes a polyline length', () => {
    expect(pathLength([{x:0,y:0,z:0},{x:1,y:0,z:0},{x:1,y:0,z:1}])).toBe(2);
  });
  it('computes room area', () => {
    expect(roomArea(DEMO_ROOMS[0])).toBe(5.6*4.4);
  });
  it('computes occupied footprint', () => {
    expect(occupiedFloorArea(DEMO_ROOMS[0])).toBeGreaterThan(0);
  });
});
