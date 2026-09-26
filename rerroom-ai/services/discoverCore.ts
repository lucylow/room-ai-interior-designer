export type DiscoverCategory = "All" | "Calm" | "Warm" | "Light";
export interface InspirationStyle { id: string; name: string; category: Exclude<DiscoverCategory, "All">; detail: string; prompt: string; palette: string[]; icon: "leaf-outline" | "sunny-outline" | "sparkles-outline"; }
export const discoverCategories: DiscoverCategory[] = ["All", "Calm", "Warm", "Light"];
export const inspirationStyles: InspirationStyle[] = [
  { id: "japandi-calm", name: "Japandi calm", category: "Calm", detail: "Natural materials · Quiet contrast", prompt: "Japandi calm", palette: ["#CDBBA6", "#8C8275", "#E7E1D8"], icon: "leaf-outline" },
  { id: "collected-modern", name: "Collected modern", category: "Warm", detail: "Warm neutrals · Statement shapes", prompt: "Collected modern", palette: ["#A97862", "#5C4D43", "#D6B49B"], icon: "sparkles-outline" },
  { id: "soft-minimal", name: "Soft minimal", category: "Light", detail: "Negative space · Light woods", prompt: "Soft minimal", palette: ["#D8D8C9", "#9BA59B", "#F0ECE3"], icon: "sunny-outline" },
  { id: "earthy-retreat", name: "Earthy retreat", category: "Warm", detail: "Clay tones · Tactile layers", prompt: "Earthy retreat", palette: ["#B88769", "#74604F", "#E1C8B3"], icon: "leaf-outline" },
];
export function filterInspirationStyles(category: DiscoverCategory) { return category === "All" ? inspirationStyles : inspirationStyles.filter((item) => item.category === category); }
