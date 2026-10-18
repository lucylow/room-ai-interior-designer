export interface MockRoomRecord {
 id:string; name:string; type:'living-room'|'kitchen'|'bedroom'|'office'|'dining-room';
 widthM:number; depthM:number; ceilingM:number; style:string; stage:'draft'|'concepting'|'review'|'approved';
 targetBudget:number; layoutOptions:number; openIssues:number; sourceRevision:string;
}
export const mockMultiRoomProject:MockRoomRecord[]=[
 {id:'r-living',name:'Great Room',type:'living-room',widthM:4.8,depthM:4.2,ceilingM:2.7,style:'Warm Contemporary',stage:'concepting',targetBudget:12000,layoutOptions:5,openIssues:1,sourceRevision:'REV-A'},
 {id:'r-kitchen',name:'Kitchen',type:'kitchen',widthM:4.3,depthM:3.8,ceilingM:2.7,style:'Warm Japandi',stage:'review',targetBudget:18000,layoutOptions:4,openIssues:2,sourceRevision:'REV-C'},
 {id:'r-primary',name:'Primary Bedroom',type:'bedroom',widthM:4.1,depthM:4.0,ceilingM:2.7,style:'Soft Minimal',stage:'approved',targetBudget:9500,layoutOptions:3,openIssues:0,sourceRevision:'REV-B'},
 {id:'r-office',name:'Home Office',type:'office',widthM:3.2,depthM:2.9,ceilingM:2.7,style:'Quiet Modern',stage:'concepting',targetBudget:7000,layoutOptions:4,openIssues:1,sourceRevision:'REV-A'},
 {id:'r-dining',name:'Dining Room',type:'dining-room',widthM:3.5,depthM:3.1,ceilingM:2.7,style:'Modern Traditional',stage:'draft',targetBudget:8000,layoutOptions:2,openIssues:3,sourceRevision:'REV-A'},
];
export const mockFurnitureInstances = Array.from({length:36},(_,i)=>({
 id:`instance-${String(i+1).padStart(2,'0')}`,
 roomId:mockMultiRoomProject[i%mockMultiRoomProject.length].id,
 category:['sofa','chair','table','storage','lamp','rug','desk','bed','dining-table'][i%9],
 widthM:[2.4,.8,1.2,.9,.4,2.4,1.4,1.6,1.8][i%9],
 depthM:[.9,.8,.7,.4,.4,1.7,.7,2.1,.9][i%9],
 heightM:[.8,.85,.4,2.0,1.7,.02,.74,.65,.76][i%9],
 source:'mock-catalog',
 approved:i%7===0,
}));
export const mockLayoutNames=['Conversation A','Conversation B','Media Focus','Open Circulation','Hosting Plus','Compact Work','Quiet Corner','Balanced Storage'];
