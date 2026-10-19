import {DatasetRecord} from '../core/types';
export function corpusSummary(records:DatasetRecord[]){
  const byRoom:Record<string,number>={}, byObject:Record<string,number>={}, byHardCase:Record<string,number>={};
  for(const r of records){byRoom[r.room.roomType]=(byRoom[r.room.roomType]||0)+1;for(const o of r.objects)byObject[o.className]=(byObject[o.className]||0)+1;for(const t of r.hardCase?.tags||[])byHardCase[t]=(byHardCase[t]||0)+1;}
  return {records:records.length,byRoom,byObject,byHardCase};
}
