import type { Size3 } from "../core/types";

export interface ProductCandidate { id: string; size: Size3; price: number; stock?: number; deliveryDays?: number; }
export interface Compatibility { productId: string; dimensionScore: number; budgetScore: number; overallScore: number; fit: "excellent" | "good" | "review" | "poor"; dimensionErrors: Size3; warnings: string[]; }
export interface RankingOptions { dimensionWeight?: number; budgetWeight?: number; maxDimensionError?: number; preferInStock?: boolean; }
const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const safeSize = (size: Size3): Size3 => ({ width: Math.max(0, size.width), depth: Math.max(0, size.depth), height: Math.max(0, size.height) });

export function rankProducts(targetInput: Size3, products: ProductCandidate[], budget: number, options: RankingOptions = {}): Compatibility[] {
  const target = safeSize(targetInput);
  const dimensionWeight = options.dimensionWeight ?? 0.7;
  const budgetWeight = options.budgetWeight ?? 0.3;
  const weightTotal = Math.max(0.001, dimensionWeight + budgetWeight);
  const normalizedBudget = Math.max(0, Number.isFinite(budget) ? budget : 0);
  return products.map(product => {
    const size = safeSize(product.size);
    const dimensionErrors: Size3 = { width: Math.abs(size.width - target.width) / Math.max(target.width, 0.01), depth: Math.abs(size.depth - target.depth) / Math.max(target.depth, 0.01), height: Math.abs(size.height - target.height) / Math.max(target.height, 0.01) };
    const dimensionScore = clamp(1 - (dimensionErrors.width + dimensionErrors.depth + dimensionErrors.height) / 3);
    const budgetScore = normalizedBudget <= 0 ? (product.price <= 0 ? 1 : 0) : product.price <= normalizedBudget ? 1 : clamp(normalizedBudget / Math.max(product.price, 0.01));
    const stockScore = options.preferInStock === false ? 1 : product.stock === undefined ? 0.8 : product.stock > 0 ? 1 : 0.2;
    const overallScore = clamp((dimensionWeight * dimensionScore + budgetWeight * budgetScore) / weightTotal * (0.9 + 0.1 * stockScore));
    const maxError = Math.max(dimensionErrors.width, dimensionErrors.depth, dimensionErrors.height);
    const warnings = [maxError > (options.maxDimensionError ?? 0.25) ? "Dimensions exceed the preferred tolerance" : "", product.price > normalizedBudget ? "Over budget" : "", product.stock === 0 ? "Out of stock" : ""].filter(Boolean);
    return { productId: product.id, dimensionScore, budgetScore, overallScore, fit: (overallScore >= 0.85 ? "excellent" : overallScore >= 0.7 ? "good" : overallScore >= 0.5 ? "review" : "poor") as Compatibility["fit"], dimensionErrors, warnings };
  }).sort((a, b) => b.overallScore - a.overallScore || a.dimensionScore - b.dimensionScore);
}
