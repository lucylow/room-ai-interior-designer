
# Project TODO

- [x] Continue improving the React Native mobile application against the RE:ROOM AI product specification
- [x] Verify the current scaffold and recover the active workspace if initialization was interrupted
- [x] Review existing screens and prioritize the next highest-impact workflow improvements
- [x] Implement prioritized UI and workflow improvements with loading, empty, error, and retry states
- [x] Add or update persistence, provider adapters, and deterministic tests for changed behavior
- [x] Validate the app and save a checkpoint after improvements

- [x] Integrate camera permission handling and settings recovery
- [x] Add capture guidance, framing overlays, and quality feedback
- [x] Add multi-angle scan progress and resumable camera session state
- [x] Add upload queue contracts with retry behavior and tests

- [x] Fix Expo runtime crash: _expo.createPermissionHook is not a function
- [x] Revalidate the mobile preview after the runtime fix

- [x] Add a functional live camera capture path with permission-aware fallback
- [x] Add real photo-library selection and captured-image preview
- [x] Carry selected media into room setup and preserve it across the flow

- [x] Add typed AI interior-designer contracts for room context, preservation, styles, and design decisions
- [x] Add deterministic design reasoning helpers and tests
- [x] Add centralized monetization plans, entitlements, usage meter, and contextual paywall copy
- [x] Add refinement controls and premium upgrade entry points to the design result flow

- [x] Add non-destructive media edit models and immutable command history
- [x] Add object annotation and selection helpers for room editing
- [x] Add visual refinement controls with undo/redo-ready state

- [x] Add structured advanced-AI room analysis helpers and prompt planning contracts
- [x] Add dataset asset validation, MIME normalization, privacy metadata, and processing job helpers
- [x] Connect analysis context to refinement while preserving private media metadata

- [x] Add persisted saved-design records with safe local storage helpers
- [x] Improve Rooms browsing with saved concepts, detail selection, and delete recovery
- [x] Add loading and empty states plus deterministic storage tests

- [x] Add advanced product catalog and plan feature matrix
- [x] Add credit wallet mutation, spend/refund, and usage-gate helpers
- [x] Add purchase recovery, idempotency, and billing error-state helpers
- [x] Surface richer plan benefits and credit state in the Profile experience

- [x] Persist generated concepts into the saved Rooms collection
- [x] Add save-state feedback and recoverable save errors on the result screen
- [x] Verify Rooms reloads the newly saved concept after navigation

- [x] Add reusable accessible visual primitives for buttons, cards, and feedback states
- [x] Apply consistent interaction polish and touch-target improvements to Create and Rooms
- [x] Add visual-state tests and validate the revised mobile preview

- [x] Add typed API configuration and normalized request error handling
- [x] Add service/repository contracts for rooms, designs, generations, uploads, and catalog
- [x] Isolate demo fallback data behind an explicit development-only boundary
- [x] Add tests for request normalization and fallback behavior

- [x] Harden typed service boundaries for rooms, designs, generation, uploads, and catalog
- [x] Add explicit development-only fallback policy and production configuration checks
- [x] Add server-ready generation and upload job contracts with retry-safe identifiers
- [x] Add tests for service validation, error mapping, and fallback isolation

- [x] Add typed room semantic graph and object identity memory helpers
- [x] Add architecture locks, spatial constraints, and deterministic layout validation
- [x] Add traceable AI self-critique and iterative refinement contracts
- [x] Connect deeper reasoning context to generation and refinement state

- [x] Add typed revenue streams and transparent product/bundle models
- [x] Add promo validation, referral codes, referral rewards, and annual-savings helpers
- [x] Add subscription transition and billing-access helpers with tests
- [x] Surface practical upgrade and savings messaging in the premium experience

- [x] Add server-authoritative price, credit, and plan validation helpers
- [x] Add entitlement cache and billing snapshot models with expiry handling
- [x] Add purchase/refund state, pause/win-back offers, and recovery helpers
- [x] Add transparent premium pricing and monetization tests

- [x] Apply consistent interaction polish and touch-target improvements to Create and Rooms
- [x] Add visual-state tests and validate the revised mobile preview

- [x] Add a dedicated saved-room detail route with concept context
- [x] Add refinement history and reusable detail-state helpers
- [x] Connect Rooms cards to room detail with safe fallback navigation

