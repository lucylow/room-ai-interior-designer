export const PALETTE = {
  "id": "palette-warm-sand",
  "name": "Warm Sand",
  "swatches": [
    {
      "role": "background",
      "hex": "#D2CDC3"
    },
    {
      "role": "surface",
      "hex": "#BEB8AF"
    },
    {
      "role": "accent",
      "hex": "#506E78"
    },
    {
      "role": "dark",
      "hex": "#2D3032"
    }
  ],
  "useCases": [
    "living-room",
    "bedroom",
    "kitchen",
    "home-office",
    "dining-room"
  ],
  "contrastTarget": 4.5,
  "temperature": "warm",
  "styleFit": [
    "modern",
    "minimalist",
    "scandinavian",
    "industrial"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
