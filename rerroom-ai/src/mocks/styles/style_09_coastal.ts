export const STYLE_CASES = [
  {
    "id": "style-coastal-living-room-0",
    "style": "coastal",
    "room": "living-room",
    "palette": "terracotta-olive",
    "prompt": "coastal living-room concept with terracotta-olive palette, balanced furniture, layered lighting",
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
    "score": 0.9
  },
  {
    "id": "style-coastal-bedroom-1",
    "style": "coastal",
    "room": "bedroom",
    "palette": "chalk-walnut",
    "prompt": "coastal bedroom concept with chalk-walnut palette, balanced furniture, layered lighting",
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
    "score": 0.915
  },
  {
    "id": "style-coastal-kitchen-2",
    "style": "coastal",
    "room": "kitchen",
    "palette": "smoke-bone",
    "prompt": "coastal kitchen concept with smoke-bone palette, balanced furniture, layered lighting",
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
    "score": 0.93
  },
  {
    "id": "style-coastal-home-office-3",
    "style": "coastal",
    "room": "home-office",
    "palette": "warm-sand",
    "prompt": "coastal home-office concept with warm-sand palette, balanced furniture, layered lighting",
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
    "score": 0.9
  },
  {
    "id": "style-coastal-dining-room-4",
    "style": "coastal",
    "room": "dining-room",
    "palette": "nordic-mist",
    "prompt": "coastal dining-room concept with nordic-mist palette, balanced furniture, layered lighting",
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
    "score": 0.915
  },
  {
    "id": "style-coastal-bathroom-5",
    "style": "coastal",
    "room": "bathroom",
    "palette": "forest-ink",
    "prompt": "coastal bathroom concept with forest-ink palette, balanced furniture, layered lighting",
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
    "score": 0.93
  },
  {
    "id": "style-coastal-entryway-6",
    "style": "coastal",
    "room": "entryway",
    "palette": "charcoal-brass",
    "prompt": "coastal entryway concept with charcoal-brass palette, balanced furniture, layered lighting",
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
    "score": 0.9
  },
  {
    "id": "style-coastal-studio-7",
    "style": "coastal",
    "room": "studio",
    "palette": "soft-clay",
    "prompt": "coastal studio concept with soft-clay palette, balanced furniture, layered lighting",
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
    "score": 0.915
  }
] as const;

export const STYLE_META={id:"coastal",label:"Coastal",defaultTemperature:3000,preferredRooms:["bedroom", "kitchen", "home-office", "dining-room"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
