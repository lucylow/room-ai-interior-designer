import type { FeatureEntitlements } from './types';

export type Permission =
  | 'room:read'
  | 'room:write'
  | 'room:delete'
  | 'design:generate'
  | 'ar:write'
  | 'shopping:read'
  | 'construction:share';

export interface AuthorizationContext {
  userId?: string;
  ownerId?: string;
  scopes: string[];
  entitlements: FeatureEntitlements;
}

export function can(context: AuthorizationContext, permission: Permission): boolean {
  if (!context.userId || !context.ownerId || context.userId !== context.ownerId) return false;
  const scopeMap: Record<Permission, string> = {
    'room:read': 'rooms:read',
    'room:write': 'rooms:write',
    'room:delete': 'rooms:delete',
    'design:generate': 'ai:generate',
    'ar:write': 'ar:write',
    'shopping:read': 'commerce:read',
    'construction:share': 'construction:share',
  };
  if (!context.scopes.includes(scopeMap[permission])) return false;
  if (permission === 'design:generate' && !context.entitlements.aiGeneration) return false;
  if (permission === 'shopping:read' && !context.entitlements.shopping) return false;
  if (permission === 'construction:share' && !context.entitlements.construction) return false;
  return true;
}
