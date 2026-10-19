import { PRODUCT_CATALOG } from '../catalog/product-catalog';
import { Entitlement, PurchaseTransaction } from '../types';

export const MOCK_TRANSACTIONS:PurchaseTransaction[]=[
 {id:'demo-tx-pro-001',originalId:'demo-tx-pro-001',productId:'com.reroom.ai.pro.monthly',environment:'demo',purchasedAt:'2026-10-02T13:00:00Z',expiresAt:'2026-11-02T13:00:00Z',state:'purchased',verification:'verified',offerType:'introductory'},
 {id:'demo-tx-studio-001',originalId:'demo-tx-studio-001',productId:'com.reroom.ai.studio.yearly',environment:'demo',purchasedAt:'2026-09-02T13:00:00Z',expiresAt:'2027-09-02T13:00:00Z',state:'purchased',verification:'verified',offerType:'none'},
];
export const MOCK_ENTITLEMENTS:Entitlement[]=[
 {key:'pro',productId:'com.reroom.ai.pro.monthly',state:'active',source:'demo',startedAt:'2026-10-02T13:00:00Z',expiresAt:'2026-11-02T13:00:00Z',transactionId:'demo-tx-pro-001'},
 {key:'studio',productId:'com.reroom.ai.studio.yearly',state:'active',source:'demo',startedAt:'2026-09-02T13:00:00Z',expiresAt:'2027-09-02T13:00:00Z',transactionId:'demo-tx-studio-001'},
];
export const MOCK_PAYWALLS=PRODUCT_CATALOG.filter(p=>p.kind!=='consumable').map(p=>({productId:p.id,source:'demo',impressions:1200,purchases:p.family.startsWith('studio')?72:96}));
