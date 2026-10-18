# RE:ROOM secure backend contract

The client modules in this pack are not a backend. The production server must enforce the following invariants:

## Authentication

- Validate the access token at every protected route.
- Reject expired tokens.
- Keep refresh tokens in an HTTP-only secure cookie or platform-appropriate protected channel.
- Rotate refresh credentials according to the identity provider's security model.
- Scope access tokens to only the resources and actions needed by the feature.

## Authorization

For every room/design/scene/quote ID supplied by the client, the server must load the resource and verify ownership or explicit membership before reading or mutating it. Do not trust `ownerId` sent by the browser.

## Object storage

Generate short-lived signed upload/download URLs on the server. Do not put bucket credentials in `VITE_*` variables. Validate content type, content length, and object key namespace server-side. Consider asynchronous malware/file scanning before a shared object becomes available.

## AI gateway

The server owns provider keys, model selection, provider routing, quotas, and provider logging. The browser sends a sanitized `SanitizedAIContext`; the server applies a second classification and redaction pass before provider invocation.

## AI output

The server must treat model output as untrusted data. Validate actions against a schema and the user's authorized room object set. Never execute model-generated code. Do not let model output select arbitrary network destinations.

## Deletion

A deletion request should fan out to database records, object storage, derived thumbnails, AI artifacts, search/vector indexes, cached assets, collaboration shares, and background jobs according to the retention policy.

## Idempotency

Every mutation endpoint should accept an idempotency key. Duplicate deliveries should return the original outcome rather than create duplicate room/design/quote records.

## Logging

Do not log raw room images, prompts, transcripts, credentials, signed URLs, full addresses, or contractor documents. Log request IDs, coarse operation names, latency, status, and allow-listed error codes.
