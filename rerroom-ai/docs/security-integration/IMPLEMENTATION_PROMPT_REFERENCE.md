# Implementation prompt

Apply the RE:ROOM security/privacy/state/AI hardening pack to the existing `rerroom-ai` application without replacing the current UI design.

Requirements:

- Keep React 19 + Vite + TypeScript.
- Preserve existing routes/screens/components where possible.
- Introduce domain-specific stores, not a single mutable global state object.
- Route all AI prompts and room metadata through `DataAIController`.
- AI must be opt-in through consent and policy.
- Never send credentials, access tokens, contact information, financial fields, contractor documents, or arbitrary telemetry to an AI provider.
- Strip EXIF-like image metadata by re-encoding uploads before cloud transfer.
- Never persist raw access/refresh tokens in browser storage or React state.
- Use the encrypted browser vault only for explicitly opted-in local user data and require a user passphrase to unlock it.
- Never claim local AES encryption makes the browser app invulnerable. It is a layer for stored vault records, not a substitute for a hardened backend.
- Use safe structured AI actions only; reject arbitrary model-generated code.
- Add test coverage for all rejection paths.
- Add Privacy Center and AI Data Inspector to Settings.
- Keep demo mode deterministic and local-only.
- Add production CSP/security headers at the hosting layer.
- Make all failure states safe: if consent is missing, session is expired, a signed URL is invalid, or an AI result fails validation, fail closed and return a user-facing message without leaking raw provider/server details.
