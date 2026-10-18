import type {Recommendation} from '../core/types';
import {overlap} from '../core/text';
export const similarity=(a:Recommendation,b:Recommendation):number=>{
  const title=overlap(a.title.split(/\s+/),b.title.split(/\s+/));
  const tags=overlap(a.tags,b.tags); return title*.7+tags*.3;
};
export const dedupe=(items:Recommendation[],threshold=.72):Recommendation[]=>{const out:Recommendation[]=[];for(const item of items){if(!out.some(x=>similarity(x,item)>=threshold))out.push(item);}return out;};
