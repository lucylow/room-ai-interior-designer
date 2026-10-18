# RE:ROOM — Full-Codebase Audit Report

**Date:** 2026-10-17 (audit updates through this date)  
**Scope:** TypeScript/React application, security/privacy integration, persistence, AI boundaries, 2D/3D visualization, deterministic recommendations/insights, and available automated checks.

## Outcome

The audit identified and fixed reproducible correctness, privacy, persistence, rendering-boundary, and recommendation-integration issues directly in the application. Current app, security and visualization type checks pass; the full suite passes **108/108 tests** (including **102/102** security/state/AI tests and **57/57** visualization tests); ESLint passes; and the production build succeeds. The production dependency audit passed on 2026-10-16; the later recommendation integration added no runtime dependencies.

No known critical application defect remains within the verified scope. This is **not** a production security sign-off: server-side controls are absent from the supplied project, browser storage is not globally encrypted, and real hardware/browser WebGL failure behavior was not exercised. The build retains a large but deferred 3D chunk, and Prettier reports formatting drift in 780 files; no mass-formatting rewrite was applied.

## Bugs fixed and root causes

| Area | Root cause | Fix |
|---|---|---|
| API credentials | Request targets could be influenced by caller paths, creating a risk of sending bearer credentials to a different origin; remote error text and response bodies also crossed a trust boundary. | Enforce same-origin request URLs before attaching credentials, bound and validate response parsing, avoid surfacing server-provided error text, and combine caller cancellation with request timeouts. |
| Session lifecycle | A late sign-in/refresh completion could overwrite a newer sign-out state. | Add generation checks around session operations, validate returned session data, and keep provider failure messages generic. |
| Local persistence | Corrupt/future-schema state could be deleted or overwritten by defaults; hydration accepted unvalidated domain shapes. | Use bounded JSON decoding, validate versioned envelopes and domain shapes before hydration, preserve incompatible bytes, and only subscribe compatible domains for persistence. Auth/session state remains memory-only. |
| Consent enforcement | Favorites and visualization scenes/views accessed browser storage without checking the `local-storage` decision. | Gate those reads/writes and personal-domain persistence on consent. The minimal privacy-preference record remains local so the choice can be remembered. Existing user data is **not** automatically erased on revocation. |
| AI request lifecycle | The UI could receive stale results after unmount/input changes; provider calls did not accept cancellation; output could be trusted after consent changed. | Propagate `AbortSignal` to remote-capable provider calls, abort obsolete UI requests, recheck consent/policy after awaits, and validate provider response structures before applying actions. |
| Scene integrity | Direct inspector mutations and the public visualization store could bypass geometry validation. | Route inspector changes through bounded room-aware transforms and validate scenes at adapter, store creation, commit, load, and serialization boundaries. Invalid transforms are rejected without mutating history. |
| Collision behavior | Hidden objects were treated as blockers, locked overlaps were omitted, and doorway clearance used an inadequate point-based approximation. | Ignore invisible objects, retain locked-object collision reports, and test clearance against the full doorway span and rotated object bounds. |
| 3D rendering | A single model failure could disrupt the room preview; WebGL fallback only handled initial unavailability, not runtime context loss. | Isolate furniture failures with proxy geometry, add a runtime context-loss/recovery overlay with a 2D-plan action, and clean up canvas event listeners. |
| UI recovery | Uncaught render exceptions had no application-level recovery UI and raw exception content could be exposed by lower-level fallbacks. | Add a global error boundary with safe recovery text; do not display raw stack traces or exception messages. |

## Security and privacy improvements

- Personal domain and visualization storage now respects local-storage consent. The privacy-preference record itself remains local as the minimal mechanism to remember the user's choice.
- Room imagery remains denied to AI by default; the active generation flow uses the deterministic local demo provider and does not upload room images. The remote provider remains a boundary only and is not configured for production use.
- Invalid stored state is preserved for recovery rather than silently deleted or replaced. AI outputs and scene commits are validated before they can change application state.
- The optional encrypted vault is **not** the storage backend for all app data. Most browser records are ordinary browser storage; do not claim the entire app is encrypted.

