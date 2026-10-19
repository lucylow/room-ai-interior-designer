export const PALETTE = {
  "id": "palette-charcoal-brass",
  "name": "Charcoal Brass",
  "swatches": [
    {
      "role": "background",
      "hex": "#DBDCD8"
    },
    {
      "role": "surface",
      "hex": "#CACAC7"
    },
    {
      "role": "accent",
      "hex": "#6B8387"
    },
    {
      "role": "dark",
      "hex": "#3F3C3B"
    }
  ],
  "useCases": [
    "home-office",
    "dining-room",
    "bathroom",
    "entryway",
    "studio"
  ],
  "contrastTarget": 6.3,
  "temperature": "warm",
  "styleFit": [
    "industrial",
    "japandi",
    "mid-century",
    "organic-modern"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
