
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatedecision_readiness(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(.5+concept.confidence*.45);
  const confidence=clamp(.78);
  return {id:`insight-decision-readiness`,kind:'tradeoff',title:'Decision readiness',summary:`Higher-confidence concepts provide stronger evidence for client comparison.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function carddecision_readiness(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatedecision_readiness(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
