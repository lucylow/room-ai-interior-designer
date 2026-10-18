import type {InsightTrend} from './types';
import {clamp} from '../core/math';
export interface Forecast {metric:string;nextValue:number;range:[number,number];confidence:number;}
export const forecastOne=(t:InsightTrend,steps=1):Forecast=>{const last=t.points.at(-1)?.value??0;const next=last+t.slope*steps;const spread=Math.max(.05,Math.abs(t.change)*.25);return {metric:t.metric,nextValue:clamp(next),range:[clamp(next-spread),clamp(next+spread)],confidence:clamp(t.confidence-.06*steps)};};
