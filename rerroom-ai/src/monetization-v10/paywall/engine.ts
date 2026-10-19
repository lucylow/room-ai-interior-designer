import { V10_CATALOG } from '../catalog';
import { PaywallContext, OfferDecision, RevenueProduct, MonetizationTier } from '../types';
export class PaywallV10Engine {
  rankProducts(context:PaywallContext):RevenueProduct[]{
    const pressure = context.generationsUsed > 8 ? 1 : 0;
    return [...V10_CATALOG].sort((a,b)=> (a.rank + this.fit(a.tier, context, pressure)) - (b.rank + this.fit(b.tier, context, pressure)));
  }
  recommend(context:PaywallContext):OfferDecision{
    if(context.trialEligible) return {eligible:true,kind:'introductory',productId:'com.reroom.ai.pro.yearly',discountPercent:40,reason:'Eligible for introductory offer'};
    if(context.generationsUsed >= 12) return {eligible:true,kind:'win-back',productId:'com.reroom.ai.pro.monthly',discountPercent:25,reason:'High-intent AI usage'};
    if(context.projectCount >= 3) return {eligible:true,kind:'promotional',productId:'com.reroom.ai.plus.yearly',discountPercent:15,reason:'Project limit pressure'};
    return {eligible:false,kind:'none',reason:'No targeted offer'};
  }
  private fit(tier:MonetizationTier, c:PaywallContext, pressure:number):number{
    const desired = c.generationsUsed > 10 ? 'pro' : c.projectCount > 2 ? 'plus' : 'free';
    return tier===desired ? -5-pressure : tier==='studio' ? 2 : 0;
  }
}
