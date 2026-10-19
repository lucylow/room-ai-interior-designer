export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_delivery:JourneyStep[]=[{name:'delivery-entry',event:'delivery_started',required:true},{name:'delivery-validation',event:'delivery_validated',required:true},{name:'delivery-exit',event:'delivery_completed',required:true}];
export function journeyEvents_delivery(){return journey_delivery.map(x=>x.event)}
export function journeyValid_delivery(events:string[]){return journey_delivery.every(step=>!step.required||events.includes(step.event))}
