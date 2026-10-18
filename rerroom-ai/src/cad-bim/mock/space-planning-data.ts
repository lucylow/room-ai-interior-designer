import { AuthoritativeModel, RemodelProject } from '../core/types';
import { RoomContext, UserPreferences } from '../../core/types';
import { FurnitureSpec, ProjectWorkspaceState, Zone } from '../planning/types';

export const mockFurnitureCatalog:FurnitureSpec[]=[
 {id:'f-sofa-01',name:'Lounge Sofa 2400',category:'sofa',dimensions:{width:2.4,depth:.92,height:.84},clearance:{front:.75,back:.1,left:.25,right:.25},tags:['warm','linen','conversation'],roomTypes:['living-room']},
 {id:'f-chair-01',name:'Accent Chair',category:'chair',dimensions:{width:.82,depth:.82,height:.84},clearance:{front:.6,back:.1,left:.15,right:.15},tags:['accent','light'],roomTypes:['living-room','bedroom']},
 {id:'f-table-01',name:'Coffee Table',category:'coffee-table',dimensions:{width:1.25,depth:.72,height:.4},clearance:{front:.4,back:.4,left:.4,right:.4},tags:['oak','low'],roomTypes:['living-room']},
 {id:'f-media-01',name:'Media Console',category:'media',dimensions:{width:1.8,depth:.42,height:.52},clearance:{front:1.7,back:.08,left:.1,right:.1},tags:['storage','media'],roomTypes:['living-room','bedroom']},
 {id:'f-desk-01',name:'Work Desk',category:'desk',dimensions:{width:1.45,depth:.72,height:.74},clearance:{front:1,back:.1,left:.2,right:.2},tags:['work','storage'],roomTypes:['office','bedroom']},
 {id:'f-bed-01',name:'Queen Bed',category:'bed',dimensions:{width:1.6,depth:2.1,height:.65},clearance:{front:.7,back:.05,left:.7,right:.7},tags:['sleep','soft'],roomTypes:['bedroom']},
 {id:'f-night-01',name:'Nightstand',category:'nightstand',dimensions:{width:.5,depth:.42,height:.55},clearance:{front:.55,back:.05,left:.08,right:.08},tags:['storage','bedside'],roomTypes:['bedroom']},
 {id:'f-dining-01',name:'Dining Table 1800',category:'dining-table',dimensions:{width:1.8,depth:.9,height:.76},clearance:{front:.85,back:.85,left:.8,right:.8},tags:['dining','hosting'],roomTypes:['dining-room','kitchen']},
 {id:'f-island-01',name:'Kitchen Island 1800',category:'island',dimensions:{width:1.8,depth:.9,height:.92},clearance:{front:1.05,back:1.05,left:.75,right:.75},tags:['prep','social'],roomTypes:['kitchen']},
 {id:'f-storage-01',name:'Tall Storage',category:'storage',dimensions:{width:.9,depth:.42,height:2.2},clearance:{front:.9,back:.05,left:.05,right:.05},tags:['storage','vertical'],roomTypes:['living-room','bedroom','office','entryway']},
 {id:'f-rug-01',name:'Large Rug',category:'rug',dimensions:{width:2.4,depth:1.7,height:.015},clearance:{front:0,back:0,left:0,right:0},tags:['textile','anchor'],roomTypes:['living-room','bedroom']},
 {id:'f-lamp-01',name:'Arc Floor Lamp',category:'lighting',dimensions:{width:.38,depth:.38,height:1.75},clearance:{front:.35,back:.15,left:.15,right:.15},tags:['lighting','ambient'],roomTypes:['living-room','bedroom','office']},
];

export const mockZones:Zone[]=[
 {id:'zone-living-1',name:'Conversation Zone',type:'living',polygon:[{x:.3,z:.4},{x:4.2,z:.4},{x:4.2,z:2.8},{x:.3,z:2.8}],priority:90,minAreaM2:6,preferredAreaM2:9.36,maxAreaM2:11,colorKey:'living',notes:['Face primary seating toward the room center.']},
 {id:'zone-circulation-1',name:'Primary Path',type:'circulation',polygon:[{x:4.2,z:.2},{x:4.7,z:.2},{x:4.7,z:4.0},{x:4.2,z:4.0}],priority:100,minAreaM2:1.4,preferredAreaM2:1.9,maxAreaM2:2.4,colorKey:'circulation',notes:['Keep clear.']},
 {id:'zone-storage-1',name:'Storage Edge',type:'storage',polygon:[{x:.2,z:3.2},{x:1.6,z:3.2},{x:1.6,z:4.0},{x:.2,z:4.0}],priority:55,minAreaM2:1,preferredAreaM2:1.12,maxAreaM2:1.4,colorKey:'storage',notes:[]},
];

