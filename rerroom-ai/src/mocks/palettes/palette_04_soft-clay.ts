export const PALETTE = {
  "id": "palette-soft-clay",
  "name": "Soft Clay",
  "swatches": [
    {
      "role": "background",
      "hex": "#DEE1DF"
    },
    {
      "role": "surface",
      "hex": "#CED0CF"
    },
    {
      "role": "accent",
      "hex": "#748A8C"
    },
    {
      "role": "dark",
      "hex": "#45403E"
    }
  ],
  "useCases": [
    "dining-room",
    "bathroom",
    "entryway",
    "studio",
    "nursery"
  ],
  "contrastTarget": 4.5,
  "temperature": "cool",
  "styleFit": [
    "japandi",
    "mid-century",
    "organic-modern",
    "warm-minimal"
  ]
} as const;
export function swatch(role:string){return PALETTE.swatches.find(s=>s.role===role)}
export function supportsRoom(room:string){return (PALETTE.useCases as readonly string[]).includes(room)}
export function fitsStyle(style:string){return (PALETTE.styleFit as readonly string[]).includes(style)}
