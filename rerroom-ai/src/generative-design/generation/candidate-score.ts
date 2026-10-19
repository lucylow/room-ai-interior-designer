import type {RoomContext,DesignIntent,StyleMatch,PaletteMatch,LayoutAdvice,FurnitureIdea} from '../core/types';
import {clamp,weightedMean} from '../core/utils';
export const candidateScore=(room:RoomContext,intent:DesignIntent,style:StyleMatch,palette:PaletteMatch,layouts:LayoutAdvice[],furniture:FurnitureIdea[]):number=>{
 const layout=layouts[0]?.score??.5; const furnitureScore=furniture.length?furniture.reduce((s,f)=>s+f.confidence,0)/furniture.length:.75;
 const goalBias=intent.priorities.reduce((s,p)=>s+(p==='style'?.07:p==='layout'?.1:p==='comfort'?.08:p==='color'?.06:0),0);
 return clamp(weightedMean([{value:style.score,weight:.25},{value:palette.score,weight:.18},{value:layout,weight:.27},{value:furnitureScore,weight:.15},{value:room.visualBalanceScore,weight:.15}])+goalBias);
};
