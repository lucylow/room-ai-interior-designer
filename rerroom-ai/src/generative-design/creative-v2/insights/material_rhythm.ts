
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatematerial_rhythm(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(.45+concept.materials.length*.04);
  const confidence=clamp(.68);
  return {id:`insight-material-rhythm`,kind:'style',title:'Material rhythm',summary:`Repeated materials create visual continuity across surfaces.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardmaterial_rhythm(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatematerial_rhythm(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
