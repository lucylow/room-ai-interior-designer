import { detectLikelyUnit, normalizeLength } from '../core/units';
export interface CalibrationInput { declaredUnit?:string; sampledLengths:number[]; referenceMeters?:number; }
export interface CalibrationResult { unit:string; scaleToMeters:number; confidence:number; method:'declared'|'heuristic'|'reference'; warnings:string[]; }
export function calibrateScale(input:CalibrationInput):CalibrationResult {
  if(input.declaredUnit) return {unit:input.declaredUnit,scaleToMeters:normalizeLength(1,input.declaredUnit),confidence:1,method:'declared',warnings:[]};
  if(input.referenceMeters && input.sampledLengths.length){ const sample=Math.max(...input.sampledLengths); if(sample>0) return {unit:'reference',scaleToMeters:input.referenceMeters/sample,confidence:.92,method:'reference',warnings:[]}; }
  const guess=detectLikelyUnit(input.sampledLengths); const units:{[k:string]:number}={mm:.001,cm:.01,m:1,in:.0254,ft:.3048}; return {unit:guess.unit,scaleToMeters:units[guess.unit]??1,confidence:guess.confidence,method:'heuristic',warnings:['Scale inferred from numeric magnitude; confirm against a known dimension before construction handoff.']};
}
