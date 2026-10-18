
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'minimalist-rental',name:'Minimalist Rental',roomId:'demo-room-main',prompt:'Create a minimalist concept with minimal-mist color guidance and a open-flow layout. Preserve architecture and measurements.',styles:['minimalist'],palettes:['minimal-mist'],layoutGoals:['open-flow'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['minimalist'] as any,primary:'minimalist' as any},colors:{...mockIntent.colors,paletteIds:['minimal-mist']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
