# Visual AI V14 integration

V14 is isolated at `src/visual-ai-v14` and exposed from its root entry point. Feature namespaces cover 2D plan analysis and rendering, 3D/3DGS preview and quality, cross-modal grounding, synthetic datasets, visual coaching, and regression evaluation. The generated/mock dataset is stored under `docs/visual-ai-v14/fixtures` for demos and tests only.

The app companion store at `src/state/domains/visual-ai-v14-store.ts` attaches deterministic visual metrics, regression-gate outcomes, insights, and synthetic dataset counts to concept revisions with room and source-revision provenance. The source CAD/BIM revision remains authoritative for dimensions and geometry; visual or AI results are evidence and reversible overlays.

The reference 2D floorplan and 3D/splat renderers are deterministic previews, not replacements for production renderers. The 3DGS production path must continue through a compatible GPU/native adapter. Synthetic samples are not production user data and are never uploaded by this integration; real photo/video ingestion remains behind existing consent, privacy, and retention gates.

Run `pnpm run visual-ai-v14:check` to typecheck V14 and run integration tests.
