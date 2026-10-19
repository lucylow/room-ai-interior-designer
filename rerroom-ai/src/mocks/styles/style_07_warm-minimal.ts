export const STYLE_CASES = [
  {
    "id": "style-warm-minimal-living-room-0",
    "style": "warm-minimal",
    "room": "living-room",
    "palette": "sage-cream",
    "prompt": "warm-minimal living-room concept with sage-cream palette, balanced furniture, layered lighting",
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
    "score": 0.84
  },
  {
    "id": "style-warm-minimal-bedroom-1",
    "style": "warm-minimal",
    "room": "bedroom",
    "palette": "ink-linen",
    "prompt": "warm-minimal bedroom concept with ink-linen palette, balanced furniture, layered lighting",
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
    "score": 0.855
  },
  {
    "id": "style-warm-minimal-kitchen-2",
    "style": "warm-minimal",
    "room": "kitchen",
    "palette": "terracotta-olive",
    "prompt": "warm-minimal kitchen concept with terracotta-olive palette, balanced furniture, layered lighting",
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
    "score": 0.87
  },
  {
    "id": "style-warm-minimal-home-office-3",
    "style": "warm-minimal",
    "room": "home-office",
    "palette": "chalk-walnut",
    "prompt": "warm-minimal home-office concept with chalk-walnut palette, balanced furniture, layered lighting",
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
    "score": 0.84
  },
  {
    "id": "style-warm-minimal-dining-room-4",
    "style": "warm-minimal",
    "room": "dining-room",
    "palette": "smoke-bone",
    "prompt": "warm-minimal dining-room concept with smoke-bone palette, balanced furniture, layered lighting",
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
    "score": 0.855
  },
  {
    "id": "style-warm-minimal-bathroom-5",
    "style": "warm-minimal",
    "room": "bathroom",
    "palette": "warm-sand",
    "prompt": "warm-minimal bathroom concept with warm-sand palette, balanced furniture, layered lighting",
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
    "score": 0.87
  },
  {
    "id": "style-warm-minimal-entryway-6",
    "style": "warm-minimal",
    "room": "entryway",
    "palette": "nordic-mist",
    "prompt": "warm-minimal entryway concept with nordic-mist palette, balanced furniture, layered lighting",
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
    "score": 0.84
  },
  {
    "id": "style-warm-minimal-studio-7",
    "style": "warm-minimal",
    "room": "studio",
    "palette": "forest-ink",
    "prompt": "warm-minimal studio concept with forest-ink palette, balanced furniture, layered lighting",
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
    "score": 0.855
  }
] as const;

export const STYLE_META={id:"warm-minimal",label:"Warm Minimal",defaultTemperature:4000,preferredRooms:["home-office", "dining-room", "bathroom", "entryway"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
