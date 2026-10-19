import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: [
      'server/retail-monetization-v6/src/core/provider-http.ts',
      'server/retail-monetization-v6/src/types/commerce.ts',
      'server/retail-monetization-v6/src/core/commerce-app.ts',
      'server/retail-monetization-v6/server/webhooks/signature-verification.ts',
      'server/retail-monetization-v6/server/webhooks/stripe.ts',
      'server/retail-monetization-v6/server/webhooks/shopify.ts',
      'server/retail-monetization-v6/server/services/order-service.ts',
      'src/state/domains/retail-commerce-v6-store.ts',
      'server/retail-monetization-v6/src/cart/cart-store.ts',
      'server/retail-monetization-v6/src/cart/cart-validator.ts',
      'server/retail-monetization-v6/src/providers/stripe-provider.ts',
      'server/retail-monetization-v6/src/providers/shopify-provider.ts',
      'server/retail-monetization-v6/src/providers/affiliate-provider.ts',
      'server/retail-monetization-v6/src/checkout/checkout-orchestrator.ts',
      'server/retail-monetization-v6/src/security/checkout-safety.ts',
      'server/retail-monetization-v6/server/services/checkout-service.ts',
      'server/retail-monetization-v6/server/api/checkout.ts',
      'src/tests/commerce-v6/**/*.ts',
    ],
    extends: [...tseslint.configs.recommended],
    languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } },
    rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] },
  },
);
