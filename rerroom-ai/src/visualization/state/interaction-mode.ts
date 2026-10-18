export type InteractionMode =
  | 'select'
  | 'move'
  | 'rotate'
  | 'resize'
  | 'measure'
  | 'annotate'
  | 'pan';

export interface InteractionState {
  mode: InteractionMode;
  pointerActive: boolean;
  keyboardNudge: number;
}

export function defaultInteractionState(): InteractionState {
  return { mode: 'select', pointerActive: false, keyboardNudge: 0.05 };
}

export function setInteractionMode(state: InteractionState, mode: InteractionMode): InteractionState {
  return { ...state, mode, pointerActive: false };
}
