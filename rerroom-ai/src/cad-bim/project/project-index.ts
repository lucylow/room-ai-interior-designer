import { ProjectArtifact, ProjectActivity, ProjectMember, ProjectMilestone, ProjectTask } from '../planning/types';
export interface ProjectIndex { projectId:string; members:ProjectMember[]; artifacts:ProjectArtifact[]; tasks:ProjectTask[]; milestones:ProjectMilestone[]; activities:ProjectActivity[]; byType:Record<string,string[]>; }
export function buildProjectIndex(projectId:string,members:ProjectMember[],artifacts:ProjectArtifact[],tasks:ProjectTask[],milestones:ProjectMilestone[],activities:ProjectActivity[]):ProjectIndex{
 const byType:Record<string,string[]>={}; artifacts.forEach(a=>(byType[a.type]??=[]).push(a.id)); return {projectId,members,artifacts,tasks,milestones,activities,byType};
}
