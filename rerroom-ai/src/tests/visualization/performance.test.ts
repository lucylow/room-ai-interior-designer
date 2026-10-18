import { describe, expect, it } from 'vitest';
import { lodForDistance, triangleBudgetFor } from '../../visualization/performance/lod';
import { chooseInitialQuality } from '../../visualization/performance/budget';
import { DEMO_ROOMS } from '../../visualization/demo/rooms';

describe('visualization performance', () => {
  it('drops LOD with distance', () => {
    expect(lodForDistance(20)).toBe('proxy');
    expect(lodForDistance(1)).toBe('high');
  });
  it('maps LOD to triangle budgets', () => {
    expect(triangleBudgetFor('low')).toBeLessThan(triangleBudgetFor('high'));
  });
  it('chooses bounded initial quality', () => {
    const q=chooseInitialQuality(DEMO_ROOMS[0]);
    expect(q).toBeGreaterThan(0);
    expect(q).not.toBe(2);
  });
});
