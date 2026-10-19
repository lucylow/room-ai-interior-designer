import type { CommerceCart } from '../types/commerce';

export interface CartIssue { code: string; message: string; severity: 'error' | 'warning'; }
const issue = (code: string, message: string): CartIssue => ({ code, message, severity: 'error' });

export function validateCart(cart: CommerceCart): CartIssue[] {
  const issues: CartIssue[] = [];
  if (!cart || typeof cart !== 'object') return [issue('invalid_cart', 'Cart data is missing or malformed.')];
  if (!Array.isArray(cart.lines)) return [issue('invalid_cart_lines', 'Cart lines must be an array.')];
  if (typeof cart.id !== 'string' || !cart.id || typeof cart.userId !== 'string' || !cart.userId) issues.push(issue('invalid_cart_identity', 'Cart and user identifiers are required.'));
  if (!['CAD', 'USD'].includes(cart.currency)) issues.push(issue('invalid_currency', 'Cart currency is not supported.'));
  if (cart.lines.length === 0) issues.push(issue('empty_cart', 'Add at least one item.'));
  if (cart.budgetCap && (cart.budgetCap.currency !== cart.currency || !Number.isFinite(cart.budgetCap.amount) || cart.budgetCap.amount < 0)) {
    issues.push(issue('invalid_budget_cap', 'Budget cap is invalid or uses a different currency.'));
  }
  if (cart.totals?.total?.currency !== cart.currency || !Number.isFinite(cart.totals?.total?.amount) || cart.totals.total.amount < 0) {
    issues.push(issue('invalid_cart_total', 'Cart total is invalid or uses a different currency.'));
  }
  if (cart.budgetCap && Number.isFinite(cart.totals?.total?.amount) && cart.totals.total.amount > cart.budgetCap.amount) {
    issues.push(issue('budget_exceeded', 'Cart exceeds the selected budget.'));
  }
  for (const candidate of cart.lines as unknown[]) {
    if (!candidate || typeof candidate !== 'object') {
      issues.push(issue('invalid_cart_line', 'A cart line is malformed.'));
      continue;
    }
    const line = candidate as CommerceCart['lines'][number];
    if (typeof line.id !== 'string' || !line.id || typeof line.productId !== 'string' || !line.productId ||
        typeof line.variantId !== 'string' || !line.variantId || typeof line.title !== 'string' || !line.title.trim()) {
      issues.push(issue('invalid_line_identity', 'Every cart line needs product, variant, and title data.'));
    }
    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 20) issues.push(issue('quantity_limit', `Quantity is invalid for ${line.title || 'a cart line'}.`));
    if (!Number.isFinite(line.unitPrice?.amount) || line.unitPrice.amount <= 0) issues.push(issue('invalid_price', `Price is invalid for ${line.title || 'a cart line'}.`));
    if (line.unitPrice?.currency !== cart.currency) issues.push(issue('currency_mismatch', `Currency mismatch for ${line.title || 'a cart line'}.`));
    if (line.inventoryAtAdd !== undefined && (!Number.isInteger(line.inventoryAtAdd) || line.inventoryAtAdd < line.quantity)) {
      issues.push(issue('inventory_exceeded', `Quantity exceeds the recorded inventory for ${line.title || 'a cart line'}.`));
    }
    if (line.affiliateRate !== undefined && (!Number.isFinite(line.affiliateRate) || line.affiliateRate < 0 || line.affiliateRate > 1)) {
      issues.push(issue('invalid_commission_rate', `Commission rate is invalid for ${line.title || 'a cart line'}.`));
    }
  }
  return issues;
}
