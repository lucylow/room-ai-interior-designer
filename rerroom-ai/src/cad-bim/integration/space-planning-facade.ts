import { createDemoAuthoritativeModel } from '../demo/demo-project';
import { mockFurnitureCatalog, mockRoomContext, mockPreferences } from '../mock/space-planning-data';
import { inferRoomBoundary } from '../planning/room-boundary';
import { segmentZones } from '../planning/zone-segmentation-v2';
import { LayoutOptimizer } from '../layout/layout-optimizer';
import { QuickRevisionEngine } from '../revision/quick-revision-engine';
import { RemodelProject } from '../core/types';
export class SpacePlanningFacade {
 createDemo(){
  const model=createDemoAuthoritativeModel(); const room=mockRoomContext(model); const prefs=mockPreferences();
  const project:RemodelProject={id:model.projectId,name:'Demo Remodel Workspace',status:'concepting',authoritativeModel:model,overlays:[],changes:[],selectedFeatureIds:[],clientApprovedOverlayId:undefined};
  const boundary=inferRoomBoundary(model,room.roomId); const zones=segmentZones(boundary,room.roomType); const plans=new LayoutOptimizer().optimize({model,roomType:room.roomType,goal:'balanced',preserveFeatureIds:model.features.map(f=>f.id),budget:prefs.budgetMax},room,zones,mockFurnitureCatalog,5);
  return {project,room,prefs,boundary,zones,plans};
 }
 revise(project:RemodelProject,currentOverlay:any,request:any){return new QuickRevisionEngine().apply(project,request,currentOverlay,undefined);}
}
