
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluateaccent_discipline(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(1-Math.abs((concept.materials.length%5)-2)/5);
  const confidence=clamp(.70);
  return {id:`insight-accent-discipline`,kind:'color',title:'Accent discipline',summary:`Accent use is strongest when concentrated in a small number of roles.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardaccent_discipline(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluateaccent_discipline(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
