import { afterEach, describe, expect, it } from 'vitest';
import { generateAppRecommendations, prepareRecommendationContext } from '../../ai/recommendation-service';
import { privacyConsentRegistry, resetPrivacy, setConsent } from '../../state/domains/privacy-store';
import type { RoomStateModel } from '../../security/types';
import { applySecurityContext } from '../../recommendation-engine/integration/security-context-adapter';
import { applyQualityGate } from '../../recommendation-engine/ai/quality-gate';
import { defaultPolicy } from '../../recommendation-engine/policy/recommendation-policy';
import { demoRoom, demoPrefs } from '../../recommendation-engine/demo/data';
import type { Recommendation, RecommendationRequest } from '../../recommendation-engine/core/types';

const grantAI = () => setConsent({
  scope: 'ai-processing',
  granted: true,
  updatedAt: Date.now(),
  source: 'settings',
  version: 1,
});

const roomFixture: RoomStateModel = {
  id: 'private-room-ada-221b',
  name: 'Ada Lovelace home at 221B Baker Street',
  roomType: 'living-room',
  imageAssetId: 'photo-secret-id',
  layoutAssetId: 'layout-secret-id',
  objects: [{
    id: 'private-sofa-uuid',
    type: 'sofa',
    label: 'Personal heirloom from Ada',
    x: 1.4,
    y: 0,
    z: 1.2,
    width: 2,
    height: 0.9,
    depth: 0.9,
    rotationY: 0,
    locked: false,
  }],
  measurements: { widthM: 4.8, depthM: 3.6, ceilingM: 2.7 },
  updatedAt: Date.now(),
  version: 1,
  sensitivity: 'sensitive',
};

afterEach(() => resetPrivacy());

describe('app recommendation privacy boundary', () => {
  it('fails closed when AI processing consent is denied', async () => {
    expect(privacyConsentRegistry.get('ai-processing')).toBe(false);
    await expect(generateAppRecommendations()).rejects.toThrow('Enable AI processing consent');
  });

  it('removes room identity, asset IDs and user labels before constructing engine context', () => {
    const prepared = prepareRecommendationContext(roomFixture);
    const serialized = JSON.stringify(prepared.room);
    expect(prepared.synthetic).toBe(false);
    expect(prepared.room.roomId).toBe('current-room');
    expect(prepared.room.name).toBe('Current room');
    expect(prepared.room.objects[0]).toMatchObject({ id: 'object-1', label: 'Furniture 1' });
    expect(serialized).not.toContain('private-room-ada-221b');
    expect(serialized).not.toContain('Baker Street');
    expect(serialized).not.toContain('private-sofa-uuid');
    expect(serialized).not.toContain('photo-secret-id');
    expect(serialized).not.toContain('Personal heirloom');
    expect(prepared.warnings.length).toBeGreaterThan(0);
  });

  it('rejects corrupted active-room geometry before recommendation generation', () => {
    const invalidRoom: RoomStateModel = {
      ...roomFixture,
      objects: [{ ...roomFixture.objects[0], width: 1_000 }],
    };
    expect(() => prepareRecommendationContext(invalidRoom)).toThrow();
  });

  it('strips history, session ID and catalog when their policy flags are off', () => {
    const request: RecommendationRequest = {
      room: demoRoom,
      preferences: { ...demoPrefs, shoppingEnabled: true, historyEnabled: true, learningEnabled: true },
      catalog: [{ id: 'catalog-private', name: 'Sample', category: 'decor', styleTags: [], colorTags: [], materialTags: [], dimensions: { width: 1, height: 1, depth: 1 }, price: 20, currency: 'USD' }],
      recentRecommendations: [],
      previousInsights: [],
      sessionId: 'private-session-id',
    };
    const secured = applySecurityContext(request, {
      consentGranted: true,
      allowHistory: false,
      allowRemoteModel: false,
      allowShopping: false,
      purpose: 'recommendation',
    });
    expect(secured.preferences.shoppingEnabled).toBe(false);
    expect(secured.catalog).toEqual([]);
    expect(secured.recentRecommendations).toEqual([]);
    expect(secured.previousInsights).toEqual([]);
    expect(secured.sessionId).toBeUndefined();
    expect(request.preferences.shoppingEnabled).toBe(true);
  });

  it('rejects processing in the shared package adapter when consent is absent', () => {
    const request: RecommendationRequest = { room: demoRoom, preferences: demoPrefs };
    expect(() => applySecurityContext(request, {
      consentGranted: false,
      allowHistory: false,
      allowRemoteModel: false,
      allowShopping: false,
      purpose: 'recommendation',
    })).toThrow('consent is required');
  });

  it('generates local preview-only results and discards output if consent is revoked in flight', async () => {
    grantAI();
    const pending = generateAppRecommendations(undefined);
    setConsent({ scope: 'ai-processing', granted: false, updatedAt: Date.now(), source: 'settings', version: 1 });
    await expect(pending).rejects.toThrow('Enable AI processing consent');

    grantAI();
    const output = await generateAppRecommendations(undefined);
    expect(output.prepared.synthetic).toBe(true);
    expect(output.result.recommendations.length).toBeGreaterThan(0);
    expect(output.previewQueue.every((item) => item.previewOnly)).toBe(true);
    expect(output.result.recommendations.every((item) => item.category !== 'shopping' && item.category !== 'construction')).toBe(true);
    expect(output.result.recommendations.every((item) => item.actions.every((action) => action.type !== 'create-task'))).toBe(true);
  });

  it('keeps direct identifiers out of active-room recommendation output and preview targets', async () => {
    grantAI();
    const output = await generateAppRecommendations(roomFixture);
    const serialized = JSON.stringify(output.result);
    expect(serialized).not.toContain('private-room-ada-221b');
    expect(serialized).not.toContain('Baker Street');
    expect(serialized).not.toContain('private-sofa-uuid');
    expect(serialized).not.toContain('Personal heirloom');
    expect(output.previewQueue.every((item) => item.previewOnly)).toBe(true);
    for (const item of output.previewQueue) {
      expect(item.focusObjectIds.every((id) => /^object-\d+$/.test(id))).toBe(true);
    }
  });

  it('enforces the construction flag for category recommendations and task actions', () => {
    const base: Recommendation = {
      id: 'test-construction',
      category: 'construction',
      title: 'Build a wall',
      summary: 'Test only',
      rationale: 'Test only',
      score: 0.8,
      confidence: 0.8,
      effort: 'large',
      expectedImpact: 0.8,
      evidence: [{ id: 'e-1', kind: 'rule', label: 'test', value: 'test', confidence: 0.8 }],
      actions: [{ type: 'none', payload: {} }],
      tradeoffs: [],
      alternatives: [],
      tags: [],
      createdAt: Date.now(),
    };
    const taskAction = { ...base, id: 'task-action', category: 'workflow' as const, actions: [{ type: 'create-task' as const, payload: {} }] };
    const gated = applyQualityGate([base, taskAction], { ...defaultPolicy, allowConstruction: false });
    expect(gated.accepted).toEqual([]);
    expect(gated.rejected.map((item) => item.id)).toEqual(['test-construction', 'task-action']);
    expect(gated.reasons['test-construction']).toContain('construction disabled');
  });

  it('rejects an already-aborted local generation request', async () => {
    grantAI();
    const controller = new AbortController();
    controller.abort();
    await expect(generateAppRecommendations(undefined, controller.signal)).rejects.toThrow('cancelled');
  });
});
