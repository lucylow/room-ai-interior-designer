export interface WindowFrameDatasetModuleInput {
  values:number[];
  confidence:number;
  prior:number;
  tags:string[];
}

export interface WindowFrameDatasetModuleOutput {
  name:"window_frame";
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

export function runWindowFrameDatasetModule(input:WindowFrameDatasetModuleInput):WindowFrameDatasetModuleOutput {
  const mean=Math.abs(Math.tanh(finiteMean(input.values)));
  const score=normalize(input.confidence*0.60+input.prior*0.20+mean*0.20);
  const severity=score>=0.82?"info":score>=0.55?"review":"block";
  const flags:string[]=score<0.55?["insufficient_evidence"]:[];
  if(input.tags.includes("hard_case")) flags.push("hard_case");
  return {name:"window_frame",score,confidence:score,severity,flags,metadata:{module:"window_frame",deterministic:true}};
}

export function summarizeWindowFrameDatasetModule(output:WindowFrameDatasetModuleOutput):string {
  return `${output.name}: ${output.severity} (${output.score.toFixed(3)})`;
}

export function resetWindowFrameDatasetModule():WindowFrameDatasetModuleOutput {
  return {name:"window_frame",score:0,confidence:0,severity:"block",flags:["not_initialized"],metadata:{module:"window_frame"}};
}
