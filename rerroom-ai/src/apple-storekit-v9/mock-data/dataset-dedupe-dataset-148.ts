import { StoreProduct, Entitlement, RevenueEvent } from '../types';

export interface DedupeDataset148Record { id:string; topic:string; domain:string; expected:string[]; score:number; tags:string[]; metadata:Record<string,string|number|boolean>; }

export class DedupeDataset148 {
  private readonly examples:DedupeDataset148Record[] = [
    { id:'dataset-dedupe-dataset-001', topic:'dedupe', domain:'dataset', expected:['pass','explain','revise'], score:0.92, tags:['mock','demo','regression'], metadata:{ source:'synthetic-v9', deterministic:true, priority:'high' } },
    { id:'dataset-dedupe-dataset-002', topic:'dedupe', domain:'dataset', expected:['flag','compare','ground'], score:0.84, tags:['edge-case','demo'], metadata:{ source:'synthetic-v9', deterministic:true, priority:'medium' } }
  ];

  build(input:any={}):DedupeDataset148Record[] { const seed=String(input.seed ?? 'default'); return this.examples.map((x,i)=>({...x,id:`${x.id}-${seed}-${i}`})); }
  score(input:any={}):number { const base=Number(input.base ?? 0.84); const evidence=Number(input.evidence ?? 0.08); const penalty=Number(input.penalty ?? 0); return Math.max(0,Math.min(1,base+evidence-penalty)); }
  validate(input:any={}):{ok:boolean;issues:string[]} { const issues:string[]=[]; if(!input?.roomId) issues.push('roomId'); if(input?.budget!==undefined && Number(input.budget)<0) issues.push('budget'); return {ok:issues.length===0,issues}; }
  compare(a:any,b:any):number { return this.score({base:Number(a?.score??0.5),evidence:Number(b?.score??0.5)-0.5}); }
  summarize(rows:DedupeDataset148Record[]={} as any):Record<string,number|string> { const data=Array.isArray(rows)&&rows.length?rows:this.examples; const avg=data.reduce((s,x)=>s+x.score,0)/data.length; return {domain:'dataset',topic:'dedupe',count:data.length,averageScore:Number(avg.toFixed(3))}; }
  fixture():DedupeDataset148Record[] { return this.examples.map(x=>({...x})); }
}