export function mockPreferences():UserPreferences{return {preferredStyles:['warm contemporary','japandi'],avoidedStyles:['maximalist'],preferredColors:['warm ivory','oak','sage'],avoidedColors:['neon'],materials:['oak','linen','stone'],dislikes:['visual clutter'],householdNeeds:['hosting','remote work'],priorities:['circulation','comfort','storage'],budgetMin:6000,budgetMax:14000,currency:'CAD',renovationHorizon:'soon',maintenanceTolerance:'medium',sustainabilityPriority:.7,accessibilityPriority:.45,shoppingEnabled:true,learningEnabled:true,historyEnabled:true};}

export function mockRoomContext(model:AuthoritativeModel):RoomContext{return {roomId:'demo-living-room',name:'Great Room',roomType:'living-room',measurements:{widthM:4.8,depthM:4.2,ceilingM:2.7,confidence:.96},objects:model.features.filter(f=>f.kind==='furniture').map(f=>({id:f.id,type:'furniture',label:f.name||f.id,position:f.center||{x:2,y:.4,z:2},size:f.size||{width:1,depth:1,height:1},rotationY:f.transform?.rotation.y||0,material:f.materialRef,styleTags:['existing'],locked:false,confidence:.98})),openings:model.features.filter(f=>f.kind==='door'||f.kind==='window').map(f=>({id:f.id,kind:f.kind==='door'?'door':'window',x:f.center?.x||0,z:f.center?.z||0,width:f.size?.width||.9,height:f.size?.height||2.1,swing:'none'})),naturalLightScore:.82,circulationScore:.74,clutterScore:.46,storageScore:.61,visualBalanceScore:.68,accessibilityScore:.79,safetyScore:.9,acousticScore:.64,comfortScore:.77,sustainabilityScore:.73,workflowScore:.81,styleSignals:{'warm contemporary':.91,japandi:.72,scandinavian:.68},colorSignals:{ivory:.86,oak:.83,sage:.65},inferredFunctions:['lounging','hosting','remote work'],constraints:['keep windows','keep existing sofa']};}

export function createMockWorkspace(project:RemodelProject,model:AuthoritativeModel):ProjectWorkspaceState{
 const tasks=[
  {id:'task-1',projectId:project.id,title:'Confirm room dimensions',ownerRole:'designer',status:'done',priority:'high',dueDay:1,linkedIds:[model.id]},
  {id:'task-2',projectId:project.id,title:'Generate three layout options',ownerRole:'designer',status:'in-progress',priority:'high',dueDay:2,linkedIds:['zone-living-1']},
  {id:'task-3',projectId:project.id,title:'Client selects preferred layout',ownerRole:'client',status:'todo',priority:'high',dueDay:4,linkedIds:[]},
  {id:'task-4',projectId:project.id,title:'Refine finishes and lighting',ownerRole:'designer',status:'todo',priority:'medium',dueDay:5,linkedIds:[]},
  {id:'task-5',projectId:project.id,title:'Create construction handoff',ownerRole:'architect',status:'todo',priority:'high',dueDay:7,linkedIds:[]},
 ] as any;
 const milestones=[{id:'milestone-1',projectId:project.id,name:'Source verified',status:'complete',day:1,requiredTaskIds:['task-1']},{id:'milestone-2',projectId:project.id,name:'Concept review',status:'active',day:4,requiredTaskIds:['task-2','task-3']},{id:'milestone-3',projectId:project.id,name:'Handoff ready',status:'upcoming',day:7,requiredTaskIds:['task-4','task-5']}];
 const members=[{id:'mem-1',projectId:project.id,name:'Avery Designer',role:'designer',initials:'AD'},{id:'mem-2',projectId:project.id,name:'Morgan Client',role:'client',initials:'MC'},{id:'mem-3',projectId:project.id,name:'Jordan Architect',role:'architect',initials:'JA'}];
 const artifacts=[{id:'art-cad',projectId:project.id,type:'cad',name:'existing-floor-plan.dxf',version:1,status:'approved',createdAt:new Date().toISOString(),checksum:'cad-demo',tags:['source','authoritative']},{id:'art-bim',projectId:project.id,type:'bim',name:'model.ifc',version:1,status:'approved',createdAt:new Date().toISOString(),checksum:'bim-demo',tags:['source','authoritative']},{id:'art-plan',projectId:project.id,type:'plan',name:'living-layout-option-a.svg',version:1,status:'review',createdAt:new Date().toISOString(),checksum:'plan-demo',tags:['layout','client-review']}];
 const activities=[{id:'act-1',projectId:project.id,day:1,kind:'import',message:'CAD/BIM sources verified',actor:'Avery',linkedIds:[model.id]},{id:'act-2',projectId:project.id,day:2,kind:'layout',message:'Three layout candidates generated',actor:'AI',linkedIds:['task-2']},{id:'act-3',projectId:project.id,day:2,kind:'comment',message:'Keep window wall clear',actor:'Morgan',linkedIds:['wall-north']}];
 return {project,zones:mockZones,furniture:mockFurnitureCatalog,plans:[],activePlanId:undefined,revisions:[],tasks,milestones:milestones as any,members:members as any,artifacts:artifacts as any,activities:activities as any,viewMode:'plan',selectedIds:[]};
}
