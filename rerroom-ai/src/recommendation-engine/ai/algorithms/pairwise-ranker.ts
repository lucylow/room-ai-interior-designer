import type {Recommendation} from '../../core/types';
export const comparePair=(a:Recommendation,b:Recommendation)=>{const av=a.score+a.expectedImpact*.25+a.confidence*.15;const bv=b.score+b.expectedImpact*.25+b.confidence*.15;return av===bv?0:av>bv?1:-1;};
export const pairwiseRank=(rows:Recommendation[])=>{const scores=new Map<string,number>(rows.map(r=>[r.id,0]));for(const a of rows)for(const b of rows){if(a.id===b.id)continue;if(comparePair(a,b)>0)scores.set(a.id,(scores.get(a.id)??0)+1);}return rows.slice().sort((a,b)=>(scores.get(b.id)??0)-(scores.get(a.id)??0));};
