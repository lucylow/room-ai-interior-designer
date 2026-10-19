# RE:ROOM AI — GENERATIVE DATASET V10

This continuation expands the existing RE:ROOM AI dataset foundation with richer, technical mock corpora for generative design and evaluation. The upstream repository describes a React Native / Expo application that connects Capture → Understand → Design → Visualize → Edit → Shop → Build, including AI generation, spatial reasoning, AR, shopping, and construction planning.

## What V10 adds

- multimodal generation records (image/depth/mask/2D/3D/CAD/BIM references)
- richer user-intent and instruction-following examples
- pairwise preference data
- expert-style critique cases
- counterfactual and augmentation examples
- spatial grounding and source-geometry preservation cases
- AI tool traces
- quality/error datasets
- safety/privacy/prompt-injection mock cases
- dialogue/refinement chains
- retail-grounded mock examples
- evaluation and benchmark fixtures
- project-context data for iterative CAD/BIM-aware workflows
- deterministic seeds and provenance
- deterministic train/validation/test/challenge splits
- leakage/deduplication and schema audits
- query/search utilities
- prompt compiler and dataset router
- preference-learning and quality-gate utilities

## Dataset design

V10 is synthetic/demo data only. Every record is generated locally with deterministic seeds, tagged as PII-free and license-safe, and includes provenance. It is designed to exercise the application safely before real user-derived datasets are introduced.

## Source truth invariant

Architectural dimensions and fixed openings remain authoritative. Generative examples can change aesthetic attributes, furniture choices, lighting, materials, and other reversible design variables, but dataset examples explicitly prohibit moving source walls, doors, windows, or ceiling heights.

## Build

Use the included `tsconfig.generative-data-v10.json` and run the demo from `dist-generative-data-v10/demo/run-v10-demo.js`.

## Files

`src/generative-data-v10/core` contains schemas and deterministic factories.
`src/generative-data-v10/*/` contains structured mock corpora.
`src/generative-data-v10/registries` combines batches.
`src/generative-data-v10/quality` audits schema and grounding health.
`src/generative-data-v10/query` supports dataset search.
`src/generative-data-v10/engines` contains technical dataset utilities.
`src/generative-data-v10/demo` contains an end-to-end deterministic demo.
