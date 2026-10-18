
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'japandi-retreat',name:'Japandi Retreat',roomId:'demo-room-main',prompt:'Create a japandi concept with japandi-clay color guidance and a asymmetry layout. Preserve architecture and measurements.',styles:['japandi'],palettes:['japandi-clay'],layoutGoals:['asymmetry'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['japandi'] as any,primary:'japandi' as any},colors:{...mockIntent.colors,paletteIds:['japandi-clay']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
