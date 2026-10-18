import type {RoomContext} from '../../core/types';
export interface FocusArea{key:string;score:number;priority:number;action:string;}
export const focusAreas=(room:RoomContext):FocusArea[]=>roomScoreAreas(room).map(x=>({...x,priority:1-x.score})).sort((a,b)=>b.priority-a.priority).slice(0,5);
const roomScoreAreas=(room:RoomContext)=>[{key:'layout',score:room.circulationScore,action:'Test an alternate furniture arrangement.'},{key:'storage',score:room.storageScore,action:'Add concealed or multi-use storage.'},{key:'comfort',score:room.comfortScore,action:'Improve seating, lighting, or acoustic support.'},{key:'workflow',score:room.workflowScore,action:'Reduce unnecessary task-path crossings.'},{key:'balance',score:room.visualBalanceScore,action:'Compare visual mass distribution.'}];
