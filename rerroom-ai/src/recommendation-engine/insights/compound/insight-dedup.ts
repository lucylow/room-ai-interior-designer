import type {Insight} from '../../core/types';
const tokens=(text:string)=>new Set(text.toLowerCase().split(/\s+/).filter(x=>x.length>3));
const similarity=(a:string,b:string)=>{const ta=tokens(a),tb=tokens(b);let shared=0;for(const x of ta)if(tb.has(x))shared++;return shared/Math.max(1,new Set([...ta,...tb]).size);};
export const dedupeInsights=(rows:Insight[],threshold=.72)=>{const out:Insight[]=[];for(const row of rows){if(out.some(existing=>existing.category===row.category&&similarity(existing.title,row.title)>=threshold))continue;out.push(row);}return out;};
