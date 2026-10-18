import type {DesignIntent,StyleProfile,ColorPalette,RoomContext,PromptBundle,LayoutAdvice} from '../core/types';
import {STYLE_BY_ID} from '../styles';
import {PALETTE_BY_ID} from '../palettes';
export class PromptCompiler {
  compile(intent:DesignIntent,room:RoomContext,style:StyleProfile,palette?:ColorPalette,layouts:LayoutAdvice[]=[]):PromptBundle{
    const styleTokens=[...style.keywords,...style.materials,...style.furnitureShapes];
    const colorTokens=palette?palette.colors.map(c=>`${c.name} ${c.hex}`):intent.colors.customColors;
    const layoutTokens=layouts.slice(0,3).map(x=>`${x.pattern} arrangement: ${x.summary}`);
    const positive=[style.imagePromptPrefix,room.roomType,'photorealistic residential interior','accurate architecture',...styleTokens.slice(0,8),...colorTokens.slice(0,5),...layoutTokens].join(', ');
    const negative=['warped walls','moved windows','changed doors','wrong perspective','floating furniture','duplicate objects','impossible proportions',...style.avoidKeywords];
    const system='Generate a visual concept, not a construction document. Preserve all source dimensions and architectural openings. Only modify aesthetic or movable elements authorized by the intent.';
    const user=`User request: ${intent.userPrompt}. Desired changes: ${intent.desiredChanges.join(', ')}. Preserve: ${intent.preserveExistingFurniture.join(', ')||'all suitable existing architecture'}.`;
    const constraints=['preserveArchitecture','preserveOpenings','preserveMeasurements'].map(k=>`${k}=${intent[k as keyof DesignIntent]===true}`);
    return {system,user,positive,negative,constraints,styleTokens,colorTokens,layoutTokens};
  }
  style(styleId:string){return STYLE_BY_ID[styleId]}
  palette(paletteId?:string){return paletteId?PALETTE_BY_ID[paletteId]:undefined}
}
