# Integration Prompt — RE:ROOM AI Generative Technical V8

Integrate `src/generative-technical-v8` into the existing RE:ROOM AI application without replacing the existing security, state, visualization, CAD/BIM, and retail layers.

1. Add the V8 folder under the app's AI domain.
2. Expose the studio orchestration through a thin application-service adapter.
3. In demo mode, use `runSeededDemo()` and deterministic mock catalogs.
4. In production mode, swap retrieval, embeddings, image generation, and critique adapters with authenticated server APIs.
5. Keep CAD/BIM geometry authoritative; use concept deltas for aesthetic changes.
6. Send only minimized/consented room context into AI providers.
7. Preserve seed, revision, prompt, palette, style, and retrieval metadata for reproducibility.
8. Attach explainability and confidence to generated concepts.
9. Reject concepts with geometry guardrail failures before they reach construction/handoff flows.
10. Keep retail integrations as product-source adapters and revalidate prices/availability at purchase time.
