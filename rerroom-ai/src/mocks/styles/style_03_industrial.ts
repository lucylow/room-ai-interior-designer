export const STYLE_CASES = [
  {
    "id": "style-industrial-living-room-0",
    "style": "industrial",
    "room": "living-room",
    "palette": "charcoal-brass",
    "prompt": "industrial living-room concept with charcoal-brass palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the living-room",
    "camera": "eye-level-wide",
    "materialMix": [
      "walnut",
      "metal",
      "glass"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.87
  },
  {
    "id": "style-industrial-bedroom-1",
    "style": "industrial",
    "room": "bedroom",
    "palette": "soft-clay",
    "prompt": "industrial bedroom concept with soft-clay palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "corner-three-quarter",
    "materialMix": [
      "walnut",
      "metal",
      "glass"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.885
  },
  {
    "id": "style-industrial-kitchen-2",
    "style": "industrial",
    "room": "kitchen",
    "palette": "oatmilk",
    "prompt": "industrial kitchen concept with oatmilk palette, balanced furniture, layered lighting",
    "layoutAdvice": "keep furniture scale coherent",
    "camera": "eye-level-wide",
    "materialMix": [
      "walnut",
      "metal",
      "glass"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.9
  },
  {
    "id": "style-industrial-home-office-3",
    "style": "industrial",
    "room": "home-office",
    "palette": "stone-blue",
    "prompt": "industrial home-office concept with stone-blue palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the home-office",
    "camera": "corner-three-quarter",
    "materialMix": [
      "walnut",
      "metal",
      "glass"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.87
  },
  {
    "id": "style-industrial-dining-room-4",
    "style": "industrial",
    "room": "dining-room",
    "palette": "sage-cream",
    "prompt": "industrial dining-room concept with sage-cream palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "eye-level-wide",
    "materialMix": [
      "walnut",
      "metal",
      "glass"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.885
  },
  {
    "id": "style-industrial-bathroom-5",
    "style": "industrial",
    "room": "bathroom",
    "palette": "ink-linen",
    "prompt": "industrial bathroom concept with ink-linen palette, balanced furniture, layered lighting",
    "layoutAdvice": "keep furniture scale coherent",
    "camera": "corner-three-quarter",
    "materialMix": [
      "walnut",
      "metal",
      "glass"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.9
  },
  {
    "id": "style-industrial-entryway-6",
    "style": "industrial",
    "room": "entryway",
    "palette": "terracotta-olive",
    "prompt": "industrial entryway concept with terracotta-olive palette, balanced furniture, layered lighting",
    "layoutAdvice": "preserve a clear circulation spine through the entryway",
    "camera": "eye-level-wide",
    "materialMix": [
      "walnut",
      "metal",
      "glass"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.87
  },
  {
    "id": "style-industrial-studio-7",
    "style": "industrial",
    "room": "studio",
    "palette": "chalk-walnut",
    "prompt": "industrial studio concept with chalk-walnut palette, balanced furniture, layered lighting",
    "layoutAdvice": "anchor the seating zone around one focal point",
    "camera": "corner-three-quarter",
    "materialMix": [
      "walnut",
      "metal",
      "glass"
    ],
    "negative": [
      "avoid clutter",
      "avoid blocked openings",
      "avoid excessive matching sets"
    ],
    "score": 0.885
  }
] as const;

export const STYLE_META={id:"industrial",label:"Industrial",defaultTemperature:4000,preferredRooms:["home-office", "dining-room", "bathroom", "entryway"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
