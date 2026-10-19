export const STYLE_CASES = [
  {
    "id": "style-modern-living-room-0",
    "style": "modern",
    "room": "living-room",
    "palette": "warm-sand",
    "prompt": "modern living-room concept with warm-sand palette, balanced furniture, layered lighting",
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
    "score": 0.78
  },
  {
    "id": "style-modern-bedroom-1",
    "style": "modern",
    "room": "bedroom",
    "palette": "nordic-mist",
    "prompt": "modern bedroom concept with nordic-mist palette, balanced furniture, layered lighting",
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
    "score": 0.795
  },
  {
    "id": "style-modern-kitchen-2",
    "style": "modern",
    "room": "kitchen",
    "palette": "forest-ink",
    "prompt": "modern kitchen concept with forest-ink palette, balanced furniture, layered lighting",
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
    "score": 0.81
  },
  {
    "id": "style-modern-home-office-3",
    "style": "modern",
    "room": "home-office",
    "palette": "charcoal-brass",
    "prompt": "modern home-office concept with charcoal-brass palette, balanced furniture, layered lighting",
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
    "score": 0.78
  },
  {
    "id": "style-modern-dining-room-4",
    "style": "modern",
    "room": "dining-room",
    "palette": "soft-clay",
    "prompt": "modern dining-room concept with soft-clay palette, balanced furniture, layered lighting",
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
    "score": 0.795
  },
  {
    "id": "style-modern-bathroom-5",
    "style": "modern",
    "room": "bathroom",
    "palette": "oatmilk",
    "prompt": "modern bathroom concept with oatmilk palette, balanced furniture, layered lighting",
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
    "score": 0.81
  },
  {
    "id": "style-modern-entryway-6",
    "style": "modern",
    "room": "entryway",
    "palette": "stone-blue",
    "prompt": "modern entryway concept with stone-blue palette, balanced furniture, layered lighting",
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
    "score": 0.78
  },
  {
    "id": "style-modern-studio-7",
    "style": "modern",
    "room": "studio",
    "palette": "sage-cream",
    "prompt": "modern studio concept with sage-cream palette, balanced furniture, layered lighting",
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
    "score": 0.795
  }
] as const;

export const STYLE_META={id:"modern",label:"Modern",defaultTemperature:2700,preferredRooms:["living-room", "bedroom", "kitchen", "home-office"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
