
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'industrial-loft',name:'Industrial Loft',roomId:'demo-room-main',prompt:'Create a industrial concept with industrial-charcoal color guidance and a open-flow layout. Preserve architecture and measurements.',styles:['industrial'],palettes:['industrial-charcoal'],layoutGoals:['open-flow'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['industrial'] as any,primary:'industrial' as any},colors:{...mockIntent.colors,paletteIds:['industrial-charcoal']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
