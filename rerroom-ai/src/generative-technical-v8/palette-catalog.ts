import { HexColor } from "./types";
export interface PaletteProfile { id: string; name: string; family: string; colors: HexColor[]; mood: string; accents: string[]; compatibleStyles: string[]; roomBias: string[]; contrast: number; warmth: number; }
const PALETTE_DATA: PaletteProfile[] = [
  {
    "id": "p01",
    "name": "Warm Sand",
    "family": "warm neutrals",
    "colors": [
      "#F7F1E7",
      "#D7C4AA",
      "#9D8066",
      "#3C3832"
    ],
    "mood": "calm, earthy, low-glare",
    "accents": [
      "#9D8066",
      "#3C3832"
    ],
    "compatibleStyles": [
      "modern",
      "japandi",
      "contemporary",
      "modern-farmhouse",
      "soft-industrial",
      "naturalist"
    ],
    "roomBias": [
      "living-room",
      "bedroom",
      "kitchen",
      "dining-room"
    ],
    "contrast": 0.2,
    "warmth": -0.2
  },
  {
    "id": "p02",
    "name": "Nordic Mist",
    "family": "cool neutrals",
    "colors": [
      "#F5F6F4",
      "#DDE3E4",
      "#A7B8BF",
      "#29343A"
    ],
    "mood": "airy, quiet, daylight-friendly",
    "accents": [
      "#A7B8BF",
      "#29343A"
    ],
    "compatibleStyles": [
      "industrial",
      "bohemian",
      "coastal-modern",
      "new-nordic",
      "eclectic-modern",
      "craft-modern"
    ],
    "roomBias": [
      "home-office",
      "bathroom",
      "entryway",
      "nursery"
    ],
    "contrast": 0.27,
    "warmth": -0.12
  },
  {
    "id": "p03",
    "name": "Forest & Oak",
    "family": "earth",
    "colors": [
      "#EEE9DA",
      "#B78E62",
      "#68775C",
      "#263329"
    ],
    "mood": "natural, grounded, biophilic",
    "accents": [
      "#68775C",
      "#263329"
    ],
    "compatibleStyles": [
      "scandinavian",
      "organic-modern",
      "quiet-luxury",
      "art-deco",
      "moody-modern",
      "heritage-modern"
    ],
    "roomBias": [
      "living-room",
      "bedroom",
      "kitchen",
      "dining-room"
    ],
    "contrast": 0.34,
    "warmth": -0.04
  },
  {
    "id": "p04",
    "name": "Clay Workshop",
    "family": "warm accent",
    "colors": [
      "#F3E4D3",
      "#C97755",
      "#8C4E38",
      "#2E2A27"
    ],
    "mood": "warm, tactile, artisanal",
    "accents": [
      "#8C4E38",
      "#2E2A27"
    ],
    "compatibleStyles": [
      "minimalist",
      "midcentury",
      "warm-minimal",
      "transitional",
      "desert-modern",
      "urban-soft"
    ],
    "roomBias": [
      "home-office",
      "bathroom",
      "entryway",
      "nursery"
    ],
    "contrast": 0.41,
    "warmth": 0.04
  },
  {
    "id": "p05",
    "name": "Industrial Ink",
    "family": "dark neutral",
    "colors": [
      "#E8E4DE",
      "#9E9790",
      "#4E4A46",
      "#171717"
    ],
    "mood": "graphic, structured, dramatic",
    "accents": [
      "#4E4A46",
      "#171717"
    ],
    "compatibleStyles": [
      "modern",
      "japandi",
      "contemporary",
      "modern-farmhouse",
      "soft-industrial",
      "naturalist"
    ],
    "roomBias": [
      "living-room",
      "bedroom",
      "kitchen",
      "dining-room"
    ],
    "contrast": 0.48,
    "warmth": 0.12
  },
  {
    "id": "p06",
    "name": "Blue Hour",
    "family": "blue accent",
    "colors": [
      "#F1EEE8",
      "#B8C9D9",
      "#5E7A96",
      "#172436"
    ],
    "mood": "cool, sophisticated, evening-ready",
    "accents": [
      "#5E7A96",
      "#172436"
    ],
    "compatibleStyles": [
      "industrial",
      "bohemian",
      "coastal-modern",
      "new-nordic",
      "eclectic-modern",
      "craft-modern"
    ],
    "roomBias": [
      "home-office",
      "bathroom",
      "entryway",
      "nursery"
    ],
    "contrast": 0.55,
    "warmth": 0.2
  },
  {
    "id": "p07",
    "name": "Olive Linen",
    "family": "green neutral",
    "colors": [
      "#F4F0E8",
      "#D6D1C3",
      "#7C8461",
      "#393C31"
    ],
    "mood": "quiet, natural, soft",
    "accents": [
      "#7C8461",
      "#393C31"
    ],
    "compatibleStyles": [
      "scandinavian",
      "organic-modern",
      "quiet-luxury",
      "art-deco",
      "moody-modern",
      "heritage-modern"
    ],
    "roomBias": [
      "living-room",
      "bedroom",
      "kitchen",
      "dining-room"
    ],
    "contrast": 0.62,
    "warmth": 0.28
  },
  {
    "id": "p08",
    "name": "Brass & Cream",
    "family": "luxury neutral",
    "colors": [
      "#F7F3EB",
      "#D6C3A4",
      "#A68447",
      "#2B2926"
    ],
    "mood": "refined, warm, restrained",
    "accents": [
      "#A68447",
      "#2B2926"
    ],
    "compatibleStyles": [
      "minimalist",
      "midcentury",
      "warm-minimal",
      "transitional",
      "desert-modern",
      "urban-soft"
    ],
    "roomBias": [
      "home-office",
      "bathroom",
      "entryway",
      "nursery"
    ],
    "contrast": 0.69,
    "warmth": 0.36
  },
  {
    "id": "p09",
    "name": "Cocoa & Rose",
    "family": "warm contrast",
    "colors": [
      "#F3E7E0",
      "#B88A7F",
      "#6D453F",
      "#292222"
    ],
    "mood": "intimate, romantic, mature",
    "accents": [
      "#6D453F",
      "#292222"
    ],
    "compatibleStyles": [
      "modern",
      "japandi",
      "contemporary",
      "modern-farmhouse",
      "soft-industrial",
      "naturalist"
    ],
    "roomBias": [
      "living-room",
      "bedroom",
      "kitchen",
      "dining-room"
    ],
    "contrast": 0.76,
    "warmth": 0.44
  },
  {
    "id": "p10",
    "name": "Ink & Cedar",
    "family": "dark organic",
    "colors": [
      "#ECE7DD",
      "#9A7755",
      "#334038",
      "#161D1B"
    ],
    "mood": "grounded, moody, natural",
    "accents": [
      "#334038",
      "#161D1B"
    ],
    "compatibleStyles": [
      "industrial",
      "bohemian",
      "coastal-modern",
      "new-nordic",
      "eclectic-modern",
      "craft-modern"
    ],
    "roomBias": [
      "home-office",
      "bathroom",
      "entryway",
      "nursery"
    ],
    "contrast": 0.83,
    "warmth": -0.2
  },
  {
    "id": "p11",
    "name": "Sage Cloud",
    "family": "soft green",
    "colors": [
      "#FAF8F3",
      "#D9DED3",
      "#92A087",
      "#4A5345"
    ],
    "mood": "restful, fresh, low saturation",
    "accents": [
      "#92A087",
      "#4A5345"
    ],
    "compatibleStyles": [
      "scandinavian",
      "organic-modern",
      "quiet-luxury",
      "art-deco",
      "moody-modern",
      "heritage-modern"
    ],
    "roomBias": [
      "living-room",
      "bedroom",
      "kitchen",
      "dining-room"
    ],
    "contrast": 0.2,
    "warmth": -0.12
  },
  {
    "id": "p12",
    "name": "Cobalt Chalk",
    "family": "graphic",
    "colors": [
      "#F7F6F1",
      "#C9C8C0",
      "#3156A0",
      "#171C27"
    ],
    "mood": "clean, expressive, crisp",
    "accents": [
      "#3156A0",
      "#171C27"
    ],
    "compatibleStyles": [
      "minimalist",
      "midcentury",
      "warm-minimal",
      "transitional",
      "desert-modern",
      "urban-soft"
    ],
    "roomBias": [
      "home-office",
      "bathroom",
      "entryway",
      "nursery"
    ],
    "contrast": 0.27,
    "warmth": -0.04
  }
];

export const PALETTE_CATALOG: PaletteProfile[] = PALETTE_DATA;
