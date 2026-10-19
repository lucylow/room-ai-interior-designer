import { StoreProduct } from '../types';

export const PRODUCT_IDS = {
  proMonthly: 'com.reroom.ai.pro.monthly',
  proYearly: 'com.reroom.ai.pro.yearly',
  studioMonthly: 'com.reroom.ai.studio.monthly',
  studioYearly: 'com.reroom.ai.studio.yearly',
  lifetime: 'com.reroom.ai.pro.lifetime',
  aiCredits100: 'com.reroom.ai.credits.100',
  aiCredits500: 'com.reroom.ai.credits.500',
  renderCredits10: 'com.reroom.ai.render.10',
} as const;

export const PRODUCT_CATALOG: StoreProduct[] = [
  { id: PRODUCT_IDS.proMonthly, kind:'auto-renewable', displayName:'RE:ROOM Pro', description:'Unlimited room concepts, advanced AI refinement, and enhanced visual exports.', price:14.99, currencyCode:'CAD', billingPeriod:'month', family:'pro', rank:1, featureFlags:['ai-unlimited','advanced-styles','hd-export'] },
  { id: PRODUCT_IDS.proYearly, kind:'auto-renewable', displayName:'RE:ROOM Pro Annual', description:'RE:ROOM Pro billed annually.', price:149.99, currencyCode:'CAD', billingPeriod:'year', family:'pro', rank:2, featureFlags:['ai-unlimited','advanced-styles','hd-export'] },
  { id: PRODUCT_IDS.studioMonthly, kind:'auto-renewable', displayName:'RE:ROOM Studio', description:'Professional project collaboration and construction-ready workflows.', price:39.99, currencyCode:'CAD', billingPeriod:'month', family:'studio', rank:3, featureFlags:['team-projects','cad-bim','3dgs','client-review'] },
  { id: PRODUCT_IDS.studioYearly, kind:'auto-renewable', displayName:'RE:ROOM Studio Annual', description:'RE:ROOM Studio billed annually.', price:399.99, currencyCode:'CAD', billingPeriod:'year', family:'studio', rank:4, featureFlags:['team-projects','cad-bim','3dgs','client-review'] },
  { id: PRODUCT_IDS.lifetime, kind:'non-consumable', displayName:'RE:ROOM Pro Lifetime', description:'One-time unlock for Pro-level creative features.', price:399.99, currencyCode:'CAD', family:'pro-lifetime', rank:5, featureFlags:['ai-unlimited','advanced-styles','hd-export'] },
  { id: PRODUCT_IDS.aiCredits100, kind:'consumable', displayName:'100 AI Credits', description:'A demo and production-compatible consumable credit pack.', price:9.99, currencyCode:'CAD', family:'ai-credits', rank:6, featureFlags:['ai-credit-pack'] },
  { id: PRODUCT_IDS.aiCredits500, kind:'consumable', displayName:'500 AI Credits', description:'Larger AI generation credit pack.', price:39.99, currencyCode:'CAD', family:'ai-credits', rank:7, featureFlags:['ai-credit-pack'] },
  { id: PRODUCT_IDS.renderCredits10, kind:'consumable', displayName:'10 HD Renders', description:'Ten additional HD render credits.', price:7.99, currencyCode:'CAD', family:'render-credits', rank:8, featureFlags:['render-credit-pack'] },
];

export function getProduct(id:string): StoreProduct | undefined { return PRODUCT_CATALOG.find(p=>p.id===id); }
export function productsForFamily(family:string): StoreProduct[] { return PRODUCT_CATALOG.filter(p=>p.family===family).sort((a,b)=>a.rank-b.rank); }
export function digitalProductIds(): string[] { return PRODUCT_CATALOG.map(p=>p.id); }