- [x] Persist refinement history alongside saved room records
- [x] Migrate existing saved designs safely when history is absent
- [x] Connect refinement actions and room details to real history entries
- [x] Add deterministic refinement-history tests and preview validation

- [x] Add persistent undo/redo-ready refinement transitions
- [x] Add user-visible undo and redo controls to the design result flow
- [x] Add deterministic history transition tests and preview validation

- [x] Add selectable refinement-history entries in room details
- [x] Add safe restoration helpers for prior design decisions
- [x] Add restoration feedback, deterministic tests, and preview validation

- [x] Pass selected room-history state from room detail into Create
- [x] Surface restored design context and preserve it through refinement/save
- [x] Add route-handoff tests and preview validation

- [x] Add typed parsing for room and history route parameters
- [x] Prevent invalid or cross-room history state from leaking into Create
- [x] Add deterministic handoff tests and preview validation

- [x] Add restored history baseline to the Create handoff contract
- [x] Seed Create refinement history from the selected saved-room entry
- [x] Add baseline handoff tests and preview validation

- [x] Add room-specific saved-design lookup without cross-room fallback
- [x] Improve missing-room recovery and explicit retry/navigation states
- [x] Add multi-room detail and handoff tests with preview validation

- [x] Add typed room-detail loading with transient error classification
- [x] Add retry action and loading recovery state to room detail
- [x] Add deterministic retry tests and preview validation

- [x] Add pure retry and offline-state helpers for room-detail loading
- [x] Add deterministic storage-failure retry coverage
- [x] Improve offline and recovery messaging in room detail

- [x] Add proactive network-status policy and connectivity adapter
- [x] Surface offline state before room-detail loading retries
- [x] Add deterministic network-state tests and preview validation

- [x] Add resilient generation-job lifecycle and polling policy
- [x] Integrate pause, retry, cancellation-safe transitions, and progress feedback into Create
- [x] Add deterministic generation-job tests and validation

- [x] Pause generation polling when connectivity is offline
- [x] Resume generation polling automatically when connectivity returns
- [x] Add deterministic connectivity-aware generation tests and validation

- [x] Add rendered concept version metadata to saved rooms and refinement entries
- [x] Display version-specific references and preserve restore context
- [x] Add deterministic versioning tests and validation

- [x] Add curated Discover inspiration data and category filtering
- [x] Build the Discover screen with accessible cards and premium visual hierarchy
- [x] Add deterministic Discover logic tests and validation

- [x] Add curated Shop product data with budget-aware filtering and sorting
- [x] Build the Shop screen with accessible product cards and saved-item actions
- [x] Connect room result shopping handoff and add deterministic Shop tests

- [x] Persist saved Shop item IDs with AsyncStorage and safe normalization
- [x] Restore saved items in Shop and surface the shortlist in Profile
- [x] Add deterministic saved-Shop storage tests and validation

- [x] Add persistent saved-item removal and category-aware shortlist helpers
- [x] Build a dedicated saved-items shortlist screen with empty and recovery states
- [x] Connect Profile and Shop entry points and add deterministic shortlist tests

- [x] Add product detail and retailer metadata to Shop contracts
- [x] Build product detail route with room-fit context and saved-state actions
- [x] Connect Shop and shortlist cards to product details and add deterministic tests

- [x] Add pure room-fit recommendation and budget-alternative helpers
- [x] Show recommendation reasoning and lower-cost alternatives on product detail
- [x] Add deterministic recommendation tests and validation

- [x] Add pure savings amount and percentage helpers for alternatives
- [x] Show transparent savings and price context on product details
- [x] Add deterministic savings tests and validation

- [x] Add pure shortlist savings aggregation and summary-copy helpers
- [x] Show a room-level savings summary in the saved shortlist
- [x] Add deterministic aggregate-savings tests and validation

- [x] Add pure shortlist total, budget delta, and status helpers
- [x] Show saved-item total against a selectable room budget
- [x] Add deterministic budget-comparison tests and validation

- [x] Add backward-compatible room budget metadata to saved-design records
- [x] Persist and restore budget context across saved-room and shortlist flows
- [x] Add deterministic budget-persistence tests and validation

- [x] Add pure room-budget selection and normalization helpers
- [x] Support per-room budget restoration and updates in the shortlist
- [x] Add deterministic multi-room budget tests and validation

