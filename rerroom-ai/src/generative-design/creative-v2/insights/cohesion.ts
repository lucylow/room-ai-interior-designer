
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatecohesion(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp((concept.score+concept.confidence)/2);
  const confidence=clamp(.76);
  return {id:`insight-cohesion`,kind:'style',title:'Whole-concept cohesion',summary:`Style, palette and layout are scored together instead of independently.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardcohesion(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatecohesion(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
