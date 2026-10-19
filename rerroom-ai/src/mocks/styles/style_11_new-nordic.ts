export const STYLE_CASES = [
  {
    "id": "style-new-nordic-living-room-0",
    "style": "new-nordic",
    "room": "living-room",
    "palette": "smoke-bone",
    "prompt": "new-nordic living-room concept with smoke-bone palette, balanced furniture, layered lighting",
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
    "id": "style-new-nordic-bedroom-1",
    "style": "new-nordic",
    "room": "bedroom",
    "palette": "warm-sand",
    "prompt": "new-nordic bedroom concept with warm-sand palette, balanced furniture, layered lighting",
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
    "id": "style-new-nordic-kitchen-2",
    "style": "new-nordic",
    "room": "kitchen",
    "palette": "nordic-mist",
    "prompt": "new-nordic kitchen concept with nordic-mist palette, balanced furniture, layered lighting",
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
    "id": "style-new-nordic-home-office-3",
    "style": "new-nordic",
    "room": "home-office",
    "palette": "forest-ink",
    "prompt": "new-nordic home-office concept with forest-ink palette, balanced furniture, layered lighting",
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
    "id": "style-new-nordic-dining-room-4",
    "style": "new-nordic",
    "room": "dining-room",
    "palette": "charcoal-brass",
    "prompt": "new-nordic dining-room concept with charcoal-brass palette, balanced furniture, layered lighting",
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
    "id": "style-new-nordic-bathroom-5",
    "style": "new-nordic",
    "room": "bathroom",
    "palette": "soft-clay",
    "prompt": "new-nordic bathroom concept with soft-clay palette, balanced furniture, layered lighting",
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
    "id": "style-new-nordic-entryway-6",
    "style": "new-nordic",
    "room": "entryway",
    "palette": "oatmilk",
    "prompt": "new-nordic entryway concept with oatmilk palette, balanced furniture, layered lighting",
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
    "id": "style-new-nordic-studio-7",
    "style": "new-nordic",
    "room": "studio",
    "palette": "stone-blue",
    "prompt": "new-nordic studio concept with stone-blue palette, balanced furniture, layered lighting",
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

export const STYLE_META={id:"new-nordic",label:"New Nordic",defaultTemperature:4000,preferredRooms:["home-office", "dining-room", "bathroom", "entryway"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
