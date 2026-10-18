import { IKEA_CANADA_SNAPSHOT } from './catalog/ikea-ca-snapshot';
import { RetailCatalog } from './catalog/retail-catalog';
import { runRetailDesignStudio, RetailStudioRequest } from './engine/retail-design-studio';
import { RetailProduct, RetailQuery, RetailResult } from './domain/commerce-types';

export interface ShoppingStudio {
  catalog: RetailCatalog;
  search(query: RetailQuery): RetailResult;
  design(request: RetailStudioRequest): ReturnType<typeof runRetailDesignStudio>;
}

export function createDemoShoppingStudio(products: RetailProduct[] = IKEA_CANADA_SNAPSHOT): ShoppingStudio {
  const catalog = new RetailCatalog(products);
  return {
    catalog,
    search: query => catalog.search(query),
    design: request => runRetailDesignStudio(products, request),
  };
}
