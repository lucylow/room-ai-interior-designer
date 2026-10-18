
import type {DesignIntent} from '../../core/types';
import type {CreativeScenario} from '../types';
import {mockIntent} from '../../mock/data';
export const projectScenario:CreativeScenario={id:'boho-studio',name:'Bohemian Studio',roomId:'demo-room-main',prompt:'Create a bohemian concept with boho-rust color guidance and a gallery layout. Preserve architecture and measurements.',styles:['bohemian'],palettes:['boho-rust'],layoutGoals:['gallery'],revisionPrompts:['Make it warmer','Make it brighter','Reduce clutter','Change only the palette','Keep the layout but change furniture styling'],expectedViews:['2D plan','3D hero','material board','before/after','client comparison']};
export const intent:DesignIntent={...mockIntent,roomType:'living-room',userPrompt:projectScenario.prompt,style:{...mockIntent.style,enabled:['bohemian'] as any,primary:'bohemian' as any},colors:{...mockIntent.colors,paletteIds:['boho-rust']},preserveArchitecture:true,preserveOpenings:true,preserveMeasurements:true};
