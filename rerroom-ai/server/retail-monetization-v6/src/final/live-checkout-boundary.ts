export interface LiveCheckoutBoundary {provider:'stripe'|'shopify'|'affiliate';serverOnly:boolean;secretsRequired:string[];clientData:string[];webhookRequired:boolean}
export const stripeBoundary:LiveCheckoutBoundary={provider:'stripe',serverOnly:true,secretsRequired:['STRIPE_SECRET_KEY'],clientData:['checkoutUrl','sessionId'],webhookRequired:true};
export const shopifyBoundary:LiveCheckoutBoundary={provider:'shopify',serverOnly:false,secretsRequired:['STOREFRONT_PRIVATE_TOKEN_ONLY_IF_SERVER_CONTEXT'],clientData:['checkoutUrl','cartId'],webhookRequired:true};
export const affiliateBoundary:LiveCheckoutBoundary={provider:'affiliate',serverOnly:true,secretsRequired:['AFFILIATE_NETWORK_CREDENTIALS'],clientData:['retailerUrl'],webhookRequired:false};
export function boundaryFor(provider:LiveCheckoutBoundary['provider']){return provider==='stripe'?stripeBoundary:provider==='shopify'?shopifyBoundary:affiliateBoundary}
export function assertClientSafe(boundary:LiveCheckoutBoundary){if(boundary.secretsRequired.length===0)throw new Error('missing_secret_boundary');return boundary.serverOnly?['never_expose_server_secret']:[]}
export function demoBoundaries(){return [stripeBoundary,shopifyBoundary,affiliateBoundary].map(x=>({provider:x.provider,clientSafe:assertClientSafe(x)}))}
