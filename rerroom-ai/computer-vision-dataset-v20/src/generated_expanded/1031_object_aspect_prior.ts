export interface ObjectAspectPriorDatasetModuleInput {
  values:number[];
  confidence:number;
  prior:number;
  tags:string[];
}

export interface ObjectAspectPriorDatasetModuleOutput {
  name:"object_aspect_prior";
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

export function runObjectAspectPriorDatasetModule(input:ObjectAspectPriorDatasetModuleInput):ObjectAspectPriorDatasetModuleOutput {
  const mean=Math.abs(Math.tanh(finiteMean(input.values)));
  const score=normalize(input.confidence*0.60+input.prior*0.20+mean*0.20);
  const severity=score>=0.82?"info":score>=0.55?"review":"block";
  const flags:string[]=score<0.55?["insufficient_evidence"]:[];
  if(input.tags.includes("hard_case")) flags.push("hard_case");
  return {name:"object_aspect_prior",score,confidence:score,severity,flags,metadata:{module:"object_aspect_prior",deterministic:true}};
}

export function summarizeObjectAspectPriorDatasetModule(output:ObjectAspectPriorDatasetModuleOutput):string {
  return `${output.name}: ${output.severity} (${output.score.toFixed(3)})`;
}

export function resetObjectAspectPriorDatasetModule():ObjectAspectPriorDatasetModuleOutput {
  return {name:"object_aspect_prior",score:0,confidence:0,severity:"block",flags:["not_initialized"],metadata:{module:"object_aspect_prior"}};
}
