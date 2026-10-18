export interface CalculationLine{label:string;value:number;formula:string;}
export const weightedMean=(lines:CalculationLine[])=>{const total=lines.reduce((s,l)=>s+l.value,0);return lines.length?total/lines.length:0;};
export const explainWeightedMean=(lines:CalculationLine[])=>({result:weightedMean(lines),lines,summary:`Combined ${lines.length} evidence lines with equal contribution.`});
