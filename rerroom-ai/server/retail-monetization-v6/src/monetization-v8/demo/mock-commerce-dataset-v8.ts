import type { CommerceProduct, ProductVariant } from "../../types/commerce";

const styles=["modern","minimalist","scandinavian","industrial","japandi","mid-century","organic-modern","contemporary"] as const;
const colors=["oak","walnut","white","black","sage","sand","clay","navy","charcoal","natural"] as const;
const rooms=["living-room","bedroom","dining","office","entryway","studio","nursery","guest-room"] as const;

function variant(i:number,base:number):ProductVariant { return {id:`v8-var-${i}`,sku:`V8-${i.toString().padStart(4,"0")}`,title:`Demo Variant ${i}`,price:{amount:base+(i%7)*13,currency:"CAD"},widthM:.45+(i%4)*.08,depthM:.42+(i%3)*.08,heightM:.35+(i%5)*.07,available:i%9!==0,inventory:i%9===0?0:2+(i%6)}; }

export const MOCK_PRODUCTS_V8:CommerceProduct[]=Array.from({length:160},(_,i)=>{
  const style=styles[i%styles.length]; const color=colors[i%colors.length]; const room=rooms[i%rooms.length];
  return {id:`v8-product-${i+1}`,retailer:["IKEA Canada","Demo Home","Partner Studio","Affiliate Merchant"][i%4],handle:`v8-product-${i+1}`,title:`${style.replace(/-/g," ")} ${room.replace(/-/g," ")} piece ${i+1}`,category:["sofa","chair","table","storage","bed","desk","lighting","rug"][i%8],tags:[room,"demo",style],styleTags:[style],colors:[color],materialTags:[i%3===0?"oak":i%3===1?"metal":"textile"],variants:[variant(i+1,39+(i%15)*21),variant(i+161,49+(i%11)*27)],imageUrl:`https://demo.local/assets/v8/${i+1}.jpg`,sourceUpdatedAt:"2026-10-02T18:00:00.000Z"};
});

export function searchProducts(query:string,room:string,budget:number){
  const q=query.toLowerCase();
  return MOCK_PRODUCTS_V8.filter(p=>p.tags.includes(room)||p.title.toLowerCase().includes(q)).flatMap(p=>p.variants.map(v=>({product:p,variant:v}))).filter(x=>x.variant.price.amount<=budget).slice(0,24);
}

export function buildRoomSet(room:string,style:string,budget:number){
  const pool=MOCK_PRODUCTS_V8.filter(p=>p.tags.includes(room)&&p.styleTags.includes(style));
  let spent=0; const chosen:ProductVariant[]=[];
  for(const p of pool){const v=p.variants.find(x=>x.available && spent+x.price.amount<=budget); if(v){chosen.push(v);spent+=v.price.amount;} if(chosen.length>=6) break;}
  return {room,style,budget,spent,remaining:Math.max(0,budget-spent),variants:chosen};
}