- [x] Add backward-compatible room assignment metadata to saved Shop items
- [x] Support room-specific saved-piece loading, assignment, and removal
- [x] Add deterministic room-scoped shortlist tests and validation

- [x] Add deterministic move-to-room persistence helper
- [x] Show Move to room controls for globally saved or legacy pieces
- [x] Add deterministic move-to-room tests and validation

- [x] Add deterministic room-picker projection and assignment helpers
- [x] Show a compact room picker on saved pieces
- [x] Add deterministic per-piece reassignment tests and validation

- [x] Add deterministic reassignment transition and undo helpers
- [x] Show confirmation and undo feedback after moving a saved piece
- [x] Add deterministic reassignment-undo tests and validation

- [x] Add deterministic timed-notice policy and expiration helpers
- [x] Show a short-lived accessible undo notice after room reassignment
- [x] Add deterministic notice-expiration tests and validation

- [x] Add pure bounded recent-move history transition helpers
- [x] Show recent reassignment moves with multi-step undo feedback
- [x] Add deterministic bounded-history tests and validation

- [x] Add pure recent-move projection and user-facing labels
- [x] Show a visible recent-moves panel with per-move undo controls
- [x] Add deterministic recent-moves panel tests and validation

- [x] Add pure move-display projection and timestamp formatting helpers
- [x] Show product names and timestamps in the recent-moves panel
- [x] Add deterministic move-display tests and validation

- [x] Add pure move-detail projection and exact timestamp helpers
- [x] Show source room, destination room, and exact times in recent moves
- [x] Add deterministic move-detail tests and validation

- [x] Add pure history-drawer state and display helpers
- [x] Show an expandable recent-moves drawer with full metadata
- [x] Add deterministic history-drawer tests and validation

- [x] Add pure retailer availability and price-freshness helpers
- [x] Show stock status and price freshness on product detail
- [x] Add deterministic availability and freshness tests and validation

- [x] Add pure price-refresh state and messaging helpers
- [x] Add a refresh-price action to product detail
- [x] Add deterministic refresh-state tests and validation

- [x] Add typed local catalog refresh contract
- [x] Connect product details to the catalog refresh contract
- [x] Add deterministic catalog-refresh tests and validation

- [x] Add persistent storage helpers for last successful price checks
- [x] Restore saved price-check timestamps on product detail
- [x] Add deterministic price-check persistence tests and validation

- [x] Add pure offline price-refresh policy and messaging helpers
- [x] Add offline-aware retry behavior to product detail
- [x] Add deterministic offline-refresh tests and validation

- [x] Add pure connectivity-return auto-refresh policy helpers
- [x] Automatically retry pending price refresh when connection returns
- [x] Add deterministic auto-resume refresh tests and validation

- [x] Add pure reconnect-refresh announcement copy and state helpers
- [x] Announce automatic price refresh after reconnect
- [x] Add deterministic announcement-state tests and validation

- [x] Add pure visible refresh-status presentation helpers
- [x] Show a reconnect-refresh status chip on product detail
- [x] Add deterministic status-chip tests and validation

- [x] Add pure exact last-checked time formatting for refresh chips
- [x] Show exact last-checked time in reconnect-refresh chip
- [x] Add deterministic timestamp-chip tests and validation

- [x] Add pure local-and-UTC refresh time formatting helpers
- [x] Show local time and UTC in the reconnect-refresh chip
- [x] Add deterministic local-time formatting tests and validation

- [x] Add pure time-zone label formatting helper
- [x] Show the detected time-zone label in the refresh chip
- [x] Add deterministic time-zone label tests and validation

- [x] Add typed persisted 12-hour or 24-hour time-format preference
- [x] Apply time-format preference to refresh timestamp display
- [x] Add deterministic time-format preference tests and validation

- [x] Add reusable timestamp-preference Settings control
- [x] Integrate Settings control with persisted 12-hour or 24-hour preference
- [x] Add deterministic Settings preference tests and validation

- [x] Add pure time-format preference confirmation copy
- [x] Announce timestamp format changes in Profile Settings
- [x] Add deterministic preference-feedback tests and validation

- [x] Add pure timestamp preview copy for the selected format
- [x] Show a live timestamp preview in Profile Settings
- [x] Add deterministic timestamp-preview tests and validation

- [x] Add pure explanatory copy for local and UTC retailer times
- [x] Show the timestamp explanation in Profile Settings
- [x] Add deterministic explanation-copy tests and validation
