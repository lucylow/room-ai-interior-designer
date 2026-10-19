export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_cart:JourneyStep[]=[{name:'cart-entry',event:'cart_started',required:true},{name:'cart-validation',event:'cart_validated',required:true},{name:'cart-exit',event:'cart_completed',required:true}];
export function journeyEvents_cart(){return journey_cart.map(x=>x.event)}
export function journeyValid_cart(events:string[]){return journey_cart.every(step=>!step.required||events.includes(step.event))}
