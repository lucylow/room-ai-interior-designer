import { redactObject } from './redaction';

export interface ExportBundle { schema: number; createdAt: number; profile: unknown; rooms: unknown; designs: unknown; privacy: unknown; }

export function createPrivacyExport(input: Omit<ExportBundle, 'schema' | 'createdAt'>): ExportBundle {
  return { schema: 1, createdAt: Date.now(), ...redactObject(input) as Omit<ExportBundle, 'schema' | 'createdAt'> };
}
