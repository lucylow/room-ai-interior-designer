export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_analytics:JourneyStep[]=[{name:'analytics-entry',event:'analytics_started',required:true},{name:'analytics-validation',event:'analytics_validated',required:true},{name:'analytics-exit',event:'analytics_completed',required:true}];
export function journeyEvents_analytics(){return journey_analytics.map(x=>x.event)}
export function journeyValid_analytics(events:string[]){return journey_analytics.every(step=>!step.required||events.includes(step.event))}
