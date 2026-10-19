"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSpatialIndex = buildSpatialIndex;
exports.queryRadius = queryRadius;
exports.nearestGaussian = nearestGaussian;
function key(v, size) { return Math.floor(v / Math.max(.001, size)); }
function buildSpatialIndex(scene, cell = .75) { const m = new Map(); for (const g of scene.gaussians) {
    const k = `${key(g.mean.x, cell)}:${key(g.mean.y, cell)}:${key(g.mean.z, cell)}`;
    const a = m.get(k) || [];
    a.push(g.id);
    m.set(k, a);
} return [...m].map(([key, ids]) => ({ key, ids })); }
function queryRadius(scene, center, radius) { const r2 = radius * radius; return scene.gaussians.filter(g => { const dx = g.mean.x - center.x, dy = g.mean.y - center.y, dz = g.mean.z - center.z; return dx * dx + dy * dy + dz * dz <= r2; }); }
function nearestGaussian(scene, center) { let best; let d = Infinity; for (const g of scene.gaussians) {
    const dx = g.mean.x - center.x, dy = g.mean.y - center.y, dz = g.mean.z - center.z;
    const x = dx * dx + dy * dy + dz * dz;
    if (x < d) {
        d = x;
        best = g;
    }
} return best; }
