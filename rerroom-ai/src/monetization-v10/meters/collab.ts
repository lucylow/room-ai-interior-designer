export interface CollabMeter { feature:'collab'; used:number; allowance:number; unit:'action'|'minute'|'project'; }
export interface CollabMonetizationDecision { allowed:boolean; remaining:number; upgradeProduct?:string; reason:string; }
export const COLLAB_DEFAULTS = { free:2, plus:55, pro:270, studio:9999 } as const;
export function allowance(tier:'free'|'plus'|'pro'|'studio'):number{return COLLAB_DEFAULTS[tier]}
export function decide(tier:'free'|'plus'|'pro'|'studio',used:number):CollabMonetizationDecision{
 const a=allowance(tier); const allowed=used<a; return allowed?{allowed:true,remaining:a-used,reason:'within plan allowance'}:{allowed:false,remaining:0,upgradeProduct:tier==='free'?'com.reroom.ai.plus.monthly':tier==='plus'?'com.reroom.ai.pro.monthly':'com.reroom.ai.studio.monthly',reason:'plan allowance reached'};
}
export function usageRatio(used:number,tier:'free'|'plus'|'pro'|'studio'):number{const a=allowance(tier);return a?Math.min(1,used/a):1}
export function warningLevel(used:number,tier:'free'|'plus'|'pro'|'studio'){const r=usageRatio(used,tier);return r>=.95?'critical':r>=.8?'high':r>=.5?'medium':'low'}
export function summary(tier:'free'|'plus'|'pro'|'studio',used:number){const a=allowance(tier);return {feature:'collab',used,allowance:a,remaining:Math.max(0,a-used),label:'collaboration'}}
