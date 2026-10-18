# RE:ROOM security/privacy integration notes

## Connected in the Vite app

- The supplied AI, security, state, demo, and test modules are under `src/`.
- The profile now links to Privacy & Security, which includes the Privacy Center, AI Data Inspector, Security Status, and passphrase-gated opt-in encrypted local vault.
- AI concept generation uses `DataAIController` with the deterministic local-only demo provider. Consent defaults to off; the generation handler fails closed if `ai-processing` consent is not granted or the prompt is rejected. The app sends no room photo to this provider and includes only a simplified room layout, dimensions, style, and user brief in the policy-filtered context.
- Non-auth domain stores hydrate and persist as versioned browser records before the first UI render. Room state migrates from schema 1/2 to schema 3. Auth/session state is intentionally excluded from browser persistence.
- `prepareRoomImageUpload()` validates the declared type and file signature and re-encodes to JPEG before returning a sanitized blob. The current Vite screens do not yet expose an image upload flow, so this adapter is available for a future upload component rather than wired to an absent upload control.
- The added tests remain in `src/tests/`; the crypto helper uses owned `ArrayBuffer` copies for current TypeScript Web Crypto typings.

## Not configured / production follow-up

- There is no cloud AI provider or authenticated backend endpoint configured in the supplied app. `SecureApiClient`, the remote-provider boundary, and server contract are included, but no server secret or public `VITE_*` provider key is added. Do not enable remote AI until the backend enforces authorization, ownership, rate limits, signed URL expiry, consent, and deletion.
- The Privacy Center's export control currently records an export request in local app state; it does not contact a backend or create a downloadable export. Server-side export/deletion must be implemented before presenting it as a completed export feature.
- Apply CSP and the other response headers from `PRODUCTION_SECURITY_HEADERS.md` at the hosting layer, adjusting origins to the actual deployment. A client bundle cannot set response headers.
- The web-encrypted vault is browser-side encryption for explicitly opted-in local records, not a replacement for secure backend controls. The UI provisions/unlocks the vault but this app does not yet store personal records in it. Native Keychain/Keystore support requires a native adapter.
- Client-side checks are UX and data-minimization controls only. The backend remains authoritative for identity, authorization, billing, ownership, signed URLs, and deletion.


The merged app sets `allowImages` to **false** by default because it has no active image-upload pipeline or signed-asset AI contract. The upload-preparation adapter strips metadata for future use, but enabling image processing requires a backend-mediated, consent-aware flow. Retention values are persisted as user preferences; they do not themselves delete local or server records. Implement and enforce actual retention/deletion on the owning backend before claiming records are purged.


## 2D/3D visualization integration

- The supplied visualization source, demo rooms/catalog, and renderer/state modules are under `src/visualization/`; the original codebook and integration references are preserved under `docs/visualization/`.
- The existing Studio now links to a responsive visualization workspace with 2D, 3D, split, compare, and tour modes. It mounts the React Three Fiber room renderer (room shell, openings, furniture, lighting, compass/grid), camera presets/tour, plan layers, selection handles, transform inspector, object navigator, measurement overlays, undo/redo, and reduced-motion/accessibility settings.
- The shared meters-based scene can be adapted from the existing `RoomStateModel`; when no app room is active, the screen uses the bundled deterministic demo rooms. Scene and view state are saved locally per room. No visualization data is sent to a server.
- Spatial suggestions use a consent-gated deterministic local provider and the visualization action validator. AI processing remains unavailable until the same `ai-processing` consent is granted in Privacy Center; this integration does not enable a remote provider.
- The 3D route is lazy-loaded so the main app does not download the renderer until the user opens the workspace. The 3D renderer adds a larger deferred chunk; production builds may display the bundler's advisory size warning for that chunk.
- Validation scripts: `pnpm run visualization:check` (visualization TS + tests), `pnpm run security:check`, `pnpm typecheck`, `pnpm test`, `pnpm lint`, and `pnpm build`.


## Full-codebase audit hardening (2026-10-16)

