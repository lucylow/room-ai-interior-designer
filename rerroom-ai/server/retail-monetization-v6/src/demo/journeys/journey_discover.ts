export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_discover:JourneyStep[]=[{name:'discover-entry',event:'discover_started',required:true},{name:'discover-validation',event:'discover_validated',required:true},{name:'discover-exit',event:'discover_completed',required:true}];
export function journeyEvents_discover(){return journey_discover.map(x=>x.event)}
export function journeyValid_discover(events:string[]){return journey_discover.every(step=>!step.required||events.includes(step.event))}
