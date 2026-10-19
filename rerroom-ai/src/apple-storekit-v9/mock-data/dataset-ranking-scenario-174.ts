import { StoreProduct, Entitlement, RevenueEvent } from '../types';

export interface RankingScenario174Record { id:string; topic:string; domain:string; expected:string[]; score:number; tags:string[]; metadata:Record<string,string|number|boolean>; }

export class RankingScenario174 {
  private readonly examples:RankingScenario174Record[] = [
    { id:'dataset-ranking-scenario-001', topic:'ranking', domain:'dataset', expected:['pass','explain','revise'], score:0.92, tags:['mock','demo','regression'], metadata:{ source:'synthetic-v9', deterministic:true, priority:'high' } },
    { id:'dataset-ranking-scenario-002', topic:'ranking', domain:'dataset', expected:['flag','compare','ground'], score:0.84, tags:['edge-case','demo'], metadata:{ source:'synthetic-v9', deterministic:true, priority:'medium' } }
  ];

  build(input:any={}):RankingScenario174Record[] { const seed=String(input.seed ?? 'default'); return this.examples.map((x,i)=>({...x,id:`${x.id}-${seed}-${i}`})); }
  score(input:any={}):number { const base=Number(input.base ?? 0.84); const evidence=Number(input.evidence ?? 0.08); const penalty=Number(input.penalty ?? 0); return Math.max(0,Math.min(1,base+evidence-penalty)); }
  validate(input:any={}):{ok:boolean;issues:string[]} { const issues:string[]=[]; if(!input?.roomId) issues.push('roomId'); if(input?.budget!==undefined && Number(input.budget)<0) issues.push('budget'); return {ok:issues.length===0,issues}; }
  compare(a:any,b:any):number { return this.score({base:Number(a?.score??0.5),evidence:Number(b?.score??0.5)-0.5}); }
  summarize(rows:RankingScenario174Record[]={} as any):Record<string,number|string> { const data=Array.isArray(rows)&&rows.length?rows:this.examples; const avg=data.reduce((s,x)=>s+x.score,0)/data.length; return {domain:'dataset',topic:'ranking',count:data.length,averageScore:Number(avg.toFixed(3))}; }
  fixture():RankingScenario174Record[] { return this.examples.map(x=>({...x})); }
}
