import { RetailProduct, DesignIntent, RoomEnvelope, Budget, ShoppingConstraints, FurnitureSlot, Candidate, Recommendation } from '../domain/commerce-types';
import { styleScore,paletteScore,roomScore,spatialScore,budgetScore,valueScore,fitState } from '../matching/scoring';
export function recommend(products:RetailProduct[],room:RoomEnvelope,intent:DesignIntent,budget:Budget,constraints:ShoppingConstraints,slot?:FurnitureSlot):Candidate[]{
  const rows=products.map(p=>{
    const ss=styleScore(p,intent),ps=paletteScore(p,intent),rs=roomScore(p,room,slot),xs=spatialScore(p,room,constraints),bs=budgetScore(p,budget),vs=valueScore(p);
    const reasons:string[]=[]; const warnings:string[]=[];
    if(p.styles.includes(intent.style))reasons.push('Matches the selected design style.');
    if(p.colors.some(c=>intent.palette.includes(c)))reasons.push('Matches the selected palette family.');
    if(p.roomTypes.includes(room.roomType))reasons.push('Tagged for the current room type.');
    if(xs>=80)reasons.push('Fits the current spatial constraints.'); else warnings.push('Check clearance in the 2D/3D preview.');
    if(bs>=80)reasons.push('Leaves substantial budget headroom.'); else if(bs<30)warnings.push('Consumes a large portion of the remaining budget.');
    const total=ss*.25+ps*.15+rs*.15+xs*.2+bs*.15+vs*.1;
    return {product:p,fit:fitState(p,room,constraints) as any,fitScore:xs,styleScore:ss,paletteScore:ps,roomScore:rs,budgetScore:bs,valueScore:vs,totalScore:total,reasons,warnings};
  });
  rows.sort((a,b)=>b.totalScore-a.totalScore);return rows;
}
export function toRecommendations(c:Candidate[],slot:FurnitureSlot,limit=6):Recommendation[]{return c.slice(0,limit).map(x=>({...x,quantity:1,lineTotal:x.product.price.amount,patchId:'shop-patch-'+slot.id+'-'+x.product.id}));}
