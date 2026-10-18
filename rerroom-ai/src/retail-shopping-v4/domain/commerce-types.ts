export type Currency = 'CAD' | 'USD';
export type RetailerId = 'ikea-ca' | 'mock-retailer' | string;
export type StyleName = 'modern' | 'minimalist' | 'scandinavian' | 'industrial' | 'japandi' | 'mid-century' | 'bohemian' | 'organic-modern' | 'contemporary' | string;
export type ProductCategory = 'sofa' | 'seating' | 'tables' | 'dining' | 'storage' | 'bed' | 'lighting' | 'rug' | 'decor' | 'desk' | string;
export type RoomType = 'living' | 'bedroom' | 'dining' | 'kitchen' | 'office' | 'entry' | 'studio' | 'guest' | 'nursery' | 'family-room' | string;
export type AvailabilityState = 'in-stock' | 'low-stock' | 'out-of-stock' | 'unknown' | 'demo';
export type FitState = 'fits' | 'tight' | 'too-large' | 'too-small' | 'blocked' | 'unknown';

export interface DimensionsCm { width:number; depth:number; height:number; maxWidth?:number; }
export interface Box2D { x:number; y:number; width:number; height:number; rotationDeg:number; }
export interface PriceSnapshot { amount:number; currency:Currency; capturedAt:string; source:'retailer'|'mock'|'user'; previousAmount?:number; }
export interface RetailProduct { id:string; retailer:RetailerId; sku:string; name:string; brand?:string; category:ProductCategory; roomTypes:RoomType[]; styles:StyleName[]; colors:string[]; materials:string[]; tags:string[]; dimensions:DimensionsCm; price:PriceSnapshot; url:string; availability:AvailabilityState; rating?:number; freshUntil:string; demoOnly?:boolean; configurable?:boolean; requiresWallAnchor?:boolean; }
export interface RoomEnvelope { id:string; name:string; roomType:RoomType; width:number; depth:number; height:number; usableAreaM2:number; doorwayClearanceCm:number; circulationTargetCm:number; fixedObstacles:Box2D[]; }
export interface DesignIntent { style:StyleName; secondaryStyles:StyleName[]; palette:string[]; accentColors:string[]; mustKeep:string[]; avoid:string[]; keywords:string[]; roomType:RoomType; }
export interface Budget { total:number; committed:number; reserved:number; shippingAllowance:number; taxRate:number; assemblyAllowance:number; currency:Currency; hardCap:boolean; }
export interface ShoppingConstraints { maxWidth?:number; maxDepth?:number; maxHeight?:number; minWidth?:number; minDepth?:number; accessibleClearanceCm?:number; requiresStorage?:boolean; requiresExpandable?:boolean; }
export interface FurnitureSlot { id:string; role:string; anchorId:string; bbox:Box2D; optional?:boolean; }
export interface Candidate { product:RetailProduct; fit:FitState; fitScore:number; styleScore:number; paletteScore:number; roomScore:number; budgetScore:number; valueScore:number; totalScore:number; reasons:string[]; warnings:string[]; }
export interface Recommendation extends Candidate { quantity:number; lineTotal:number; patchId:string; }
export interface ScenePatch { id:string; action:'replace'|'add'|'remove'|'move'|'restyle'; slotId:string; productId:string; bbox:Box2D; reversible:boolean; source:'shopping-ai'|'user'; }
export interface CartLine { id:string; productId:string; quantity:number; unitPrice:number; estimatedTotal:number; addedAt:string; }
export interface ShoppingCart { id:string; roomId:string; currency:Currency; lines:CartLine[]; createdAt:string; updatedAt:string; }
export interface Bundle { id:string; title:string; roomId:string; retailer:RetailerId; productIds:string[]; subtotal:number; shipping:number; tax:number; total:number; budgetRemaining:number; style:StyleName; reasons:string[]; }
export interface RetailerCapability { liveCatalog:boolean; liveAvailability:boolean; productLinks:boolean; cartHandoff:boolean; localPickup:boolean; deliveryEstimate:boolean; imageAssets:boolean; plannerIntegration:boolean; }
export interface RetailerQuery { query?:string; roomType?:RoomType; styles?:StyleName[]; categories?:ProductCategory[]; maxPrice?:number; constraints?:ShoppingConstraints; limit?:number; }
export interface RetailerResult { products:RetailProduct[]; source:'live'|'snapshot'|'demo'; retrievedAt:string; warning?:string; }
export interface RetailerContext { locale:string; currency:Currency; postalCode?:string; }
export interface ShoppingEvent { id:string; type:string; roomId:string; productId?:string; timestamp:string; metadata:Record<string,string|number|boolean>; }
export interface ApprovalRecord { revisionId:string; status:'pending'|'approved'|'changes-requested'; comment?:string; approvedAt?:string; }
export interface ShoppingRevision { id:string; label:string; style:string; palette:string[]; productIds:string[]; budget:number; createdAt:string; }

export type RetailQuery = RetailerQuery;
export type RetailResult = RetailerResult;
