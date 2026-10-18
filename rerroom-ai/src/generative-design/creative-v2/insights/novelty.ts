
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatenovelty(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(.45+Math.min(.5,concept.visualKeywords.length/40));
  const confidence=clamp(.64);
  return {id:`insight-novelty`,kind:'trend',title:'Creative novelty',summary:`The concept introduces visible change without requiring structural edits.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardnovelty(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatenovelty(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
