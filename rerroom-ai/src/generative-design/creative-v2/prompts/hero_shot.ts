
import type {ColorPalette,RoomContext,StyleProfile} from '../../core/types';
import type {CreativeDirection} from '../types';

export interface CreativePromptSpec {id:string;label:string;positive:string;negative:string[];constraints:string[];cameraHint:string;editHint:string;}

export function buildhero_shotPrompt(room:RoomContext,style:StyleProfile,palette:ColorPalette,direction:CreativeDirection):CreativePromptSpec{
  return {id:'prompt-hero-shot',label:'Editorial hero-angle render',positive:`Editorial hero-angle render interior for a ${room.roomType}. ${style.summary}. ${palette.description}. ${direction.keywords.slice(0,6).join(', ')}.`,negative:['structural changes','warped walls','moved windows','moved doors','incorrect perspective','floating furniture',...direction.avoid],constraints:['Preserve the measured room envelope','Preserve openings and major architectural features','Keep furniture scale plausible','Use palette colors by semantic role'],cameraHint:'hero 35mm perspective',editHint:'Apply only aesthetic deltas so iterative revisions remain anchored.'};
}
