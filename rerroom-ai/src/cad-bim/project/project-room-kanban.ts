import { ProjectWorkspaceState, ProjectTask } from '../planning/types';

export interface KanbanColumn { id:ProjectTask['status']; title:string; tasks:ProjectTask[]; count:number; }
export interface ProjectRoomKanban { projectId:string; columns:KanbanColumn[]; overdue:number; blocked:number; completion:number; }
export function buildProjectRoomKanban(state:ProjectWorkspaceState):ProjectRoomKanban{
 const statuses:ProjectTask['status'][]=['todo','in-progress','blocked','done']; const title:Record<ProjectTask['status'],string>={todo:'To do','in-progress':'In progress',blocked:'Blocked',done:'Done'};
 const columns=statuses.map(s=>{const tasks=state.tasks.filter(t=>t.status===s);return {id:s,title:title[s],tasks,count:tasks.length};}); const overdue=state.tasks.filter(t=>t.dueDay<0&&t.status!=='done').length; const blocked=state.tasks.filter(t=>t.status==='blocked').length; const completion=state.tasks.length?state.tasks.filter(t=>t.status==='done').length/state.tasks.length:0;
 return {projectId:state.project.id,columns,overdue,blocked,completion};
}
