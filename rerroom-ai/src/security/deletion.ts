export interface DeletionPlan {
  userId: string;
  objectIds: string[];
  localKeys: string[];
  remoteJobs: string[];
  requestedAt: number;
}

export interface DeletionExecutor {
  deleteRemote(objectId: string): Promise<void>;
  deleteLocal(key: string): Promise<void>;
}

export async function executeDeletion(plan: DeletionPlan, executor: DeletionExecutor): Promise<{ failed: string[] }> {
  const failed: string[] = [];
  for (const objectId of plan.objectIds) {
    try { await executor.deleteRemote(objectId); } catch { failed.push(`remote:${objectId}`); }
  }
  for (const key of plan.localKeys) {
    try { await executor.deleteLocal(key); } catch { failed.push(`local:${key}`); }
  }
  return { failed };
}
