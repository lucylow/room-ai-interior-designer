export function findLeakage(records:Array<{id:string;prompt:string;response:string}>): string[] {
  const warnings:string[]=[]; const prompts=new Set<string>(); for(const r of records){ const norm=r.prompt.toLowerCase().replace(/\s+/g," ").trim(); if(prompts.has(norm)) warnings.push(`${r.id}: duplicate prompt`); prompts.add(norm); if(r.response.includes("api_key")||r.response.includes("secret")) warnings.push(`${r.id}: possible secret token`); } return warnings;
}

