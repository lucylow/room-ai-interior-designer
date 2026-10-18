import { createExternalStore, type ExternalStore } from '../store';

export interface ConstructionDomainState {
  activeProjectId?: string;
  projects: Record<string, { id: string; roomId: string; title: string; scope: string[]; estimateCents: number; status: 'draft' | 'shared' | 'complete' }>;
}

export const constructionStore: ExternalStore<ConstructionDomainState> = createExternalStore({ projects: {} });

export function upsertProject(project: ConstructionDomainState['projects'][string]): void {
  constructionStore.setState((state) => ({ ...state, projects: { ...state.projects, [project.id]: project }, activeProjectId: project.id }));
}

export function shareProject(projectId: string): void {
  constructionStore.setState((state) => {
    const project = state.projects[projectId];
    if (!project) return state;
    return { ...state, projects: { ...state.projects, [projectId]: { ...project, status: 'shared' } } };
  });
}
