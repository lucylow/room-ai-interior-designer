export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_refund:JourneyStep[]=[{name:'refund-entry',event:'refund_started',required:true},{name:'refund-validation',event:'refund_validated',required:true},{name:'refund-exit',event:'refund_completed',required:true}];
export function journeyEvents_refund(){return journey_refund.map(x=>x.event)}
export function journeyValid_refund(events:string[]){return journey_refund.every(step=>!step.required||events.includes(step.event))}
