import type { EntitlementGrant, MonetizationFeature, MonetizationTier } from '../types';

const ORDER: readonly MonetizationTier[] = ['free', 'plus', 'pro', 'studio'];

const MINIMUM_TIER: Record<MonetizationFeature, MonetizationTier> = {
  ai_generation: 'free',
  advanced_ai: 'plus',
  hd_render: 'pro',
  gaussian_splats: 'pro',
  cad_bim_tools: 'pro',
  project_exports: 'plus',
  team_projects: 'studio',
  priority_support: 'studio',
  unlimited_projects: 'studio',
  commercial_use: 'studio',
  design_templates: 'plus',
  retail_shopping: 'free',
};

const USABLE_STATES = new Set<EntitlementGrant['state']>(['active', 'grace', 'retry']);

export function tierAllows(tier: MonetizationTier, feature: MonetizationFeature): boolean {
  const userRank = ORDER.indexOf(tier);
  const requiredTier = MINIMUM_TIER[feature];
  const requiredRank = requiredTier ? ORDER.indexOf(requiredTier) : -1;
  if (userRank < 0 || requiredRank < 0) return false;
  return userRank >= requiredRank;
}

export function isFeatureActive(feature: MonetizationFeature, grants: EntitlementGrant[]): boolean {
  if (!Array.isArray(grants)) return false;
  return grants.some((grant) =>
    grant && grant.feature === feature && USABLE_STATES.has(grant.state),
  );
}

export function highestTier(grants: EntitlementGrant[]): MonetizationTier {
  if (!Array.isArray(grants)) return 'free';
  const usableProductIds = grants
    .filter((grant) => grant && USABLE_STATES.has(grant.state))
    .map((grant) => grant.productId);

  if (usableProductIds.some((productId) => typeof productId === 'string' && productId.includes('.studio.'))) {
    return 'studio';
  }
  if (usableProductIds.some((productId) => typeof productId === 'string' && productId.includes('.pro.'))) {
    return 'pro';
  }
  if (usableProductIds.some((productId) => typeof productId === 'string' && productId.includes('.plus.'))) {
    return 'plus';
  }
  return 'free';
}
