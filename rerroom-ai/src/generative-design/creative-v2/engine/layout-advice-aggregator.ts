
import type {LayoutAdvice,RoomContext} from '../../core/types';
import type {CreativeSignal} from '../types';
import {clamp} from '../../core/utils';
import {adviseLivingRoom} from '../../layout/living_room-advisor';
import {adviseBedroom} from '../../layout/bedroom-advisor';
import {adviseKitchen} from '../../layout/kitchen-advisor';
import {adviseDiningRoom} from '../../layout/dining_room-advisor';
import {adviseOffice} from '../../layout/office-advisor';
import {adviseBathroom} from '../../layout/bathroom-advisor';
import {adviseEntryway} from '../../layout/entryway-advisor';
import {adviseNursery} from '../../layout/nursery-advisor';
import {adviseStudio} from '../../layout/studio-advisor';
import {adviseOther} from '../../layout/other-advisor';

function legacy(room:RoomContext):LayoutAdvice[]{
 const args:any={priorities:['flow','comfort','style']};
 switch(room.roomType){case 'living-room':return adviseLivingRoom(room,args);case 'bedroom':return adviseBedroom(room,args);case 'kitchen':return adviseKitchen(room,args);case 'dining-room':return adviseDiningRoom(room,args);case 'office':return adviseOffice(room,args);case 'bathroom':return adviseBathroom(room,args);case 'entryway':return adviseEntryway(room,args);case 'nursery':return adviseNursery(room,args);case 'studio':return adviseStudio(room,args);default:return adviseOther(room,args);}
}
export function aggregateLayoutAdvice(room:RoomContext):LayoutAdvice[]{
 const raw=legacy(room);return raw.map((x,i)=>({...x,id:`creative-${x.id??i}`,score:clamp(x.score*.8+room.visualBalanceScore*.1+room.circulationScore*.1),confidence:clamp(x.confidence*.7+room.circulationScore*.2)})).sort((a,b)=>b.score-a.score);
}
export function layoutSignals(room:RoomContext):CreativeSignal[]{
 const advice=aggregateLayoutAdvice(room)[0];if(!advice)return [];
 return [{id:'layout-top-flow',label:'Top layout score',score:advice.score,confidence:advice.confidence,source:'layout-engine',explanation:advice.rationale},{id:'layout-circulation',label:'Circulation',score:room.circulationScore,confidence:.84,source:'room-measurements',explanation:'Measured circulation score from the room state.'},{id:'layout-clutter',label:'Clutter risk',score:1-room.clutterScore,confidence:.78,source:'room-signals',explanation:'Lower clutter increases layout legibility.'}];
}
