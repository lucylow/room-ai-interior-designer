
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluateprompt_coverage(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(.45+concept.nextPrompts.length*.06);
  const confidence=clamp(.65);
  return {id:`insight-prompt-coverage`,kind:'opportunity',title:'Prompt coverage',summary:`The concept retains explicit follow-up controls for iterative refinement.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardprompt_coverage(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluateprompt_coverage(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
