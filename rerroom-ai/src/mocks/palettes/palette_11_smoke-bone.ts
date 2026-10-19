export const PALETTE = {
  "id": "palette-smoke-bone",
  "name": "Smoke Bone",
  "swatches": [
    {
      "role": "background",
      "hex": "#F30410"
    },
    {
      "role": "surface",
      "hex": "#EAFA07"
    },
    {
      "role": "accent",
      "hex": "#B3BBAF"
    },
    {
      "role": "dark",
      "hex": "#6F5C53"
    }
  ],
  "useCases": [
    "sunroom",
    "living-room",
    "bedroom",
    "kitchen",
    "home-office"
  ],
  "contrastTarget": 6.3,
  "temperature": "warm",
  "styleFit": [
    "new-nordic",
    "modern",
    "minimalist",
    "scandinavian"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
