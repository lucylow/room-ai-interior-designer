export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_commission:JourneyStep[]=[{name:'commission-entry',event:'commission_started',required:true},{name:'commission-validation',event:'commission_validated',required:true},{name:'commission-exit',event:'commission_completed',required:true}];
export function journeyEvents_commission(){return journey_commission.map(x=>x.event)}
export function journeyValid_commission(events:string[]){return journey_commission.every(step=>!step.required||events.includes(step.event))}
