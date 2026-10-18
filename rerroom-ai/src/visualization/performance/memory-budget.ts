export interface MemoryBudget {
  totalBytes: number;
  geometryBytes: number;
  textureBytes: number;
  cacheBytes: number;
  maxTotalBytes: number;
  maxTextureBytes: number;
}

export function emptyMemoryBudget(maxTotalBytes=256*1024*1024,maxTextureBytes=128*1024*1024): MemoryBudget {
  return {totalBytes:0,geometryBytes:0,textureBytes:0,cacheBytes:0,maxTotalBytes,maxTextureBytes};
}

export function recordGeometry(budget:MemoryBudget,bytes:number):MemoryBudget {
  return {...budget,geometryBytes:Math.max(0,budget.geometryBytes+bytes),totalBytes:Math.max(0,budget.totalBytes+bytes)};
}

export function recordTexture(budget:MemoryBudget,bytes:number):MemoryBudget {
  return {...budget,textureBytes:Math.max(0,budget.textureBytes+bytes),totalBytes:Math.max(0,budget.totalBytes+bytes)};
}

export function recordCache(budget:MemoryBudget,bytes:number):MemoryBudget {
  return {...budget,cacheBytes:Math.max(0,budget.cacheBytes+bytes),totalBytes:Math.max(0,budget.totalBytes+bytes)};
}

export function overMemoryBudget(budget:MemoryBudget): {total:boolean;textures:boolean} {
  return {total:budget.totalBytes>budget.maxTotalBytes,textures:budget.textureBytes>budget.maxTextureBytes};
}

export function recommendedMemoryAction(budget:MemoryBudget): 'none'|'drop-cache'|'reduce-textures'|'unload-far-assets' {
  const state=overMemoryBudget(budget);
  if(!state.total && !state.textures) return 'none';
  if(state.textures) return 'reduce-textures';
  if(budget.cacheBytes>budget.maxTotalBytes*0.25) return 'drop-cache';
  return 'unload-far-assets';
}
