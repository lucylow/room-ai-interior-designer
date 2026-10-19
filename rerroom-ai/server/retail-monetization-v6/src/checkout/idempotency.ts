export class IdempotencyRegistry{private seen=new Set<string>();claim(key:string){if(this.seen.has(key))return false;this.seen.add(key);return true}has(key:string){return this.seen.has(key)}}
