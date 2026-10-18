import type {CatalogItem} from '../core/types';
export const inventoryConfidence=(item:CatalogItem)=>{const lead=item.leadTimeDays??21;const rating=item.rating??3.5;return Math.max(0,Math.min(1,.55+(5-lead/30)*.2+(rating-3.5)*.1));};
