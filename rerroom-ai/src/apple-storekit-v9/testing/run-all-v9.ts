import { RoomAIStoreKitManager, DemoStoreKitBridge } from '../storekit-v9-manager';
import { PRODUCT_CATALOG } from '../catalog/product-catalog';
import { PaywallEngine } from '../paywall/paywall-engine';

export async function runAllV9Tests(){
 const failures:string[]=[];
 if(PRODUCT_CATALOG.length!==8) failures.push('catalog-count');
 const manager=new RoomAIStoreKitManager(new DemoStoreKitBridge());
 await manager.load();
 if(manager.snapshot().products.length!==8) failures.push('load-products');
 await manager.purchase({appUserId:'demo',productId:'com.reroom.ai.pro.monthly',sourceScreen:'test'});
 if(!manager.canUse('ai-unlimited')) failures.push('pro-entitlement');
 const pw=new PaywallEngine().model({reason:'cad-bim-limit',sourceScreen:'test'});
 if(pw.recommended!=='com.reroom.ai.studio.yearly') failures.push('studio-route');
 return {ok:failures.length===0,failures};
}
