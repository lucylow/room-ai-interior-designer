import type { AIInsight, ConsentScope, DataClass } from '../security/types';
import { randomId } from '../security/ids';
import { ConsentRegistry } from '../security/consent';

export interface PrivacyInventoryItem { name: string; dataClass: DataClass; purpose: string; cloud: boolean; retentionDays: number; }

export function generatePrivacyInsights(inventory: PrivacyInventoryItem[], consent: ConsentRegistry): AIInsight[] {
  const insights: AIInsight[] = [];
  const cloudSensitive = inventory.filter((item) => item.cloud && ['room-image', 'room-video', 'room-layout', 'construction'].includes(item.dataClass));
  if (cloudSensitive.length > 0 && !consent.get('cloud-storage')) {
    insights.push({ id: randomId('privacy'), severity: 'medium', category: 'privacy', title: 'Cloud storage is disabled', summary: `${cloudSensitive.length} sensitive inventory items are configured for cloud behavior but the user has not granted cloud-storage consent.`, evidence: cloudSensitive.map((x) => x.name).slice(0, 5), source: 'local-rules' });
  }
  const longRetention = inventory.filter((item) => item.retentionDays > 30);
  if (longRetention.length) insights.push({ id: randomId('privacy'), severity: 'low', category: 'privacy', title: 'Review retention', summary: `${longRetention.length} data items have retention windows longer than 30 days.`, evidence: longRetention.map((x) => `${x.name}:${x.retentionDays}d`).slice(0, 5), source: 'local-rules' });
  const deniedAI = inventory.filter((item) => !consent.get('ai-processing') && item.dataClass.startsWith('room-'));
  if (deniedAI.length) insights.push({ id: randomId('privacy'), severity: 'info', category: 'privacy', title: 'AI processing is off', summary: 'Room data remains excluded from AI processing until the user enables AI processing consent.', evidence: deniedAI.map((x) => x.name).slice(0, 5), source: 'local-rules' });
  return insights;
}

export function consentLabel(scope: ConsentScope): string {
  return scope.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
