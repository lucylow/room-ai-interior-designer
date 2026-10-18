import { ConsentRegistry } from '../src/security/consent';
import { AIDataPolicyEngine } from '../src/security/ai-data-policy';
import { DEFAULT_AI_POLICY } from '../src/security/constants';
import { DataAIController } from '../src/ai/controller';
import { DeterministicDemoAIProvider } from '../src/ai/demo-provider';

const consent = new ConsentRegistry();
const policyEngine = new AIDataPolicyEngine(consent, DEFAULT_AI_POLICY);
const ai = new DataAIController(new DeterministicDemoAIProvider(), policyEngine, DEFAULT_AI_POLICY);

export async function generateProtectedDesign(room: Parameters<DataAIController['generateDesign']>[0], prompt: string) {
  consent.require('ai-processing');
  return ai.generateDesign(room, [
    { name: 'prompt', dataClass: 'ai-prompt', value: prompt },
    { name: 'measurements', dataClass: 'measurement', value: room.measurements },
    { name: 'objects', dataClass: 'room-layout', value: room.objects },
  ]);
}
