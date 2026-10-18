import type {RoomContext,Insight,Recommendation} from '../core/types';
import {clamp} from '../core/math';

export interface InsightWorkbenchRow{id:string;category:string;severity:string;salience:number;confidence:number;actionability:number;}
export interface InsightDigest{top:InsightWorkbenchRow[];averageConfidence:number;actionability:number;}

const severityWeight:Record<string,number>={info:.2,low:.35,medium:.58,high:.82,critical:1};

export const scoreInsight=(insight:Insight):InsightWorkbenchRow=>{
  const severity=severityWeight[insight.severity]??.2;
  const actionability=Math.min(1,(insight.recommendedNextStep?.length??0)/100+insight.evidence.length*.08);
  const salience=clamp(severity*.5+insight.confidence*.3+(insight.metric??.5)*.2,0,1);
  return {id:insight.id,category:insight.category,severity:insight.severity,salience,confidence:insight.confidence,actionability};
};

export const scoreInsights=(rows:Insight[])=>rows.map(scoreInsight).sort((a,b)=>b.salience-a.salience);

export const digestInsights=(rows:Insight[]):InsightDigest=>{const scored=scoreInsights(rows);const averageConfidence=scored.length?scored.reduce((s,r)=>s+r.confidence,0)/scored.length:0;const actionability=scored.length?scored.reduce((s,r)=>s+r.actionability,0)/scored.length:0;return {top:scored.slice(0,8),averageConfidence,actionability};};

export const attachRecommendations=(insights:Insight[],recs:Recommendation[])=>insights.map(i=>({...i,relatedRecommendationIds:recs.filter(r=>r.category===i.category).slice(0,4).map(r=>r.id)}));

export const roomInsightOverview=(room:RoomContext,insights:Insight[])=>{const d=digestInsights(insights);return {roomId:room.roomId,roomName:room.name,insightCount:insights.length,topInsight:d.top[0]?.id,averageConfidence:d.averageConfidence,actionability:d.actionability};};

export const insightUtility1=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility2=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility3=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
export const insightUtility4=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(0)*.005,0,1);
};
export const insightUtility5=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility6=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility7=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
export const insightUtility8=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(0)*.005,0,1);
};
export const insightUtility9=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility10=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility11=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
export const insightUtility12=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(0)*.005,0,1);
};
export const insightUtility13=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility14=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility15=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
export const insightUtility16=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(0)*.005,0,1);
};
export const insightUtility17=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility18=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility19=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
export const insightUtility20=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(0)*.005,0,1);
};
export const insightUtility21=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility22=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility23=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
export const insightUtility24=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(0)*.005,0,1);
};
export const insightUtility25=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility26=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility27=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
export const insightUtility28=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(0)*.005,0,1);
};
export const insightUtility29=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility30=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility31=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
export const insightUtility32=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(0)*.005,0,1);
};
export const insightUtility33=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(1)*.005,0,1);
};
export const insightUtility34=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(2)*.005,0,1);
};
export const insightUtility35=(insight:Insight,room:RoomContext)=>{
  const base=scoreInsight(insight);
  const roomContext=clamp((room.visualBalanceScore+room.circulationScore+room.comfortScore)/3,0,1);
  return clamp(base.salience*.72+roomContext*.1+(base.actionability*.12)+(3)*.005,0,1);
};
