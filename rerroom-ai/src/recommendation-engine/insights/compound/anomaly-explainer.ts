import type {Insight} from '../../core/types';
export interface AnomalyExplanation{id:string;severity:string;reason:string;possibleCause:string;nextStep:string;}
export const explainAnomalies=(rows:Insight[]):AnomalyExplanation[]=>rows.filter(i=>i.severity==='high'||(i.metric??0)<.3).map(i=>({id:i.id,severity:i.severity,reason:i.summary,possibleCause:i.evidence.map(e=>e.label).join(', ')||'Sparse evidence',nextStep:i.recommendedNextStep??'Collect another observation.'}));
