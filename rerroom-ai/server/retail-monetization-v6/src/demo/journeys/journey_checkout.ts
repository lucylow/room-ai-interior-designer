export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_checkout:JourneyStep[]=[{name:'checkout-entry',event:'checkout_started',required:true},{name:'checkout-validation',event:'checkout_validated',required:true},{name:'checkout-exit',event:'checkout_completed',required:true}];
export function journeyEvents_checkout(){return journey_checkout.map(x=>x.event)}
export function journeyValid_checkout(events:string[]){return journey_checkout.every(step=>!step.required||events.includes(step.event))}
