export interface JourneyStep{name:string;event:string;required:boolean}
export const journey_review:JourneyStep[]=[{name:'review-entry',event:'review_started',required:true},{name:'review-validation',event:'review_validated',required:true},{name:'review-exit',event:'review_completed',required:true}];
export function journeyEvents_review(){return journey_review.map(x=>x.event)}
export function journeyValid_review(events:string[]){return journey_review.every(step=>!step.required||events.includes(step.event))}
