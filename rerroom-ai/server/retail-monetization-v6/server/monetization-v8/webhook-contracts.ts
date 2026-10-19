import type { Provider } from '../../src/types/commerce';
import type { WebhookReceipt } from '../../src/monetization-v8/types';

export interface VerifiedWebhook { provider:Provider; eventId:string; eventType:string; verifiedAt:string; dedupeKey:string; payloadHash:string; }

export function receiptForWebhook(provider:Provider,eventId:string,eventType:string,signatureValid:boolean,duplicate=false):WebhookReceipt {
  return {provider,eventId,eventType,signatureValid,receivedAt:new Date().toISOString(),duplicate};
}

export function dedupeKey(provider:Provider,eventId:string):string { return `${provider}:${eventId}`; }

export function allowWebhook(receipt:WebhookReceipt):boolean { return receipt.signatureValid && !receipt.duplicate; }
