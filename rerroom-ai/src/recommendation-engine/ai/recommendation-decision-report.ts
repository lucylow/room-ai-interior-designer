import type { Recommendation, Insight, RoomContext, UserPreferences } from '../core/types';
import { clamp, round } from '../core/math';

export interface DecisionReport {
  roomId:string;
  roomName:string;
  generatedAt:number;
  recommendationCount:number;
  insightCount:number;
  confidence:number;
  priority:number;
  impact:number;
  effort:number;
  evidenceCoverage:number;
  strengths:string[];
  cautions:string[];
  nextActions:string[];
}

const effortScore=(value:Recommendation['effort']):number=>({tiny:.08,easy:.18,moderate:.32,large:.58,major:.82})[value];
const average=(values:number[]):number=>values.length?values.reduce((a,b)=>a+b,0)/values.length:0;

export const computeDecisionConfidence=(recs:Recommendation[],insights:Insight[],room:RoomContext):number=>{
  const recConfidence=average(recs.map(r=>r.confidence));
  const insightConfidence=average(insights.map(i=>i.confidence));
  const evidenceCoverage=recs.length?recs.filter(r=>r.evidence.length>=2).length/recs.length:0;
  const measurement=room.measurements.confidence;
  return clamp(recConfidence*.35+insightConfidence*.25+evidenceCoverage*.2+measurement*.2,0,1);
};

export const computeDecisionPriority=(recs:Recommendation[],prefs:UserPreferences):number=>{
  if(!recs.length)return 0;
  const urgency=average(recs.map(r=>r.expectedImpact));
  const preference=average(recs.map(r=>prefs.priorities.includes(r.category)?.9:.45));
  const safety=recs.some(r=>r.category==='safety')?.1:0;
  return clamp(urgency*.55+preference*.35+safety,0,1);
};

export const computeDecisionImpact=(recs:Recommendation[]):number=>clamp(average(recs.map(r=>r.expectedImpact)),0,1);

export const computeDecisionEffort=(recs:Recommendation[]):number=>clamp(average(recs.map(r=>effortScore(r.effort))),0,1);

export const computeEvidenceCoverage=(recs:Recommendation[]):number=>{
  if(!recs.length)return 0;
  const supported=recs.filter(r=>r.evidence.length>0).length;
  return supported/recs.length;
};

export const buildStrengths=(room:RoomContext,recs:Recommendation[]):string[]=>{
  const strengths:string[]=[];
  if(room.safetyScore>=.75)strengths.push('Safety signal is relatively strong.');
  if(room.accessibilityScore>=.75)strengths.push('Accessibility signal is relatively strong.');
  if(room.circulationScore>=.75)strengths.push('Circulation signal is relatively strong.');
  if(recs.some(r=>r.confidence>=.8))strengths.push('At least one recommendation has high model confidence.');
  if(recs.some(r=>r.evidence.length>=3))strengths.push('At least one recommendation has multiple evidence items.');
  return strengths.slice(0,6);
};

export const buildCautions=(room:RoomContext,recs:Recommendation[],insights:Insight[]):string[]=>{
  const cautions:string[]=[];
  if(room.measurements.confidence<.5)cautions.push('Measurements are uncertain; use visualization for validation.');
  if(recs.some(r=>r.confidence<.5))cautions.push('Some recommendations have low confidence.');
  if(insights.some(i=>i.severity==='high'||i.severity==='critical'))cautions.push('High-severity room signals need attention before optional upgrades.');
  if(recs.some(r=>(r.estimatedCost??0)>5000))cautions.push('Some suggestions carry meaningful modeled cost.');
  return cautions.slice(0,8);
};

export const buildNextActions=(recs:Recommendation[],insights:Insight[]):string[]=>{
  const actions:string[]=[];
  const topRec=recs.slice().sort((a,b)=>b.expectedImpact-a.expectedImpact)[0];
  const topInsight=insights.slice().sort((a,b)=>b.confidence-a.confidence)[0];
  if(topInsight?.recommendedNextStep)actions.push(topInsight.recommendedNextStep);
  if(topRec)actions.push(`Preview: ${topRec.title}`);
  actions.push('Compare at least one alternative before committing.');
  actions.push('Re-check dimensions before shopping or construction.');
  return [...new Set(actions)].slice(0,6);
};

export const buildDecisionReport=(room:RoomContext,recs:Recommendation[],insights:Insight[],prefs:UserPreferences):DecisionReport=>{
  const confidence=computeDecisionConfidence(recs,insights,room);
  const priority=computeDecisionPriority(recs,prefs);
  const impact=computeDecisionImpact(recs);
  const effort=computeDecisionEffort(recs);
  const evidenceCoverage=computeEvidenceCoverage(recs);
  return {
    roomId:room.roomId,
    roomName:room.name,
    generatedAt:Date.now(),
    recommendationCount:recs.length,
    insightCount:insights.length,
    confidence:round(confidence,3),
    priority:round(priority,3),
    impact:round(impact,3),
    effort:round(effort,3),
    evidenceCoverage:round(evidenceCoverage,3),
    strengths:buildStrengths(room,recs),
    cautions:buildCautions(room,recs,insights),
    nextActions:buildNextActions(recs,insights)
  };
};

