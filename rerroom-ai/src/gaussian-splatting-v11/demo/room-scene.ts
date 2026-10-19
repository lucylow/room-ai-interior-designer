export interface RoomSceneRecord { id:string; label:string; weight:number; tags:string[]; }
export const ROOM_SCENE_LABELS = ["modern", "minimalist", "scandinavian", "industrial"] as const;
export const ROOM_SCENE_RECORDS = ROOM_SCENE_LABELS.map((label,index)=>({'id':`room_scene-${index}`,label,weight:0.55+index*0.08,tags:[label,'demo','3dgs','rroom']}));
export function getRoomSceneRecord(label:string) { return ROOM_SCENE_RECORDS.find(item=>item.label===label); }
export function scoreRoomScene(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topRoomScene(query:string,limit=3) {
  return [...ROOM_SCENE_RECORDS].sort((a,b)=>scoreRoomScene(b.label,query)-scoreRoomScene(a.label,query)).slice(0,limit);
}
export function normalizeRoomScene(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateRoomScene(label:string):boolean { return Boolean(getRoomSceneRecord(normalizeRoomScene(label))); }
export function weightRoomScene(label:string):number { return getRoomSceneRecord(normalizeRoomScene(label))?.weight ?? 0; }
export function describeRoomScene(label:string):string { const item=getRoomSceneRecord(normalizeRoomScene(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicRoomScene0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicRoomScene1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicRoomScene2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicRoomScene3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicRoomScene4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicRoomScene5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
