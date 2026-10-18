import {
  generateMockCreativeDesign,
  getMockStyle,
  getMockPalette,
  palettesForRoom,
  type CreativeConceptMock,
  type PaletteMock,
  type RoomType,
} from "../src/generative-mock-v7";

export const creativeRoomTypes: Array<{ id: RoomType; label: string }> = [
  { id: "living_room", label: "Living room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "home_office", label: "Home office" },
  { id: "dining_room", label: "Dining room" },
];

export const creativeStyleOptions = [
  { id: "modern", name: "Modern" },
  { id: "minimalist", name: "Minimalist" },
  { id: "scandinavian", name: "Scandinavian" },
  { id: "industrial", name: "Industrial" },
  { id: "japandi", name: "Japandi" },
  { id: "mid_century", name: "Mid-century" },
  { id: "organic_modern", name: "Organic Modern" },
  { id: "bohemian", name: "Bohemian" },
  { id: "contemporary", name: "Contemporary" },
  { id: "warm_minimal", name: "Warm Minimal" },
  { id: "quiet_luxury", name: "Quiet Luxury" },
  { id: "coastal_modern", name: "Coastal Modern" },
  { id: "modern_farmhouse", name: "Modern Farmhouse" },
  { id: "classic_transitional", name: "Classic Transitional" },
  { id: "art_deco", name: "Art Deco" },
  { id: "new_nordic", name: "New Nordic" },
  { id: "soft_industrial", name: "Soft Industrial" },
  { id: "desert_modern", name: "Desert Modern" },
  { id: "moody_modern", name: "Moody Modern" },
  { id: "eclectic_modern", name: "Eclectic Modern" },
] as const;

export function creativePalettes(room: RoomType = "living_room"): PaletteMock[] {
  return palettesForRoom(room);
}

export function generateCreativeRoom(input: {
  room?: RoomType;
  style?: string;
  palette?: string;
  budget?: number;
  requestedChanges?: string[];
  limit?: number;
}) {
  return generateMockCreativeDesign({ room: input.room ?? "living_room", ...input });
}

export function conceptLabel(concept: CreativeConceptMock): string {
  return `${concept.title} · ${concept.mood}`;
}

export function styleLabel(id: string): string {
  return getMockStyle(id)?.name ?? id.replaceAll("_", " ");
}

export function paletteLabel(id: string): string {
  return getMockPalette(id)?.name ?? id.replaceAll("_", " ");
}
