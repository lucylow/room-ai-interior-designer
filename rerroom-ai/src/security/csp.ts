export const RE_ROOM_CSP_DIRECTIVES = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "connect-src 'self' https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self'",
  "worker-src 'self' blob:",
].join('; ');

export const SECURITY_HEADERS = {
  'Content-Security-Policy': RE_ROOM_CSP_DIRECTIVES,
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'Permissions-Policy': 'camera=(self), microphone=(self), geolocation=()',
};
