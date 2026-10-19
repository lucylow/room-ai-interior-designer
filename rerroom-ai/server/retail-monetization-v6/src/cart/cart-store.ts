import { id } from '../core/id';
import { money, multiplyMoney, sumMoney, maxZero } from '../core/money';
import type { CartLine, CommerceCart, CommerceProduct, Currency, Money } from '../types/commerce';

export class CartStore {
  private readonly carts = new Map<string, CommerceCart>();

  create(userId: string, currency: Currency = 'CAD', budgetCap?: Money): CommerceCart {
    if (!userId.trim()) throw new Error('user_id_required');
    if (budgetCap && (budgetCap.currency !== currency || !Number.isFinite(budgetCap.amount) || budgetCap.amount < 0)) {
      throw new Error('invalid_budget_cap');
    }
    const cart: CommerceCart = {
      id: id('cart'), userId: userId.trim(), currency, lines: [],
      totals: {
        subtotal: money(0, currency), discount: money(0, currency), shipping: money(0, currency),
        tax: money(0, currency), total: money(0, currency), commissionEstimate: money(0, currency),
      },
      budgetCap, budgetHeadroom: budgetCap ?? money(0, currency), version: 1, status: 'open',
      updatedAt: new Date().toISOString(),
    };
    this.carts.set(cart.id, cart);
    return cart;
  }

  get(cartId: string): CommerceCart | null { return this.carts.get(cartId) ?? null; }

  add(cartId: string, product: CommerceProduct, variantId: string, quantity = 1, meta: Partial<CartLine> = {}): CommerceCart {
    const cart = this.must(cartId);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new Error('invalid_quantity');
    if (typeof product?.id !== 'string' || !product.id.trim() || typeof product.title !== 'string' || !product.title.trim() || !Array.isArray(product.variants)) throw new Error('invalid_product');
    const variant = product.variants.find((candidate) => candidate?.id === variantId);
    if (!variant || !variant.available) throw new Error('variant_unavailable');
    if (!variant.price || !Number.isInteger(variant.inventory) || variant.inventory < 0 || variant.inventory < quantity) throw new Error('insufficient_inventory');
    if (!Number.isFinite(variant.price.amount) || variant.price.amount <= 0) throw new Error('invalid_price');
    if (variant.price.currency !== cart.currency) throw new Error('currency_mismatch');
    if (meta.affiliateRate !== undefined && (!Number.isFinite(meta.affiliateRate) || meta.affiliateRate < 0 || meta.affiliateRate > 1)) throw new Error('invalid_commission_rate');
    const projectId = meta.projectId ?? cart.projectId;
    if (cart.projectId && projectId && cart.projectId !== projectId) throw new Error('project_mismatch');
    const source = meta.source ?? 'manual';
    const existing = cart.lines.find((line) =>
      line.variantId === variantId && line.source === source && line.projectId === projectId &&
      line.roomId === meta.roomId && line.conceptId === meta.conceptId && line.placementId === meta.placementId,
    );
    if (existing && existing.quantity + quantity > 20) throw new Error('invalid_quantity');
    const totalForVariant = cart.lines.filter((line) => line.variantId === variantId).reduce((sum, line) => sum + line.quantity, quantity);
    if (totalForVariant > variant.inventory) throw new Error('insufficient_inventory');
    const currentSubtotal = cart.lines.reduce((sum, line) => sum + line.unitPrice.amount * line.quantity, 0);
    if (cart.budgetCap && currentSubtotal + variant.price.amount * quantity > cart.budgetCap.amount) throw new Error('budget_cap_exceeded');

    if (!cart.projectId && projectId) cart.projectId = projectId;
    if (existing) {
      existing.quantity += quantity;
      existing.inventoryAtAdd = Math.min(existing.inventoryAtAdd ?? variant.inventory, variant.inventory);
    } else {
      cart.lines.push({
        id: id('line'), productId: product.id, variantId, title: product.title.trim(), quantity,
        unitPrice: variant.price, source, commissionEligible: meta.commissionEligible ?? false,
        affiliateRate: meta.affiliateRate, conceptId: meta.conceptId, roomId: meta.roomId,
        placementId: meta.placementId, projectId, inventoryAtAdd: variant.inventory,
      });
    }
    return this.reprice(cart);
  }

  remove(cartId: string, lineId: string): CommerceCart {
    const cart = this.must(cartId);
    const next = cart.lines.filter((line) => line.id !== lineId);
    if (next.length === cart.lines.length) throw new Error('line_not_found');
    cart.lines = next;
    return this.reprice(cart);
  }

  setQty(cartId: string, lineId: string, quantity: number): CommerceCart {
    const cart = this.must(cartId);
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 20) throw new Error('invalid_quantity');
    if (quantity === 0) return this.remove(cartId, lineId);
    const line = cart.lines.find((item) => item.id === lineId);
    if (!line) throw new Error('line_not_found');
    const otherVariantQuantity = cart.lines.filter((item) => item.variantId === line.variantId && item.id !== lineId)
      .reduce((sum, item) => sum + item.quantity, 0);
    const inventoryLimit = Math.min(...cart.lines.filter((item) => item.variantId === line.variantId)
      .map((item) => item.inventoryAtAdd ?? Number.MAX_SAFE_INTEGER));
    if (otherVariantQuantity + quantity > inventoryLimit) throw new Error('insufficient_inventory');
    const nextSubtotal = cart.lines.reduce((sum, item) => sum + item.unitPrice.amount * (item.id === lineId ? quantity : item.quantity), 0);
    if (cart.budgetCap && nextSubtotal > cart.budgetCap.amount) throw new Error('budget_cap_exceeded');
    line.quantity = quantity;
    return this.reprice(cart);
  }

  private reprice(cart: CommerceCart): CommerceCart {
    const subtotal = sumMoney(cart.lines.map((line) => multiplyMoney(line.unitPrice, line.quantity)));
    cart.totals = {
      ...cart.totals, subtotal, total: subtotal,
      commissionEstimate: sumMoney(cart.lines.filter((line) => line.commissionEligible)
        .map((line) => multiplyMoney(multiplyMoney(line.unitPrice, line.quantity), line.affiliateRate ?? 0))),
    };
    cart.budgetHeadroom = cart.budgetCap
      ? maxZero(money(cart.budgetCap.amount - cart.totals.total.amount, cart.currency))
      : money(0, cart.currency);
    cart.version++;
    cart.updatedAt = new Date().toISOString();
    return cart;
  }

  private must(cartId: string): CommerceCart {
    const cart = this.carts.get(cartId);
    if (!cart) throw new Error('cart_not_found');
    return cart;
  }
}
