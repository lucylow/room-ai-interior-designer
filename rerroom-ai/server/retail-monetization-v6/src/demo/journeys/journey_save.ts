export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_save:JourneyStep[]=[{name:'save-entry',event:'save_started',required:true},{name:'save-validation',event:'save_validated',required:true},{name:'save-exit',event:'save_completed',required:true}];
export function journeyEvents_save(){return journey_save.map(x=>x.event)}
export function journeyValid_save(events:string[]){return journey_save.every(step=>!step.required||events.includes(step.event))}
