import { deterministicId } from '../core/id';export interface Referral{code:string;referrerId:string;source:string;createdAt:string;clickId:string}
export function createReferral(referrerId:string,source:string):Referral{const clickId=deterministicId('ref',referrerId+source+Date.now());return {code:clickId.slice(-8).toUpperCase(),referrerId,source,createdAt:new Date().toISOString(),clickId}}
