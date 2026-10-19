export const PALETTE = {
  "id": "palette-terracotta-olive",
  "name": "Terracotta Olive",
  "swatches": [
    {
      "role": "background",
      "hex": "#EDFA02"
    },
    {
      "role": "surface",
      "hex": "#E2EEF7"
    },
    {
      "role": "accent",
      "hex": "#A1ADA5"
    },
    {
      "role": "dark",
      "hex": "#63544D"
    }
  ],
  "useCases": [
    "media-room",
    "guest-room",
    "sunroom",
    "living-room",
    "bedroom"
  ],
  "contrastTarget": 5.1,
  "temperature": "warm",
  "styleFit": [
    "coastal",
    "art-deco",
    "new-nordic",
    "modern"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
