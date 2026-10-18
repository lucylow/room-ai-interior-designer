export function randomId(prefix = 'id'): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${prefix}_${hex}`;
}

export function requestId(): string {
  return randomId('req');
}

export function idempotencyKey(mutationId: string, entity: string, entityId: string, version: number): string {
  return `${mutationId}:${entity}:${entityId}:${version}`;
}
