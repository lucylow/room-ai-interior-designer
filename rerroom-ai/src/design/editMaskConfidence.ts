export interface MaskQuality { coverage: number; boundaryQuality: number; depthAlignment: number; temporalStability: number; overall: number; confidence: number; editable: boolean; warnings: string[]; recoveryActions: string[]; }
const clamp = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

export function evaluateEditMask(coverage: number, boundaryQuality: number, depthAlignment: number, temporalStability: number): MaskQuality {
  const metrics = { coverage: clamp(coverage), boundaryQuality: clamp(boundaryQuality), depthAlignment: clamp(depthAlignment), temporalStability: clamp(temporalStability) };
  const overall = metrics.coverage * 0.2 + metrics.boundaryQuality * 0.3 + metrics.depthAlignment * 0.3 + metrics.temporalStability * 0.2;
  const weakest = Object.entries(metrics).sort((a, b) => a[1] - b[1])[0][0];
  const warnings = [metrics.coverage < 0.7 ? "Mask coverage is incomplete" : "", metrics.boundaryQuality < 0.7 ? "Mask edges need refinement" : "", metrics.depthAlignment < 0.7 ? "Mask is not aligned with scene depth" : "", metrics.temporalStability < 0.7 ? "Mask is unstable across frames" : ""].filter(Boolean);
  const recoveryActions = [metrics.coverage < 0.7 ? "expand-segmentation" : "", metrics.boundaryQuality < 0.7 ? "refine-boundary" : "", metrics.depthAlignment < 0.7 ? "reproject-depth" : "", metrics.temporalStability < 0.7 ? "fuse-more-frames" : ""].filter(Boolean);
  const confidence = Math.max(0, overall * (1 - warnings.length * 0.08));
  return { ...metrics, overall, confidence, editable: overall >= 0.72 && metrics.boundaryQuality >= 0.6 && metrics.depthAlignment >= 0.6, warnings: warnings.length ? warnings : [`Strongest improvement opportunity: ${weakest}`], recoveryActions };
}
