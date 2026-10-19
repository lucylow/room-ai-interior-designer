import type { TrainingCheckpoint } from '../core/types';
export class CheckpointManager { private items:TrainingCheckpoint[]=[]; save(c:TrainingCheckpoint){this.items.push(c);} latest(){return this.items[this.items.length-1];} bestBy(metric:'psnr'|'ssim'|'loss'){return [...this.items].sort((a,b)=>metric==='loss'?a.loss-b.loss:b[metric]-a[metric])[0];} list(){return [...this.items];}}
