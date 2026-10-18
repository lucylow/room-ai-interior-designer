/** RE:ROOM AI Retail Shopping Studio V5 — extended module. */
import type { RetailProduct, ProductCategory, RoomType, StyleName, FurnitureSlot, RoomEnvelope, Budget, RetailerId, ShoppingConstraints } from '../../retail-shopping-v4/domain/commerce-types';
import { IKEA_CA_V5_CATALOG } from '../catalog/ikea-ca-current-snapshot';
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}

export interface ProductVariantV2 { id:string; productId:string; label:string; color:string; sizeLabel:string; priceDelta:number; dimensions:{width:number;depth:number;height:number}; available:boolean; }
export const DEMO_VARIANTS_V2:ProductVariantV2[]=[
 {id:'poang-beige',productId:'ikea-poang-armchair',label:'POÄNG beige',color:'beige',sizeLabel:'standard',priceDelta:0,dimensions:{width:68,depth:82,height:100},available:true},
 {id:'poang-low',productId:'ikea-poang-low-back',label:'POÄNG low-back',color:'beige',sizeLabel:'low',priceDelta:-20,dimensions:{width:68,depth:80,height:82},available:true},
 {id:'billy-white',productId:'ikea-billy-white-40x28x202',label:'BILLY white',color:'white',sizeLabel:'tall',priceDelta:0,dimensions:{width:40,depth:28,height:202},available:true},
 {id:'billy-oak',productId:'ikea-billy-bookcase-effect',label:'BILLY oak effect',color:'oak',sizeLabel:'wide-low',priceDelta:20,dimensions:{width:80,depth:28,height:106},available:true},
];
export function variantsFor(productId:string,variants=DEMO_VARIANTS_V2){return variants.filter(v=>v.productId===productId);}
export function chooseVariant(product:RetailProduct,preferredColor?:string,maxWidth?:number,maxBudget=Infinity,variants=DEMO_VARIANTS_V2):ProductVariantV2|undefined{return variants.filter(v=>v.productId===product.id).filter(v=>!preferredColor||text(v.color).includes(text(preferredColor))).filter(v=>!maxWidth||v.dimensions.width<=maxWidth).filter(v=>product.price.amount+v.priceDelta<=maxBudget).sort((a,b)=>Math.abs(a.priceDelta)-Math.abs(b.priceDelta))[0];}
