import type { ReconstructionJob, QualityTier, ReconstructionStage } from '../core/types';
import { trainingConfig } from '../training/configs';

const STAGE_DEFS: Array<[string,string[]]> = [
  ['ingest', []], ['frame-quality', ['ingest']], ['camera-solve', ['frame-quality']],
  ['sparse-init', ['camera-solve']], ['gaussian-train', ['sparse-init']], ['semantic-pass', ['gaussian-train']],
  ['lod-build', ['semantic-pass']], ['render-preview', ['lod-build']], ['cad-bim-align', ['camera-solve']],
  ['handoff-check', ['render-preview','cad-bim-align']],
];

export function createReconstructionJob(id:string, sceneId:string, manifestId:string, tier:QualityTier='balanced', seed=42):ReconstructionJob {
  const stages: ReconstructionStage[] = STAGE_DEFS.map(([name,deps],i) => ({
    id:`stage-${i}-${name}`, name, status:'queued',
    dependsOn: deps.map(dep => `stage-${STAGE_DEFS.findIndex(x => x[0] === dep)}-${dep}`), progress:0,
  }));
  return { id, sceneId, manifestId, qualityTier:tier, gpuRequired:true, seed, stages };
}
export function trainingSummary(tier:QualityTier){ const c=trainingConfig(tier); return {iterations:c.iterations,shDegree:c.shDegree,densifyUntil:c.densifyUntil,evalEvery:c.evalEvery}; }
