export const mockARObjects = Array.from({ length: 48 }, (_, i) => ({
  id: `ar-object-${i + 1}`,
  productId: `product-${String((i % 80) + 1).padStart(3, "0")}`,
  x: Number((-2.1 + (i % 7) * 0.62).toFixed(2)),
  y: Number((0.02 + (i % 3) * 0.01).toFixed(2)),
  z: Number((-1.6 + (i % 5) * 0.7).toFixed(2)),
  rotationY: (i * 15) % 360,
  scale: Number((0.82 + (i % 6) * 0.06).toFixed(2)),
  snapped: i % 2 === 0,
  collision: i % 11 === 0,
}));
