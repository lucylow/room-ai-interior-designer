
import type {DesignConcept,DesignInsight,RoomContext} from '../../core/types';
import type {CreativeInsightCard} from '../types';
import {clamp} from '../../core/utils';

export function evaluatefocal_hierarchy(room:RoomContext,concept:DesignConcept):DesignInsight{
  const metric=clamp(.45+concept.visualKeywords.filter(x=>/focal|anchor|feature/i.test(x)).length*.08);
  const confidence=clamp(.71);
  return {id:`insight-focal-hierarchy`,kind:'layout',title:'Focal hierarchy',summary:`A clear focal hierarchy makes generated images easier to read.`,metric,unit:'score',confidence,evidence:[`room=${room.roomId}`,`concept=${concept.id}`,`style=${concept.styleId}`,`palette=${concept.paletteId??'none'}`],actions:['Compare this signal with another variant','Use the 2D plan before approving changes']};
}

export function cardfocal_hierarchy(room:RoomContext,concept:DesignConcept):CreativeInsightCard{
  const insight=evaluatefocal_hierarchy(room,concept);
  return {id:insight.id,kind:insight.kind,title:insight.title,summary:insight.summary,metric:insight.metric,unit:insight.unit,confidence:insight.confidence,actions:insight.actions,evidence:insight.evidence};
}
