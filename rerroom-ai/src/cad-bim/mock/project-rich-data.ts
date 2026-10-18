export interface RichRoomMock { id:string; name:string; roomType:string; width:number; depth:number; style:string; status:string; layoutCount:number; revisionCount:number; }
export const richRoomMocks:RichRoomMock[]=[
 {id:'room-living',name:'Great Room',roomType:'living-room',width:4.8,depth:4.2,style:'Warm Contemporary',status:'concepting',layoutCount:5,revisionCount:7},
 {id:'room-kitchen',name:'Kitchen',roomType:'kitchen',width:4.3,depth:3.8,style:'Warm Japandi',status:'review',layoutCount:4,revisionCount:5},
 {id:'room-primary',name:'Primary Bedroom',roomType:'bedroom',width:4.1,depth:4.0,style:'Soft Minimal',status:'approved',layoutCount:3,revisionCount:4},
 {id:'room-office',name:'Home Office',roomType:'office',width:3.2,depth:2.9,style:'Quiet Modern',status:'concepting',layoutCount:4,revisionCount:3},
 {id:'room-dining',name:'Dining Room',roomType:'dining-room',width:3.5,depth:3.1,style:'Modern Traditional',status:'draft',layoutCount:2,revisionCount:1},
];
export const richActivities=[
 'Source model imported and verified', 'Zone map generated', 'Layout option A generated', 'Layout option B generated',
 'Client comment: keep the window wall open', 'Designer moved sofa to improve circulation', 'Client approved material palette',
 'AI generated a storage alternative', 'Revision branch created from option B', '3D presentation camera saved',
];
export const richComments=[
 {id:'c1',roomId:'room-living',author:'Client',text:'Please keep the window wall visually light.',linkedId:'window-1'},
 {id:'c2',roomId:'room-living',author:'Designer',text:'I kept the sofa footprint and tested two chair positions.',linkedId:'plan-a'},
 {id:'c3',roomId:'room-kitchen',author:'Client',text:'I want a larger prep surface but a clear path to the dining room.',linkedId:'plan-k-2'},
];
