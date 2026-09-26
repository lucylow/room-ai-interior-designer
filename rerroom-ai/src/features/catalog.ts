import type { ARSceneObject, DesignProject, FurnitureProduct, Money, Room } from "@/premium/types/models";

export function formatMoney(money: Money) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount);
}

export function roomArea(room: Room) {
  return `${room.dimensions.widthM.toFixed(1)} × ${room.dimensions.lengthM.toFixed(1)}m`;
}

export function productsForRoom(products: FurnitureProduct[], room: Room, limit = 6) {
  return products.filter((product) => product.roomStyles.includes(room.style)).slice(0, limit);
}

export function productAvailability(product: FurnitureProduct) {
  if (!product.inStock) return `Backorder · ${product.deliveryDays} days`;
  return product.deliveryDays <= 3 ? "In stock · ships soon" : `In stock · ${product.deliveryDays} days`;
}

export function projectBudgetSummary(project: DesignProject) {
  const remaining = Math.max(project.budget.amount - project.spent.amount, 0);
  const percentage = project.budget.amount
    ? Math.round((project.spent.amount / project.budget.amount) * 100)
    : 0;
  return {
    remaining: { ...project.budget, amount: remaining },
    percentage: Math.min(percentage, 100),
  };
}

export function constructionProgress(project: DesignProject) {
  if (!project.tasks.length) return 0;
  return Math.round(project.tasks.reduce((total, task) => total + task.progress, 0) / project.tasks.length);
}

export function validationMessage(object: Pick<ARSceneObject, "collision" | "snapped" | "anchored">) {
  if (object.collision) return { tone: "danger" as const, label: "Collision detected · move 18 cm" };
  if (!object.anchored)
    return {
      tone: "warning" as const,
      label: "Preview only · anchor before saving",
    };
  if (object.snapped)
    return {
      tone: "success" as const,
      label: "Wall aligned · clearance verified",
    };
  return { tone: "neutral" as const, label: "Placed · fine-tune position" };
}

export function nextScale(scale: number, direction: "increase" | "decrease") {
  const delta = direction === "increase" ? 0.05 : -0.05;
  return Number(Math.max(0.65, Math.min(1.35, scale + delta)).toFixed(2));
}

export function nextRotation(rotation: number) {
  return (rotation + 15) % 360;
}
