import { CreditLedger, CreditLedgerError } from './src/monetization-v10/credits/ledger';
import { dedupeNotification } from './src/monetization-v10/backend/notification-contract';
import { isFeatureActive, highestTier, tierAllows } from './src/monetization-v10/entitlements/feature-gate';
import { EntitlementReconciliationError, reconcileEntitlements } from './src/monetization-v10/entitlements/reconcile';
import { OfferCodeBook } from './src/monetization-v10/offers/offer-code';
import { PaywallV10Engine } from './src/monetization-v10/paywall/engine';
import { PurchaseCoordinator } from './src/monetization-v10/purchases/purchase-coordinator';
import { PurchaseIdempotencyStore } from './src/monetization-v10/purchases/idempotency';
import { V10_CATALOG } from './src/monetization-v10/catalog';
import type { EntitlementGrant, PurchaseContext } from './src/monetization-v10/types';

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function expectCreditError(operation: () => unknown, code: CreditLedgerError['code']): void {
  try {
    operation();
  } catch (error) {
    assert(error instanceof CreditLedgerError && error.code === code, `expected_credit_error_${code}`);
    return;
  }
  throw new Error(`missing_credit_error_${code}`);
}

function expectEntitlementError(operation: () => unknown, code: EntitlementReconciliationError['code']): void {
  try {
    operation();
  } catch (error) {
    assert(error instanceof EntitlementReconciliationError && error.code === code, `expected_entitlement_error_${code}`);
    return;
  }
  throw new Error(`missing_entitlement_error_${code}`);
}

