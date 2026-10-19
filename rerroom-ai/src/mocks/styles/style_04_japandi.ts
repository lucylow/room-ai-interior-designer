export const STYLE_CASES = [
  {
    "id": "style-japandi-living-room-0",
    "style": "japandi",
    "room": "living-room",
    "palette": "soft-clay",
    "prompt": "japandi living-room concept with soft-clay palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the living-room",
    "camera": "eye-level-wide",
    "materialMix": [
      "oak",
      "linen",
      "stone"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.9
  },
  {
    "id": "style-japandi-bedroom-1",
    "style": "japandi",
    "room": "bedroom",
    "palette": "oatmilk",
    "prompt": "japandi bedroom concept with oatmilk palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "corner-three-quarter",
    "materialMix": [
      "oak",
      "linen",
      "stone"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.915
  },
  {
    "id": "style-japandi-kitchen-2",
    "style": "japandi",
    "room": "kitchen",
    "palette": "stone-blue",
    "prompt": "japandi kitchen concept with stone-blue palette, balanced furniture, layered lighting",
    "layoutAdvice": "keep furniture scale coherent",
    "camera": "eye-level-wide",
    "materialMix": [
      "oak",
      "linen",
      "stone"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.93
  },
  {
    "id": "style-japandi-home-office-3",
    "style": "japandi",
    "room": "home-office",
    "palette": "sage-cream",
    "prompt": "japandi home-office concept with sage-cream palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the home-office",
    "camera": "corner-three-quarter",
    "materialMix": [
      "oak",
      "linen",
      "stone"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.9
  },
  {
    "id": "style-japandi-dining-room-4",
    "style": "japandi",
    "room": "dining-room",
    "palette": "ink-linen",
    "prompt": "japandi dining-room concept with ink-linen palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "eye-level-wide",
    "materialMix": [
      "oak",
      "linen",
      "stone"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.915
  },
  {
    "id": "style-japandi-bathroom-5",
    "style": "japandi",
    "room": "bathroom",
    "palette": "terracotta-olive",
    "prompt": "japandi bathroom concept with terracotta-olive palette, balanced furniture, layered lighting",
    "layoutAdvice": "keep furniture scale coherent",
    "camera": "corner-three-quarter",
    "materialMix": [
      "oak",
      "linen",
      "stone"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.93
  },
  {
    "id": "style-japandi-entryway-6",
    "style": "japandi",
    "room": "entryway",
    "palette": "chalk-walnut",
    "prompt": "japandi entryway concept with chalk-walnut palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the entryway",
    "camera": "eye-level-wide",
    "materialMix": [
      "oak",
      "linen",
      "stone"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.9
  },
  {
    "id": "style-japandi-studio-7",
    "style": "japandi",
    "room": "studio",
    "palette": "smoke-bone",
    "prompt": "japandi studio concept with smoke-bone palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "corner-three-quarter",
    "materialMix": [
      "oak",
      "linen",
      "stone"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.915
  }
] as const;

export const STYLE_META={id:"japandi",label:"Japandi",defaultTemperature:2700,preferredRooms:["living-room", "bedroom", "kitchen", "home-office"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
