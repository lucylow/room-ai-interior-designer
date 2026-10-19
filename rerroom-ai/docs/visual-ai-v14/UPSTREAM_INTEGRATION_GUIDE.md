# Cursor / Replit / Manus integration prompt — Visual AI V14

Integrate `src/visual-ai-v14` into the existing RE:ROOM AI stack without replacing prior security/privacy, generative-AI, CAD/BIM, retail or 3DGS modules.

1. Treat `Scene2D` and `Scene3D` from the existing spatial model as the primary view models.
2. Connect V14 dataset generation to demo mode only; never upload synthetic fixtures as production user data.
3. Call the 2D and 3D quality evaluators after each scene revision.
4. Store visual metrics beside concept revisions so the UI can show why a revision is better/worse.
5. Use cross-modal alignment modules before applying AI edits from images or 3DGS captures.
6. Route production GPU rendering through the existing 3DGS backend adapter. V14 is not a replacement for CUDA rasterization.
7. Preserve CAD/BIM geometry locks and source provenance.
8. Expose style, palette, camera, render-quality, depth, semantic and comparison controls in the design studio.
9. Add dataset registry/versioning to the existing AI dataset service.
10. Keep privacy/retention gates from earlier versions in front of image/video ingestion.
