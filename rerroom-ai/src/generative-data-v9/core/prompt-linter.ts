export interface PromptLint { valid: boolean; warnings: string[]; hardConstraintCount: number; refinementCount: number; }

export function lintPrompt(prompt: string): PromptLint {
  const warnings: string[] = [];
  const hard = (prompt.match(/preserve|keep|do not|must/gi) ?? []).length;
  const refinement = (prompt.match(/make|swap|add|remove|reduce|increase/gi) ?? []).length;
  if (prompt.length < 35) warnings.push("Prompt has limited context for reliable generation.");
  if (!/room|space|interior/i.test(prompt)) warnings.push("Room context is not explicit.");
  return { valid: warnings.length === 0, warnings, hardConstraintCount: hard, refinementCount: refinement };
}
