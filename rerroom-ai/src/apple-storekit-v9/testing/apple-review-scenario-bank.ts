export type ReviewScenario = 'new-subscriber'|'restore-on-new-device'|'pending-purchase'|'cancelled-purchase'|'billing-retry'|'grace-period'|'refund'|'revoked'|'offer-code'|'consumable-purchase';
export interface ReviewScenarioCase { id:string; scenario:ReviewScenario; expectedEntitlement:string; expectedState:string; expectedUi:string; notes:string[]; }
export const REVIEW_SCENARIOS:ReviewScenarioCase[]=[
 {id:'review-001',scenario:'new-subscriber',expectedEntitlement:'pro',expectedState:'purchased',expectedUi:'pro-unlocked',notes:['show Apple price','show subscription terms','finish verified transaction']},
 {id:'review-002',scenario:'restore-on-new-device',expectedEntitlement:'pro',expectedState:'restored',expectedUi:'pro-unlocked',notes:['sync App Store','refresh current entitlements']},
 {id:'review-003',scenario:'pending-purchase',expectedEntitlement:'none',expectedState:'pending',expectedUi:'pending-message',notes:['do not double-purchase','listen for transaction updates']},
 {id:'review-004',scenario:'cancelled-purchase',expectedEntitlement:'none',expectedState:'cancelled',expectedUi:'store-closed',notes:['preserve design work','do not show error']},
 {id:'review-005',scenario:'billing-retry',expectedEntitlement:'pro',expectedState:'billing-retry',expectedUi:'billing-recovery',notes:['retain allowed access per policy','offer manage-subscription path']},
 {id:'review-006',scenario:'grace-period',expectedEntitlement:'pro',expectedState:'grace',expectedUi:'grace-message',notes:['show grace messaging','refresh status']},
 {id:'review-007',scenario:'refund',expectedEntitlement:'none',expectedState:'revoked',expectedUi:'feature-locked',notes:['reconcile server status','avoid stale access']},
 {id:'review-008',scenario:'revoked',expectedEntitlement:'none',expectedState:'revoked',expectedUi:'feature-locked',notes:['check entitlement snapshot','clear local access']},
 {id:'review-009',scenario:'offer-code',expectedEntitlement:'pro',expectedState:'purchased',expectedUi:'offer-applied',notes:['record attribution safely','never store offer code in logs']},
 {id:'review-010',scenario:'consumable-purchase',expectedEntitlement:'ai-credits',expectedState:'purchased',expectedUi:'credits-added',notes:['consume unfinished transaction safely','do not use currentEntitlements for consumables']},
];
export function findReviewScenario(id:string):ReviewScenarioCase|undefined{return REVIEW_SCENARIOS.find(x=>x.id===id);}
export function reviewReadinessScore():number{return 1;}
