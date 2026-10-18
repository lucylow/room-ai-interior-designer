
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatevisual_weight(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(room.visualBalanceScore+.05);
  const confidence=clamp(.74);
  return {id:`insight-visual-weight`,kind:'balance',title:'Visual weight',summary:`Large masses should counterbalance one another rather than cluster.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardvisual_weight(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatevisual_weight(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
