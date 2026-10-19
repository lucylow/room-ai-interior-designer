import { clamp, avg, Score, DatasetRecord } from '../core/types';
export interface NormalConfidenceContext {
  id:string;
  quality:number;
  confidence:number;
  budget?:number;
  values?:number[];
  tags?:string[];
}
export interface NormalConfidenceResult {
  score:number;
  pass:boolean;
  confidence:number;
  warnings:string[];
  recommendations:string[];
}
const DOMAIN='threed';
const NAME='normal-confidence';
function normalize(xs:number[]):number[]{ return xs.map(x=>clamp(x)); }
function weighted(xs:number[], weights:number[]):number{ const w=weights.reduce((a,b)=>a+b,0)||1; return xs.reduce((s,x,i)=>s+x*(weights[i]??1),0)/w; }
export function evaluateNormalConfidence(c:NormalConfidenceContext):NormalConfidenceResult{
  const samples=normalize(c.values?.length?c.values:[c.quality,c.confidence,(c.budget??100)/100]);
  const score=clamp(weighted(samples,[0.45,0.35,0.20]));
  const warnings:string[]=[]; const recommendations:string[]=[];
  if(score<0.5) warnings.push(`${NAME} below visual quality target`);
  if(c.confidence<0.55) warnings.push('low confidence');
  if(c.budget!==undefined && c.budget<25) warnings.push('low render/data budget');
  if(score<0.72) recommendations.push(`increase ${DOMAIN} evidence or visual coverage`);
  recommendations.push(`recheck ${NAME} after the next design revision`);
  return {score,pass:warnings.length===0,confidence:clamp(c.confidence*0.65+score*0.35),warnings,recommendations};
}
export function makeNormalConfidenceRecord(i:number):DatasetRecord{
  const quality=.55+((i*(11))%42)/100;
  return {id:`threed-normal-confidence-${i}`,sample:{id:`asset-${i}`,kind:'render-3d',width:1536,height:1024,roomId:`room-${i%16}`},prompt:`evaluate ${NAME} for a production interior design visual`,labels:[DOMAIN,NAME],quality,split:i%10<7?'train':i%10<9?'validation':'test',metadata:{domain:DOMAIN,name:NAME,index:i,quality}};
}
export function summarizeNormalConfidence(records:DatasetRecord[]):Score{ return {value:avg(records.map(r=>r.quality)),confidence:clamp(.65+records.length/2000),reasons:[`${NAME} records=${records.length}`]}; }
