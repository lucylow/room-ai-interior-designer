export interface DatasetLineage { datasetId: string; version: string; parentVersion?: string; generatedAt: string; sourceModules: string[]; transformations: string[]; }

export function lineage(datasetId: string, version: string, sourceModules: string[], transformations: string[], parentVersion?: string): DatasetLineage {
  return { datasetId, version, parentVersion, generatedAt: new Date(0).toISOString(), sourceModules, transformations };
}
