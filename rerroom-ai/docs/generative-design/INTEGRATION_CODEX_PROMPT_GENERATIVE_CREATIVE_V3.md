# Cursor / Codex / Manus integration prompt — Generative Creative V3

Integrate `src/generative-design/creative-v2` into the existing RE:ROOM AI application. Do not replace the earlier AI recommendations or CAD/BIM layers. Add the new facade `src/generative-design/creative-generative-ai-v3.ts`.

UI requirements:
1. Add style filters: Modern, Minimalist, Scandinavian, Industrial, plus the existing style library.
2. Add palette filters with named swatches and custom color support.
3. Add room-aware layout advice cards beneath generated concepts.
4. Keep the selected concept connected to the existing 2D plan and 3D scene.
5. Add quick revision pills for warmer, cooler, less cluttered, more modern, more Scandinavian, more industrial, more open, cozier, etc.
6. Refinements must modify the existing concept rather than constructing a fresh room state.
7. Display AI reasoning and confidence beside each concept.
8. Preserve geometry-lock indicators and never present aesthetic render dimensions as construction dimensions.
9. Use mock mode when remote generation is unavailable.
10. Store revision history using the existing state layer.

Suggested screen flow:
`Room → Style & Palette Filters → Generate 4-8 Concepts → Compare → Open 2D/3D → Quick Revision → Save → Client Approval → CAD/BIM handoff`.
