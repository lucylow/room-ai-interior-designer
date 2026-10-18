import type {CatalogItem,RoomContext,UserPreferences,BudgetProfile,Recommendation} from '../core/types';
import {makeEvidence} from '../core/evidence';
import {clamp} from '../core/math';
export const rankCatalog=(items:CatalogItem[],room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):CatalogItem[]=>items.map(x=>{
 const style=x.styleTags.some(s=>prefs.preferredStyles.includes(s))?.18:0;const avoid=x.styleTags.some(s=>prefs.avoidedStyles.includes(s))?.18:0;
 const roomFit=x.roomTypes?.includes(room.roomType)?.12:0;const budgetFit=budget&&x.price<=budget.total?.15:0;return {...x,__rank:clamp(.45+style-avoid+roomFit+budgetFit+(x.rating??3)/25)} as CatalogItem&{__rank:number};
}).sort((a,b)=>(b as CatalogItem&{__rank:number}).__rank-(a as CatalogItem&{__rank:number}).__rank).map(({__rank,...x})=>x as CatalogItem);
export const productRecommendations=(items:CatalogItem[],room:RoomContext,prefs:UserPreferences,budget?:BudgetProfile):Recommendation[]=>rankCatalog(items,room,prefs,budget).slice(0,6).map((x,i)=>({
 id:`product-${x.id}`,category:'shopping',title:`Consider ${x.name}`,summary:`Fits the ${room.roomType} scenario and current style signals.`,rationale:'Catalog match based on room type, style preferences, dimensions, and budget inputs.',score:clamp(.58+i*.03),confidence:.72,effort:'easy',estimatedCost:x.price,currency:x.currency,expectedImpact:clamp(.6+(x.rating??3)/10),evidence:[makeEvidence('catalog','price',`${x.price} ${x.currency}`,1,x.id),makeEvidence('catalog','room type',room.roomType,.86,x.id)],actions:[{type:'shop-item',targetId:x.id,payload:{price:x.price}}],tradeoffs:[x.leadTimeDays?`Lead time about ${x.leadTimeDays} days.`:'Lead time not specified.'],alternatives:[],tags:[...x.styleTags,'catalog'],createdAt:Date.now()
}));
