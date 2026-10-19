export type BenchmarkCase={id:string;frames:number;gaussians:number;psnr:number;ssim:number;depthCompleteness:number;renderMs:number};
export function scoreCase(c:BenchmarkCase){const quality=c.psnr/40*.3+c.ssim*.25+c.depthCompleteness*.2+(1-Math.min(1,c.renderMs/50))*.25;return{...c,score:quality}}
export function rank(cases:BenchmarkCase[]){return[...cases].map(scoreCase).sort((a,b)=>b.score-a.score)}
export function summary(cases:BenchmarkCase[]){const r=rank(cases);return{count:r.length,best:r[0],meanScore:r.reduce((s,x)=>s+x.score,0)/(r.length||1)}}
