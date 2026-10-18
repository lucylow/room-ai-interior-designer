# RE:ROOM AI — AI Recommendations + Insights 100+ Page Implementation Pack

This package is a continuation layer for `lucylow/room-ai-interior-designer`.

The repository describes RE:ROOM AI as a React Native / Expo spatial-intelligence product whose workflow is **Capture → Understand → Design → Visualize → Edit → Shop → Build**. The existing architecture also calls for specialized AI responsibilities rather than one giant prompt, a persistent room model, domain-separated state, and planning-oriented spatial reasoning. This package adds a deterministic, explainable recommendation and insight subsystem around those concepts.

## What this package adds

### Recommendation intelligence

The package now contains a layered recommendation pipeline:

```text
RoomContext + UserPreferences + Budget + Catalog
                         |
                         v
               Context / Feature Builder
                         |
          +--------------+---------------+
          |                              |
          v                              v
    Rule Specialists              AI Specialist Agents
          |                              |
          +--------------+---------------+
                         v
                  Candidate Ensemble
                         |
                         v
                  Budget Adjustment
                         |
                         v
                 Final Multi-objective
                      Ranking
                         |
                         v
                  Data / Policy Gate
                         |
                         v
                Recommendation Set
```

Specialized recommendation domains include layout, spatial reasoning, style, lighting, storage, comfort, accessibility, safety, sustainability, maintenance, budget, shopping, construction planning and workflow.

## AI insights

Insights use several layers instead of relying on a single score:

```text
Room Signals
    |
    +--> Baseline Metrics
    +--> Domain Detectors
    +--> Longitudinal Trends
    +--> Anomaly Detection
    +--> Opportunity Detection
    +--> Confidence / Uncertainty
    +--> Co-occurrence / Pattern Signals
    |
    v
Insight Synthesis
    |
    v
Actionable Insight Digest
```

The resulting `Insight` records retain evidence, confidence, severity, direction and a recommended next step.

## New recommendation behaviors

The implementation includes:

- Multi-objective ranking using score, expected impact, confidence, cost and effort.
- Category diversification so a room does not receive twelve variants of the same suggestion.
- Pairwise and listwise ranking helpers.
- Pareto frontier selection.
- Greedy budget planning.
- Branch-and-bound bundle search.
- Local search, random search and simulated annealing for spatial scenarios.
- Feedback-based reranking and temporal feedback decay.
- Negative preference learning.
- Acceptance-propensity modeling.
- Cold-start and novelty behavior.
- Trust calibration and confidence ladders.
- Evidence weighting by source type.
- Model agreement and disagreement signals.
- Contradiction detection.
- Dependency graphs between recommendations.
- Decision briefs and trade-off explanations.
- Visualization-aware camera hints, overlays and before/after scoring.
- Whole-room narrative generation.

## Room-specific AI advisors

The package adds specialized advisors for:

- layout
- style
- lighting
- storage
- budget
- shopping
- sustainability
- comfort
- accessibility
- maintenance
- construction planning
- workflow

Each advisor exposes a score, confidence, priority, reasons, blockers and opportunities. Advisors can produce both recommendation and insight records.

## Room-domain intelligence

Additional domain modules analyze:

- entryway readiness
- living-room coherence
- bedroom restfulness
- kitchen workflow
- bathroom utility
- workspace readiness
- dining flow
- nursery calmness
- studio flexibility
- small-space efficiency
- large-space zoning
- rental reversibility
- shared-space harmony
- work-from-home ergonomics
- guest readiness
- media-room immersion
- reading-nook comfort
- craft-area organization
- pet-friendly flow
- kid-friendly adaptability

These are soft planning signals. They do not claim professional certification or replace onsite verification.

## Explainability model

Each recommendation can be interpreted through several views:

```text
Recommendation
    |
    +--> Why this?
    +--> Why now?
    +--> Evidence map
    +--> Uncertainty text
    +--> Trade-off text
    +--> Alternatives
    +--> Linked insights
    +--> Decision report
```

This allows the UI to show users not only *what* the AI recommends, but also the evidence and uncertainty behind the recommendation.

## Connection to the 2D / 3D visualization layer

The previous visualization expansion introduced a shared spatial scene abstraction. This recommendation pack contains adapters that turn recommendations into preview-only visualization patches:

```text
AI Recommendation
       |
       v
Visualization Patch
       |
 +-----+----------+
 |                |
 v                v
2D Plan         3D Scene
 |                |
 +------compare--+
          |
          v
      User decision
```

The recommended flow is to keep recommendation actions preview-only until a user explicitly accepts the change.

## Connection to the security/privacy layer

