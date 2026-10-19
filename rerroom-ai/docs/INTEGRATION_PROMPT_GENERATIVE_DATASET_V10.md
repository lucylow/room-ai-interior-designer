# Integration prompt — V10

Integrate `src/generative-data-v10` into the existing RE:ROOM AI application as the demo/evaluation dataset layer. Preserve the security/privacy, CAD/BIM, visualization, generative-design, and retail abstractions from the preceding iterations.

1. Add the V10 source tree without modifying source-of-truth CAD/BIM geometry.
2. Load `GENERATIVE_DATA_V10` behind a demo-data feature flag.
3. Add dataset search by room, style, palette, split, and family.
4. Expose a technical AI panel showing seed, controls, provenance, quality targets, and grounding status.
5. Use preference/critique/quality data to drive offline ranking and evaluation.
6. Use spatial, CAD/BIM, and retail records to validate concepts before presentation.
7. Keep all secrets and provider credentials on the server; V10 itself contains no secrets.
8. Keep demo records deterministic so screenshots and demos are repeatable.
9. Add a dataset-health view based on `auditV10()`.
10. For production, replace synthetic fixtures incrementally with reviewed, rights-cleared datasets and keep the same schema/provenance boundaries.
