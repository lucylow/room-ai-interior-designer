export interface ImageQualityMetrics {psnr:number;ssim:number;lpipsProxy:number;depthCompleteness:number;semanticAccuracy:number;}
export function aggregateQuality(m:ImageQualityMetrics):number{return Math.max(0,Math.min(1,0.25*Math.min(1,m.psnr/35)+0.25*m.ssim+0.2*(1-m.lpipsProxy)+0.15*m.depthCompleteness+0.15*m.semanticAccuracy));}
export function psnrFromMse(mse:number):number{return mse<=1e-12?99:10*Math.log10(1/mse);}
export function ssimProxy(a:number,b:number):number{return Math.max(0,Math.min(1,1-Math.abs(a-b)));}
