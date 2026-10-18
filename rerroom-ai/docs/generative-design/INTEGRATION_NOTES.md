# Generative creative design integration

The creative-design engine is integrated under `src/generative-design/`, with the new deterministic creative demos under `src/demo/`. It is exposed through `@/generative-design` or the namespaced `generativeDesign` export from `@/room-remodel`. The add-on includes style/palette filtering, concept generation, room-specific layout advice, iterative refinement, rendering and camera guidance, explainability, and deterministic mock/test data.

The bundled CAD/BIM package also contributes new planning, layout, project, and visualization modules under `src/cad-bim/`. A small `src/core/types.ts` facade preserves the standalone planner’s shared type imports while reusing the canonical recommendation-engine contracts. Existing app dependencies, routing, root TypeScript configuration, and other demos were preserved.

Run `pnpm run generative-design:typecheck` and `pnpm run cad-bim:typecheck` for focused checks. These libraries provide framework-neutral domain APIs; connecting screens or persistence remains an application integration step. AI concepts remain proposals and must not be treated as verified construction instructions.
