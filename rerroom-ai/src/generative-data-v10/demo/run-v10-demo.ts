import { auditV10, GENERATIVE_DATA_V10 } from "../index";
import { compilePrompt } from "../engines/prompt-compiler";
import { qualityGate } from "../engines/quality-gate";
import { nearestStyles } from "../engines/style-neighbor-graph";

const audit = auditV10();
const compiled = compilePrompt({ style: "scandinavian", palette: "nordic_fog", room: "living room", intent: "make the seating area lighter and calmer", constraints: ["preserve door swing", "preserve window"] });
const gate = qualityGate({ visual: 0.91, spatial: 0.97, groundedness: 0.94, maxGeometryDriftMm: 3 });

const demo = {
  version: audit.version,
  counts: audit.counts,
  splitCounts: audit.splitCounts,
  styleCoverageTop: Object.entries(audit.styleCoverage).sort((a,b)=>b[1]-a[1]).slice(0,8),
  roomCoverageTop: Object.entries(audit.roomCoverage).sort((a,b)=>b[1]-a[1]).slice(0,8),
  quality: audit.quality,
  compiledPrompt: compiled,
  qualityGate: gate,
  nearestScandinavianStyles: nearestStyles("scandinavian"),
  sampleConcepts: GENERATIVE_DATA_V10.generation.slice(0,3).map((x)=>({id:x.id, style:x.style, roomType:x.roomType, paletteId:x.paletteId, prompt:x.prompt})),
};

console.log(JSON.stringify(demo, null, 2));
