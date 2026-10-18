/** RE:ROOM AI Retail Shopping Studio V5 — final depth module. */
import type { RetailProduct, StyleName, RoomType } from '../../retail-shopping-v4/domain/commerce-types';
function money(v:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(Math.max(0,v));}
function id(prefix:string,s:string){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return `${prefix}-${(h>>>0).toString(16)}`;}
function clamp(v:number,min=0,max=1){return Math.min(max,Math.max(min,v));}

export interface RetailPackageSlotV3 {
  id: string;
  role: string;
  category: string;
  priority: number;
}

export interface RetailPackageSelectionV3 {
  slotId: string;
  productId: string;
  score: number;
  cost: number;
  rationale: string[];
}

export interface RetailPackageResultV3 {
  selections: RetailPackageSelectionV3[];
  subtotal: number;
  remaining: number;
  coverage: number;
  warnings: string[];
}

export function optimizeRetailPackageV3(
  room: RoomType,
  style: StyleName,
  budget: number,
  slots: RetailPackageSlotV3[],
  products: RetailProduct[],
): RetailPackageResultV3 {
  let remaining = budget;
  const selections: RetailPackageSelectionV3[] = [];
  const warnings: string[] = [];
  const roomProducts = products.filter(product => product.roomTypes.includes(room));

  const ordered = [...slots].sort((a, b) => b.priority - a.priority);
  for (const slot of ordered) {
    const candidates = roomProducts
      .filter(product => categoryMatches(product, slot.category))
      .filter(product => product.price.amount <= remaining)
      .map(product => {
        const styleScore = product.styles.includes(style) ? 1 : .6;
        const priceScore = remaining > 0 ? 1 - product.price.amount / Math.max(1, remaining) : 0;
        const footprint = product.dimensions.width * product.dimensions.depth;
        const compactScore = footprint < 6000 ? .2 : 0;
        return {
          product,
          score: styleScore * .55 + priceScore * .25 + compactScore + .2,
        };
      })
      .sort((a, b) => b.score - a.score || a.product.price.amount - b.product.price.amount);

    const candidate = candidates[0];
    if (!candidate) {
      warnings.push(`No affordable ${slot.role} candidate was found.`);
      continue;
    }

    remaining -= candidate.product.price.amount;
    selections.push({
      slotId: slot.id,
      productId: candidate.product.id,
      score: clamp(candidate.score),
      cost: candidate.product.price.amount,
      rationale: [
        `${candidate.product.name} matches the ${style} direction.`,
        `The product fits the remaining ${money(remaining + candidate.product.price.amount)} allowance before selection.`,
        `Role = ${slot.role}; category = ${candidate.product.category}.`,
      ],
    });
  }

  return {
    selections,
    subtotal: budget - remaining,
    remaining,
    coverage: slots.length ? selections.length / slots.length : 1,
    warnings,
  };
}

function categoryMatches(product: RetailProduct, requested: string): boolean {
  const value = `${product.category} ${product.tags.join(' ')} ${product.name}`.toLowerCase();
  const role = requested.toLowerCase();
  if (role.includes('storage')) return /storage|dresser|bookcase|nightstand|shelf/.test(value);
  if (role.includes('seating')) return /seating|chair|armchair|sofa/.test(value);
  if (role.includes('table')) return /table/.test(value);
  if (role.includes('bed')) return product.category === 'bed' || /bed/.test(value);
  if (role.includes('desk')) return /desk/.test(value);
  return value.includes(role);
}
