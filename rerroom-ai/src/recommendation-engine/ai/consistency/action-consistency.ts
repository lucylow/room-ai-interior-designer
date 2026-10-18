import type {Recommendation,Action} from '../../core/types';
export const actionConsistency=(rows:Recommendation[])=>rows.map(r=>{const types=r.actions.map(a=>a.type);const repeats=new Set(types).size<types.length;const executable=types.some(t=>t!=='none');return {id:r.id,score:Math.min(1,(executable?.85:.5)+(repeats?.04:0)),types};});
