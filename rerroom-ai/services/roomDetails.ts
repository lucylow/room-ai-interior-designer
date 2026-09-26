import type { SavedDesign, RefinementRecord } from "./savedDesigns";
export interface RefinementHistoryItem extends RefinementRecord { index: number; active: boolean; }
export interface RoomDetailModel { design: SavedDesign; history: RefinementHistoryItem[]; preservationNote: string; }
export function renderedUriForHistory(design: SavedDesign, entry: RefinementHistoryItem | null) { const version = entry?.versionId ? design.versions?.find((item) => item.id === entry.versionId) : undefined; return version?.imageUri ?? design.imageUri; }
export function toRoomDetail(design: SavedDesign): RoomDetailModel { const records = design.refinements?.length ? design.refinements : [{ id: "initial", label: "Original concept generated", createdAt: design.updatedAt }]; return { design, history: records.map((item, index) => ({ ...item, index, active: index === records.length - 1 })), preservationNote: "Architecture, natural light, and your core furniture remain part of the direction." }; }
export function selectHistoryEntry(model: RoomDetailModel, entryId: string): RoomDetailModel { const selected = model.history.find((item) => item.id === entryId); if (!selected) return model; return { ...model, history: model.history.map((item) => ({ ...item, active: item.id === entryId })) }; }
export function findSavedRoom(designs: SavedDesign[], roomId: string) { return designs.find((design) => design.id === roomId) ?? null; }
export function activeHistoryEntry(model: RoomDetailModel) { return model.history.find((item) => item.active) ?? model.history[model.history.length - 1] ?? null; }