async function main(): Promise<void> {
  const engine = new PaywallV10Engine();
  const intro = engine.recommend({
    source: 'home',
    projectCount: 0,
    generationsUsed: 1,
    trialEligible: true,
    locale: 'en-CA',
  });
  assert(intro.eligible && intro.kind === 'introductory', 'trial_offer_should_be_eligible');

  const highIntent = engine.recommend({
    source: 'render',
    projectCount: 4,
    generationsUsed: 14,
    trialEligible: false,
    locale: 'en-CA',
  });
  assert(highIntent.eligible, 'high_intent_customer_should_receive_configured_offer');

  const ledger = new CreditLedger();
  const purchaseGrant = ledger.grant('u', 'ai', 10, 'purchase', 'apple-txn-1');
  const duplicateGrant = ledger.grant('u', 'ai', 10, 'purchase', 'apple-txn-1');
  assert(ledger.balance('u', 'ai') === 10, 'duplicate_grant_must_not_double_credit');
  assert(purchaseGrant.id === duplicateGrant.id, 'duplicate_grant_should_return_original_entry');

  const usageDebit = ledger.consume('u', 'ai', 4, 'job-1');
  const duplicateDebit = ledger.consume('u', 'ai', 4, 'job-1');
  assert(ledger.balance('u', 'ai') === 6, 'duplicate_usage_must_not_double_debit');
  assert(usageDebit.id === duplicateDebit.id, 'duplicate_debit_should_return_original_entry');
  expectCreditError(() => ledger.consume('u', 'ai', 0, 'invalid-zero'), 'invalid_amount');
  expectCreditError(() => ledger.consume('u', 'ai', -1, 'invalid-negative'), 'invalid_amount');
  expectCreditError(() => ledger.consume('u', 'ai', 7, 'overdraw'), 'insufficient_credits');
  expectCreditError(() => ledger.grant('u', 'ai', 2, 'conflicting replay', 'apple-txn-1'), 'idempotency_conflict');
  expectCreditError(() => ledger.grant(' ', 'ai', 1, 'bad user'), 'invalid_user');

  const codeBook = new OfferCodeBook();
  codeBook.seed([{
    code: 'TEST10',
    productId: 'com.reroom.ai.pro.yearly',
    kind: 'promo',
    remaining: 1,
    expiresAt: new Date(Date.now() + 600_000).toISOString(),
  }]);
  assert(Boolean(codeBook.redeem('TEST10')), 'offer_redemption_failed');
  assert(codeBook.remaining('TEST10') === 0, 'offer_limit_failed');

  assert(tierAllows('pro', 'hd_render'), 'pro_should_allow_hd_render');
  assert(!tierAllows('free', 'hd_render'), 'free_should_not_allow_hd_render');
  assert(!tierAllows('unexpected' as never, 'hd_render'), 'unknown_tier_must_fail_closed');

  const clientActive: EntitlementGrant = {
    feature: 'advanced_ai',
    state: 'active',
    productId: 'com.reroom.ai.pro.monthly',
    source: 'apple',
  };
  const serverActive: EntitlementGrant = {
    ...clientActive,
    state: 'active',
    source: 'server',
  };
  const activeMerged = reconcileEntitlements([
    { ...clientActive, state: 'expired' },
  ], [serverActive]);
  assert(isFeatureActive('advanced_ai', activeMerged), 'server_active_grant_should_win');
  assert(highestTier(activeMerged) === 'pro', 'highest_tier_projection_failed');

  const serverRevoked: EntitlementGrant = {
    ...serverActive,
    state: 'revoked',
  };
  const revokedMerged = reconcileEntitlements([clientActive], [serverRevoked]);
  assert(!isFeatureActive('advanced_ai', revokedMerged), 'server_revocation_must_override_client_active');
  assert(highestTier(revokedMerged) === 'free', 'revoked_product_must_not_grant_tier');

  const expiryNow = Date.parse('2026-01-01T00:00:00.000Z');
  const expired = reconcileEntitlements([
    { ...clientActive, expiresAt: '2025-12-31T23:59:59.000Z' },
  ], [], expiryNow);
  assert(expired[0]?.state === 'expired', 'stale_client_grant_must_expire');
  assert(!isFeatureActive('advanced_ai', expired), 'stale_grant_must_not_unlock_feature');
  expectEntitlementError(
    () => reconcileEntitlements([{ ...clientActive, source: 'server' }], []),
    'invalid_grant',
  );

  const notification = {
    id: 'notification-1',
    type: 'DID_RENEW' as const,
    signedPayload: 'signed-jws-placeholder',
    receivedAt: new Date().toISOString(),
  };
  const seenNotifications = new Set<string>();
  assert(!dedupeNotification(seenNotifications, notification, false), 'unverified_notification_must_not_be_claimed');
  assert(seenNotifications.size === 0, 'unverified_notification_must_not_poison_dedupe');
  assert(dedupeNotification(seenNotifications, notification, true), 'verified_notification_should_be_claimed');
  assert(!dedupeNotification(seenNotifications, notification, true), 'duplicate_notification_must_be_rejected');
  assert(!dedupeNotification(seenNotifications, { ...notification, id: '' }, true), 'invalid_notification_id_must_be_rejected');

  const purchaseContext: PurchaseContext = {
    appUserId: 'user-1',
    productId: 'com.reroom.ai.pro.monthly',
    source: 'paywall',
    projectId: 'room-1',
    idempotencyKey: 'tap-1',
  };
  let purchaseCalls = 0;
  const purchaseCoordinator = new PurchaseCoordinator({
    async purchase() {
      purchaseCalls += 1;
      await Promise.resolve();
      return 'success';
    },
  });
  const [purchaseA, purchaseB] = await Promise.all([
    purchaseCoordinator.purchase(purchaseContext),
    purchaseCoordinator.purchase(purchaseContext),
  ]);
  assert(purchaseA === 'success' && purchaseB === 'success', 'single_flight_purchase_results_mismatch');
  assert(purchaseCalls === 1, 'concurrent_duplicate_purchase_must_call_provider_once');
  await purchaseCoordinator.purchase(purchaseContext);
  assert(purchaseCalls === 1, 'recent_success_must_be_idempotent');

  let retryCalls = 0;
  const reportedErrors: string[] = [];
  const retryCoordinator = new PurchaseCoordinator({
    async purchase() {
      retryCalls += 1;
      if (retryCalls === 1) throw new Error('provider secret must not be surfaced');
      return 'success';
    },
  }, undefined, (code) => reportedErrors.push(code));
  assert(await retryCoordinator.purchase(purchaseContext) === 'failed', 'provider_exception_should_become_safe_failure');
  assert(await retryCoordinator.purchase(purchaseContext) === 'success', 'failed_attempt_should_be_retryable');
  assert(retryCalls === 2, 'failed_attempt_must_not_remain_deduplicated');
  assert(reportedErrors.join(',') === 'adapter_failure', 'safe_error_code_should_be_reported');

  let invalidAdapterCalls = 0;
  const invalidContextCoordinator = new PurchaseCoordinator({
    async purchase() {
      invalidAdapterCalls += 1;
      return 'success';
    },
  }, undefined, (code) => reportedErrors.push(code));
  assert(await invalidContextCoordinator.purchase({} as PurchaseContext) === 'failed', 'invalid_context_should_fail_safely');
  assert(invalidAdapterCalls === 0, 'invalid_context_must_not_reach_adapter');
  assert(reportedErrors.includes('invalid_context'), 'invalid_context_error_code_should_be_reported');

  let now = 10_000;
  let expiryCalls = 0;
  const expiringCoordinator = new PurchaseCoordinator({
    async purchase() {
      expiryCalls += 1;
      return 'success';
    },
  }, new PurchaseIdempotencyStore(1_000, () => now));
  await expiringCoordinator.purchase(purchaseContext);
  await expiringCoordinator.purchase(purchaseContext);
  const getExpiryCalls = (): number => expiryCalls;
  assert(getExpiryCalls() === 1, 'recent_success_should_be_cached');
  now += 1_001;
  await expiringCoordinator.purchase(purchaseContext);
  assert(getExpiryCalls() === 2, 'expired_idempotency_record_should_allow_new_attempt');

  console.log(JSON.stringify({
    products: V10_CATALOG.length,
    tests: 'PASS',
    coverage: [
      'purchase_retry_and_deduplication',
      'credit_ledger_validation_and_idempotency',
      'server_entitlement_authority',
      'verified_notification_deduplication',
      'fail_closed_feature_gates',
    ],
    credits: ledger.snapshot('u'),
    reconciledTier: highestTier(activeMerged),
  }, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  throw error;
});
