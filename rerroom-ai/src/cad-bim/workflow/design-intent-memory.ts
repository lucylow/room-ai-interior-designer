import { AestheticIntent } from '../core/types';

export interface IntentMemory { id: string; timestamp: string; intent: AestheticIntent; outcome: 'accepted' | 'rejected' | 'pending'; overlayId?: string; }

export class DesignIntentMemory {
  private memory: IntentMemory[] = [];

  record(intent: AestheticIntent, outcome: IntentMemory['outcome'], overlayId?: string): IntentMemory {
    const entry: IntentMemory = { id: `intent_${this.memory.length + 1}`, timestamp: new Date().toISOString(), intent: JSON.parse(JSON.stringify(intent)), outcome, overlayId };
    this.memory.push(entry);
    return entry;
  }

  acceptedStyles(): string[] { return [...new Set(this.memory.filter(x => x.outcome === 'accepted').map(x => x.intent.style).filter(Boolean) as string[])]; }
  rejectedMaterials(): string[] { return [...new Set(this.memory.filter(x => x.outcome === 'rejected').flatMap(x => x.intent.materials || []))]; }
  recent(limit = 10): IntentMemory[] { return this.memory.slice(-limit).map(x => JSON.parse(JSON.stringify(x))); }
}
