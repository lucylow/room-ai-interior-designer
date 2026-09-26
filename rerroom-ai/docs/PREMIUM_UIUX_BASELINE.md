# Premium Mobile UI/UX merge guide

1. Copy `src/premium` into the existing React Native app.
2. Ensure the destination has React Native + TypeScript. If the project uses Expo, no additional UI library is required.
3. Mount `PremiumApp` from the current root route or import any individual screen from `src/premium/screens`.
4. Connect existing auth, project, AI-generation, AR, and shopping services to the typed interfaces in `src/premium/types/models.ts`.
5. Replace `src/premium/data/*.ts` with API-backed selectors when the backend is ready; the components are intentionally typed against stable models.
6. Keep the product sheet and AR screen as UI shells until the project's real camera/AR surface is connected.
7. Replace remote image URLs with local/CDN assets for performance, caching, and offline behavior.
8. Preserve existing business logic; this package is the presentation layer and mock-data contract.

## Suggested route map

- Home → `HomeScreen`
- Explore → `ExploreScreen`
- AI Design → `DesignStudioScreen`
- AR → `ARScannerScreen`
- 3D Studio → `Room3DStudioScreen`
- Shop → `ShopScreen`
- Project → `ProjectScreen`
- Saved → `SavedScreen`
- Profile → `ProfileScreen`

## Native handoff points

`ARScannerScreen` contains the visual HUD and state shape. Connect actual plane detection, depth, anchors, hit-testing, and scene rendering to the existing AR implementation behind these controls.
