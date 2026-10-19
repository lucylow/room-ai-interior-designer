import type { PurchaseContext, PurchaseOutcome } from '../types';
import { PurchaseIdempotencyStore } from './idempotency';

export interface PurchaseAdapter {
  purchase(context: PurchaseContext): Promise<PurchaseOutcome>;
}

export type PurchaseFailureCode = 'invalid_context' | 'adapter_failure';
export type PurchaseErrorReporter = (code: PurchaseFailureCode) => void;

export class PurchaseCoordinator {
  constructor(
    private readonly adapter: PurchaseAdapter,
    private readonly dedupe = new PurchaseIdempotencyStore(),
    private readonly reportError?: PurchaseErrorReporter,
  ) {}

  async purchase(context: PurchaseContext): Promise<PurchaseOutcome> {
    if (!this.isValidContext(context)) {
      this.reportSafely('invalid_context');
      return 'failed';
    }

    const userId = context.appUserId.trim();
    const productId = context.productId.trim();
    const suppliedKey = context.idempotencyKey?.trim();
    const key = suppliedKey
      ? `${userId}:${productId}:attempt:${suppliedKey}`
      : `${userId}:${productId}:project:${context.projectId?.trim() ?? ''}`;

    try {
      return await this.dedupe.execute(key, () => this.adapter.purchase(context));
    } catch {
      // Do not leak provider exceptions or credentials into client-facing errors.
      // The idempotency store does not cache thrown failures, so another attempt
      // can be made after the provider recovers.
      this.reportSafely('adapter_failure');
      return 'failed';
    }
  }

  private isValidContext(context: PurchaseContext): boolean {
    if (!context || typeof context !== 'object') return false;
    if (typeof context.appUserId !== 'string' || context.appUserId.trim().length === 0) return false;
    if (typeof context.productId !== 'string' || context.productId.trim().length === 0) return false;
    if (typeof context.source !== 'string' || context.source.trim().length === 0) return false;
    if (context.projectId !== undefined && typeof context.projectId !== 'string') return false;
    if (context.idempotencyKey !== undefined && typeof context.idempotencyKey !== 'string') return false;
    return true;
  }

  private reportSafely(code: PurchaseFailureCode): void {
    try {
      this.reportError?.(code);
    } catch {
      // Error reporting must never interrupt purchase-state recovery.
    }
  }
}
