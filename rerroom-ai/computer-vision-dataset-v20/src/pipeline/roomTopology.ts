export interface RoomtopologyInput { id:string; features:number[]; confidence:number }
export interface RoomtopologyOutput { score:number; confidence:number; status:'pass'|'review'|'fallback'; reasons:string[] }
export function runRoomtopology(input:RoomtopologyInput):RoomtopologyOutput {
  const mean=input.features.length?input.features.reduce((a,b)=>a+b,0)/input.features.length:0;
  const score=Math.max(0,Math.min(1,input.confidence*.72+Math.min(1,Math.abs(mean))*.28));
  const status=score>.8?'pass':score>.55?'review':'fallback';
  return {score,confidence:score,status,reasons:['build room graph and opening topology',status==='pass'?'sufficient evidence':'additional evidence recommended']};
}
