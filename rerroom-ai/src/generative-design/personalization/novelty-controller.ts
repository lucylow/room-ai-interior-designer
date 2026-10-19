import type {DesignConcept,DesignFeedback} from '../core/types';
import {clamp} from '../core/utils';
export interface NoveltyControllerState{signal:number;notes:string[];}
export const updateNoveltyController=(rows:DesignFeedback[],concepts:DesignConcept[]):NoveltyControllerState=>{
 const accepted=rows.filter(r=>r.action==='accept'||r.action==='save').length; const rejected=rows.filter(r=>r.action==='reject').length;
 const signal=clamp(.5+(accepted-rejected)/Math.max(3,rows.length*2));
 return {signal,notes:[`Acceptance signal ${signal.toFixed(2)}`,`Known concepts ${concepts.length}`,`Feedback rows ${rows.length}`]};
};
