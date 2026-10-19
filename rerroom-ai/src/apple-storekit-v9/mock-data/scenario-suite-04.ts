import { PRODUCT_CATALOG } from '../catalog/product-catalog';
import { MOCK_ENTITLEMENTS } from '../demo/mock-store-data';

export interface ScenarioResult { id:string; scenario:string; products:number; entitlements:number; score:number; blockers:string[]; recommendations:string[]; }

export function runScenario4(seed='demo-4') : ScenarioResult {
  const blockers:string[]=[];
  const recommendations:string[]=[];
  const products=PRODUCT_CATALOG.length;
  const entitlements=MOCK_ENTITLEMENTS.length;
  const score=Math.max(0,Math.min(1,0.76 + (4%7)*0.03));
  if(products<8) blockers.push('catalog');
  if(entitlements===0) recommendations.push('restore purchases');
  if(score<0.85) recommendations.push('show value-led paywall');
  return {id:seed,scenario:'scenario-4',products,entitlements,score:Number(score.toFixed(3)),blockers,recommendations};
}
