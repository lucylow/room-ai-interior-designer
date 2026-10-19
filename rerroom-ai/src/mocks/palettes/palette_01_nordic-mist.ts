export const PALETTE = {
  "id": "palette-nordic-mist",
  "name": "Nordic Mist",
  "swatches": [
    {
      "role": "background",
      "hex": "#D5D2CA"
    },
    {
      "role": "surface",
      "hex": "#C2BEB7"
    },
    {
      "role": "accent",
      "hex": "#59757D"
    },
    {
      "role": "dark",
      "hex": "#333435"
    }
  ],
  "useCases": [
    "bedroom",
    "kitchen",
    "home-office",
    "dining-room",
    "bathroom"
  ],
  "contrastTarget": 5.1,
  "temperature": "cool",
  "styleFit": [
    "minimalist",
    "scandinavian",
    "industrial",
    "japandi"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
