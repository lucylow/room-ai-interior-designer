export interface NativeVisionCapabilities { sceneDepth:boolean; smoothedSceneDepth:boolean; mesh:boolean; meshWithClassification:boolean; roomPlan:boolean; multiRoomStructure:boolean; lidar:boolean }
export const defaultCapabilities:NativeVisionCapabilities={sceneDepth:false,smoothedSceneDepth:false,mesh:false,meshWithClassification:false,roomPlan:false,multiRoomStructure:false,lidar:false};
