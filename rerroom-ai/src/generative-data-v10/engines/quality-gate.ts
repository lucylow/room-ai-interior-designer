export interface QualityGate { visual:number; spatial:number; groundedness:number; pass:boolean; reasons:string[]; }
export function qualityGate(input: {visual:number; spatial:number; groundedness:number; maxGeometryDriftMm:number}): QualityGate {
  const reasons:string[]=[]; if(input.visual<0.78) reasons.push("visual score below threshold"); if(input.spatial<0.90) reasons.push("spatial score below threshold"); if(input.groundedness<0.88) reasons.push("groundedness below threshold"); if(input.maxGeometryDriftMm>12) reasons.push("geometry drift above tolerance");
  return { ...input, pass: reasons.length===0, reasons };
}

