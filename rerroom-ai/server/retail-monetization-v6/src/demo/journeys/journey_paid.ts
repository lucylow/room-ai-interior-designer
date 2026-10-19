export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_paid:JourneyStep[]=[{name:'paid-entry',event:'paid_started',required:true},{name:'paid-validation',event:'paid_validated',required:true},{name:'paid-exit',event:'paid_completed',required:true}];
export function journeyEvents_paid(){return journey_paid.map(x=>x.event)}
export function journeyValid_paid(events:string[]){return journey_paid.every(step=>!step.required||events.includes(step.event))}
