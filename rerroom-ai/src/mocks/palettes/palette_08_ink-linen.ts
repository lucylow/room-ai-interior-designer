export const PALETTE = {
  "id": "palette-ink-linen",
  "name": "Ink Linen",
  "swatches": [
    {
      "role": "background",
      "hex": "#EAF5FB"
    },
    {
      "role": "surface",
      "hex": "#DEE8EF"
    },
    {
      "role": "accent",
      "hex": "#98A6A0"
    },
    {
      "role": "dark",
      "hex": "#5D504A"
    }
  ],
  "useCases": [
    "nursery",
    "media-room",
    "guest-room",
    "sunroom",
    "living-room"
  ],
  "contrastTarget": 4.5,
  "temperature": "warm",
  "styleFit": [
    "quiet-luxury",
    "coastal",
    "art-deco",
    "new-nordic"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
