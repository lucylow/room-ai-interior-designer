import { DatasetRecord, clamp } from '../core/types';
export interface ValidationResult { name:string; passed:boolean; score:number; issues:string[]; }
export function twoDGeometryValidator(records:DatasetRecord[]):ValidationResult{
  const issues:string[]=[];
  let score=0;
  for(const r of records.slice(0,512)){
    if(!r.id || !r.sample?.id) issues.push('missing identifiers');
    if(r.quality<0 || r.quality>1) issues.push(`quality:${r.id}`);
    if(!r.prompt) issues.push(`prompt:${r.id}`);
    score += clamp(r.quality);
  }
  const count=Math.max(1,Math.min(records.length,512));
  const value=score/count;
  return {name:'2d-geometry-validator',passed:issues.length===0 && value>0.6,score:value,issues:[...new Set(issues)].slice(0,20)};
}
