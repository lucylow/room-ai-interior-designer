import type {RoomContext} from '../../core/types';
export interface RoomPriority{domain:string;score:number;reason:string;}
export const roomPriority=(room:RoomContext):RoomPriority[]=>[{domain:'layout',score:1-room.circulationScore,reason:'Circulation gap'},{domain:'storage',score:1-room.storageScore,reason:'Storage gap'},{domain:'comfort',score:1-room.comfortScore,reason:'Comfort gap'},{domain:'workflow',score:1-room.workflowScore,reason:'Workflow gap'},{domain:'safety',score:1-room.safetyScore,reason:'Safety gap'},{domain:'accessibility',score:1-room.accessibilityScore,reason:'Accessibility gap'}].sort((a,b)=>b.score-a.score);
export const topRoomPriority=(room:RoomContext)=>roomPriority(room).slice(0,3);
