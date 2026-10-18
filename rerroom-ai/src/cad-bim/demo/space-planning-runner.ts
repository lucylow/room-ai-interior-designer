import { buildMockDashboard } from '../mock/project-dashboard';
import { compareLayouts } from '../layout/layout-comparator';
import { buildSceneVM } from '../visualization/scene-view-model';
export function runSpacePlanningDemo(){
 const dashboard=buildMockDashboard(); const [a,b]=dashboard.plans; const comparison=a&&b?compareLayouts(a,b):undefined;
 const scene=buildSceneVM(dashboard.model,a,[],'perspective');
 return {projectId:dashboard.workspace.project.id,zoneCount:dashboard.workspace.zones.length,planCount:dashboard.plans.length,activePlan:dashboard.workspace.activePlanId,comparison,sceneNodeCount:scene.nodes.length,roomArea:dashboard.room.measurements.widthM*dashboard.room.measurements.depthM};
}
