import type {InsightCluster} from './types';
import type {Insight} from '../core/types';
export const clusterInsights=(items:Insight[]):InsightCluster[]=>{
  const map=new Map<string,Insight[]>();for(const i of items){const a=map.get(i.category)??[];a.push(i);map.set(i.category,a);}
  return [...map.entries()].map(([category,insights])=>({id:`cluster-${category}`,title:`${category} insight group`,category:category as Insight['category'],insights:insights.map(i=>i.id),priority:Math.max(...insights.map(i=>({info:.2,low:.4,medium:.65,high:.85,critical:1}[i.severity])))}));
};
