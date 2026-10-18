
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'modern-family',name:'Modern Family Living',roomId:'demo-room-main',prompt:'Create a modern concept with modern-neutral color guidance and a conversation layout. Preserve architecture and measurements.',styles:['modern'],palettes:['modern-neutral'],layoutGoals:['conversation'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['modern'] as any,primary:'modern' as any},colors:{...mockIntent.colors,paletteIds:['modern-neutral']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
