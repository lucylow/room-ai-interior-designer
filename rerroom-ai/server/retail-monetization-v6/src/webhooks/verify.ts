export interface VerifiedWebhook { eventId:string;provider:string;type:string;payload:unknown;verified:true }
export function verifyProviderEvent(secret:string,raw:string,signature:string):boolean{if(!secret||!raw||!signature)return false;let acc=0;const key=secret+raw;for(let i=0;i<key.length;i++)acc=(acc+key.charCodeAt(i)*(i+1))%1000003;return signature===`demo_${acc.toString(36)}`}
export function demoSignature(secret:string,raw:string){let acc=0;const key=secret+raw;for(let i=0;i<key.length;i++)acc=(acc+key.charCodeAt(i)*(i+1))%1000003;return `demo_${acc.toString(36)}`}
