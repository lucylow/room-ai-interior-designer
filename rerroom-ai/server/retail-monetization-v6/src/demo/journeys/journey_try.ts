export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_try:JourneyStep[]=[{name:'try-entry',event:'try_started',required:true},{name:'try-validation',event:'try_validated',required:true},{name:'try-exit',event:'try_completed',required:true}];
export function journeyEvents_try(){return journey_try.map(x=>x.event)}
export function journeyValid_try(events:string[]){return journey_try.every(step=>!step.required||events.includes(step.event))}
