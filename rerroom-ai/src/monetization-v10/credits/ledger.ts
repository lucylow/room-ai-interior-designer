export type CreditKind = 'ai' | 'render';

export interface CreditEntry {
  id: string;
  userId: string;
  kind: CreditKind;
  delta: number;
  reason: string;
  at: string;
  ref?: string;
}

export type CreditLedgerErrorCode =
  | 'invalid_user'
  | 'invalid_amount'
  | 'invalid_entry'
  | 'insufficient_credits'
  | 'duplicate_entry'
  | 'idempotency_conflict';

export class CreditLedgerError extends Error {
  constructor(readonly code: CreditLedgerErrorCode) {
    super(code);
    this.name = 'CreditLedgerError';
  }
}

/** In-memory ledger for deterministic demos; persist ledger events on the server in production. */
export class CreditLedger {
  private readonly entries: CreditEntry[] = [];
  private readonly byId = new Map<string, CreditEntry>();
  private readonly byReference = new Map<string, CreditEntry>();
  private readonly balances = new Map<string, number>();
  private sequence = 0;

  append(entry: CreditEntry): CreditEntry {
    const normalized = this.validateAndNormalize(entry);
    const existingId = this.byId.get(normalized.id);
    if (existingId) {
      if (this.sameEntry(existingId, normalized)) return { ...existingId };
      throw new CreditLedgerError('duplicate_entry');
    }

    const refKey = normalized.ref
      ? this.referenceKey(normalized.userId, normalized.kind, normalized.ref)
      : undefined;
    const existingRef = refKey ? this.byReference.get(refKey) : undefined;
    if (existingRef) {
      if (this.sameOperation(existingRef, normalized)) return { ...existingRef };
      throw new CreditLedgerError('idempotency_conflict');
    }

    const balanceKey = this.balanceKey(normalized.userId, normalized.kind);
    const currentBalance = this.balances.get(balanceKey) ?? 0;
    if (normalized.delta < 0 && currentBalance + normalized.delta < 0) {
      throw new CreditLedgerError('insufficient_credits');
    }

    const stored = { ...normalized };
    this.entries.push(stored);
    this.byId.set(stored.id, stored);
    if (refKey) this.byReference.set(refKey, stored);
    this.balances.set(balanceKey, currentBalance + stored.delta);
    return { ...stored };
  }

  balance(userId: string, kind: CreditKind): number {
    const normalizedUserId = this.validateUser(userId);
    this.validateKind(kind);
    return this.balances.get(this.balanceKey(normalizedUserId, kind)) ?? 0;
  }

  consume(userId: string, kind: CreditKind, amount: number, ref: string): CreditEntry {
    const normalizedUserId = this.validateUser(userId);
    this.validateKind(kind);
    this.validateAmount(amount);
    const normalizedRef = this.validateRef(ref);
    return this.append({
      id: this.nextId(),
      userId: normalizedUserId,
      kind,
      delta: -amount,
      reason: 'usage',
      at: new Date().toISOString(),
      ref: normalizedRef,
    });
  }

  grant(userId: string, kind: CreditKind, amount: number, reason: string, ref?: string): CreditEntry {
    const normalizedUserId = this.validateUser(userId);
    this.validateKind(kind);
    this.validateAmount(amount);
    const normalizedReason = this.validateReason(reason);
    const normalizedRef = ref === undefined ? undefined : this.validateRef(ref);
    return this.append({
      id: this.nextId(),
      userId: normalizedUserId,
      kind,
      delta: amount,
      reason: normalizedReason,
      at: new Date().toISOString(),
      ref: normalizedRef,
    });
  }

  snapshot(userId: string): { ai: number; render: number } {
    return {
      ai: this.balance(userId, 'ai'),
      render: this.balance(userId, 'render'),
    };
  }

  entriesFor(userId: string): CreditEntry[] {
    const normalizedUserId = this.validateUser(userId);
    return this.entries
      .filter((entry) => entry.userId === normalizedUserId)
      .map((entry) => ({ ...entry }));
  }

  private validateAndNormalize(entry: CreditEntry): CreditEntry {
    if (!entry || typeof entry !== 'object') throw new CreditLedgerError('invalid_entry');
    const id = typeof entry.id === 'string' ? entry.id.trim() : '';
    const userId = this.validateUser(entry.userId);
    this.validateKind(entry.kind);
    if (id.length === 0 || id.length > 256) throw new CreditLedgerError('invalid_entry');
    if (!Number.isSafeInteger(entry.delta) || entry.delta === 0) {
      throw new CreditLedgerError('invalid_amount');
    }
    const reason = this.validateReason(entry.reason);
    const timestamp = typeof entry.at === 'string' ? Date.parse(entry.at) : Number.NaN;
    if (!Number.isFinite(timestamp)) throw new CreditLedgerError('invalid_entry');
    const ref = entry.ref === undefined ? undefined : this.validateRef(entry.ref);
    return { id, userId, kind: entry.kind, delta: entry.delta, reason, at: new Date(timestamp).toISOString(), ref };
  }

  private validateUser(userId: string): string {
    if (typeof userId !== 'string' || userId.trim().length === 0 || userId.length > 256) {
      throw new CreditLedgerError('invalid_user');
    }
    return userId.trim();
  }

  private validateKind(kind: CreditKind): void {
    if (kind !== 'ai' && kind !== 'render') throw new CreditLedgerError('invalid_entry');
  }

  private validateAmount(amount: number): void {
    if (!Number.isSafeInteger(amount) || amount <= 0) throw new CreditLedgerError('invalid_amount');
  }

  private validateReason(reason: string): string {
    if (typeof reason !== 'string' || reason.trim().length === 0 || reason.length > 200) {
      throw new CreditLedgerError('invalid_entry');
    }
    return reason.trim();
  }

  private validateRef(ref: string): string {
    if (typeof ref !== 'string' || ref.trim().length === 0 || ref.length > 256) {
      throw new CreditLedgerError('invalid_entry');
    }
    return ref.trim();
  }

  private balanceKey(userId: string, kind: CreditKind): string {
    return `${userId}\u0000${kind}`;
  }

  private referenceKey(userId: string, kind: CreditKind, ref: string): string {
    return `${this.balanceKey(userId, kind)}\u0000${ref}`;
  }

  private nextId(): string {
    this.sequence += 1;
    return `credit-${this.sequence}`;
  }

  private sameEntry(left: CreditEntry, right: CreditEntry): boolean {
    return left.userId === right.userId && left.kind === right.kind && left.delta === right.delta &&
      left.reason === right.reason && left.at === right.at && left.ref === right.ref;
  }

  private sameOperation(left: CreditEntry, right: CreditEntry): boolean {
    return left.userId === right.userId && left.kind === right.kind && left.delta === right.delta &&
      left.reason === right.reason && left.ref === right.ref;
  }
}
