export const CHECKOUT_CASES = [
  {
    "id": "checkout-070",
    "tier": "pro",
    "productId": "com.reroom.ai.pro.yearly",
    "source": "home",
    "offer": "none",
    "outcome": "success",
    "retryable": false,
    "revenue": 119.99,
    "experiment": "value-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_completed"
    ]
  },
  {
    "id": "checkout-071",
    "tier": "studio",
    "productId": "com.reroom.ai.studio.monthly",
    "source": "render",
    "offer": "introductory",
    "outcome": "pending",
    "retryable": true,
    "revenue": 29.99,
    "experiment": "credits-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-072",
    "tier": "plus",
    "productId": "com.reroom.ai.plus.monthly",
    "source": "cad",
    "offer": "promotional",
    "outcome": "cancelled",
    "retryable": false,
    "revenue": 7.99,
    "experiment": "control",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-073",
    "tier": "pro",
    "productId": "com.reroom.ai.pro.yearly",
    "source": "3dgs",
    "offer": "win-back",
    "outcome": "failed",
    "retryable": true,
    "revenue": 119.99,
    "experiment": "annual-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-074",
    "tier": "studio",
    "productId": "com.reroom.ai.studio.monthly",
    "source": "shopping",
    "offer": "offer-code",
    "outcome": "deferred",
    "retryable": false,
    "revenue": 29.99,
    "experiment": "value-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-075",
    "tier": "plus",
    "productId": "com.reroom.ai.plus.monthly",
    "source": "home",
    "offer": "none",
    "outcome": "success",
    "retryable": false,
    "revenue": 7.99,
    "experiment": "credits-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_completed"
    ]
  },
  {
    "id": "checkout-076",
    "tier": "pro",
    "productId": "com.reroom.ai.pro.yearly",
    "source": "render",
    "offer": "introductory",
    "outcome": "pending",
    "retryable": true,
    "revenue": 119.99,
    "experiment": "control",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-077",
    "tier": "studio",
    "productId": "com.reroom.ai.studio.monthly",
    "source": "cad",
    "offer": "promotional",
    "outcome": "cancelled",
    "retryable": false,
    "revenue": 29.99,
    "experiment": "annual-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-078",
    "tier": "plus",
    "productId": "com.reroom.ai.plus.monthly",
    "source": "3dgs",
    "offer": "win-back",
    "outcome": "failed",
    "retryable": true,
    "revenue": 7.99,
    "experiment": "value-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-079",
    "tier": "pro",
    "productId": "com.reroom.ai.pro.yearly",
    "source": "shopping",
    "offer": "offer-code",
    "outcome": "deferred",
    "retryable": false,
    "revenue": 119.99,
    "experiment": "credits-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-080",
    "tier": "studio",
    "productId": "com.reroom.ai.studio.monthly",
    "source": "home",
    "offer": "none",
    "outcome": "success",
    "retryable": false,
    "revenue": 29.99,
    "experiment": "control",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_completed"
    ]
  },
  {
    "id": "checkout-081",
    "tier": "plus",
    "productId": "com.reroom.ai.plus.monthly",
    "source": "render",
    "offer": "introductory",
    "outcome": "pending",
    "retryable": true,
    "revenue": 7.99,
    "experiment": "annual-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-082",
    "tier": "pro",
    "productId": "com.reroom.ai.pro.yearly",
    "source": "cad",
    "offer": "promotional",
    "outcome": "cancelled",
    "retryable": false,
    "revenue": 119.99,
    "experiment": "value-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-083",
    "tier": "studio",
    "productId": "com.reroom.ai.studio.monthly",
    "source": "3dgs",
    "offer": "win-back",
    "outcome": "failed",
    "retryable": true,
    "revenue": 29.99,
    "experiment": "credits-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  }
] as const;
export function successes(){return CHECKOUT_CASES.filter(c=>c.outcome==="success")}
export function failures(){return CHECKOUT_CASES.filter(c=>c.outcome==="failed")}
export function byExperiment(id:string){return CHECKOUT_CASES.filter(c=>c.experiment===id)}
