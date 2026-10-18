# AI Recommendations + Insights Codebook

## Core contracts

- `src/core/types.ts` — room, object, recommendation, insight, feedback, goal, scenario and policy contracts.
- `src/core/math.ts` — bounded scores, normalization, softmax, percentiles.
- `src/core/evidence.ts` — evidence helpers.
- `src/core/fingerprint.ts` — stable request/context fingerprints.

## Recommendation orchestration

- `src/engine/pipeline.ts` — primary request-to-result pipeline.
- `src/engine/context.ts` — creates model context.
- `src/engine/features.ts` — room feature vector creation.
- `src/engine/goals.ts` — goal inference.
- `src/engine/rule-bus.ts` — rule specialist collection.
- `src/engine/agent-orchestrator.ts` — specialized AI agent execution.
- `src/engine/ensemble.ts` — recommendation/insight ensemble.
- `src/engine/critic.ts` — critic pass.
- `src/engine/simulation.ts` — spatial scenario simulation.
- `src/engine/tradeoffs.ts` — trade-off analysis.
- `src/engine/insight-synthesizer.ts` — insight consolidation.
- `src/engine/budget.ts` — budget-aware adjustment.
- `src/engine/catalog.ts` — catalog recommendation integration.
- `src/engine/data-ai-gate.ts` — data quality and policy gating.
- `src/engine/recommendation-package.ts` — final recommendation packaging.
- `src/engine/recommendation-workbench.ts` — additional workbench scoring helpers.
- `src/engine/ai-digest-engine.ts` — digest orchestration.

## AI ranking

- `src/ai/recommendation-workbench.ts` — multi-domain workbench.
- `src/ai/recommendation-decision-report.ts` — explainable decision report.
- `src/ai/ensemble/final-ranker.ts` — production-facing final ranking layer.
- `src/ai/algorithms/*` — pairwise, listwise, diversity, feedback and search strategies.
- `src/ai/multiobjective/*` — weighted utility and portfolio optimization.
- `src/ai/quality-gate.ts` — confidence, score, cost and action policy.
- `src/ai/trust-calibration.ts` — trust labels.
- `src/ai/model-agreement.ts` — ensemble consistency.
- `src/ai/contradiction-detector.ts` — conflicting recommendation detection.

## Explainability

- `src/ai/explainability/*` — evidence maps, why-now, why-this, uncertainty, trade-off and linked-insight explanations.

## Domain advisors

- `src/ai/advisors/*` — specialized layout, style, lighting, storage, comfort, safety, accessibility, maintenance, budget, sustainability, shopping, construction and workflow advisors.

## Specialized room intelligence

- `src/intelligence/domains/*` — room-purpose and user-scenario-specific reasoning.
- `src/intelligence/signals/*` — reusable numeric room signals.

## Insight intelligence

- `src/insights/deeper/*` — momentum, regression, stability, change points, diminishing returns, priority shift and recommendation fatigue.
- `src/insights/compound/*` — room story, daily coach, next best action, trade-offs, decision briefs, scorecards, focus areas and AI digest.
- `src/insights/insight-workbench.ts` — salience/actionability ranking.

## Planning/search

- `src/planning/local-search.ts`
- `src/planning/random-search.ts`
- `src/planning/annealing.ts`
- `src/planning/beam-search.ts`
- `src/planning/pareto-frontier.ts`
- `src/planning/branch-and-bound.ts`
- `src/planning/greedy-planner.ts`
- `src/planning/*objective.ts`
- `src/planning/metrics/*`

## Personalization

- `src/personalization/*` — style/color/material affinity, preference anchors, negative preferences, household needs, novelty tolerance, budget sensitivity, complexity and decision style.

## Shopping intelligence

- `src/shopping/*` — price normalization, shipping fit, inventory confidence, deduplication, style fit, dimensions and sustainability matching.

## Learning/evaluation

- `src/learning/*` — logistic model, contextual bandit, feature store, model registry, drift, calibration, embeddings, novelty, online ranker, experiment support and evaluator.

## Visualization integration

- `src/integration/visualization-adapter.ts` — maps recommendations into preview patches for the existing 2D/3D layer.
- `src/intelligence/ai-overlays.ts` — visual AI overlays.
- `src/intelligence/insight-markers.ts` — insight markers.
- `src/intelligence/camera-hints.ts` — view selection.
- `src/intelligence/before-after-score.ts` — comparison metrics.
- `src/intelligence/ai-storyboard.ts` — visual storytelling.

## Privacy/security integration

- `src/integration/security-context-adapter.ts` — removes disallowed history/catalog/prompt data before recommendation generation.
- Recommendation actions stay preview-oriented and should remain subject to the previous action-validation/security layer.

## Demo

- `src/demo/data.ts` — deterministic room, preference, budget and catalog fixtures.
- `src/demo/runner.ts` — example end-to-end execution.
- `demo-output.json` — captured demo response.

## Validation

```bash
tsc -p tsconfig.json --noEmit
```

The final source tree passes strict TypeScript validation.
