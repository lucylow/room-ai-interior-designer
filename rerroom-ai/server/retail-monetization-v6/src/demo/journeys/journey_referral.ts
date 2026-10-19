export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_referral:JourneyStep[]=[{name:'referral-entry',event:'referral_started',required:true},{name:'referral-validation',event:'referral_validated',required:true},{name:'referral-exit',event:'referral_completed',required:true}];
export function journeyEvents_referral(){return journey_referral.map(x=>x.event)}
export function journeyValid_referral(events:string[]){return journey_referral.every(step=>!step.required||events.includes(step.event))}
