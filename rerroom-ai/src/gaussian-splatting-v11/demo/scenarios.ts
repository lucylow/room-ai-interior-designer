import type { SceneQuery } from '../core/types';
export interface DemoScenario {id:string;name:string;query:SceneQuery;style:string;goal:string;budget:number;}
export const DEMO_SCENARIOS:DemoScenario[]=[
{id:'scn-modern-living',name:'Modern living room relight',query:{text:'sofa window wood',roomId:'room-demo-01',maxResults:8,minConfidence:0.4},style:'modern',goal:'warmer evening lighting',budget:2500},
{id:'scn-scandi-tour',name:'Scandinavian room tour',query:{text:'rug plant table',roomId:'room-demo-01',maxResults:8,minConfidence:0.45},style:'scandinavian',goal:'bright and calm',budget:1800},
{id:'scn-industrial-material',name:'Industrial material edit',query:{text:'metal table wall',roomId:'room-demo-01',maxResults:8,minConfidence:0.5},style:'industrial',goal:'dark metal accents',budget:2200},
{id:'scn-cad-anchor',name:'CAD anchored concept',query:{text:'window door wall',roomId:'room-demo-01',maxResults:8,minConfidence:0.55},style:'minimalist',goal:'preserve openings',budget:3000}
];
