export interface RoomZonesRecord { id:string; label:string; weight:number; tags:string[]; }
export const ROOM_ZONES_LABELS = ["circulation", "focal", "storage", "daylight", "work"] as const;
export const ROOM_ZONES_RECORDS = ROOM_ZONES_LABELS.map((label,index)=>({'id':`room_zones-${index}`,label,weight:0.55+index*0.08,tags:[label,'scene','3dgs','rroom']}));
export function getRoomZonesRecord(label:string) { return ROOM_ZONES_RECORDS.find(item=>item.label===label); }
export function scoreRoomZones(value:string,query:string):number {
  const a=value.toLowerCase(),b=query.toLowerCase();
  if(a===b)return 1;
  if(a.includes(b)||b.includes(a))return 0.7;
  return 0.2;
}
export function topRoomZones(query:string,limit=3) {
  return [...ROOM_ZONES_RECORDS].sort((a,b)=>scoreRoomZones(b.label,query)-scoreRoomZones(a.label,query)).slice(0,limit);
}
export function normalizeRoomZones(label:string):string { return label.trim().toLowerCase().replace(/\s+/g,'-'); }
export function validateRoomZones(label:string):boolean { return Boolean(getRoomZonesRecord(normalizeRoomZones(label))); }
export function weightRoomZones(label:string):number { return getRoomZonesRecord(normalizeRoomZones(label))?.weight ?? 0; }
export function describeRoomZones(label:string):string { const item=getRoomZonesRecord(normalizeRoomZones(label)); return item ? `${item.label} ({item.weight.toFixed(2)})` : 'unknown'; }
export function heuristicRoomZones0(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.4*y+0.2));
}
export function heuristicRoomZones1(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.5*y+0.3));
}
export function heuristicRoomZones2(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.6*y+0.4));
}
export function heuristicRoomZones3(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.7*y+0.5));
}
export function heuristicRoomZones4(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.8*y+0.6));
}
export function heuristicRoomZones5(x:number):number {
  const y=Math.max(0,Math.min(1,x));
  return Math.max(0,Math.min(1,0.9*y+0.7));
}
