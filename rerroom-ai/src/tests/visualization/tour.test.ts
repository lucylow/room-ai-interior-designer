import { describe, expect, it } from 'vitest';
import { makeTour } from '../../visualization/demo/tours';
import { sampleTour } from '../../visualization/core/tour';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('camera tours', () => {
  it('builds a multi-keyframe tour', () => {
    const tour=makeTour(DEMO_ROOMS[0]);
    expect(tour.keyframes.length).toBeGreaterThan(3);
  });
  it('samples a camera pose', () => {
    const tour=makeTour(DEMO_ROOMS[0]);
    expect(sampleTour(tour,1000)).toBeTruthy();
  });
  it('loops safely', () => {
    const tour=makeTour(DEMO_ROOMS[0]);
    expect(sampleTour(tour,tour.durationMs*4)).toEqual(sampleTour(tour,0));
  });
});
