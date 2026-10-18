import { ConsentRegistry } from '../security/consent';
import { AIDataPolicyEngine } from '../security/ai-data-policy';
import { DEFAULT_AI_POLICY } from '../security/constants';
import { DataAIController } from '../ai/controller';
import { DeterministicDemoAIProvider } from '../ai/demo-provider';
import { DEMO_ROOM } from './mock-room-data';

export async function runSecurityDemo() {
  const consent = new ConsentRegistry();
  consent.set('ai-processing', true, 'feature-prompt');
  const engine = new AIDataPolicyEngine(consent, DEFAULT_AI_POLICY);
  const controller = new DataAIController(new DeterministicDemoAIProvider(), engine, DEFAULT_AI_POLICY);
  const fields = [
    { name: 'prompt', dataClass: 'ai-prompt' as const, value: 'Make the living room warmer and more modern.' },
    { name: 'measurements', dataClass: 'measurement' as const, value: DEMO_ROOM.measurements },
    { name: 'private-notes', dataClass: 'identity' as const, value: 'should be excluded' },
  ];
  return controller.generateDesign(DEMO_ROOM, fields);
}
