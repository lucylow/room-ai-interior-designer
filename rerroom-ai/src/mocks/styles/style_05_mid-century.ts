export const STYLE_CASES = [
  {
    "id": "style-mid-century-living-room-0",
    "style": "mid-century",
    "room": "living-room",
    "palette": "oatmilk",
    "prompt": "mid-century living-room concept with oatmilk palette, balanced furniture, layered lighting",
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
    "id": "style-mid-century-bedroom-1",
    "style": "mid-century",
    "room": "bedroom",
    "palette": "stone-blue",
    "prompt": "mid-century bedroom concept with stone-blue palette, balanced furniture, layered lighting",
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
    "id": "style-mid-century-kitchen-2",
    "style": "mid-century",
    "room": "kitchen",
    "palette": "sage-cream",
    "prompt": "mid-century kitchen concept with sage-cream palette, balanced furniture, layered lighting",
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
    "id": "style-mid-century-home-office-3",
    "style": "mid-century",
    "room": "home-office",
    "palette": "ink-linen",
    "prompt": "mid-century home-office concept with ink-linen palette, balanced furniture, layered lighting",
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
    "id": "style-mid-century-dining-room-4",
    "style": "mid-century",
    "room": "dining-room",
    "palette": "terracotta-olive",
    "prompt": "mid-century dining-room concept with terracotta-olive palette, balanced furniture, layered lighting",
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
    "id": "style-mid-century-bathroom-5",
    "style": "mid-century",
    "room": "bathroom",
    "palette": "chalk-walnut",
    "prompt": "mid-century bathroom concept with chalk-walnut palette, balanced furniture, layered lighting",
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
    "id": "style-mid-century-entryway-6",
    "style": "mid-century",
    "room": "entryway",
    "palette": "smoke-bone",
    "prompt": "mid-century entryway concept with smoke-bone palette, balanced furniture, layered lighting",
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
    "id": "style-mid-century-studio-7",
    "style": "mid-century",
    "room": "studio",
    "palette": "warm-sand",
    "prompt": "mid-century studio concept with warm-sand palette, balanced furniture, layered lighting",
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

export const STYLE_META={id:"mid-century",label:"Mid Century",defaultTemperature:3000,preferredRooms:["bedroom", "kitchen", "home-office", "dining-room"]} as const;
export function casesForRoom(room:string){return STYLE_CASES.filter(c=>c.room===room)}
export function caseIds(){return STYLE_CASES.map(c=>c.id)}
export function recommendedPrompts(){return STYLE_CASES.map(c=>c.prompt)}
export function averageScore(){return STYLE_CASES.reduce((s,c)=>s+c.score,0)/STYLE_CASES.length}
