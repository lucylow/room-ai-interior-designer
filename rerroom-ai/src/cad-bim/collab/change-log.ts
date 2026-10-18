import { OverlayPatch } from '../core/types';
export interface ChangeLogEntry { id:string; patch:OverlayPatch; timestamp:string; }
export class ChangeLog { private entries:ChangeLogEntry[]=[]; append(patch:OverlayPatch){this.entries.push({id:`log_${this.entries.length+1}`,patch,timestamp:new Date().toISOString()});} since(offset:number){return this.entries.slice(offset);} all(){return this.entries.map(x=>JSON.parse(JSON.stringify(x)));} }
