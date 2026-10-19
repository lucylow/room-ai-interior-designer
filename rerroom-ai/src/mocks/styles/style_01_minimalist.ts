export const STYLE_CASES = [
  {
    "id": "style-minimalist-living-room-0",
    "style": "minimalist",
    "room": "living-room",
    "palette": "nordic-mist",
    "prompt": "minimalist living-room concept with nordic-mist palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the living-room",
    "camera": "eye-level-wide",
    "materialMix": [
      "wood",
      "boucle",
      "plaster"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.81
  },
  {
    "id": "style-minimalist-bedroom-1",
    "style": "minimalist",
    "room": "bedroom",
    "palette": "forest-ink",
    "prompt": "minimalist bedroom concept with forest-ink palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "corner-three-quarter",
    "materialMix": [
      "wood",
      "boucle",
      "plaster"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.825
  },
  {
    "id": "style-minimalist-kitchen-2",
    "style": "minimalist",
    "room": "kitchen",
    "palette": "charcoal-brass",
    "prompt": "minimalist kitchen concept with charcoal-brass palette, balanced furniture, layered lighting",
    "layoutAdvice": "keep furniture scale coherent",
    "camera": "eye-level-wide",
    "materialMix": [
      "wood",
      "boucle",
      "plaster"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.84
  },
  {
    "id": "style-minimalist-home-office-3",
    "style": "minimalist",
    "room": "home-office",
    "palette": "soft-clay",
    "prompt": "minimalist home-office concept with soft-clay palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the home-office",
    "camera": "corner-three-quarter",
    "materialMix": [
      "wood",
      "boucle",
      "plaster"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.81
  },
  {
    "id": "style-minimalist-dining-room-4",
    "style": "minimalist",
    "room": "dining-room",
    "palette": "oatmilk",
    "prompt": "minimalist dining-room concept with oatmilk palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "eye-level-wide",
    "materialMix": [
      "wood",
      "boucle",
      "plaster"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.825
  },
  {
    "id": "style-minimalist-bathroom-5",
    "style": "minimalist",
    "room": "bathroom",
    "palette": "stone-blue",
    "prompt": "minimalist bathroom concept with stone-blue palette, balanced furniture, layered lighting",
    "layoutAdvice": "keep furniture scale coherent",
    "camera": "corner-three-quarter",
    "materialMix": [
      "wood",
      "boucle",
      "plaster"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.84
  },
  {
    "id": "style-minimalist-entryway-6",
    "style": "minimalist",
    "room": "entryway",
    "palette": "sage-cream",
    "prompt": "minimalist entryway concept with sage-cream palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the entryway",
    "camera": "eye-level-wide",
    "materialMix": [
      "wood",
      "boucle",
      "plaster"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.81
  },
  {
    "id": "style-minimalist-studio-7",
    "style": "minimalist",
    "room": "studio",
    "palette": "ink-linen",
    "prompt": "minimalist studio concept with ink-linen palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "corner-three-quarter",
    "materialMix": [
      "wood",
      "boucle",
      "plaster"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.825
  }
] as const;

export const STYLE_META={id:"minimalist",label:"Minimalist",defaultTemperature:3000,preferredRooms:["bedroom", "kitchen", "home-office", "dining-room"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
