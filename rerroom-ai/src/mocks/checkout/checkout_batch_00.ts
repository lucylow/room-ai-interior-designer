export const CHECKOUT_CASES = [
  {
    "id": "checkout-000",
    "tier": "plus",
    "productId": "com.reroom.ai.plus.monthly",
    "source": "home",
    "offer": "none",
    "outcome": "success",
    "retryable": false,
    "revenue": 7.99,
    "experiment": "control",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_completed"
    ]
  },
  {
    "id": "checkout-001",
    "tier": "pro",
    "productId": "com.reroom.ai.pro.yearly",
    "source": "render",
    "offer": "introductory",
    "outcome": "pending",
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
    "id": "checkout-002",
    "tier": "studio",
    "productId": "com.reroom.ai.studio.monthly",
    "source": "cad",
    "offer": "promotional",
    "outcome": "cancelled",
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
    "id": "checkout-003",
    "tier": "plus",
    "productId": "com.reroom.ai.plus.monthly",
    "source": "3dgs",
    "offer": "win-back",
    "outcome": "failed",
    "retryable": true,
    "revenue": 7.99,
    "experiment": "credits-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-004",
    "tier": "pro",
    "productId": "com.reroom.ai.pro.yearly",
    "source": "shopping",
    "offer": "offer-code",
    "outcome": "deferred",
    "retryable": false,
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
    "id": "checkout-005",
    "tier": "studio",
    "productId": "com.reroom.ai.studio.monthly",
    "source": "home",
    "offer": "none",
    "outcome": "success",
    "retryable": false,
    "revenue": 29.99,
    "experiment": "annual-first",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_completed"
    ]
  },
  {
    "id": "checkout-006",
    "tier": "plus",
    "productId": "com.reroom.ai.plus.monthly",
    "source": "render",
    "offer": "introductory",
    "outcome": "pending",
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
    "id": "checkout-007",
    "tier": "pro",
    "productId": "com.reroom.ai.pro.yearly",
    "source": "cad",
    "offer": "promotional",
    "outcome": "cancelled",
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
    "id": "checkout-008",
    "tier": "studio",
    "productId": "com.reroom.ai.studio.monthly",
    "source": "3dgs",
    "offer": "win-back",
    "outcome": "failed",
    "retryable": true,
    "revenue": 29.99,
    "experiment": "control",
    "expectedEvents": [
      "paywall_view",
      "product_selected",
      "purchase_started",
      "purchase_not_completed"
    ]
  },
  {
    "id": "checkout-009",
    "tier": "plus",
    "productId": "com.reroom.ai.plus.monthly",
    "source": "shopping",
    "offer": "offer-code",
    "outcome": "deferred",
    "retryable": false,
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
    "id": "checkout-010",
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
    "id": "checkout-011",
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
    "id": "checkout-012",
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
    "id": "checkout-013",
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
  }
] as const;
export function successes(){return CHECKOUT_CASES.filter(c=>c.outcome==="success")}
export function failures(){return CHECKOUT_CASES.filter(c=>c.outcome==="failed")}
export function byExperiment(id:string){return CHECKOUT_CASES.filter(c=>c.experiment===id)}
