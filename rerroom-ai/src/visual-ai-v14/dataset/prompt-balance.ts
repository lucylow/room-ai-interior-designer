import { DatasetRecord, avg } from '../core/types';
const CATS = ["brief", "refinement", "critique", "comparison"];
export function prompt_balance(records:DatasetRecord[]):DatasetRecord[]{
  const buckets=new Map<string,DatasetRecord[]>();
  for(const r of records){ const key = r.metadata['prompt']?.toString() || r.labels.find(x=>CATS.includes(x)) || 'unknown'; const arr=buckets.get(key)||[]; arr.push(r); buckets.set(key,arr); }
  const output:DatasetRecord[]=[]; const max=Math.max(0,...[...buckets.values()].map(x=>x.length));
  for(const key of CATS){ const src=buckets.get(key)||[]; for(let i=0;i<max;i++){ const r=src[i%Math.max(1,src.length)]; if(r) output.push(r); } }
  return output;
}
export function prompt_balanceScore(records:DatasetRecord[]):number{ return avg(records.map(r=>r.quality)); }
