import { createDemoAuthoritativeModel } from '../demo/demo-project';
import { createMockWorkspace, mockRoomContext, mockFurnitureCatalog } from './space-planning-data';
import { buildSceneVM } from '../visualization/scene-view-model';
import { LayoutOptimizer } from '../layout/layout-optimizer';
import { inferRoomBoundary } from '../planning/room-boundary';
import { segmentZones } from '../planning/zone-segmentation-v2';
import { mockPreferences } from './space-planning-data';
import { RemodelProject } from '../core/types';
export function buildMockDashboard(){
 const model=createDemoAuthoritativeModel(); const room=mockRoomContext(model); const prefs=mockPreferences();
 const project:RemodelProject={id:'project-demo',name:'Warm Contemporary Great Room',status:'concepting',authoritativeModel:model,overlays:[],changes:[],selectedFeatureIds:[],clientApprovedOverlayId:undefined};
 const ws=createMockWorkspace(project,model); const boundary=inferRoomBoundary(model,room.roomId); const zones=segmentZones(boundary,room.roomType); ws.zones=[...ws.zones,...zones];
 const optimizer=new LayoutOptimizer(); const plans=optimizer.optimize({model,roomType:room.roomType,goal:'hosting and remote work',preserveFeatureIds:model.features.map(f=>f.id),budget:prefs.budgetMax},room,zones,mockFurnitureCatalog,4); ws.plans=plans; ws.activePlanId=plans[0]?.id; const scene=buildSceneVM(model,plans[0],[],'perspective'); return {model,room,prefs,workspace:ws,plans,scene};
}
