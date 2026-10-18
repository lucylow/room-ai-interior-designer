import type {CatalogItem,UserPreferences} from '../core/types';
export const shippingFit=(item:CatalogItem,prefs:UserPreferences)=>{const lead=item.leadTimeDays??14;const horizon=prefs.renovationHorizon;const max=horizon==='now'?10:horizon==='soon'?30:90;return Math.max(0,Math.min(1,1-Math.max(0,lead-max)/Math.max(1,max)));};
