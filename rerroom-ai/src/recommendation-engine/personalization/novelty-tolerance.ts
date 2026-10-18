import type {UserPreferences} from '../core/types';
export const noveltyTolerance=(prefs:UserPreferences)=>{const horizon=({now:.15,soon:.28,later:.48,exploring:.72} as Record<string,number>)[prefs.renovationHorizon];const maintenance=({low:-.12,medium:0,high:.1} as Record<string,number>)[prefs.maintenanceTolerance];return Math.max(0,Math.min(1,horizon+maintenance));};
