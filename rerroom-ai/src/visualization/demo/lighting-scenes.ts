import { LIGHTING_PRESETS } from '../three-d/lighting';

export interface LightingScenario {
  id: string;
  title: string;
  subtitle: string;
  presetId: string;
  recommendedFor: string[];
}

export const DEMO_LIGHTING_SCENARIOS: LightingScenario[] = [
  { id: 'morning', title: 'Morning', subtitle: 'Clean and optimistic', presetId: 'daylight', recommendedFor: ['listing photos', 'day review'] },
  { id: 'evening', title: 'Evening', subtitle: 'Warm and intimate', presetId: 'soft-evening', recommendedFor: ['living room', 'dining room'] },
  { id: 'studio', title: 'Studio', subtitle: 'Neutral product clarity', presetId: 'studio', recommendedFor: ['shopping', 'material review'] },
  { id: 'moody', title: 'Moody', subtitle: 'High contrast presentation', presetId: 'moody', recommendedFor: ['hero frame', 'design pitch'] },
];

export const lightingScenarioPreset = (id: string) =>
  LIGHTING_PRESETS.find(preset => preset.id === DEMO_LIGHTING_SCENARIOS.find(item => item.id === id)?.presetId) ?? LIGHTING_PRESETS[0];
