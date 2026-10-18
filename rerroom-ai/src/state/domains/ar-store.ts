import { createExternalStore, type ExternalStore } from '../store';

export interface ARDomainState {
  supported: boolean;
  mode: 'idle' | 'tracking' | 'placing' | 'measuring' | 'error';
  selectedObjectId?: string;
  anchorIds: string[];
  lastCalibrationAt?: number;
}

export const arStore: ExternalStore<ARDomainState> = createExternalStore({ supported: false, mode: 'idle', anchorIds: [] });

export function setARSupport(supported: boolean): void { arStore.setState((state) => ({ ...state, supported })); }
export function setARMode(mode: ARDomainState['mode']): void { arStore.setState((state) => ({ ...state, mode })); }
export function selectARObject(id?: string): void { arStore.setState((state) => ({ ...state, selectedObjectId: id })); }
export function addAnchor(id: string): void { arStore.setState((state) => ({ ...state, anchorIds: [...new Set([...state.anchorIds, id])] })); }
export function clearAnchors(): void { arStore.setState((state) => ({ ...state, anchorIds: [], selectedObjectId: undefined })); }
