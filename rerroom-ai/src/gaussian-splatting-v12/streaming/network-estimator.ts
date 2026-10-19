export type NetworkSample={timestampMs:number;bytes:number;durationMs:number};
export function throughput(samples:NetworkSample[]){const bytes=samples.reduce((s,x)=>s+x.bytes,0);const ms=samples.reduce((s,x)=>s+x.durationMs,0);return bytes/Math.max(1,ms)*1000}
export function classify(bps:number){return bps>8_000_000?'wifi-fast':bps>2_000_000?'wifi-medium':bps>700_000?'cellular-good':'cellular-poor'}
export function budgetForFrame(bps:number,targetFps=30){return Math.max(50_000,Math.floor(bps/Math.max(1,targetFps)*.65))}
