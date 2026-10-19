# Mobile UI/UX redesign integration notes

Reference repository: https://github.com/lucylow/Room-RE-ai-interior-designer-PremiumMobileUIUXRedesign

Primary product repository: https://github.com/lucylow/room-ai-interior-designer

## Implementation map

The primary app already contains Expo Router screens and domain services, so this pass extends the existing native route tree rather than creating a second app. Shared colors, spacing, radii, and touch-target sizing are named in `constants/mobile-design.ts` using the supplied reference palette.

| Reference destination | Native route            | Implementation status                                                                                                                                                                                                                          |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home                  | `app/(tabs)/index.tsx`  | Image-led warm hero with a layout fallback, saved-room counts/cards, reachable profile, contextual room quick starts, and loading/empty/unavailable states. Demo-mode fixtures are visibly labeled as examples.                                |
| Scan                  | `app/(tabs)/create.tsx` | Camera permission, photo-library, and capture failures now return recoverable messages; the Settings action appears only when camera permission is denied. AI generation, offline, and retry flows remain intact.                              |
| Studio                | `app/(tabs)/rooms.tsx`  | Existing saved-room library and refinement-history routes preserved; this is a room workspace entry, not a 3D manipulation canvas.                                                                                                             |
| Shop                  | `app/(tabs)/shop.tsx`   | Existing room-aware product and budget screen moved into the tab route; its current catalog remains a snapshot/demo-backed experience, not a live-stock promise.                                                                               |
| Plan                  | `app/(tabs)/plan.tsx`   | New saved-room planning overview, driven only by persisted room, concept, and optional budget values. Empty, loading, and unavailable states are included; demo fixtures are marked, and no sample timeline or contractor quote is fabricated. |

Primary controls use native `Pressable` elements with accessibility labels, hints, selected/disabled semantics where relevant, and touch targets sized for mobile. Profile and inspiration remain secondary routes rather than displacing the five requested destinations.

## Data and safety boundaries

Home and Plan use `loadSavedDesignsWithStatus`; the existing `loadSavedDesigns` list API remains available to all other callers. The loader distinguishes persisted data, demo fixtures, empty storage, and unavailable storage. The remote hero image is decorative and has a layout illustration fallback. Shop, camera, generation, and refinement behavior continues to use existing services. No new analytics, payment processing, external SDK, or server secret was added. Studio currently exposes saved rooms and refinement history; interactive 3D editing remains unavailable from that tab and is not simulated.

## Verification and known blocker

The GitHub working tree was clean before edits. The app source includes Expo Router, React Native, camera, and native-module files, but `package.json` and the committed pnpm lockfile declare only the Vite/React DOM web toolchain. The configured type-check caused pnpm to populate `node_modules` with the web dependencies; Expo, Expo Router, and React Native remain undeclared and unavailable. Therefore an Expo/iOS/Android build cannot be run from this checkout until the native package manifest and lockfile are reconciled. The web `tsconfig.json` also excludes `app/`, so its passing type-check does not validate these native screens. Run an Expo install/build after the repository's supported SDK and dependency versions are confirmed.

Observed checks: `pnpm run typecheck` passed for its configured `src/` scope; `pnpm exec vitest run src/tests/cameraCore.test.ts tests/premium-ui.test.ts` passed all 15 tests; `git diff --check` passed; and the changed TypeScript/TSX files passed compiler-parser syntax checks. The current native camera handler changes are checked for syntax only; these checks do not replace a native type-check. No simulator/device screenshot QA was performed from this sandbox. This change intentionally does not invent dependency versions or install a replacement native toolchain.