## Files changed

The active extracted project does not contain Git metadata, so this list is the audit-touched file inventory from the workspace rather than a Git diff.

| Group | Files |
|---|---|
| App and AI | `src/App.tsx`; `src/features/experiences.tsx`; `src/features/visualization-experience.tsx`; `src/main.tsx`; `src/components/AppErrorBoundary.tsx`; `src/ai/app-controller.ts`; `src/ai/contracts.ts`; `src/ai/controller.ts`; `src/ai/demo-provider.ts`; `src/ai/remote-provider.ts` |
| Security and persistence | `src/security/api-client.ts`; `src/security/session.ts`; `src/state/bootstrap.ts`; `src/state/persistence/codec.ts`; `src/state/persistence/persist-domain.ts` |
| Visualization | `src/visualization/components/VisualizationWorkspace.tsx`; `src/visualization/core/collision.ts`; `src/visualization/core/scene.ts`; `src/visualization/core/serialization.ts`; `src/visualization/integration/room-state-adapter.ts`; `src/visualization/state/scene-persistence.ts`; `src/visualization/state/store.ts`; `src/visualization/state/view-persistence.ts`; `src/visualization/three-d/components/ModelAsset.tsx`; `src/visualization/three-d/components/ModelErrorBoundary.tsx`; `src/visualization/three-d/components/SceneObjects.tsx`; `src/visualization/three-d/components/ThreeSceneCanvas.tsx` |
| Regression tests | `src/tests/ai/controller-privacy.test.ts`; `src/tests/security/api-client.test.ts`; `src/tests/security/session.test.ts`; `src/tests/state/persistence.test.ts`; `src/tests/state/store.test.ts`; `src/tests/visualization/collision.test.ts`; `src/tests/visualization/integration.test.ts`; `src/tests/visualization/scene.test.ts`; `src/tests/visualization/serialization.test.ts`; `src/tests/visualization/view-persistence.test.ts` |
| Documentation | `docs/SECURITY_INTEGRATION_NOTES.md`; `docs/RE_FULL_CODEBASE_AUDIT_REPORT.md` |

## Checks performed

| Command | Result |
|---|---|
| `pnpm typecheck` | **PASS** |
| `pnpm run security:check` | **PASS** — security type-check; 30 test files, 102 tests |
| `pnpm run visualization:check` | **PASS** — visualization type-check; 14 test files, 57 tests |
| `pnpm test` | **PASS** — 31 test files, 108 tests, including premium UI tests |
| `pnpm lint` | **PASS** — ESLint with zero warnings allowed |
| `pnpm build` | **PASS** — Vite production build; advisory remains for the 945.73 kB minified visualization chunk (255.48 kB gzip), deferred behind the lazy-loaded experience |
| `pnpm audit --prod` | **PASS (2026-10-16)** — registry reported no known production dependency vulnerabilities; no runtime dependencies were added after this audit |
| `pnpm format:check` | **FAIL / broad formatting drift** — Prettier reports 780 repository files. Mass-formatting was avoided because it would create a broad, non-functional rewrite. |

## Unresolved risks and verification limits

1. **Backend absent:** no production identity provider, API server, authorization/ownership enforcement, rate limiting, signed-URL flow, cloud AI endpoint, server export/deletion, or server retention enforcement was available to test. Client checks are not substitutes for these controls.
2. **Storage deletion:** revoking local-storage consent stops subsequent reads/writes but leaves prior browser bytes in place. Automatic erasure was not added because browser data deletion needs an explicit, separately verified workflow.
3. **Encryption scope:** the opt-in browser vault is not wired as the persistence backend for all user records. Ordinary local app state should be treated as unencrypted at rest.
4. **Hosting headers:** CSP and other security response headers must be configured and verified at the deployment/hosting layer.
5. **WebGL hardware behavior:** build and unit coverage pass, but context-loss and restoration were not forced on a real browser/GPU in this environment. Per-object error boundaries and fallback paths are implemented, not hardware-certified.
6. **Bundle size:** the visualization route is lazy-loaded, but its renderer chunk is above Vite's 500 kB advisory threshold. It is not a build failure; further code splitting is a performance follow-up.
7. **Formatting:** repository-wide Prettier remains failing across many files. No wholesale rewrite was made to preserve existing UI/source changes.


