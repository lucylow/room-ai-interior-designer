import { DemoStoreKitBridge, RoomAIStoreKitManager } from './src/apple-storekit-v9/storekit-v9-manager';
import { PaywallEngine } from './src/apple-storekit-v9/paywall/paywall-engine';

async function main(){
 const manager=new RoomAIStoreKitManager(new DemoStoreKitBridge());
 await manager.load();
 const before=manager.snapshot();
 await manager.purchase({appUserId:'demo-user',productId:'com.reroom.ai.pro.yearly',sourceScreen:'design-editor',designProjectId:'demo-room-001'});
 const after=manager.snapshot();
 const paywall=new PaywallEngine().model({reason:'ai-limit',sourceScreen:'home'});
 console.log(JSON.stringify({beforeProducts:before.products.length,afterEntitlements:after.entitlements.map(e=>e.key),purchaseState:after.purchaseState,paywallRecommended:paywall.recommended,events:after.events.length,physicalGoodsPaymentPath:'retailer-or-Apple-Pay-not-StoreKit-IAP'},null,2));
}
main().then(result=>console.log(JSON.stringify(result,null,2)));

