# Manus / Cursor / Replit Integration Prompt — RE:ROOM AI Recommendation Intelligence V3

Integrate this package into `https://github.com/lucylow/room-ai-interior-designer` without replacing the existing app architecture.

The target is a production-style AI recommendation and insight system that sits between the existing room model / user state and the existing 2D/3D visualization surfaces.

## Preserve

- Existing routing and navigation.
- Existing React Native / Expo architecture.
- Existing room model and spatial data contracts where already present.
- Existing 2D/3D visualization work.
- Existing security/privacy controls from the previous implementation.
- Existing demo mode.

## Add

1. Copy the new `src/ai`, `src/insights`, `src/intelligence`, `src/planning`, `src/personalization`, `src/shopping` and compatible `src/engine` modules.
2. Adapt the existing `RoomModel` into `RoomContext`.
3. Call `runPipeline(request, policy)` when a room is loaded or meaningfully edited.
4. Display the top recommendations with evidence, confidence, effort, impact and trade-offs.
5. Display the top insights with severity, metric, confidence and a reversible next step.
6. Connect `visualization-adapter.ts` so recommendations preview inside the existing 2D and 3D scenes before applying changes.
7. Connect explicit user feedback to the feedback/reranking modules.
8. Keep remote AI behind `src/providers` and the existing server-side secret boundary.
9. Use the data-AI gate before returning recommendation results.
10. Never treat browser/local scores as authorization; enforce ownership, permissions and server-side policy on the backend.

## Product behavior

The AI should:

- understand the room as structured spatial data;
- combine specialized agents instead of one giant prompt;
- recommend reversible changes first;
- compare alternatives instead of forcing a single concept;
- show uncertainty when room measurements are weak;
- learn from explicit accept/reject/save/edit feedback;
- adapt to user priorities, style, colors, materials and budget;
- connect shopping recommendations to fit and room geometry;
- generate room-level insights and not only product suggestions;
- show before/after metrics in the visualizer;
- remain deterministic in demo/offline mode.

## Required verification

Run:

```bash
tsc -p tsconfig.json --noEmit
```

Then run the deterministic demo and verify that it produces recommendations, insights, data-quality metrics, decision confidence and zero warnings.

Do not remove working visualization, AR, room measurement, shopping or construction-planning features. This is an additive AI intelligence layer.
