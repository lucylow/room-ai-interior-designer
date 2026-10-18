
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'organic-kitchen',name:'Organic Modern Kitchen',roomId:'demo-room-main',prompt:'Create a organic-modern concept with travertine-ink color guidance and a open-flow layout. Preserve architecture and measurements.',styles:['organic-modern'],palettes:['travertine-ink'],layoutGoals:['open-flow'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['organic-modern'] as any,primary:'organic-modern' as any},colors:{...mockIntent.colors,paletteIds:['travertine-ink']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
