# RE:ROOM AI Generative Dataset V9 — Codebook

## Purpose
This package adds a deterministic, schema-first mock dataset layer for evaluating and demonstrating RE:ROOM AI generative design.

## Scale
- TypeScript files: 147
- New TypeScript lines: 13069
- Approximate pages at 55 lines/page: 237.6
- Generation records: 192
- Preference records: 120
- Feedback records: 144
- Spatial grounding records: 80
- Quality cases: 90
- Ranking pairs: 120
- Prompt templates: 140
- Benchmark cases: 100
- Demo cases: 160

## Dataset families

### Generation
Structured prompts pair user intent with room type, style, palette, hard architectural constraints, soft preferences, spatial anchors, expected AI signals, a grounded response, and rationale.

### Preferences
Synthetic user profiles capture favorite styles, palettes, liked/disliked features, budget, objective weighting, current goal, and confidence.

### Feedback
Multi-turn actions include accept, reject, save, refine, swap, and compare, each tied to a design dimension.

### Spatial grounding
Examples anchor candidate furniture placements to immutable walls, doors, windows, and floor boundaries so generative concepts can be evaluated against spatial truth.

### Quality cases
Includes duplicate furniture, geometry drift, palette conflict, style drift, clearance risk, budget violation, and unsupported-claim cases.

### Ranking
Pairwise preference data is used for concept ranking and recommendation evaluation.

### Prompt templates
Room/style/palette-specific templates cover generation, refinement, palette change, layout advice, and shopping-aware concept generation.

### Benchmarks
Benchmark families cover grounding, filters, layout advice, budgets, geometry preservation, refinement consistency, shopping fit, explainability, and diversity.

## Style coverage
modern, minimalist, scandinavian, industrial, japandi, mid_century, organic_modern, bohemian, contemporary, warm_minimal, quiet_luxury, coastal_modern, modern_farmhouse, transitional, art_deco, new_nordic, soft_industrial, desert_modern, moody_modern, eclectic_modern, craft_modern, heritage_modern, urban_soft, naturalist

## Palette coverage
The demo catalog contains warm neutrals, Nordic sage, charcoal/clay, forest/moss, coastal fog, ink/brass, terracotta/oak, midnight/plum, blue/gray, olive/cream, sunlit/apricot, and cobalt/coral combinations.

## Quality controls
- Deterministic IDs
- Normalization
- Deduplication
- Room/style balancing
- Leakage detection
- Deterministic train/validation/test/demo split utility
- Coverage and explanation metrics
- Pairwise consistency checks
- Spatial grounding score
- Prompt linting
- JSONL export helpers

## Integration boundary
This is mock/demo data. Production training data should be sourced, licensed, reviewed, privacy-filtered, and provenance-tracked independently. Mock retail examples remain separate from live inventory. CAD/BIM dimensions remain authoritative and are never learned as free-form aesthetic outputs.
