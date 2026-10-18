# Integration notes

The latest recommendation engine sources are integrated into `src/recommendation-engine/`; the 42 source files that differed from the existing engine were refreshed, and identical files were retained. The 359 CAD/BIM TypeScript modules are under `src/cad-bim/`. Existing application dependencies, runtime settings, and root TypeScript configuration were preserved.

## Public entry points

- Recommendations: `@/recommendation-engine`
- CAD/BIM: `@/cad-bim`
- Namespaced bridge: `@/room-remodel` (`recommendations` and `cadBim` namespaces)

CAD/BIM API exports are collected in `src/cad-bim/index.ts`. The engine models imported CAD/BIM as dimensional source-of-truth and stores AI design changes as non-destructive overlays.

## Validation

Run `pnpm run cad-bim:typecheck` to check the new CAD/BIM package using its dedicated TypeScript configuration. The main application typecheck remains unchanged. The CAD/BIM source is a starter implementation; it does not claim full DWG/IFC geometry support, field verification, engineering review, or permit-ready output.
