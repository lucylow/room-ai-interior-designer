import type { CommerceCart, Address } from "../../types/commerce";
import type { CommerceQuote, CheckoutGuardResult, AddressValidation, FraudAssessment } from "../types";

export function validateAddress(address?:Address):AddressValidation {
  if(!address) return {valid:false,issues:["missing_address"],confidence:0};
  const issues:string[]=[];
  if(address.line1.length<3) issues.push("line1_too_short");
  if(address.city.length<2) issues.push("city_invalid");
  if(!/^[A-Z0-9 -]{3,10}$/i.test(address.postalCode)) issues.push("postal_code_invalid");
  if(address.country.toUpperCase()!=="CA" && address.country.toUpperCase()!=="US") issues.push("country_not_supported_in_demo");
  return {valid:issues.length===0,normalized:{...address,region:address.region.toUpperCase(),country:address.country.toUpperCase()},issues,confidence:issues.length?0.55:0.98};
}

export function buildCheckoutGuard(cart:CommerceCart,quote:CommerceQuote,address:Address|undefined,email:string,fraud:FraudAssessment):CheckoutGuardResult {
  const blockers:string[]=[]; const warnings:string[]=[];
  if(!cart.lines.length) blockers.push("empty_cart");
  if(quote.state!=="fresh") blockers.push("quote_not_fresh");
  if(cart.budgetCap && quote.total>cart.budgetCap.amount) blockers.push("budget_exceeded");
  if(!email.includes("@")) blockers.push("invalid_email");
  const addr=validateAddress(address); if(!addr.valid) blockers.push(...addr.issues.map(x=>`address:${x}`));
  if(fraud.decision==="block") blockers.push("fraud_block");
  if(fraud.decision==="review") warnings.push("fraud_review");
  if(quote.expiresAt && Date.parse(quote.expiresAt)<=Date.now()) blockers.push("quote_expired");
  return {allowed:blockers.length===0,blockers,warnings,checkedAt:new Date().toISOString(),quoteHash:quote.hash};
}
