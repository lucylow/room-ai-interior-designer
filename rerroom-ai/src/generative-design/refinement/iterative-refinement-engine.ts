import type {DesignConcept,DesignIntent,DesignFeedback,RoomContext,DesignStyleId} from '../core/types';
import {STYLE_BY_ID} from '../styles';
import {PALETTE_BY_ID} from '../palettes';
import {diffConcept} from './refinement-diff';
import {buildConcept} from '../generation/concept-builder';
export class IterativeRefinementEngine{
 refine(room:RoomContext,intent:DesignIntent,base:DesignConcept,feedback:DesignFeedback):DesignConcept{
  const diff=diffConcept(base,feedback); const styleId=(feedback.styleOverride??base.styleId) as DesignStyleId; const style=STYLE_BY_ID[styleId];
  const palette=PALETTE_BY_ID[feedback.paletteOverride??base.paletteId??Object.keys(PALETTE_BY_ID)[0]];
  const next=buildConcept(room,intent,style,palette,base.layout,base.furniture,Math.max(.25,base.score+.01),feedback.createdAt,99);
  return {...next,id:`${base.id}-r${feedback.createdAt}`,title:`${next.title} · Refined`,conceptText:`${next.conceptText} ${diff.summary} ${diff.preserved.join(', ')} stay anchored.`};
 }
}
