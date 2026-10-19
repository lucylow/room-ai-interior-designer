export interface CompiledPrompt { positive: string; negative: string; controlTokens: string[]; metadata: Record<string,string>; }
export function compilePrompt(input: { style:string; palette:string; room:string; intent:string; constraints:string[] }): CompiledPrompt {
  const positive = `${input.style} ${input.room}, ${input.palette}, ${input.intent}, architectural photography, realistic scale, coherent materials`;
  const negative = `warped geometry, duplicate furniture, blocked openings, ${input.constraints.join(", ")}`;
  return { positive, negative, controlTokens: ["preserve_geometry", "depth_conditioned", "material_consistency"], metadata: { style: input.style, palette: input.palette, room: input.room } };
}

