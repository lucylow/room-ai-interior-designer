import { clamp } from '../core/types';
export interface RenderControl { intensity:number; enabled:boolean; budget:number; }
export function applyThumbnailQuality(c:RenderControl):RenderControl{ const ratio=c.budget>0?Math.min(1,c.budget/100):0; return {...c,intensity:clamp(c.intensity*ratio),enabled:c.enabled&&ratio>0}; }
export function scoreThumbnailQuality(c:RenderControl):number{ return clamp((c.intensity*0.7+(c.enabled?0.3:0))*Math.min(1,c.budget/100)); }
