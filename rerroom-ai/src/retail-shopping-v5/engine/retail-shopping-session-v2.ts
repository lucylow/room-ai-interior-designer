/** RE:ROOM AI Retail Shopping Studio V5 — workflow module. */
import type { RetailProduct, RoomType, StyleName, ProductCategory, FurnitureSlot, RoomEnvelope, RetailerId } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function text(v:string){return v.trim().toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface RetailShoppingSessionV2 {
  id: string;
  roomId: string;
  startedAt: string;
  lastActionAt: string;
  searchCount: number;
  productViews: number;
  roomPlacements: number;
  swaps: number;
  cartAdds: number;
  savedSets: number;
  rejectedProducts: number;
  prompts: string[];
}

export class RetailShoppingSessionStoreV2 {
  private sessions = new Map<string, RetailShoppingSessionV2>();

  start(roomId: string): RetailShoppingSessionV2 {
    const now = new Date().toISOString();
    const session: RetailShoppingSessionV2 = {
      id: id('shopping-session', `${roomId}:${now}`),
      roomId,
      startedAt: now,
      lastActionAt: now,
      searchCount: 0,
      productViews: 0,
      roomPlacements: 0,
      swaps: 0,
      cartAdds: 0,
      savedSets: 0,
      rejectedProducts: 0,
      prompts: [],
    };
    this.sessions.set(session.id, session);
    return { ...session, prompts: [] };
  }

  record(sessionId: string, action: keyof Pick<RetailShoppingSessionV2, 'searchCount'|'productViews'|'roomPlacements'|'swaps'|'cartAdds'|'savedSets'|'rejectedProducts'>): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;
    session[action] += 1;
    session.lastActionAt = new Date().toISOString();
  }

  recordPrompt(sessionId: string, prompt: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;
    if (prompt.trim()) session.prompts = [...session.prompts, prompt.trim()].slice(-20);
    session.lastActionAt = new Date().toISOString();
  }

  get(sessionId: string): RetailShoppingSessionV2 | undefined {
    const session = this.sessions.get(sessionId);
    return session ? { ...session, prompts: [...session.prompts] } : undefined;
  }

  engagementScore(sessionId: string): number {
    const session = this.sessions.get(sessionId);
    if (!session) return 0;
    const weighted = session.searchCount * .08 + session.productViews * .04 + session.roomPlacements * .2 + session.swaps * .18 + session.cartAdds * .16 + session.savedSets * .2;
    return clamp(weighted);
  }
}
