import { Entitlement, EntitlementState, StoreProduct } from '../types';

export const FEATURE_ENTITLEMENTS: Record<string,string[]> = {
  'ai-unlimited':['pro','studio','pro-lifetime'], 'advanced-styles':['pro','studio','pro-lifetime'],
  'hd-export':['pro','studio','pro-lifetime'], 'team-projects':['studio'], 'cad-bim':['studio'],
  '3dgs':['studio'], 'client-review':['studio'], 'ai-credit-pack':['credit-purchase'], 'render-credit-pack':['render-purchase'],
};

export function entitlementKey(product:StoreProduct):string { return product.family; }
export function active(ent:Entitlement):boolean { return ent.state==='active' || ent.state==='grace' || ent.state==='billing-retry'; }
export function canUseFeature(feature:string, entitlements:Entitlement[]):boolean {
  const allowed = FEATURE_ENTITLEMENTS[feature] ?? [];
  return entitlements.some(e=>active(e) && allowed.includes(e.key));
}
export function mergeEntitlements(input:Entitlement[]):Entitlement[] {
  const map = new Map<string,Entitlement>();
  for (const e of input) {
    const current=map.get(e.key); if (!current || rank(e.state)>rank(current.state)) map.set(e.key,e);
  }
  return [...map.values()];
}
function rank(s:EntitlementState):number { return ({active:5, grace:4, 'billing-retry':3, expired:2, revoked:1, missing:0})[s]; }
