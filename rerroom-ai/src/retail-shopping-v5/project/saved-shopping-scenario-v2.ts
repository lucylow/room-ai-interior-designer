/** RE:ROOM AI Retail Shopping Studio V5 — final workflow module. */
import type {  RoomType, StyleName } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}

export interface SavedShoppingScenarioV2 {
  id: string;
  name: string;
  room: RoomType;
  style: StyleName;
  paletteId: string;
  budget: number;
  productIds: string[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'favorite' | 'approved';
}

export class SavedShoppingScenarioStoreV2 {
  private scenarios = new Map<string, SavedShoppingScenarioV2>();

  save(input: Omit<SavedShoppingScenarioV2, 'id'|'createdAt'|'updatedAt'>): SavedShoppingScenarioV2 {
    const now = new Date().toISOString();
    const scenario = {
      ...input,
      id: id('scenario', `${input.name}:${now}`),
      createdAt: now,
      updatedAt: now,
    };
    this.scenarios.set(scenario.id, scenario);
    return { ...scenario, productIds: [...scenario.productIds] };
  }

  update(idValue: string, patch: Partial<Omit<SavedShoppingScenarioV2, 'id'|'createdAt'>>): SavedShoppingScenarioV2 | undefined {
    const scenario = this.scenarios.get(idValue);
    if (!scenario) return undefined;
    Object.assign(scenario, patch, { updatedAt: new Date().toISOString() });
    return { ...scenario, productIds: [...scenario.productIds] };
  }

  list(room?: RoomType): SavedShoppingScenarioV2[] {
    return [...this.scenarios.values()]
      .filter(s => !room || s.room === room)
      .sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))
      .map(s => ({ ...s, productIds: [...s.productIds] }));
  }

  favorite(idValue: string): SavedShoppingScenarioV2 | undefined {
    return this.update(idValue, { status: 'favorite' });
  }

  approve(idValue: string): SavedShoppingScenarioV2 | undefined {
    return this.update(idValue, { status: 'approved' });
  }
}
