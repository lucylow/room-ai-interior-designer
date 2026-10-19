export function id(prefix: string, seed = Date.now()): string { return `${prefix}_${seed.toString(36)}_${Math.floor(seed % 9973).toString(36)}`; }
export function deterministicId(prefix: string, input: string): string { let h=2166136261; for (const c of input) h=Math.imul(h^c.charCodeAt(0),16777619); return `${prefix}_${(h>>>0).toString(16)}`; }
