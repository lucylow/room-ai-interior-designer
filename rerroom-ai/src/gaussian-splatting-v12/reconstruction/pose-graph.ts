import { PoseCandidate } from '../core/types';
import { distance } from '../core/utils';
export type PoseEdge={a:string;b:string;weight:number;baseline:number;residual:number};
export type PoseGraph={nodes:Map<string,PoseCandidate>;edges:PoseEdge[]};
export function buildPoseGraph(poses:PoseCandidate[],maxBaseline=3):PoseGraph{
 const nodes=new Map(poses.map(p=>[p.frameId,p]));const edges:PoseEdge[]=[];
 for(let i=0;i<poses.length;i++)for(let j=i+1;j<poses.length;j++){
   const baseline=distance(poses[i].pose.position,poses[j].pose.position); if(baseline>maxBaseline)continue;
   const residual=Math.abs(poses[i].reprojectionError-poses[j].reprojectionError);
   const weight=Math.max(0,Math.min(1,(poses[i].confidence+poses[j].confidence)/2))*Math.exp(-baseline/maxBaseline)*(1/(1+residual));
   if(weight>0.25)edges.push({a:poses[i].frameId,b:poses[j].frameId,weight,baseline,residual});
 }
 return {nodes,edges};
}
export function connectedComponents(graph:PoseGraph):string[][]{
 const out:string[][]=[];const unseen=new Set(graph.nodes.keys());
 while(unseen.size){const seed=unseen.values().next().value as string;const q=[seed];const comp:string[]=[];unseen.delete(seed);
   while(q.length){const n=q.shift()!;comp.push(n);for(const e of graph.edges){const v=e.a===n?e.b:e.b===n?e.a:undefined;if(v&&unseen.has(v)){unseen.delete(v);q.push(v)}}}
   out.push(comp);
 } return out;
}
export function graphHealth(graph:PoseGraph){const comps=connectedComponents(graph);const weights=graph.edges.map(e=>e.weight);const mean=weights.reduce((a,b)=>a+b,0)/(weights.length||1);return {nodes:graph.nodes.size,edges:graph.edges.length,components:comps.length,meanEdgeWeight:mean,connected:comps.length<=1}}
