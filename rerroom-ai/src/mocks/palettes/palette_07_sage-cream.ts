export const PALETTE = {
  "id": "palette-sage-cream",
  "name": "Sage Cream",
  "swatches": [
    {
      "role": "background",
      "hex": "#E7F0F4"
    },
    {
      "role": "surface",
      "hex": "#DAE2E7"
    },
    {
      "role": "accent",
      "hex": "#8F9F9B"
    },
    {
      "role": "dark",
      "hex": "#574C47"
    }
  ],
  "useCases": [
    "studio",
    "nursery",
    "media-room",
    "guest-room",
    "sunroom"
  ],
  "contrastTarget": 6.3,
  "temperature": "cool",
  "styleFit": [
    "warm-minimal",
    "quiet-luxury",
    "coastal",
    "art-deco"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
