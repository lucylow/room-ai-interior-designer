export const STYLE_NEIGHBORS: Record<string,string[]> = {
  modern:["contemporary","minimalist","warm_minimal"], minimalist:["modern","japandi","new_nordic"], scandinavian:["new_nordic","japandi","naturalist"], industrial:["soft_industrial","moody_modern","urban_soft"],
  japandi:["minimalist","new_nordic","organic_modern"], mid_century:["modern","eclectic_modern","heritage_modern"], organic_modern:["warm_minimal","naturalist","japandi"], bohemian:["eclectic_modern","naturalist","coastal_modern"],
  contemporary:["modern","quiet_luxury","transitional"], warm_minimal:["minimalist","organic_modern","quiet_luxury"], quiet_luxury:["transitional","modern","art_deco"], coastal_modern:["naturalist","scandinavian","modern_farmhouse"],
};
export function nearestStyles(style:string): string[]{ return STYLE_NEIGHBORS[style] ?? ["modern","minimalist","contemporary"]; }

