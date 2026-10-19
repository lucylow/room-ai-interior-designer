export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_repeat:JourneyStep[]=[{name:'repeat-entry',event:'repeat_started',required:true},{name:'repeat-validation',event:'repeat_validated',required:true},{name:'repeat-exit',event:'repeat_completed',required:true}];
export function journeyEvents_repeat(){return journey_repeat.map(x=>x.event)}
export function journeyValid_repeat(events:string[]){return journey_repeat.every(step=>!step.required||events.includes(step.event))}
