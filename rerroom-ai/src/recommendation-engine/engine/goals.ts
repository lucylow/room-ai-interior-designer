import type {Goal,RoomContext,UserPreferences,Category} from '../core/types';
import {clamp} from '../core/math';
export const inferGoals=(room:RoomContext,prefs:UserPreferences):Goal[]=>{
 const goals:Goal[]=[];const add=(id:string,label:string,category:Category,target:number,importance:number,current?:number)=>goals.push({id,label,category,target,importance:clamp(importance),current});
 add('goal-flow','Improve circulation','layout',.82,.9,room.circulationScore);add('goal-light','Improve useful lighting','lighting',.8,.72,room.naturalLightScore);
 add('goal-storage','Reduce clutter and improve storage','storage',.78,.8,1-room.clutterScore);add('goal-comfort','Improve comfort','comfort',.8,.75,room.comfortScore);
 if(prefs.accessibilityPriority>.5)add('goal-access','Protect accessible movement','accessibility',.85,.8,room.accessibilityScore);
 if(prefs.sustainabilityPriority>.5)add('goal-sustain','Prefer durable/reusable choices','sustainability',.8,prefs.sustainabilityPriority,room.sustainabilityScore);
 for(const p of prefs.priorities.slice(0,4)){const category=p.toLowerCase() as Category;if(!goals.some(g=>g.category===category))add(`goal-pref-${p}`,`Priority: ${p}`,category,.8,.65);}
 return goals;
};
export const goalGap=(goal:Goal):number=>clamp(goal.target-(goal.current??.5));
