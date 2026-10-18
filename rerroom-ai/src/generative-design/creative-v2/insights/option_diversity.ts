
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluateoption_diversity(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(.5+concept.furniture.length*.02);
  const confidence=clamp(.61);
  return {id:`insight-option-diversity`,kind:'trend',title:'Option diversity',summary:`A healthy option set varies one or two dimensions while keeping the scene recognizable.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardoption_diversity(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluateoption_diversity(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
