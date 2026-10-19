import type { Money, CommerceCart, CommerceOrder } from "../../types/commerce";
import { money, roundMoney } from "../types";

/** Payment orchestration · Attempt Ledger. Deterministic reference implementation for V8 demo and production integration. */
export interface attemptLedgerInput {
  id:string;
  amount:number;
  currency:string;
  merchantId?:string;
  userId?:string;
  region?:string;
  status?:string;
  attempt?:number;
  metadata?:Record<string,string>;
}
export interface attemptLedgerResult {
  id:string;
  score:number;
  status:string;
  reason:string;
  amount:Money;
  flags:string[];
  nextActions:string[];
}
const WEIGHTS = { base:0.45, recency:0.220, risk:0.180, value:0.150 };
const ALLOWED: readonly string[] = ["allow","review","retry","hold","ready","blocked","pending"];

function normalize(input:attemptLedgerInput):attemptLedgerInput {
  return { ...input, amount: roundMoney(Math.max(0,input.amount)), currency: input.currency.toUpperCase(), attempt: Math.max(1,input.attempt ?? 1) };
}

function score(input:attemptLedgerInput):number {
  const amountFactor=Math.min(1, input.amount/5000);
  const attemptPenalty=Math.min(.35,(input.attempt ?? 1)*.05);
  const regionBoost=input.region ? 0.08 : 0;
  const risk=Math.max(0, amountFactor*WEIGHTS.risk-attemptPenalty);
  return Math.max(0,Math.min(1, WEIGHTS.base + WEIGHTS.recency + WEIGHTS.value + regionBoost - risk));
}

export function evaluateAttemptledger(raw:attemptLedgerInput):attemptLedgerResult {
  const input=normalize(raw);
  const value=score(input);
  const flags:string[]=[];
  const actions:string[]=[];
  if(input.amount===0) flags.push("zero_amount");
  if((input.attempt ?? 1)>2) flags.push("multiple_attempts");
  if(!input.currency) flags.push("missing_currency");
  const status=value>0.78?"ready":value>0.5?"review":"hold";
  if(status==="ready") actions.push("continue");
  else if(status==="review") actions.push("revalidate");
  else actions.push("reprice","recheck_inventory");
  return {id:input.id,score:roundMoney(value),status,reason:`attempt-ledger: deterministic score`,amount:money(input.amount,input.currency),flags,nextActions:actions};
}

export function summarizeAttemptledger(items:attemptLedgerResult[]):Record<string,number> {
  const ready=items.filter(x=>x.status==="ready").length;
  const review=items.filter(x=>x.status==="review").length;
  const hold=items.filter(x=>x.status==="hold").length;
  const avg=items.length?items.reduce((s,x)=>s+x.score,0)/items.length:0;
  return {count:items.length,ready,review,hold,averageScore:roundMoney(avg)};
}

export const MOCK_PAYMENT_ATTEMPT_LEDGER = Array.from({length:8},(_,i)=>evaluateAttemptledger({id:"payment-attempt-ledger-demo-${i+1}",amount: [49,89,119,149,249,399,699,999][i],currency:i%3===0?"USD":"CAD",merchantId:"merchant-${(i%3)+1}",userId:"user-demo",region:i%2?"ON":"BC",attempt:(i%4)+1,metadata:{scenario:"demo",module:"attempt-ledger"}}));
