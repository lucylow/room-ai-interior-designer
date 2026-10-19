export const PALETTE = {
  "id": "palette-oatmilk",
  "name": "Oatmilk",
  "swatches": [
    {
      "role": "background",
      "hex": "#E1E6E6"
    },
    {
      "role": "surface",
      "hex": "#D2D6D7"
    },
    {
      "role": "accent",
      "hex": "#7D9191"
    },
    {
      "role": "dark",
      "hex": "#4B4441"
    }
  ],
  "useCases": [
    "bathroom",
    "entryway",
    "studio",
    "nursery",
    "media-room"
  ],
  "contrastTarget": 5.1,
  "temperature": "warm",
  "styleFit": [
    "mid-century",
    "organic-modern",
    "warm-minimal",
    "quiet-luxury"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
