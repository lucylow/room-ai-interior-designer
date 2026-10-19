export interface CaptureGeometryDatasetModuleInput {
  values:number[];
  confidence:number;
  prior:number;
  tags:string[];
}

export interface CaptureGeometryDatasetModuleOutput {
  name:"capture_geometry";
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

export function runCaptureGeometryDatasetModule(input:CaptureGeometryDatasetModuleInput):CaptureGeometryDatasetModuleOutput {
  const mean=Math.abs(Math.tanh(finiteMean(input.values)));
  const score=normalize(input.confidence*0.60+input.prior*0.20+mean*0.20);
  const severity=score>=0.82?"info":score>=0.55?"review":"block";
  const flags:string[]=score<0.55?["insufficient_evidence"]:[];
  if(input.tags.includes("hard_case")) flags.push("hard_case");
  return {name:"capture_geometry",score,confidence:score,severity,flags,metadata:{module:"capture_geometry",deterministic:true}};
}

export function summarizeCaptureGeometryDatasetModule(output:CaptureGeometryDatasetModuleOutput):string {
  return `${output.name}: ${output.severity} (${output.score.toFixed(3)})`;
}

export function resetCaptureGeometryDatasetModule():CaptureGeometryDatasetModuleOutput {
  return {name:"capture_geometry",score:0,confidence:0,severity:"block",flags:["not_initialized"],metadata:{module:"capture_geometry"}};
}
