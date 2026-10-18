
import type {ColorPalette,RoomContext,StyleProfile} from '../../core/types';
import type {CreativeDirection} from '../types';

export interface CreativePromptSpec {id:string;label:string;positive:string;negative:string[];constraints:string[];cameraHint:string;editHint:string;}

export function buildmaterial_closePrompt(room:RoomContext,style:StyleProfile,palette:ColorPalette,direction:CreativeDirection):CreativePromptSpec{
  return {id:'prompt-material-close',label:'Material-forward detail render',positive:`Material-forward detail render interior for a ${room.roomType}. ${style.summary}. ${palette.description}. ${direction.keywords.slice(0,6).join(', ')}.`,negative:['structural changes','warped walls','moved windows','moved doors','incorrect perspective','floating furniture',...direction.avoid],constraints:['Preserve the measured room envelope','Preserve openings and major architectural features','Keep furniture scale plausible','Use palette colors by semantic role'],cameraHint:'70mm material detail',editHint:'Apply only aesthetic deltas so iterative revisions remain anchored.'};
}
