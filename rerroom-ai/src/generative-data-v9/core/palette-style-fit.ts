import type { DesignStyle } from "../core/types";

export function paletteFit(style: DesignStyle, paletteId: string): number {
  const score = ((style.length * 7 + paletteId.length * 5) % 28) / 100;
  return Number((0.70 + score).toFixed(3));
}
