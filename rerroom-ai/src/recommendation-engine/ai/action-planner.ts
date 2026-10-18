import type {Recommendation,Action} from '../core/types';
export interface PlannedAction {id:string;step:number;action:Action;reason:string;blocked:boolean;}
export const planActions=(recommendations:Recommendation[],maxSteps=10):PlannedAction[]=>{
  const ranked=[...recommendations].sort((a,b)=>b.score-a.score);const out:PlannedAction[]=[];let step=1;
  for(const rec of ranked){for(const action of rec.actions){if(action.type==='none')continue;out.push({id:`plan-${rec.id}-${step}`,step,action,reason:`Supports ${rec.title}`,blocked:false});step++;if(out.length>=maxSteps)return out;}}
  return out;
};
export const groupByTarget=(rows:PlannedAction[]):Record<string,PlannedAction[]>=>rows.reduce((acc,row)=>{const key=row.action.targetId??'global';(acc[key]??=[]).push(row);return acc;},{} as Record<string,PlannedAction[]>);
