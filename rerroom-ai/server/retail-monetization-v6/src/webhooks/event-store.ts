import type { WebhookEvent } from '../types/commerce';
export class WebhookStore{private rows=new Map<string,WebhookEvent>();put(event:WebhookEvent){if(this.rows.has(event.id))return false;this.rows.set(event.id,event);return true}get(id:string){return this.rows.get(id)??null}all(){return [...this.rows.values()]}}
