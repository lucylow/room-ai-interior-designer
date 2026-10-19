import { StoreProduct, Entitlement, RevenueEvent } from '../types';

export interface WindowVisibilityDataset67Record { id:string; topic:string; domain:string; expected:string[]; score:number; tags:string[]; metadata:Record<string,string|number|boolean>; }

export class WindowVisibilityDataset67 {
  private readonly examples:WindowVisibilityDataset67Record[] = [
    { id:'spatial-window-visibility-dataset-001', topic:'window-visibility', domain:'spatial', expected:['pass','explain','revise'], score:0.92, tags:['mock','demo','regression'], metadata:{ source:'synthetic-v9', deterministic:true, priority:'high' } },
    { id:'spatial-window-visibility-dataset-002', topic:'window-visibility', domain:'spatial', expected:['flag','compare','ground'], score:0.84, tags:['edge-case','demo'], metadata:{ source:'synthetic-v9', deterministic:true, priority:'medium' } }
  ];

  build(input:any={}):WindowVisibilityDataset67Record[] { const seed=String(input.seed ?? 'default'); return this.examples.map((x,i)=>({...x,id:`${x.id}-${seed}-${i}`})); }
  score(input:any={}):number { const base=Number(input.base ?? 0.84); const evidence=Number(input.evidence ?? 0.08); const penalty=Number(input.penalty ?? 0); return Math.max(0,Math.min(1,base+evidence-penalty)); }
  validate(input:any={}):{ok:boolean;issues:string[]} { const issues:string[]=[]; if(!input?.roomId) issues.push('roomId'); if(input?.budget!==undefined && Number(input.budget)<0) issues.push('budget'); return {ok:issues.length===0,issues}; }
  compare(a:any,b:any):number { return this.score({base:Number(a?.score??0.5),evidence:Number(b?.score??0.5)-0.5}); }
  summarize(rows:WindowVisibilityDataset67Record[]={} as any):Record<string,number|string> { const data=Array.isArray(rows)&&rows.length?rows:this.examples; const avg=data.reduce((s,x)=>s+x.score,0)/data.length; return {domain:'spatial',topic:'window-visibility',count:data.length,averageScore:Number(avg.toFixed(3))}; }
  fixture():WindowVisibilityDataset67Record[] { return this.examples.map(x=>({...x})); }
}
