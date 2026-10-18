# RE:ROOM AI — Space Planning, Layout, 3D Visualization & Project Organization V2

This pack continues the CAD/BIM remodeling architecture with an additional **2,270 lines of new TypeScript** across 125 new implementation files (approximately 41.3 pages at 55 lines/page).

## Product goal

Use the imported CAD/BIM model as the spatial source of truth while making the design process faster and more visual:

```text
CAD / BIM / rough 3D source
          │
          ▼
Authoritative spatial model
          │
          ├──────► 2D space planning
          │           │
          │           ├── zones
          │           ├── circulation
          │           ├── furniture placement
          │           └── layout variants
          │
          ├──────► 3D visualization
          │           ├── camera presets
          │           ├── walkthrough
          │           ├── section/elevation
          │           └── presentation mode
          │
          ├──────► quick revision loop
          │           ├── parse prompt
          │           ├── preserve anchors
          │           ├── compare revision
          │           └── branch/replay
          │
          └──────► project organization
                      ├── tasks
                      ├── milestones
                      ├── artifacts
                      ├── comments
                      └── approval / handoff
```

## Core design invariant

AI recommendations can change **layout proposals, furniture, finishes, lighting, and visual presentation**, but authoritative CAD/BIM geometry remains separately addressable by source feature ID and revision.

## New modules

- `src/cad-bim/planning/*` — zones, room boundary inference, planning objectives, adjacency, paths, visibility and constraint reports.
- `src/cad-bim/placement/*` — grid candidates, collisions, anchors, furniture placement strategies, density, symmetry, viewing, dining/bedside/workstation clearances.
- `src/cad-bim/layout/*` — reusable templates, optimizer, comparator.
- `src/cad-bim/visualization/*` — plan/3D synchronization, sections/elevations, lighting previews, material previews, camera tours, render health, presentation state.
- `src/cad-bim/revision/*` — prompt parsing, fast non-destructive revisions, diffs, branches, replay, approval freeze.
- `src/cad-bim/project/*` — tasks, milestones, files, members, comments, room boards, search, dependencies, summaries, progress.
- `src/cad-bim/mock/*` — furniture catalog, zones, project dashboard, remodel scenarios.
- `src/cad-bim/bim/*` / `src/cad-bim/cad/*` — design data attached to source CAD/BIM entities.
- `src/cad-bim/handoff/*` — layout handoff sheet, furniture schedule, finish legend, visual-to-source index.
- `src/cad-bim/state/*` — UI/state scaffolding for planning, revisions, and navigation.

## Demo

The seeded dashboard includes: a great-room source model, mock catalog, room zones, multiple layout candidates, project tasks, milestones, members, artifacts, activity feed, and a 3D scene view model.

## Validation

Run:

```bash
npm install
npx tsc -p tsconfig.json --noEmit
```

The implementation is intentionally framework-neutral at the domain layer so it can be attached to the repo's existing React Native/Expo or web visualization surfaces. Professional CAD/BIM file authoring and construction-document issuance should remain server/tooling concerns; this client/domain layer preserves provenance and validates handoff state.
