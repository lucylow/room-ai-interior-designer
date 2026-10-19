export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_abandon:JourneyStep[]=[{name:'abandon-entry',event:'abandon_started',required:true},{name:'abandon-validation',event:'abandon_validated',required:true},{name:'abandon-exit',event:'abandon_completed',required:true}];
export function journeyEvents_abandon(){return journey_abandon.map(x=>x.event)}
export function journeyValid_abandon(events:string[]){return journey_abandon.every(step=>!step.required||events.includes(step.event))}
