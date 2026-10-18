import { PlacementCandidate, LayoutPlan, FurnitureSpec } from '../planning/types';

export interface BatchMove { placementId:string; from:{x:number;y:number;z:number}; to:{x:number;y:number;z:number}; score:number; reason:string; }
export interface BatchOptimization { moves:BatchMove[]; beforeScore:number; afterScore:number; iterations:number; accepted:boolean; }
function score(plan:LayoutPlan){
 const conflicts=plan.placements.reduce((n,p)=>n+p.conflicts.length,0); const spread=plan.placements.length<2?1:Math.min(1,plan.placements.reduce((s,a,i)=>s+(i?Math.hypot(a.position.x-plan.placements[i-1].position.x,a.position.z-plan.placements[i-1].position.z):0),0)/8);
 return Math.max(0,Math.min(1,.72-.16*conflicts+.16*spread));
}
export function optimizePlacementBatch(plan:LayoutPlan,catalog:FurnitureSpec[],maxIterations=8):BatchOptimization{
 const working:PlacementCandidate[]=plan.placements.map(p=>({...p,position:{...p.position}})); const before=score(plan); const moves:BatchMove[]=[];
 for(let iter=0;iter<maxIterations;iter++){
  let improved=false;
  for(const p of working){
   const candidates=[{x:p.position.x+.15,y:p.position.y,z:p.position.z},{x:p.position.x-.15,y:p.position.y,z:p.position.z},{x:p.position.x,y:p.position.y,z:p.position.z+.15},{x:p.position.x,y:p.position.y,z:p.position.z-.15}];
   let best={x:p.position.x,y:p.position.y,z:p.position.z}; let bestScore=score({ ...plan, placements:working });
   for(const c of candidates){ const original=p.position; p.position=c; const s=score({...plan,placements:working}); if(s>bestScore){best=c;bestScore=s;} p.position=original; }
   if(best.x!==p.position.x||best.z!==p.position.z){ const from={...p.position}; p.position=best; moves.push({placementId:p.id,from,to:best,score:bestScore,reason:'Reduce local conflict / improve spacing'}); improved=true; }
  }
  if(!improved) break;
 }
 const after=score({...plan,placements:working}); void catalog;
 return {moves,beforeScore:before,afterScore:after,iterations:Math.max(1,Math.min(maxIterations,moves.length+1)),accepted:after>=before};
}
