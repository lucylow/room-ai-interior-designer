export interface LossBundle {photo:number;ssim:number;depth:number;opacity:number;total:number;}
export function combineLosses(x:{photo:number;ssim:number;depth:number;opacity:number},w={photo:1,ssim:0.2,depth:0.1,opacity:0.01}):LossBundle{const total=w.photo*x.photo+w.ssim*x.ssim+w.depth*x.depth+w.opacity*x.opacity;return {...x,total};}
export function smoothLoss(history:number[],window=5):number{if(!history.length)return 0;const tail=history.slice(-window);return tail.reduce((a,b)=>a+b,0)/tail.length;}
