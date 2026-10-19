export const PALETTE = {
  "id": "palette-chalk-walnut",
  "name": "Chalk Walnut",
  "swatches": [
    {
      "role": "background",
      "hex": "#F0FF09"
    },
    {
      "role": "surface",
      "hex": "#E6F4FF"
    },
    {
      "role": "accent",
      "hex": "#AAB4AA"
    },
    {
      "role": "dark",
      "hex": "#695850"
    }
  ],
  "useCases": [
    "guest-room",
    "sunroom",
    "living-room",
    "bedroom",
    "kitchen"
  ],
  "contrastTarget": 5.7,
  "temperature": "cool",
  "styleFit": [
    "art-deco",
    "new-nordic",
    "modern",
    "minimalist"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
