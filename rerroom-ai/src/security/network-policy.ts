export function assertSameOriginPath(path: string): void {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Cross-origin relative URL rejected.');
}

export function buildSafeHeaders(contentType = 'application/json'): Headers {
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', contentType);
  headers.set('X-Requested-With', 'RE-ROOM');
  return headers;
}
