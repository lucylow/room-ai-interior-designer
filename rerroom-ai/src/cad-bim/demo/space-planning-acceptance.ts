import { buildMockDashboard } from '../mock/project-dashboard';
import { runSpacePlanningDemo } from './space-planning-runner';
import { SpacePlanningAdvisor } from '../ai/space-planning-advisor';
import { mockCatalogV2 } from '../mock/space-planning-catalog-v2';
import { mockPreferences, mockRoomContext } from '../mock/space-planning-data';
import { segmentZones } from '../planning/zone-segmentation-v2';
import { inferRoomBoundary } from '../planning/room-boundary';

export function runAcceptanceSuite(){
 const dashboard=buildMockDashboard(); const demo=runSpacePlanningDemo(); const room=mockRoomContext(dashboard.model); const zones=segmentZones(inferRoomBoundary(dashboard.model,room.roomId),room.roomType);
 const advice=new SpacePlanningAdvisor().advise(dashboard.model,room,mockPreferences(),zones,mockCatalogV2,3);
 const checks={sourceFeatures:dashboard.model.features.length>0,zones:zones.length>0,plans:advice.plans.length>=1,sceneNodes:demo.sceneNodeCount>0,dataConfidence:advice.dataConfidence>0};
 return {checks,passed:Object.values(checks).every(Boolean),plans:advice.plans.length,zoneCount:zones.length,dataConfidence:advice.dataConfidence};
}
