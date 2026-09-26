# RE:ROOM AI Mobile Interface Design

## Product direction

RE:ROOM AI is a calm, premium, one-handed iOS-style interior design assistant. The visual language uses warm plaster neutrals, ink typography, terracotta action accents, tactile cards, and editorial room imagery. Every primary action is reachable in the lower half of the screen, while generated imagery receives the largest visual emphasis.

## Screen list

| Screen | Primary content and functionality |
|---|---|
| Onboarding | Three concise visual steps explaining photo capture, AI redesign, and actionable shopping plans. Optional preference selection for room type, style, and budget. Skip is always available. |
| Home | Greeting, prominent “Redesign my room” CTA, recent rooms, active generation progress, suggestion cards, and a restrained premium upgrade slot. |
| Capture | Camera/import choice, framing guidance, photo quality feedback, retake, and continue action. The user can choose camera, photo library, or bundled demo room. |
| Room setup | Room name, room type, preferred style chips, budget selector, and furniture-preservation choices. |
| Understanding | Progress state while the room is analyzed, followed by a human-readable summary of architecture, detected furniture, light, and protected structure. |
| Concepts | Three or more design concepts for the same room, style filters, budget-aware generation, and compare selection. |
| Design result | Full-width generated room image, before/after comparison, design rationale, protected structure, and actions for refine, shop, save, and share. |
| Refine | Conversational prompt input plus quick actions such as “make it warmer,” “keep my sofa,” “make it cheaper,” and “make it brighter.” |
| Room editor | Detected object inventory with keep/remove controls, object details, and future-ready move/replace/recolor actions. |
| Shop this room | Budget tabs, recommended item rows, room total, category filters, and implementation checklist. |
| Rooms | Saved room grid/list with status, last updated time, and entry points to results and history. |
| Discover | Curated styles, challenges, and example transformations that open into a reusable inspiration flow. |
| Profile | Subscription status, preferences, privacy, notification settings, help, and sign-out. |
| Settings | Theme, data retention, media deletion, permissions recovery, and developer permission-state diagnostics. |

## Key user flows

### First redesign

1. User opens Home and taps “Redesign my room.”
2. User chooses Camera, Photo Library, or Try a demo room.
3. Capture validates the image and shows actionable quality guidance.
4. User confirms room type, style, budget, and furniture to preserve.
5. Understanding presents progress and then a plain-language room summary.
6. Concepts presents multiple variations from the same source room.
7. User selects a concept, opens Design result, and can refine, shop, save, or share.

### Refinement

1. User opens Refine from a selected design.
2. User taps a quick action or enters a natural-language request.
3. The generation state remains resumable and shows progress instead of blocking navigation.
4. The updated concept opens with undo/redo-ready history semantics and a changed-elements summary.

### Shopping and implementation

1. User taps “Shop this room.”
2. User switches between budget presets or enters a target budget.
3. Recommended items are grouped by category with rationale and estimated price.
4. User saves a shopping list and checks off implementation steps.

## Color choices

| Token | Value | Use |
|---|---|---|
| Canvas | `#F7F3EE` | Warm plaster page background |
| Surface | `#FFFDF9` | Cards, sheets, and elevated controls |
| Ink | `#272421` | Primary text and navigation |
| Muted ink | `#746D66` | Supporting copy and metadata |
| Terracotta | `#B9654A` | Primary CTA, active state, and progress |
| Terracotta dark | `#8E4938` | Pressed state and strong emphasis |
| Sage | `#788B78` | Success, saved state, and low-intensity guidance |
| Sand | `#E8D9C8` | Secondary surfaces and chips |
| Line | `#E5DED6` | Subtle borders and dividers |
| Warning | `#B98245` | Photo quality and budget warnings |
| Error | `#B5534B` | Retryable failures and destructive actions |

## Interaction and accessibility

Use large touch targets, clear pressed feedback, concise labels, and bottom sheets for contextual choices. Maintain readable contrast, dynamic text-friendly layouts, reduced-motion compatibility, and screen-reader labels for every icon-only control. Use haptics only for primary actions, toggles, and successful completion.
