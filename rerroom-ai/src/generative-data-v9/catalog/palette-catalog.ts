import type { DesignStyle } from "../core/types";

export const PALETTE_CATALOG: ReadonlyArray<{ id: string; mood: string; colors: string[]; notes: string[]; compatibleStyles: DesignStyle[] }> = [
  { id: "sandstone", mood: "warm cream / taupe / oak", colors: ["#F5EFE6", "#D8C9B8", "#B08B6E", "#2F302D"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "nordic_sage", mood: "mist / sage / pale oak", colors: ["#F3F4EE", "#AEB9A0", "#D7CCBC", "#3B4039"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "charcoal_clay", mood: "charcoal / clay / ivory", colors: ["#27282A", "#A96446", "#EEE8DC", "#7B776E"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "forest_moss", mood: "moss / forest / linen", colors: ["#DCE2D2", "#54634B", "#EEE9DE", "#28352B"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "coastal_fog", mood: "sea glass / sand / cloud", colors: ["#E7F0EE", "#AFCAC5", "#EADCCB", "#5C6667"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "ink_brass", mood: "ink / brass / warm white", colors: ["#1E2228", "#B48A4C", "#F3EEE6", "#71757A"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "terracotta_oak", mood: "terracotta / clay / oak", colors: ["#C86F4B", "#E7D2BF", "#B08A60", "#39352F"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "midnight_plum", mood: "ink / plum / ivory", colors: ["#1E2232", "#66475E", "#EFE8DE", "#8C806E"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "blue_gray", mood: "blue gray / ivory / walnut", colors: ["#72808B", "#F0ECE5", "#6F523F", "#2C3034"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "olive_cream", mood: "olive / cream / walnut", colors: ["#788064", "#F2EADD", "#6A4D39", "#30342C"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "sunlit_apricot", mood: "apricot / cream / oak", colors: ["#F0B18F", "#FFF4E9", "#C29C72", "#544B43"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
  { id: "cobalt_coral", mood: "cobalt / coral / oat", colors: ["#3457C4", "#E67B67", "#EFE3D0", "#2A2B30"], notes: ["anchor wall","secondary textile","grounding neutral"], compatibleStyles: [] },
];
