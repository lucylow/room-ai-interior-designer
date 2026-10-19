export const PALETTE = {
  "id": "palette-forest-ink",
  "name": "Forest Ink",
  "swatches": [
    {
      "role": "background",
      "hex": "#D8D7D1"
    },
    {
      "role": "surface",
      "hex": "#C6C4BF"
    },
    {
      "role": "accent",
      "hex": "#627C82"
    },
    {
      "role": "dark",
      "hex": "#393838"
    }
  ],
  "useCases": [
    "kitchen",
    "home-office",
    "dining-room",
    "bathroom",
    "entryway"
  ],
  "contrastTarget": 5.7,
  "temperature": "warm",
  "styleFit": [
    "scandinavian",
    "industrial",
    "japandi",
    "mid-century"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
