export interface RouteDecision { family:string; split:string; reason:string; }
export function routeForTask(task:string, hardConstraint=false): RouteDecision {
  if (hardConstraint || task.includes("geometry")) return { family:"spatial_grounding", split:"challenge", reason:"hard spatial constraint" };
  if (task.includes("why") || task.includes("critique")) return { family:"critique", split:"validation", reason:"explanation/evaluation task" };
  if (task.includes("choose") || task.includes("prefer")) return { family:"preference", split:"train", reason:"pairwise preference task" };
  return { family:"multimodal_generation", split:"train", reason:"default creative generation" };
}

