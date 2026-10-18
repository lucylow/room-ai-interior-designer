import type { SpatialScene } from '../core/types';
import { createCompareOverlay } from '../core/compare';

export interface CompareStore {
  baseline?: SpatialScene;
  active?: SpatialScene;
  split: number;
  enabled: boolean;
  showDiffOnly: boolean;
}

export function createCompareStore(): CompareStore {
  return { split: 0.5, enabled: false, showDiffOnly: false };
}

export function setBaseline(store: CompareStore, scene: SpatialScene): CompareStore {
  return { ...store, baseline: scene, enabled: true };
}

export function setActive(store: CompareStore, scene: SpatialScene): CompareStore {
  return { ...store, active: scene, enabled: Boolean(store.baseline) };
}

export function setSplit(store: CompareStore, split: number): CompareStore {
  return { ...store, split: Math.max(0.05, Math.min(0.95, split)) };
}

export function overlay(store: CompareStore) {
  if (!store.baseline || !store.active) return null;
  return createCompareOverlay(store.baseline, store.active, store.split);
}
