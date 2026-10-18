import { describe, expect, it } from 'vitest';
import { runAISmoke } from '../../recommendation-engine/tests/ai-recommendation-smoke';
import { runSmoke } from '../../recommendation-engine/tests/smoke';

describe('recommendation engine package smoke checks', () => {
  it('produces ranked recommendations, insights, health and a digest with the bundled demo data', async () => {
    const result = await runAISmoke();
    expect(result.recommendationCount).toBeGreaterThan(0);
    expect(result.insightCount).toBeGreaterThan(0);
    expect(result.health).toBeDefined();
    expect(result.digest).toBeDefined();
  });

  it('extracts features, infers goals and simulates a deterministic room scenario', () => {
    const result = runSmoke();
    expect(result.features).toBeGreaterThanOrEqual(10);
    expect(result.catalog).toBeGreaterThan(0);
    expect(result.scenario.scenarioId).toBeTruthy();
  });
});
