export interface SessionLockPolicy { idleMs: number; lockOnBackground: boolean; }

export class SessionLockController {
  private locked = false;
  private lastActivityAt = Date.now();
  constructor(private readonly policy: SessionLockPolicy) {}
  touch(now = Date.now()): void { this.lastActivityAt = now; if (!this.locked) return; this.locked = false; }
  onBackground(): void { if (this.policy.lockOnBackground) this.locked = true; }
  shouldLock(now = Date.now()): boolean { if (now - this.lastActivityAt > this.policy.idleMs) this.locked = true; return this.locked; }
  lock(): void { this.locked = true; }
  unlock(): void { this.locked = false; this.lastActivityAt = Date.now(); }
  get isLocked(): boolean { return this.locked; }
}
