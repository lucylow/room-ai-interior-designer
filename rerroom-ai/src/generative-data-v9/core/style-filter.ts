import type { DatasetRecord, DesignStyle, RoomType } from "./types";

export function filterByStyle(records: DatasetRecord[], style: DesignStyle, roomType?: RoomType): DatasetRecord[] {
  return records.filter(r => r.style === style && (!roomType || r.roomType === roomType));
}
