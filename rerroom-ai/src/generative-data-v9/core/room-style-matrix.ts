import type { DesignStyle, RoomType } from "../core/types";

export function compatibility(room: RoomType, style: DesignStyle): number {
  const anchors: Record<string,string[]> = { living_room:["modern","scandinavian","industrial","organic_modern"], bedroom:["minimalist","japandi","warm_minimal","moody_modern"], kitchen:["modern","scandinavian","soft_industrial","craft_modern"], dining_room:["mid_century","contemporary","quiet_luxury","transitional"], home_office:["modern","new_nordic","urban_soft","industrial"], entryway:["modern","minimalist","coastal_modern","transitional"], bathroom:["japandi","quiet_luxury","organic_modern","modern"], nursery:["scandinavian","naturalist","warm_minimal","new_nordic"], studio:["eclectic_modern","industrial","urban_soft","modern"], media_room:["moody_modern","soft_industrial","contemporary","mid_century"], guest_room:["scandinavian","warm_minimal","transitional","coastal_modern"], reading_nook:["japandi","organic_modern","new_nordic","naturalist"] };
  const preferred = anchors[room] ?? [];
  return preferred.includes(style) ? 0.94 : 0.68;
}
