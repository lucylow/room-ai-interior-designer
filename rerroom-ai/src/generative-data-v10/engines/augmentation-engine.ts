export interface AugmentedRecord { sourceId:string; variantId:string; operation:string; promptDelta:string; invariants:string[]; }
export function makeAugmentations(sourceId:string, prompt:string): AugmentedRecord[] {
  const ops=["paraphrase","shorten","add_negative_constraint","swap_lighting","swap_palette","increase_specificity","make_user_friendly","add_spatial_constraint"];
  return ops.map((operation,index)=>({sourceId, variantId:`${sourceId}-aug-${index}`, operation, promptDelta: `${prompt}; augmentation=${operation}`, invariants:["preserve room type","preserve source geometry","preserve user intent"]}));
}

