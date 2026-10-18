# RE:ROOM AI — Generative Creative Mock Data V7

This continuation adds a large deterministic mock-data layer on top of the previous generative AI, 2D/3D, CAD/BIM and retail shopping packages.

## New data counts

- 20 style profiles
- 48 palettes
- 180 room/style layout-advice cards
- 576 creative concepts
- 160 iterative refinement records
- 240 furniture aesthetic mappings
- 96 synthetic user preference profiles
- 120 design scenarios
- 150 generation prompt templates
- 100 moodboard cards
- 72 demo gallery projects
- 12 room filter-matrix rows

## Core filters

Modern, Minimalist, Scandinavian, Industrial, Japandi, Mid-century, Organic Modern, Bohemian, Contemporary, Warm Minimal, Quiet Luxury, Coastal Modern, Modern Farmhouse, Classic Transitional, Art Deco, New Nordic, Soft Industrial, Desert Modern, Moody Modern and Eclectic Modern.

## Demo behavior

`generateMockCreativeDesign()` provides deterministic output with style filters, palette filters, layout advice and reversible refinement suggestions. No model key or network request is needed.

## Architectural invariant

The mock creative layer assumes the CAD/BIM source geometry remains authoritative. Concepts are aesthetic overlays and can be iteratively refined without reconstructing the room.
