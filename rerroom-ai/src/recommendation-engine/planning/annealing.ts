import type { RoomContext, Scenario } from '../core/types';
import { simulate } from '../engine/simulation';
export interface AnnealOptions { iterations:number; temperature:number; cooling:number; seed:number; targetId:string; step:number; }
interface State { scenario:Scenario; r:ReturnType<typeof simulate>; score:number; }
const makeState=(room:RoomContext,scenario:Scenario):State=>{const r=simulate(room,scenario);return {scenario,r,score:r.circulation+(r.valid?15:0)-r.overlap};};
export const anneal=(room:RoomContext,base:Scenario,o:AnnealOptions):State=>{
  let seed=o.seed>>>0;
  const rand=()=>{seed=(seed*1103515245+12345)>>>0;return seed/4294967296;};
  let current=makeState(room,base); let best=current; let temperature=o.temperature;
  for(let i=0;i<o.iterations;i++){
    const candidate:Scenario={...base,id:`${base.id}-sa-${i}`,deltas:[...base.deltas,{objectId:o.targetId,moveX:(rand()-.5)*o.step,moveZ:(rand()-.5)*o.step}],expectedOutcome:'Explore alternate object position'};
    const next=makeState(room,candidate); const delta=next.score-current.score;
    if(delta>0 || Math.exp(delta/Math.max(.001,temperature))>rand()) current=next;
    if(current.score>best.score) best=current;
    temperature*=o.cooling;
  }
  return best;
};
