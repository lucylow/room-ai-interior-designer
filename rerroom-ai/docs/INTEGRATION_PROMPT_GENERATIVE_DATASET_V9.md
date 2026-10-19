# Integration prompt: Generative Dataset V9

Integrate `src/generative-data-v9` into the existing RE:ROOM AI application without replacing existing CAD/BIM, spatial, visualization, recommendation, or retail modules.

## Integration goals

- Add a deterministic demo dataset registry.
- Expose style and palette filters in the creative design UI.
- Feed prompt examples into the AI prompt compiler.
- Feed preference/feedback examples into recommendation personalization.
- Feed spatial examples into layout validation.
- Feed quality cases into generation QA.
- Keep dataset transforms pure and versioned.
- Keep production model/provider credentials server-side.

## Suggested UI flows

1. Creative Studio: choose room, style, palette, and intent.
2. Dataset Inspector: view the matched mock examples and rationale.
3. Refinement Lab: apply deterministic augmentations such as warmer/brighter/calmer.
4. Evaluation Panel: show grounding, coverage, leakage and quality metrics.
5. Demo Gallery: load seeded scenarios without network access.

## Do not

- Treat mock catalog prices as live retailer inventory.
- Use generated dimensions as a construction source of truth.
- mutate source examples in place.
- bypass existing security/privacy gates.
