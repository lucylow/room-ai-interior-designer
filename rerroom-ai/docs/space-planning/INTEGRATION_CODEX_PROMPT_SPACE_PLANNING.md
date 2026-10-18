# CODEX / CURSOR / MANUS INTEGRATION PROMPT — SPACE PLANNING V2

Continue `room-ai-interior-designer` from the existing CAD/BIM remodel architecture. Copy the `src/cad-bim` modules from this pack into the project and connect them to the current navigation/state layer.

## Required product behavior

1. Import or open an existing CAD/BIM/3D source. Never rebuild the entire room just because the user asks for a different aesthetic concept.
2. Build a shared authoritative spatial model. Each wall, opening, room, level, fixture, and existing furniture record must retain a source feature ID.
3. Build 2D planning and 3D visualization from the same model. A move in plan should update the 3D proposal, and a 3D selection should map back to the 2D plan record.
4. Let AI generate several layout options. Each option must be a reversible `LayoutPlan`, not a mutation of authoritative geometry.
5. Let designers issue quick refinements such as “move the sofa left,” “add two chairs,” “keep the windows clear,” “make the room less crowded,” “try a darker material,” and “use option B but keep the rug from option A.” Apply these as revisions/overlays.
6. Keep a revision branch/tree so the user can compare A/B/C concepts and restore an earlier option.
7. Provide plan, perspective, section, elevation, and walkthrough presentation states.
8. Build project organization around rooms, plans, concepts, revisions, assets, tasks, milestones, comments, and approvals.
9. When the client approves a concept, freeze the approved overlay while preserving the source CAD/BIM revision and feature anchors for downstream handoff.

## UI integration targets

Add or extend the design workspace with: `Plan`, `3D`, `AI`, `Revisions`, `Files`, and `Handoff` sections. The Plan surface should show snap/grid controls, zone overlays, furniture placement, dimensions, collision warnings, and layout alternatives. The 3D surface should show camera presets, section/elevation toggles, walkthrough controls, and presentation mode.

## Demo mode

Ship the seeded great-room workspace from `src/cad-bim/mock/project-dashboard.ts`. Include 4 generated layout alternatives, a sample CAD/BIM source model, furniture catalog entries, project tasks, milestones, comments, artifacts, and activity history. All demo records are clearly labeled as mock data.

## Engineering rules

- Keep source CAD/BIM geometry authoritative.
- Keep AI/design overlays non-destructive.
- Use stable IDs and revision lineage everywhere.
- Avoid embedding secrets in client-side code.
- Make planning algorithms deterministic in demo mode.
- Preserve enough provenance that an approved visual object can be traced to either an authoritative source feature or a proposed catalog/AI object.