- Secure API requests reject cross-origin targets before attaching bearer credentials, enforce bounded safe response parsing, use generic errors instead of server-provided error text, and combine caller cancellation with request timeout. Session transitions use operation generations so late sign-in/refresh responses cannot restore credentials after sign-out.
- AI provider calls accept `AbortSignal`; the design screen aborts on unmount, input changes, or overlapping requests. The controller checks cancellation and re-evaluates the sanitized context after provider completion, and rejects malformed provider output before applying actions.
- Persisted state is parsed through bounded JSON validation and checked against domain shape/schema before hydration. Corrupt, unreadable, and future-version records are left untouched rather than removed or overwritten with defaults. Room migrations remain explicit for supported historical schemas.
- The `local-storage` consent decision gates personal-domain and visualization reads/writes and gates favorites persistence. A minimal privacy-preference record remains local so the app can remember the user's choice. Revoking consent stops subsequent reads/writes but does **not** automatically erase bytes already in browser storage; deletion must be an explicit, separately verified action.
- Visualization scenes are validated on adapter, store-creation, commit, and serialization boundaries. Inspector changes use bounded room-aware transformations; invalid transforms are rejected. Locked overlaps remain visible to collision analysis, hidden objects are ignored, and doorway clearance uses the opening span.
- WebGL context loss presents a 2D recovery action; failed object subtrees fall back to proxy geometry. Browser event listeners and ResizeObserver subscriptions are cleaned up. Hardware-specific context-loss behavior was not exercised in an actual browser in this audit.
- The global React recovery boundary renders a safe retry screen and does not display exception text or stack traces.

## Audit limitations

- The secure vault is optional and not the storage backend for all app records. Most browser-persisted app data is ordinary browser storage and must not be described as globally encrypted.
- No production API/backend, remote AI endpoint, server-side authentication/authorization, CSP response headers, signed-upload flow, server export/deletion, or retention enforcement is configured or verified here. The active design and visualization AI paths remain deterministic local demo flows.
- Revoking browser-storage consent does not securely erase existing local records; browser deletion semantics and remote deletion require separately implemented and verified workflows.
- The production build succeeds, but the deferred visualization/3D JavaScript chunk remains large (about 967 kB uncompressed; build advisory threshold is 500 kB). The 2D/3D experience itself is lazy-loaded from the main app.
- The repository-wide Prettier check reports 330 files with style deviations. Files were not mass-reformatted to avoid a broad, non-functional rewrite; formatting remains follow-up work.


## Room recommendations and insights integration (2026-10-17)

- The complete supplied recommendation/insight package is namespaced at `src/recommendation-engine/` (442 files, about 6,057 TypeScript/TSX lines). The Design Studio now links to a lazy-loaded `RecommendationExperience` screen.
- The app only invokes the deterministic local pipeline. It does not call the optional remote-provider facade, make network requests, or send data to a model service. A generated result is volatile UI state; recommendation history, feedback learning and engine memory are not persisted by this screen.
- Generation is blocked unless the existing `ai-processing` consent is granted, and that consent is checked both before and after the asynchronous pipeline. Requests are aborted on unmount, active-room changes and consent revocation.
- For an active room, the adapter validates bounded room/furniture geometry, removes room/object names and identifiers, image/layout asset IDs, and replaces them with generic labels/opaque local IDs. Only room type, bounded measurements and furniture geometry enter the engine. Missing openings, preferences, style and household data are called out as limitations; calculated room-quality scores are heuristic estimates.
- The package security adapter receives no history, previous insights, session ID or catalog; shopping and construction policies are disabled. App output validation rejects malformed/unbounded fields, unsupported action types, invalid targets, shopping/construction/task actions, and invalid numeric values. Any visualization adapter output is preview-only; the screen never commits scene mutations.
- If no room is active, the UI uses the package's bundled synthetic demo data. That sample is marked as synthetic and does not represent the user's room.
- The screen displays estimated rankings, confidence/evidence and caveats, and links to the existing 2D/3D workspace for manual review. Recommendations are not measurement, safety, accessibility, purchasing or professional advice. Shopping and construction automation remain unavailable even though related modules are present in the package.
- Regression coverage includes denied/revoked consent, cancelled requests, minimized room context, history/catalog stripping, malformed room geometry, no identifier leakage in active-room output, construction/action gating, and deterministic package smoke pipelines.
