import { PurchaseState, StoreProduct, Entitlement, PurchaseContext } from '../types';

export interface NativeStoreKitModule {
  loadProducts(ids:string[]):Promise<Array<{id:string;displayName:string;description:string;price:string;currencyCode:string;kind:string}>>;
  purchase(productId:string):Promise<PurchaseState>;
  restore():Promise<string[]>;
  entitlements():string[];
}

export interface StoreKitClientSnapshot {
  products:StoreProduct[];
  entitlements:Entitlement[];
  state:PurchaseState;
}

export class ReactNativeStoreKitClient {
  constructor(private readonly native:NativeStoreKitModule) {}
  async load(ids:string[]):Promise<StoreKitClientSnapshot>{
    const products=await this.native.loadProducts(ids);
    const mapped:StoreProduct[]=products.map((p,i)=>({id:p.id,displayName:p.displayName,description:p.description,price:Number(p.price.replace(/[^0-9.]/g,''))||0,currencyCode:p.currencyCode,kind:(p.kind==='consumable'||p.kind==='non-consumable'||p.kind==='auto-renewable')?p.kind:'non-consumable',family:p.id.includes('.studio.')?'studio':p.id.includes('.credits.')?'ai-credits':'pro',rank:i+1,featureFlags:[]}));
    return {products:mapped,entitlements:[],state:'idle'};
  }
  async buy(context:PurchaseContext):Promise<PurchaseState>{ return this.native.purchase(context.productId); }
  async restore():Promise<string[]>{ return this.native.restore(); }
  rawEntitlements():string[]{ return this.native.entitlements(); }
}
