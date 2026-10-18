import type { DesignStateModel } from '../../security/types';
import { createExternalStore, type ExternalStore } from '../store';

export interface DesignDomainState {
  activeDesignId?: string;
  designs: Record<string, DesignStateModel>;
}

export const designStore: ExternalStore<DesignDomainState> = createExternalStore({ designs: {} });

export function upsertDesign(design: DesignStateModel): void {
  designStore.setState((state) => ({ ...state, designs: { ...state.designs, [design.id]: design }, activeDesignId: design.id }));
}

export function markDesignReady(designId: string, assetIds: string[]): void {
  designStore.setState((state) => {
    const design = state.designs[designId];
    if (!design) return state;
    return { ...state, designs: { ...state.designs, [designId]: { ...design, status: 'ready', generatedAssetIds: assetIds, version: design.version + 1 } } };
  });
}
