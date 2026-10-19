export interface ServerEventPayload {
  notificationType:string;
  subtype?:string;
  signedTransactionInfo?:string;
  signedRenewalInfo?:string;
  environment?:'Sandbox'|'Production';
  bundleId?:string;
}

export function safeServerEventSummary(payload:ServerEventPayload):Record<string,string>{
  return {
    notificationType:payload.notificationType,
    subtype:payload.subtype ?? '',
    environment:payload.environment ?? 'unknown',
    bundleId:payload.bundleId ?? '',
    hasTransactionInfo:String(Boolean(payload.signedTransactionInfo)),
    hasRenewalInfo:String(Boolean(payload.signedRenewalInfo)),
  };
}
