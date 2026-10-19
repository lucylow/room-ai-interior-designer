import { PRODUCT_CATALOG } from './catalog/product-catalog';
import { Entitlement, PurchaseContext, PurchaseState, PurchaseTransaction, RevenueEvent, StoreProduct } from './types';
import { canUseFeature, mergeEntitlements } from './entitlements/entitlement-policy';

export interface StoreKitBridge {
  products(ids:string[]): Promise<StoreProduct[]>;
  purchase(productId:string, options?:Record<string,unknown>): Promise<{transaction:PurchaseTransaction|null; userCancelled:boolean}>;
  restore(): Promise<PurchaseTransaction[]>;
  currentEntitlements(): Promise<Entitlement[]>;
}

export class DemoStoreKitBridge implements StoreKitBridge {
  private readonly txns = new Map<string,PurchaseTransaction>();
  private readonly entitlements:Entitlement[]=[];
  async products(ids:string[]):Promise<StoreProduct[]> { return PRODUCT_CATALOG.filter(p=>ids.includes(p.id)); }
  async purchase(productId:string):Promise<{transaction:PurchaseTransaction|null; userCancelled:boolean}> {
    const now=new Date().toISOString();
    const id=`demo-${productId}-${Date.now()}`;
    const product=PRODUCT_CATALOG.find(p=>p.id===productId);
    if(!product) throw new Error('Unknown product');
    const t:PurchaseTransaction={id,originalId:id,productId,environment:'demo',purchasedAt:now,state:'purchased',verification:'verified',offerType:'none',expiresAt:product.billingPeriod ? new Date(Date.now()+(product.billingPeriod==='year'?365:30)*86400000).toISOString():undefined};
    this.txns.set(id,t);
    this.entitlements.push({key:product.family,productId,state:'active',source:'demo',startedAt:now,expiresAt:t.expiresAt,transactionId:id});
    return {transaction:t,userCancelled:false};
  }
  async restore():Promise<PurchaseTransaction[]> { return [...this.txns.values()]; }
  async currentEntitlements():Promise<Entitlement[]> { return mergeEntitlements(this.entitlements); }
}

export interface StoreSnapshot {
  products:StoreProduct[];
  entitlements:Entitlement[];
  purchaseState:PurchaseState;
  lastTransaction?:PurchaseTransaction;
  events:RevenueEvent[];
}

export class RoomAIStoreKitManager {
  private snapshotState:StoreSnapshot={products:PRODUCT_CATALOG,entitlements:[],purchaseState:'idle',events:[]};
  constructor(private readonly bridge:StoreKitBridge) {}
  snapshot():StoreSnapshot { return structuredClone(this.snapshotState); }
  async load():Promise<StoreSnapshot>{ this.snapshotState.products=await this.bridge.products(PRODUCT_CATALOG.map(p=>p.id)); this.snapshotState.entitlements=await this.bridge.currentEntitlements(); return this.snapshot(); }
  async purchase(context:PurchaseContext):Promise<StoreSnapshot>{
    this.snapshotState.purchaseState='loading';
    const result=await this.bridge.purchase(context.productId);
    if(result.userCancelled){ this.snapshotState.purchaseState='cancelled'; return this.snapshot(); }
    if(!result.transaction){ this.snapshotState.purchaseState='failed'; throw new Error('No transaction returned'); }
    this.snapshotState.lastTransaction=result.transaction; this.snapshotState.purchaseState='purchased';
    this.snapshotState.entitlements=await this.bridge.currentEntitlements();
    this.snapshotState.events.push({name:'purchase_completed',timestamp:new Date().toISOString(),amount:this.snapshotState.products.find(p=>p.id===context.productId)?.price,currency:'CAD',productId:context.productId,experimentId:context.experimentId,properties:{sourceScreen:context.sourceScreen,designProjectId:context.designProjectId ?? ''}});
    return this.snapshot();
  }
  async restore():Promise<StoreSnapshot>{ this.snapshotState.purchaseState='loading'; await this.bridge.restore(); this.snapshotState.entitlements=await this.bridge.currentEntitlements(); this.snapshotState.purchaseState='restored'; return this.snapshot(); }
  canUse(feature:string):boolean{return canUseFeature(feature,this.snapshotState.entitlements);}
}
