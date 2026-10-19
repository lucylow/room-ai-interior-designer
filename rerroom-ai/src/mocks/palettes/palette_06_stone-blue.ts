export const PALETTE = {
  "id": "palette-stone-blue",
  "name": "Stone Blue",
  "swatches": [
    {
      "role": "background",
      "hex": "#E4EBED"
    },
    {
      "role": "surface",
      "hex": "#D6DCDF"
    },
    {
      "role": "accent",
      "hex": "#869896"
    },
    {
      "role": "dark",
      "hex": "#514844"
    }
  ],
  "useCases": [
    "entryway",
    "studio",
    "nursery",
    "media-room",
    "guest-room"
  ],
  "contrastTarget": 5.7,
  "temperature": "warm",
  "styleFit": [
    "organic-modern",
    "warm-minimal",
    "quiet-luxury",
    "coastal"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
