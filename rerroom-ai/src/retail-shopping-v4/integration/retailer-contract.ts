import { RetailerCapability, RetailerContext, RetailerResult, RetailerQuery, RetailProduct } from '../domain/commerce-types';

export interface RetailerAdapter {
  readonly id: string;
  readonly name: string;
  readonly capability: RetailerCapability;
  search(query: RetailerQuery, context: RetailerContext): Promise<RetailerResult>;
  getProduct(id: string, context: RetailerContext): Promise<RetailProduct | undefined>;
  getUrl(product: RetailProduct, context: RetailerContext): string;
}

export class SnapshotAdapter implements RetailerAdapter {
  readonly capability: RetailerCapability = {
    liveCatalog: false,
    liveAvailability: false,
    productLinks: true,
    cartHandoff: false,
    localPickup: false,
    deliveryEstimate: false,
    imageAssets: true,
    plannerIntegration: true,
  };

  constructor(public readonly id: string, public readonly name: string, private readonly rows: RetailProduct[]) {}

  async search(query: RetailerQuery, _context: RetailerContext): Promise<RetailerResult> {
    const q = (query.query ?? '').trim().toLowerCase();
    let products = this.rows.slice();
    if (q) products = products.filter(p => [p.name, p.category, ...p.tags, ...p.materials, ...p.styles].join(' ').toLowerCase().includes(q));
    if (query.roomType) products = products.filter(p => p.roomTypes.includes(query.roomType!));
    if (query.styles?.length) products = products.filter(p => query.styles!.some(style => p.styles.includes(style)));
    if (query.categories?.length) products = products.filter(p => query.categories!.includes(p.category));
    if (query.maxPrice != null) products = products.filter(p => p.price.amount <= query.maxPrice!);
    return { products: products.slice(0, query.limit ?? 30), source: 'snapshot', retrievedAt: new Date().toISOString(), warning: 'Demo snapshot; verify retailer data before purchase.' };
  }

  async getProduct(id: string): Promise<RetailProduct | undefined> { return this.rows.find(p => p.id === id); }
  getUrl(product: RetailProduct): string { return product.url; }
}
