
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'contemporary-office',name:'Contemporary Office',roomId:'demo-room-main',prompt:'Create a contemporary concept with contemporary-sand color guidance and a symmetry layout. Preserve architecture and measurements.',styles:['contemporary'],palettes:['contemporary-sand'],layoutGoals:['symmetry'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['contemporary'] as any,primary:'contemporary' as any},colors:{...mockIntent.colors,paletteIds:['contemporary-sand']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
