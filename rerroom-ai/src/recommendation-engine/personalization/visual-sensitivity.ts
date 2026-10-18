import type {UserPreferences,RoomContext} from '../core/types';
export const visualSensitivity=(prefs:UserPreferences,room:RoomContext)=>Math.max(0,Math.min(1,.35+prefs.dislikes.length*.035+(1-room.clutterScore)*.15));
