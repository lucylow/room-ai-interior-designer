import type { SceneObject, SelectionState } from './types';

export function clearSelection(): SelectionState {
  return { selectedIds: [], mode: 'object' };
}

export function selectOne(id: string, mode: SelectionState['mode'] = 'object'): SelectionState {
  return { selectedIds: [id], primaryId: id, mode };
}

export function toggleSelection(current: SelectionState, id: string): SelectionState {
  const exists = current.selectedIds.includes(id);
  const selectedIds = exists ? current.selectedIds.filter(item => item !== id) : [...current.selectedIds, id];
  return { ...current, selectedIds, primaryId: selectedIds[0] };
}

export function selectAll(objects: SceneObject[]): SelectionState {
  const ids = objects.filter(item => item.visible).map(item => item.id);
  return { selectedIds: ids, primaryId: ids[0], mode: 'object' };
}

export function selectedObjects(objects: SceneObject[], selection: SelectionState): SceneObject[] {
  const set = new Set(selection.selectedIds);
  return objects.filter(item => set.has(item.id));
}
