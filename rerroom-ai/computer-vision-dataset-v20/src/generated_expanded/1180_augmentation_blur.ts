export interface AugmentationBlurDatasetModuleInput {
  values:number[];
  confidence:number;
  prior:number;
  tags:string[];
}

export interface AugmentationBlurDatasetModuleOutput {
  name:"augmentation_blur";
  score:number;
  confidence:number;
  severity:"info"|"review"|"block";
  flags:string[];
  metadata:Record<string,string|number|boolean>;
}

const LIMIT=1;

function finiteMean(values:number[]):number {
  const clean=values.filter(Number.isFinite);
  return clean.length ? clean.reduce((a,b)=>a+b,0)/clean.length : 0;
}

function normalize(value:number):number {
  return Math.max(0,Math.min(LIMIT,value));
}

export function runAugmentationBlurDatasetModule(input:AugmentationBlurDatasetModuleInput):AugmentationBlurDatasetModuleOutput {
  const mean=Math.abs(Math.tanh(finiteMean(input.values)));
  const score=normalize(input.confidence*0.60+input.prior*0.20+mean*0.20);
  const severity=score>=0.82?"info":score>=0.55?"review":"block";
  const flags:string[]=score<0.55?["insufficient_evidence"]:[];
  if(input.tags.includes("hard_case")) flags.push("hard_case");
  return {name:"augmentation_blur",score,confidence:score,severity,flags,metadata:{module:"augmentation_blur",deterministic:true}};
}

export function summarizeAugmentationBlurDatasetModule(output:AugmentationBlurDatasetModuleOutput):string {
  return `${output.name}: ${output.severity} (${output.score.toFixed(3)})`;
}

export function resetAugmentationBlurDatasetModule():AugmentationBlurDatasetModuleOutput {
  return {name:"augmentation_blur",score:0,confidence:0,severity:"block",flags:["not_initialized"],metadata:{module:"augmentation_blur"}};
}
