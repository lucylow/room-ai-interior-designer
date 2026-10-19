export const STYLE_CASES = [
  {
    "id": "style-scandinavian-living-room-0",
    "style": "scandinavian",
    "room": "living-room",
    "palette": "forest-ink",
    "prompt": "scandinavian living-room concept with forest-ink palette, balanced furniture, layered lighting",
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
    "score": 0.84
  },
  {
    "id": "style-scandinavian-bedroom-1",
    "style": "scandinavian",
    "room": "bedroom",
    "palette": "charcoal-brass",
    "prompt": "scandinavian bedroom concept with charcoal-brass palette, balanced furniture, layered lighting",
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
    "score": 0.855
  },
  {
    "id": "style-scandinavian-kitchen-2",
    "style": "scandinavian",
    "room": "kitchen",
    "palette": "soft-clay",
    "prompt": "scandinavian kitchen concept with soft-clay palette, balanced furniture, layered lighting",
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
    "score": 0.87
  },
  {
    "id": "style-scandinavian-home-office-3",
    "style": "scandinavian",
    "room": "home-office",
    "palette": "oatmilk",
    "prompt": "scandinavian home-office concept with oatmilk palette, balanced furniture, layered lighting",
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
    "score": 0.84
  },
  {
    "id": "style-scandinavian-dining-room-4",
    "style": "scandinavian",
    "room": "dining-room",
    "palette": "stone-blue",
    "prompt": "scandinavian dining-room concept with stone-blue palette, balanced furniture, layered lighting",
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
    "score": 0.855
  },
  {
    "id": "style-scandinavian-bathroom-5",
    "style": "scandinavian",
    "room": "bathroom",
    "palette": "sage-cream",
    "prompt": "scandinavian bathroom concept with sage-cream palette, balanced furniture, layered lighting",
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
    "score": 0.87
  },
  {
    "id": "style-scandinavian-entryway-6",
    "style": "scandinavian",
    "room": "entryway",
    "palette": "ink-linen",
    "prompt": "scandinavian entryway concept with ink-linen palette, balanced furniture, layered lighting",
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
    "score": 0.84
  },
  {
    "id": "style-scandinavian-studio-7",
    "style": "scandinavian",
    "room": "studio",
    "palette": "terracotta-olive",
    "prompt": "scandinavian studio concept with terracotta-olive palette, balanced furniture, layered lighting",
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
    "score": 0.855
  }
] as const;

export const STYLE_META={id:"scandinavian",label:"Scandinavian",defaultTemperature:3500,preferredRooms:["kitchen", "home-office", "dining-room", "bathroom"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
