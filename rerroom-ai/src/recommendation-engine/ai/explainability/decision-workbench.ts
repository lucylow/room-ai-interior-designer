import type {Recommendation,Insight,RoomContext,UserPreferences} from '../../core/types';
export interface DecisionExplanation{headline:string;why:string[];risks:string[];alternatives:string[];validation:string[];confidence:number;}

export const explainDecision=(r:Recommendation,room:RoomContext,prefs:UserPreferences,insights:Insight[]):DecisionExplanation=>{
  const why=[`Score ${(r.score*100).toFixed(0)}%`,`Expected impact ${(r.expectedImpact*100).toFixed(0)}%`,`Confidence ${(r.confidence*100).toFixed(0)}%`];
  if(prefs.priorities.includes(r.category))why.push(`Matches the ${r.category} priority.`);
  if(r.evidence.length)why.push(`${r.evidence.length} evidence item(s) support this recommendation.`);
  const risks=[...r.tradeoffs];
  if(room.measurements.confidence<.55)risks.push('Room measurements have limited confidence.');
  if(insights.some(i=>i.category===r.category&&i.severity==='high'))risks.push('A high-severity insight exists in the same category.');
  const validation=['Preview the proposed result in 2D.','Preview the proposed result in 3D.','Re-check measurements before purchase or construction.'];
  return {headline:r.title,why,risks,alternatives:r.alternatives.slice(0,4),validation,confidence:r.confidence};
};

export const explainInsight=(i:Insight)=>({headline:i.title,summary:i.summary,evidence:i.evidence.slice(0,6),nextStep:i.recommendedNextStep,confidence:i.confidence});

export const decisionReason1=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:1,signal:local,confidence:r.confidence,evidence,reason:`Reason 1: room context $2 contributes to the decision explanation.`};
};
export const decisionReason2=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:2,signal:local,confidence:r.confidence,evidence,reason:`Reason 2: room context $3 contributes to the decision explanation.`};
};
export const decisionReason3=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:3,signal:local,confidence:r.confidence,evidence,reason:`Reason 3: room context $4 contributes to the decision explanation.`};
};
export const decisionReason4=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:4,signal:local,confidence:r.confidence,evidence,reason:`Reason 4: room context $5 contributes to the decision explanation.`};
};
export const decisionReason5=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:5,signal:local,confidence:r.confidence,evidence,reason:`Reason 5: room context $6 contributes to the decision explanation.`};
};
export const decisionReason6=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:6,signal:local,confidence:r.confidence,evidence,reason:`Reason 6: room context $7 contributes to the decision explanation.`};
};
export const decisionReason7=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:7,signal:local,confidence:r.confidence,evidence,reason:`Reason 7: room context $1 contributes to the decision explanation.`};
};
export const decisionReason8=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:8,signal:local,confidence:r.confidence,evidence,reason:`Reason 8: room context $2 contributes to the decision explanation.`};
};
export const decisionReason9=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:9,signal:local,confidence:r.confidence,evidence,reason:`Reason 9: room context $3 contributes to the decision explanation.`};
};
export const decisionReason10=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:10,signal:local,confidence:r.confidence,evidence,reason:`Reason 10: room context $4 contributes to the decision explanation.`};
};
export const decisionReason11=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:11,signal:local,confidence:r.confidence,evidence,reason:`Reason 11: room context $5 contributes to the decision explanation.`};
};
export const decisionReason12=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:12,signal:local,confidence:r.confidence,evidence,reason:`Reason 12: room context $6 contributes to the decision explanation.`};
};
export const decisionReason13=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:13,signal:local,confidence:r.confidence,evidence,reason:`Reason 13: room context $7 contributes to the decision explanation.`};
};
export const decisionReason14=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:14,signal:local,confidence:r.confidence,evidence,reason:`Reason 14: room context $1 contributes to the decision explanation.`};
};
export const decisionReason15=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:15,signal:local,confidence:r.confidence,evidence,reason:`Reason 15: room context $2 contributes to the decision explanation.`};
};
export const decisionReason16=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:16,signal:local,confidence:r.confidence,evidence,reason:`Reason 16: room context $3 contributes to the decision explanation.`};
};
export const decisionReason17=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:17,signal:local,confidence:r.confidence,evidence,reason:`Reason 17: room context $4 contributes to the decision explanation.`};
};
export const decisionReason18=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:18,signal:local,confidence:r.confidence,evidence,reason:`Reason 18: room context $5 contributes to the decision explanation.`};
};
export const decisionReason19=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:19,signal:local,confidence:r.confidence,evidence,reason:`Reason 19: room context $6 contributes to the decision explanation.`};
};
export const decisionReason20=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:20,signal:local,confidence:r.confidence,evidence,reason:`Reason 20: room context $7 contributes to the decision explanation.`};
};
export const decisionReason21=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:21,signal:local,confidence:r.confidence,evidence,reason:`Reason 21: room context $1 contributes to the decision explanation.`};
};
export const decisionReason22=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:22,signal:local,confidence:r.confidence,evidence,reason:`Reason 22: room context $2 contributes to the decision explanation.`};
};
export const decisionReason23=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:23,signal:local,confidence:r.confidence,evidence,reason:`Reason 23: room context $3 contributes to the decision explanation.`};
};
export const decisionReason24=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:24,signal:local,confidence:r.confidence,evidence,reason:`Reason 24: room context $4 contributes to the decision explanation.`};
};
export const decisionReason25=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:25,signal:local,confidence:r.confidence,evidence,reason:`Reason 25: room context $5 contributes to the decision explanation.`};
};
export const decisionReason26=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:26,signal:local,confidence:r.confidence,evidence,reason:`Reason 26: room context $6 contributes to the decision explanation.`};
};
export const decisionReason27=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:27,signal:local,confidence:r.confidence,evidence,reason:`Reason 27: room context $7 contributes to the decision explanation.`};
};
export const decisionReason28=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:28,signal:local,confidence:r.confidence,evidence,reason:`Reason 28: room context $1 contributes to the decision explanation.`};
};
export const decisionReason29=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:29,signal:local,confidence:r.confidence,evidence,reason:`Reason 29: room context $2 contributes to the decision explanation.`};
};
export const decisionReason30=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:30,signal:local,confidence:r.confidence,evidence,reason:`Reason 30: room context $3 contributes to the decision explanation.`};
};
export const decisionReason31=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:31,signal:local,confidence:r.confidence,evidence,reason:`Reason 31: room context $4 contributes to the decision explanation.`};
};
export const decisionReason32=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:32,signal:local,confidence:r.confidence,evidence,reason:`Reason 32: room context $5 contributes to the decision explanation.`};
};
export const decisionReason33=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:33,signal:local,confidence:r.confidence,evidence,reason:`Reason 33: room context $6 contributes to the decision explanation.`};
};
export const decisionReason34=(r:Recommendation,room:RoomContext)=>{
  const local=(room.circulationScore+room.storageScore+room.visualBalanceScore+room.comfortScore)/4;
  const evidence=r.evidence.length;
  return {id:r.id,index:34,signal:local,confidence:r.confidence,evidence,reason:`Reason 34: room context $7 contributes to the decision explanation.`};
};
