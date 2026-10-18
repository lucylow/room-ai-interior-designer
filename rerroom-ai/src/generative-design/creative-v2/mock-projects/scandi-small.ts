
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'scandi-small',name:'Scandinavian Small Space',roomId:'demo-room-main',prompt:'Create a scandinavian concept with nordic-sage color guidance and a flexible layout. Preserve architecture and measurements.',styles:['scandinavian'],palettes:['nordic-sage'],layoutGoals:['flexible'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['scandinavian'] as any,primary:'scandinavian' as any},colors:{...mockIntent.colors,paletteIds:['nordic-sage']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