## Addendum — recommendation and insight package integration (2026-10-17)

### Added capability and fixes

Integrated all 442 files from the supplied recommendations/insights package under `src/recommendation-engine/` (6,057 TypeScript/TSX lines). Connected a lazy-loaded recommendation screen from the Design Studio and wired it to the current room model and existing Privacy Center. The screen uses a deterministic local pipeline only; it does not contact a remote AI provider or save results/history.

The app adapter validates room geometry, minimizes names and identifiers to generic labels/IDs, omits image/layout references and free text, removes history/session/catalog input, and disables shopping/construction. Consent is checked before and after the asynchronous run; stale/cancelled requests are discarded. Output gets bounded runtime validation, allowed-action and target checks, and remains a preview only. The new tests also run the package's recommendation and feature-extraction smoke paths.

Additional confirmed package defects fixed during integration: the construction policy flag previously failed to reject construction recommendations/task actions; `scoreCandidates`, `rerank`, and `explorationBoost` single-item entry points always threw instead of delegating to their collection implementations; drift monitoring computed but ignored its baseline scale; untyped `any` casts and 62 ESLint errors were removed without disabling rules. Budget-aware scoring was preserved after checking advisor signatures.

### Files changed for this integration

- `src/recommendation-engine/**` — complete bundled engine plus lint/type/correctness fixes in security and quality gates, advisor inputs, scoring/reranking/exploration, ensemble voters, drift normalization, typed insight/facade/planning modules.
- `src/ai/recommendation-service.ts` — active-room minimization, consent-aware deterministic pipeline, response/action validation and preview adapter.
- `src/features/recommendation-experience.tsx` and `.css` — opt-in, cancellable recommendations/insights UI, result caveats, privacy and visualization navigation.
- `src/features/experiences.tsx`; `src/App.tsx` — Design Studio launch and lazy-loaded navigation route.
- `src/tests/ai/recommendation-service.test.ts`; `src/tests/ai/recommendation-engine-smoke.test.ts` — privacy, consent, geometry, policy, preview and engine smoke regressions.
- `docs/SECURITY_INTEGRATION_NOTES.md` — maintainer data-flow and safeguards.

### Current verification results

| Command | Result |
|---|---|
| `pnpm typecheck` | **PASS** |
| `pnpm lint` | **PASS** — zero warnings/errors |
| `pnpm test` | **PASS** — 31 test files, 108 tests |
| `pnpm run security:check` | **PASS** — security TypeScript check plus 30 test files, 102 tests |
| `pnpm run visualization:check` | **PASS** — visualization TypeScript check plus 14 test files, 57 tests |
| `pnpm build` | **PASS** — recommendation screen chunk 57.39 kB minified (14.34 kB gzip); 3D visualization chunk 945.73 kB minified (255.48 kB gzip), still above Vite's 500 kB advisory threshold |
| `pnpm format:check` | **FAIL** — Prettier reports 780 files with formatting drift. No repository-wide rewrite was performed because it would alter hundreds of unrelated files. |

The earlier production dependency audit passed on 2026-10-16; this integration added no runtime dependency, so the dependency graph is unchanged.

### Remaining risks

- Recommendation scores and evidence are deterministic heuristic/demo outputs, not trained-model confidence or measured room-quality results. Openings, household preferences, history and commerce are not included in app requests.
- Remote AI, server authorization, data ownership/rate limits, signed uploads, server export/deletion/retention and deployment CSP remain unconfigured, as described above.
- Physical accessibility/safety and budget decisions require independent validation; shopping and construction operations are disabled.
- Vite still warns about the 945.73 kB visualization JavaScript chunk. WebGL hardware recovery is implemented but was not exercised on physical GPU/browser hardware.
- Repository-wide formatting remains a broad known failure; formatting was not silently suppressed.
