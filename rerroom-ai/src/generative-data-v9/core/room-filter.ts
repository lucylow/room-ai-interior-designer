import type { DatasetRecord, RoomType } from "./types";

export function filterByRoom(records: DatasetRecord[], roomType: RoomType): DatasetRecord[] {
  return records.filter(r => r.roomType === roomType);
}
