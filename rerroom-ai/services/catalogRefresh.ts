import { shopProducts, type ShopProduct } from "./shopCore";

export interface CatalogRefreshResult {
  product: ShopProduct;
  checkedAt: number;
  source: "local-catalog";
}

export async function refreshCatalogProduct(productId: string, checkedAt = Date.now()): Promise<CatalogRefreshResult> {
  const product = shopProducts.find((item) => item.id === productId);
  if (!product) throw new Error("PRODUCT_NOT_FOUND");
  return { product, checkedAt, source: "local-catalog" };
}
