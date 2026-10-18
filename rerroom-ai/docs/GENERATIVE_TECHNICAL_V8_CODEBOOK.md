# RE:ROOM AI Generative Technical V8 Codebook

## Purpose
Technical mock-data and orchestration continuation for the RE:ROOM AI generative design stack.

## Core invariants
- Existing room/CAD/BIM geometry is authoritative.
- AI outputs are reversible aesthetic proposals.
- Demo data is deterministic and synthetic.
- Mock scores are not construction approvals.
- Production model/provider credentials must remain server-side.

## Main domains
Style retrieval, palette retrieval, layout reasoning, prompt compilation, negative prompting, style blending, palette harmonization, embeddings, RAG ranking, user preference simulation, feedback simulation, refinement, variation generation, deterministic seeds, model routing, generation budgets, telemetry, quality gates, geometry preservation, CAD/BIM-aware planning, spatial constraints, furniture density, focal points, lighting, color, materials, style coherence, moodboards, shot lists, client briefs, concept comparison, scenario generation, whole-home consistency, seasonal/day-night variations, accessible/child-safe/pet-friendly/rental variations, prompt diagnostics, image/depth/edge/mask conditioning, demo libraries, analytics, export, API/orchestration.

## Generated mock scale
The V8 extension includes many deterministic scenario modules plus 12 scenario datasets covering combinations of room type, style, palette, budget, generation parameters, and quality targets.

## Integration
Export the desired modules through your app's AI domain barrel. Call `generateCreativeStudio()` for the deterministic demo pipeline and replace individual adapters with production AI/RAG/CV services as those integrations become available.
