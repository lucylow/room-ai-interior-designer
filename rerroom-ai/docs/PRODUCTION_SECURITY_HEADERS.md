# Production security headers

The client cannot set response headers such as CSP. Apply the generated policy at the host/server layer.

Suggested baseline:

```text
Content-Security-Policy: default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; worker-src 'self' blob:
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(self), microphone=(self), geolocation=()
```

Adjust `connect-src`, `img-src`, and other directives to the exact production origins. Do not copy broad `*` origins into a production CSP.
