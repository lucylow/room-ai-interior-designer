export type CheckoutStep='cart'|'address'|'delivery'|'payment'|'review'|'redirect'|'complete';export interface CheckoutState{step:CheckoutStep;cartId:string;sessionId?:string;error?:string;busy:boolean}
export const advance=(s:CheckoutState,next:CheckoutStep):CheckoutState=>({...s,step:next,error:undefined});
export const fail=(s:CheckoutState,error:string):CheckoutState=>({...s,busy:false,error});