The previous security/privacy expansion introduced consent, data classification, local-first storage boundaries, AI context minimization, redaction and action validation. This package exposes `integration/security-context-adapter.ts` so recommendation generation can be restricted by privacy choices.

Example policy path:

```text
User consent
    |
    v
Security Context
    |
    +--> History allowed?
    +--> Remote model allowed?
    +--> Shopping allowed?
    +--> Purpose = recommendation / insight / simulation
    |
    v
Minimal Recommendation Context
```

## Main entry point

`src/recommendation-engine/index.ts` exports the central types, recommendation pipeline, workbench, final ranker, decision reporting, insight workbench and visualization/security adapters.

## Main execution API

```ts
import { runPipeline } from '@/recommendation-engine/engine/pipeline';
import { defaultPolicy } from '@/recommendation-engine/policy/recommendation-policy';

const result = await runPipeline(request, defaultPolicy);
```

The returned `RecommendationSet` includes recommendations, insights, assumptions, blocked ideas, generation metadata, trace ID, quality metrics and warnings.

## AI metrics

The final pipeline now reports:

- execution duration
- agent confidence
- intent confidence
- data confidence score
- decision confidence
- evidence coverage
- recommendation count
- insight count
- final expected impact
- quality warnings

These metrics are intended for both product UI and offline evaluation.

## Data-aware recommendation strategy

The model does not pretend that all inputs are equally reliable. Measurements, object observations, openings, preferences, catalog records, historical choices, rules and simulations receive different evidence weights.

The central idea is:

```text
Raw signal
   |
   v
Evidence + confidence
   |
   v
Domain score
   |
   v
Candidate recommendation
   |
   v
Multi-objective ranking
   |
   v
Policy / quality gate
   |
   v
Explainable recommendation
```

## Demo

A deterministic demo dataset is included under `src/demo` and a captured result is included as `demo-output.json`.

The sample prompt is:

```text
Make the living room warmer and easier to organize.
```

The demo exercises the recommendation pipeline without requiring an external AI provider.

## Type checking

The package was verified with:

```bash
tsc -p tsconfig.json --noEmit
```

The final source tree passes TypeScript strict checking with zero reported TypeScript errors.

## Scope boundary

This code is an implementation layer, not a complete server deployment. Backend authorization, account ownership, signed object-storage URLs, server-side policy enforcement, provider credentials, billing, rate limits, and production database persistence remain application/backend responsibilities.

The AI modules are deliberately explainable and deterministic by default so the product can run in demo/offline mode. A remote provider can be inserted behind the existing provider interfaces without forcing the user interface to depend directly on a model vendor.

## Recommended integration order

1. Copy `src/core` and `src/reco` compatibility types/helpers where they do not already exist.
2. Copy `src/engine` recommendation orchestration modules.
3. Connect the existing `RoomModel` adapter to `RoomContext`.
4. Feed user preferences and budget state into `RecommendationRequest`.
5. Connect the previous privacy/security adapter before remote AI access.
6. Connect `integration/visualization-adapter.ts` to the existing 2D/3D scene controller.
7. Render `Recommendation` and `Insight` objects in the recommendation/dashboard surfaces.
8. Add real user feedback events to the feedback/learning modules.
9. Move production authorization and credential checks to the backend.

## Suggested UI surfaces

```text
AI DESIGN
------------------------------------------------
Room scorecard                         86%

TOP INSIGHT
Improve circulation around the sofa
Confidence 91%   Evidence 4 items

NEXT BEST ACTION
Preview sofa offset in 2D / 3D

RECOMMENDATIONS
[ Layout ] [ Lighting ] [ Storage ] [ Style ]

WHY THIS?
- Matches room geometry
- Matches current priorities
- Low modeled effort

COMPARE
Current | Option A | Option B
------------------------------------------------
```

## File layout

```text
src/
├── ai/
│   ├── advisors/
│   ├── algorithms/
│   ├── consistency/
│   ├── ensemble/
│   ├── explainability/
│   ├── feedback/
│   ├── multiobjective/
│   └── ...
├── agents/
├── core/
├── demo/
├── engine/
├── insights/
│   ├── compound/
│   └── deeper/
├── intelligence/
│   ├── domains/
│   └── signals/
├── integration/
├── learning/
├── personalization/
├── planning/
├── policy/
├── providers/
├── reco/
├── rules/
├── shopping/
└── telemetry/
```

## Final implementation principle

RE:ROOM AI should not behave like a single text prompt that produces decorative ideas. The recommendation layer should treat the room as structured spatial data, combine specialized signals, expose uncertainty, compare alternatives, learn from explicit feedback, and send every important change into a reversible 2D/3D preview before the user commits.
