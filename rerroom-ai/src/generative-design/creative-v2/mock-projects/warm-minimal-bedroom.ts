
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'warm-minimal-bedroom',name:'Warm Minimal Bedroom',roomId:'demo-room-main',prompt:'Create a warm-minimal concept with warm-white-sand color guidance and a rest-first layout. Preserve architecture and measurements.',styles:['warm-minimal'],palettes:['warm-white-sand'],layoutGoals:['rest-first'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['warm-minimal'] as any,primary:'warm-minimal' as any},colors:{...mockIntent.colors,paletteIds:['warm-white-sand']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
