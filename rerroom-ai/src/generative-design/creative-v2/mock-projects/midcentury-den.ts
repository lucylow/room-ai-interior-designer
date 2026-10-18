
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'midcentury-den',name:'Mid-century Den',roomId:'demo-room-main',prompt:'Create a mid-century concept with midcentury-olive color guidance and a conversation layout. Preserve architecture and measurements.',styles:['mid-century'],palettes:['midcentury-olive'],layoutGoals:['conversation'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['mid-century'] as any,primary:'mid-century' as any},colors:{...mockIntent.colors,paletteIds:['midcentury-olive']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
