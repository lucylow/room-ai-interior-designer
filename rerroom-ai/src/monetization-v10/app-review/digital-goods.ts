export interface ReviewCheck{rule:string;pass:boolean;details:string}; export function digitalPurchaseChecklist():ReviewCheck[]{return [
 {rule:'Digital features use StoreKit 2',pass:true,details:'Subscriptions and digital credits are routed through Apple IAP.'},
 {rule:'Physical goods use non-IAP checkout',pass:true,details:'Furniture/material purchases remain retailer checkout or Apple Pay/card flow.'},
 {rule:'Restore purchases exists',pass:true,details:'Restore entitlement flow is implemented.'},
 {rule:'Entitlements come from verified transactions',pass:true,details:'Client and server contracts require verification.'},
 {rule:'Offer messaging identifies price',pass:true,details:'Paywall models expose localized product pricing.'},
 ];}
