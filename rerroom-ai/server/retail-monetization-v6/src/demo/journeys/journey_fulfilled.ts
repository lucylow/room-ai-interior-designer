export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_fulfilled:JourneyStep[]=[{name:'fulfilled-entry',event:'fulfilled_started',required:true},{name:'fulfilled-validation',event:'fulfilled_validated',required:true},{name:'fulfilled-exit',event:'fulfilled_completed',required:true}];
export function journeyEvents_fulfilled(){return journey_fulfilled.map(x=>x.event)}
export function journeyValid_fulfilled(events:string[]){return journey_fulfilled.every(step=>!step.required||events.includes(step.event))}
