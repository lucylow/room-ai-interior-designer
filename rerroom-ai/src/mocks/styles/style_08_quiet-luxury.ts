export const STYLE_CASES = [
  {
    "id": "style-quiet-luxury-living-room-0",
    "style": "quiet-luxury",
    "room": "living-room",
    "palette": "ink-linen",
    "prompt": "quiet-luxury living-room concept with ink-linen palette, balanced furniture, layered lighting",
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
    "score": 0.87
  },
  {
    "id": "style-quiet-luxury-bedroom-1",
    "style": "quiet-luxury",
    "room": "bedroom",
    "palette": "terracotta-olive",
    "prompt": "quiet-luxury bedroom concept with terracotta-olive palette, balanced furniture, layered lighting",
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
    "score": 0.885
  },
  {
    "id": "style-quiet-luxury-kitchen-2",
    "style": "quiet-luxury",
    "room": "kitchen",
    "palette": "chalk-walnut",
    "prompt": "quiet-luxury kitchen concept with chalk-walnut palette, balanced furniture, layered lighting",
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
    "score": 0.9
  },
  {
    "id": "style-quiet-luxury-home-office-3",
    "style": "quiet-luxury",
    "room": "home-office",
    "palette": "smoke-bone",
    "prompt": "quiet-luxury home-office concept with smoke-bone palette, balanced furniture, layered lighting",
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
    "score": 0.87
  },
  {
    "id": "style-quiet-luxury-dining-room-4",
    "style": "quiet-luxury",
    "room": "dining-room",
    "palette": "warm-sand",
    "prompt": "quiet-luxury dining-room concept with warm-sand palette, balanced furniture, layered lighting",
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
    "score": 0.885
  },
  {
    "id": "style-quiet-luxury-bathroom-5",
    "style": "quiet-luxury",
    "room": "bathroom",
    "palette": "nordic-mist",
    "prompt": "quiet-luxury bathroom concept with nordic-mist palette, balanced furniture, layered lighting",
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
    "score": 0.9
  },
  {
    "id": "style-quiet-luxury-entryway-6",
    "style": "quiet-luxury",
    "room": "entryway",
    "palette": "forest-ink",
    "prompt": "quiet-luxury entryway concept with forest-ink palette, balanced furniture, layered lighting",
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
    "score": 0.87
  },
  {
    "id": "style-quiet-luxury-studio-7",
    "style": "quiet-luxury",
    "room": "studio",
    "palette": "charcoal-brass",
    "prompt": "quiet-luxury studio concept with charcoal-brass palette, balanced furniture, layered lighting",
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
    "score": 0.885
  }
] as const;

export const STYLE_META={id:"quiet-luxury",label:"Quiet Luxury",defaultTemperature:2700,preferredRooms:["living-room", "bedroom", "kitchen", "home-office"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
