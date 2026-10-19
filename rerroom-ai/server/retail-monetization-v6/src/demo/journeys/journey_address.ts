export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_address:JourneyStep[]=[{name:'address-entry',event:'address_started',required:true},{name:'address-validation',event:'address_validated',required:true},{name:'address-exit',event:'address_completed',required:true}];
export function journeyEvents_address(){return journey_address.map(x=>x.event)}
export function journeyValid_address(events:string[]){return journey_address.every(step=>!step.required||events.includes(step.event))}
