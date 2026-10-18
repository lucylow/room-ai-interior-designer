import { DesignStyleId } from "./types";
export interface StyleProfile { id: DesignStyleId; label: string; description: string; visualLanguage: string[]; preferredMaterials: string[]; lightingBias: string[]; layoutBias: string[]; paletteAffinity: string[]; negativeCues: string[]; }
const STYLE_DATA: StyleProfile[] = [
  {
    "id": "modern",
    "label": "Modern",
    "description": "clean geometry, restrained ornament, balanced contrast",
    "visualLanguage": [
      "clean geometry",
      "restrained ornament",
      "balanced contrast"
    ],
    "preferredMaterials": [
      "stone",
      "oak",
      "graphite"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p01",
      "p04"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "minimalist",
    "label": "Minimalist",
    "description": "low visual noise, negative space, hidden storage",
    "visualLanguage": [
      "low visual noise",
      "negative space",
      "hidden storage"
    ],
    "preferredMaterials": [
      "warm white",
      "oat",
      "charcoal"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p02",
      "p05"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "scandinavian",
    "label": "Scandinavian",
    "description": "light wood, soft textiles, daylight, function-first",
    "visualLanguage": [
      "light wood",
      "soft textiles",
      "daylight",
      "function-first"
    ],
    "preferredMaterials": [
      "oak",
      "mist blue",
      "soft gray"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p03",
      "p06"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "industrial",
    "label": "Industrial",
    "description": "metal, concrete, exposed details, bold structure",
    "visualLanguage": [
      "metal",
      "concrete",
      "exposed details",
      "bold structure"
    ],
    "preferredMaterials": [
      "charcoal",
      "rust",
      "warm wood"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p04",
      "p07"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "japandi",
    "label": "Japandi",
    "description": "calm natural materials, quiet asymmetry, tactile simplicity",
    "visualLanguage": [
      "calm natural materials",
      "quiet asymmetry",
      "tactile simplicity"
    ],
    "preferredMaterials": [
      "sand",
      "sage",
      "walnut"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p05",
      "p08"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "midcentury",
    "label": "Mid-century",
    "description": "tapered forms, walnut, playful geometry, warm light",
    "visualLanguage": [
      "tapered forms",
      "walnut",
      "playful geometry",
      "warm light"
    ],
    "preferredMaterials": [
      "mustard",
      "walnut",
      "teal"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p06",
      "p09"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "organic-modern",
    "label": "Organic Modern",
    "description": "rounded forms, plaster, stone, layered neutrals",
    "visualLanguage": [
      "rounded forms",
      "plaster",
      "stone",
      "layered neutrals"
    ],
    "preferredMaterials": [
      "bone",
      "clay",
      "olive"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p07",
      "p10"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "bohemian",
    "label": "Bohemian",
    "description": "layered textiles, collected art, plants, relaxed zoning",
    "visualLanguage": [
      "layered textiles",
      "collected art",
      "plants",
      "relaxed zoning"
    ],
    "preferredMaterials": [
      "terracotta",
      "saffron",
      "cream"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p08",
      "p11"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "contemporary",
    "label": "Contemporary",
    "description": "current silhouettes, mixed finishes, sculptural accents",
    "visualLanguage": [
      "current silhouettes",
      "mixed finishes",
      "sculptural accents"
    ],
    "preferredMaterials": [
      "greige",
      "ink",
      "bronze"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p09",
      "p12"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "warm-minimal",
    "label": "Warm Minimal",
    "description": "softened minimalism, wood tones, ambient light",
    "visualLanguage": [
      "softened minimalism",
      "wood tones",
      "ambient light"
    ],
    "preferredMaterials": [
      "ivory",
      "camel",
      "espresso"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p10",
      "p01"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "quiet-luxury",
    "label": "Quiet Luxury",
    "description": "tailored proportions, refined texture, subtle metals",
    "visualLanguage": [
      "tailored proportions",
      "refined texture",
      "subtle metals"
    ],
    "preferredMaterials": [
      "taupe",
      "cream",
      "deep olive"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p11",
      "p02"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "coastal-modern",
    "label": "Coastal Modern",
    "description": "airy composition, pale wood, blue-gray accents",
    "visualLanguage": [
      "airy composition",
      "pale wood",
      "blue-gray accents"
    ],
    "preferredMaterials": [
      "sand",
      "fog blue",
      "driftwood"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p12",
      "p03"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "modern-farmhouse",
    "label": "Modern Farmhouse",
    "description": "simple utility forms, natural wood, practical comfort",
    "visualLanguage": [
      "simple utility forms",
      "natural wood",
      "practical comfort"
    ],
    "preferredMaterials": [
      "linen",
      "oak",
      "muted black"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p01",
      "p04"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "transitional",
    "label": "Transitional",
    "description": "classic silhouettes updated with clean details",
    "visualLanguage": [
      "classic silhouettes updated with clean details"
    ],
    "preferredMaterials": [
      "linen",
      "walnut",
      "soft black"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p02",
      "p05"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "art-deco",
    "label": "Art Deco",
    "description": "symmetry, rich materials, geometric accents",
    "visualLanguage": [
      "symmetry",
      "rich materials",
      "geometric accents"
    ],
    "preferredMaterials": [
      "emerald",
      "cream",
      "brass"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p03",
      "p06"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "new-nordic",
    "label": "New Nordic",
    "description": "lighter modern Scandinavian with darker accents",
    "visualLanguage": [
      "lighter modern Scandinavian with darker accents"
    ],
    "preferredMaterials": [
      "pale oak",
      "ink",
      "moss"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p04",
      "p07"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "soft-industrial",
    "label": "Soft Industrial",
    "description": "industrial structure moderated by textile softness",
    "visualLanguage": [
      "industrial structure moderated by textile softness"
    ],
    "preferredMaterials": [
      "slate",
      "cognac",
      "ivory"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p05",
      "p08"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "desert-modern",
    "label": "Desert Modern",
    "description": "mineral surfaces, sculptural pieces, sun-washed tones",
    "visualLanguage": [
      "mineral surfaces",
      "sculptural pieces",
      "sun-washed tones"
    ],
    "preferredMaterials": [
      "sandstone",
      "clay",
      "olive"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p06",
      "p09"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "moody-modern",
    "label": "Moody Modern",
    "description": "deep values, controlled contrast, intimate lighting",
    "visualLanguage": [
      "deep values",
      "controlled contrast",
      "intimate lighting"
    ],
    "preferredMaterials": [
      "ink",
      "plum",
      "walnut"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p07",
      "p10"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "eclectic-modern",
    "label": "Eclectic Modern",
    "description": "curated mixing, graphic anchors, personal objects",
    "visualLanguage": [
      "curated mixing",
      "graphic anchors",
      "personal objects"
    ],
    "preferredMaterials": [
      "cream",
      "cobalt",
      "terracotta"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p08",
      "p11"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "naturalist",
    "label": "Naturalist",
    "description": "biophilic layers, raw materials, visible grain",
    "visualLanguage": [
      "biophilic layers",
      "raw materials",
      "visible grain"
    ],
    "preferredMaterials": [
      "moss",
      "oak",
      "clay"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p09",
      "p12"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "urban-soft",
    "label": "Urban Soft",
    "description": "compact planning, acoustic textiles, softened edges",
    "visualLanguage": [
      "compact planning",
      "acoustic textiles",
      "softened edges"
    ],
    "preferredMaterials": [
      "stone",
      "ink",
      "blush"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p10",
      "p01"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "heritage-modern",
    "label": "Heritage Modern",
    "description": "traditional details with contemporary furniture",
    "visualLanguage": [
      "traditional details with contemporary furniture"
    ],
    "preferredMaterials": [
      "cream",
      "oxblood",
      "walnut"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p11",
      "p02"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  },
  {
    "id": "craft-modern",
    "label": "Craft Modern",
    "description": "handmade cues, artisanal texture, modern proportions",
    "visualLanguage": [
      "handmade cues",
      "artisanal texture",
      "modern proportions"
    ],
    "preferredMaterials": [
      "linen",
      "umber",
      "sage"
    ],
    "lightingBias": [
      "soft ambient",
      "layered task",
      "controlled accent"
    ],
    "layoutBias": [
      "preserve circulation",
      "anchor largest piece",
      "keep primary sightline clear"
    ],
    "paletteAffinity": [
      "p12",
      "p03"
    ],
    "negativeCues": [
      "visual clutter",
      "oversized furniture",
      "blocked openings"
    ]
  }
];

export const STYLE_CATALOG: StyleProfile[] = STYLE_DATA;
