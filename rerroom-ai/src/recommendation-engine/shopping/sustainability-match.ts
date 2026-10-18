import type {CatalogItem,UserPreferences} from '../core/types';
export const sustainabilityMatch=(item:CatalogItem,prefs:UserPreferences)=>Math.max(0,Math.min(1,(item.sustainabilityScore??.55)*(.45+.55*prefs.sustainabilityPriority)+(item.maintenanceScore??.6)*.15));
