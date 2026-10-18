import type {CatalogItem} from '../core/types';
export const dedupeCatalog=(items:CatalogItem[]):CatalogItem[]=>{const seen=new Set<string>();const out:CatalogItem[]=[];for(const item of items){const key=`${item.name.toLowerCase()}|${item.dimensions.width.toFixed(2)}|${item.dimensions.depth.toFixed(2)}`;if(seen.has(key))continue;seen.add(key);out.push(item);}return out;};
