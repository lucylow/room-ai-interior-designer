export const STYLE_CASES = [
  {
    "id": "style-art-deco-living-room-0",
    "style": "art-deco",
    "room": "living-room",
    "palette": "chalk-walnut",
    "prompt": "art-deco living-room concept with chalk-walnut palette, balanced furniture, layered lighting",
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
    "id": "style-art-deco-bedroom-1",
    "style": "art-deco",
    "room": "bedroom",
    "palette": "smoke-bone",
    "prompt": "art-deco bedroom concept with smoke-bone palette, balanced furniture, layered lighting",
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
    "id": "style-art-deco-kitchen-2",
    "style": "art-deco",
    "room": "kitchen",
    "palette": "warm-sand",
    "prompt": "art-deco kitchen concept with warm-sand palette, balanced furniture, layered lighting",
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
    "id": "style-art-deco-home-office-3",
    "style": "art-deco",
    "room": "home-office",
    "palette": "nordic-mist",
    "prompt": "art-deco home-office concept with nordic-mist palette, balanced furniture, layered lighting",
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
    "id": "style-art-deco-dining-room-4",
    "style": "art-deco",
    "room": "dining-room",
    "palette": "forest-ink",
    "prompt": "art-deco dining-room concept with forest-ink palette, balanced furniture, layered lighting",
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
    "id": "style-art-deco-bathroom-5",
    "style": "art-deco",
    "room": "bathroom",
    "palette": "charcoal-brass",
    "prompt": "art-deco bathroom concept with charcoal-brass palette, balanced furniture, layered lighting",
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
    "id": "style-art-deco-entryway-6",
    "style": "art-deco",
    "room": "entryway",
    "palette": "soft-clay",
    "prompt": "art-deco entryway concept with soft-clay palette, balanced furniture, layered lighting",
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
    "id": "style-art-deco-studio-7",
    "style": "art-deco",
    "room": "studio",
    "palette": "oatmilk",
    "prompt": "art-deco studio concept with oatmilk palette, balanced furniture, layered lighting",
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

export const STYLE_META={id:"art-deco",label:"Art Deco",defaultTemperature:3500,preferredRooms:["kitchen", "home-office", "dining-room", "bathroom"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
