import { SECURITY_CONSTANTS } from './constants';
import { randomId } from './ids';
import { redactObject } from './redaction';
import type { AuditEvent } from './types';

export class AuditTrail {
  private events: AuditEvent[] = [];

  record(event: Omit<AuditEvent, 'id' | 'timestamp'>): AuditEvent {
    const sanitized = redactObject(event.metadata) as Record<string, string | number | boolean | null>;
    const next: AuditEvent = { ...event, id: randomId('audit'), timestamp: Date.now(), metadata: sanitized };
    this.events = [...this.events, next].slice(-SECURITY_CONSTANTS.auditMaxEntries);
    return next;
  }

  list(): AuditEvent[] { return [...this.events]; }
  clear(): void { this.events = []; }
}
