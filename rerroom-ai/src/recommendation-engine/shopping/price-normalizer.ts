import type {CatalogItem} from '../core/types';
const rates:Record<string,number>={CAD:1,USD:1.36,EUR:1.48,GBP:1.73};
export const normalizePrice=(item:CatalogItem,target='CAD')=>{const from=rates[item.currency]??1;const to=rates[target]??1;return item.price*from/to;};
export const withNormalizedPrices=(items:CatalogItem[],target='CAD')=>items.map(i=>({...i,price:normalizePrice(i,target),currency:target}));
