export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_recover:JourneyStep[]=[{name:'recover-entry',event:'recover_started',required:true},{name:'recover-validation',event:'recover_validated',required:true},{name:'recover-exit',event:'recover_completed',required:true}];
export function journeyEvents_recover(){return journey_recover.map(x=>x.event)}
export function journeyValid_recover(events:string[]){return journey_recover.every(step=>!step.required||events.includes(step.event))}
