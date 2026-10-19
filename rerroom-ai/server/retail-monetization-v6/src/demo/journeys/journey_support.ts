export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_support:JourneyStep[]=[{name:'support-entry',event:'support_started',required:true},{name:'support-validation',event:'support_validated',required:true},{name:'support-exit',event:'support_completed',required:true}];
export function journeyEvents_support(){return journey_support.map(x=>x.event)}
export function journeyValid_support(events:string[]){return journey_support.every(step=>!step.required||events.includes(step.event))}
