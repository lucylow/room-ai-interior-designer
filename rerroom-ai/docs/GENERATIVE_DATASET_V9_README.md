# RE:ROOM AI Generative Dataset Expansion V9

This continuation adds a technical mock-data and dataset-engineering layer on top of the previous RE:ROOM AI generative stack.

## Scope

The V9 package is designed for repeatable demo-mode experimentation across the existing design workflow: room understanding, style selection, palette filtering, layout advice, iterative refinement, spatial grounding, shopping-aware concepts, and evaluation.

### Dataset families

- Generation prompts and grounded responses
- User preference profiles
- Multi-turn feedback
- Spatial grounding examples
- Quality/error cases
- Pairwise ranking examples
- Prompt templates
- Material and lighting mock catalogs
- Benchmark cases
- Demo room scenarios
- Dataset normalization/deduplication/balancing
- Leakage checks and deterministic splits
- Metrics and health checks
- Prompt augmentation

## Design styles represented

modern, minimalist, scandinavian, industrial, japandi, mid_century, organic_modern, bohemian, contemporary, warm_minimal, quiet_luxury, coastal_modern, modern_farmhouse, transitional, art_deco, new_nordic, soft_industrial, desert_modern, moody_modern, eclectic_modern, craft_modern, heritage_modern, urban_soft, naturalist

## Example demo behavior

```text
Choose room → Choose style → Choose palette → Ask for layout advice → Generate concept → Refine → Evaluate → Compare
```

## Dataset invariants

1. Architectural dimensions are treated as authoritative constraints.
2. Style and palette attributes are editable generation features.
3. Refinements create new records rather than mutating the source example.
4. Mock retailer data is clearly separated from live commerce feeds.
5. Quality cases include geometry drift, style drift, palette conflict, clearance risk, budget violation, and unsupported claims.

## Validation

Run the V9 TypeScript build with `tsconfig.generative-data-v9.json`. The demo entry point is `src/generative-data-v9/demo/v9-dataset-studio.ts`.