export const decisionReportText=(report:DecisionReport):string=>[
  report.roomName,
  `Confidence ${(report.confidence*100).toFixed(0)}%.`,
  `Priority ${(report.priority*100).toFixed(0)}%.`,
  `Expected impact ${(report.impact*100).toFixed(0)}%.`,
  `Evidence coverage ${(report.evidenceCoverage*100).toFixed(0)}%.`,
  report.strengths.join(' '),
  report.cautions.join(' '),
  report.nextActions.join(' ')
].filter(Boolean).join(' ');

export const decisionReportReady=(report:DecisionReport):boolean=>report.confidence>=.55&&report.evidenceCoverage>=.5;

export const decisionReportBand=(report:DecisionReport):'high'|'moderate'|'low'=>report.confidence>=.8?'high':report.confidence>=.6?'moderate':'low';

export const decisionReportSnapshot=(report:DecisionReport)=>({
  roomId:report.roomId,
  recommendationCount:report.recommendationCount,
  insightCount:report.insightCount,
  confidence:report.confidence,
  priority:report.priority,
  impact:report.impact,
  effort:report.effort,
  evidenceCoverage:report.evidenceCoverage
});

// Reusable scoring helpers for UI, demos, analytics, offline evaluation, and native adapters.
export const reportStrengthCount=(report:DecisionReport)=>report.strengths.length;
export const reportCautionCount=(report:DecisionReport)=>report.cautions.length;
export const reportActionCount=(report:DecisionReport)=>report.nextActions.length;
export const reportNetSignal=(report:DecisionReport)=>clamp(report.impact*.55+report.priority*.25+report.confidence*.2-report.effort*.1,0,1);
export const reportUrgency=(report:DecisionReport)=>clamp(report.priority*.7+reportCautionCount(report)*.04,0,1);
export const reportDecisionReadiness=(report:DecisionReport)=>clamp(report.confidence*.45+report.evidenceCoverage*.3+(1-report.effort)*.1+(1-reportUrgency(report))*.15,0,1);

// The remaining small helpers intentionally expose stable primitives instead of tying callers to a UI framework.
export const reportCompare=(a:DecisionReport,b:DecisionReport)=>({confidenceDelta:a.confidence-b.confidence,priorityDelta:a.priority-b.priority,impactDelta:a.impact-b.impact,evidenceDelta:a.evidenceCoverage-b.evidenceCoverage});
export const reportNeedsMoreEvidence=(report:DecisionReport)=>report.evidenceCoverage<.55||report.confidence<.55;
export const reportNeedsVisualization=(report:DecisionReport)=>report.impact>.4||report.effort>.35;
export const reportNeedsBudgetReview=(report:DecisionReport,threshold=.35)=>report.priority>threshold&&report.effort>.4;
export const reportHeadline=(report:DecisionReport)=>report.cautions.length?`${report.roomName}: compare carefully before acting`:`${report.roomName}: ready for visual comparison`;
export const reportMetricRows=(report:DecisionReport)=>[
  {key:'confidence',label:'AI confidence',value:report.confidence},
  {key:'priority',label:'AI priority',value:report.priority},
  {key:'impact',label:'Expected impact',value:report.impact},
  {key:'effort',label:'Effort',value:report.effort},
  {key:'evidence',label:'Evidence coverage',value:report.evidenceCoverage}
];

export const mergeReports=(reports:DecisionReport[]):DecisionReport|null=>{
  if(!reports.length)return null;
  return {
    roomId:reports[0].roomId,
    roomName:reports[0].roomName,
    generatedAt:Math.max(...reports.map(r=>r.generatedAt)),
    recommendationCount:reports.reduce((s,r)=>s+r.recommendationCount,0),
    insightCount:reports.reduce((s,r)=>s+r.insightCount,0),
    confidence:average(reports.map(r=>r.confidence)),
    priority:average(reports.map(r=>r.priority)),
    impact:average(reports.map(r=>r.impact)),
    effort:average(reports.map(r=>r.effort)),
    evidenceCoverage:average(reports.map(r=>r.evidenceCoverage)),
    strengths:[...new Set(reports.flatMap(r=>r.strengths))].slice(0,10),
    cautions:[...new Set(reports.flatMap(r=>r.cautions))].slice(0,10),
    nextActions:[...new Set(reports.flatMap(r=>r.nextActions))].slice(0,10)
  };
};

export const normalizeReport=(report:DecisionReport):DecisionReport=>({...report,confidence:clamp(report.confidence,0,1),priority:clamp(report.priority,0,1),impact:clamp(report.impact,0,1),effort:clamp(report.effort,0,1),evidenceCoverage:clamp(report.evidenceCoverage,0,1)});

// Stable labels make analytics and snapshot tests independent of human-readable copy.
export const reportLabels={confidence:'confidence',priority:'priority',impact:'impact',effort:'effort',evidenceCoverage:'evidence_coverage'} as const;
