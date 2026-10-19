export const STYLE_CASES = [
  {
    "id": "style-organic-modern-living-room-0",
    "style": "organic-modern",
    "room": "living-room",
    "palette": "stone-blue",
    "prompt": "organic-modern living-room concept with stone-blue palette, balanced furniture, layered lighting",
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
    "id": "style-organic-modern-bedroom-1",
    "style": "organic-modern",
    "room": "bedroom",
    "palette": "sage-cream",
    "prompt": "organic-modern bedroom concept with sage-cream palette, balanced furniture, layered lighting",
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
    "id": "style-organic-modern-kitchen-2",
    "style": "organic-modern",
    "room": "kitchen",
    "palette": "ink-linen",
    "prompt": "organic-modern kitchen concept with ink-linen palette, balanced furniture, layered lighting",
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
    "id": "style-organic-modern-home-office-3",
    "style": "organic-modern",
    "room": "home-office",
    "palette": "terracotta-olive",
    "prompt": "organic-modern home-office concept with terracotta-olive palette, balanced furniture, layered lighting",
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
    "id": "style-organic-modern-dining-room-4",
    "style": "organic-modern",
    "room": "dining-room",
    "palette": "chalk-walnut",
    "prompt": "organic-modern dining-room concept with chalk-walnut palette, balanced furniture, layered lighting",
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
    "id": "style-organic-modern-bathroom-5",
    "style": "organic-modern",
    "room": "bathroom",
    "palette": "smoke-bone",
    "prompt": "organic-modern bathroom concept with smoke-bone palette, balanced furniture, layered lighting",
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
    "id": "style-organic-modern-entryway-6",
    "style": "organic-modern",
    "room": "entryway",
    "palette": "warm-sand",
    "prompt": "organic-modern entryway concept with warm-sand palette, balanced furniture, layered lighting",
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
    "id": "style-organic-modern-studio-7",
    "style": "organic-modern",
    "room": "studio",
    "palette": "nordic-mist",
    "prompt": "organic-modern studio concept with nordic-mist palette, balanced furniture, layered lighting",
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

export const STYLE_META={id:"organic-modern",label:"Organic Modern",defaultTemperature:3500,preferredRooms:["kitchen", "home-office", "dining-room", "bathroom"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
