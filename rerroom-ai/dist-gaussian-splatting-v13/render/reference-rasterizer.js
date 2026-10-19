"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.rasterizeReference = rasterizeReference;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function rasterizeReference(scene, request) { const w = request.width, h = request.height; const rgba = new Uint8Array(w * h * 4); const depth = new Float32Array(w * h); const alpha = new Float32Array(w * h); depth.fill(Infinity); let visible = 0; const candidates = scene.gaussians.slice(0, Math.min(request.maxGaussians, scene.gaussians.length)); for (const g of candidates) {
    const p = (0, math_1.project)(g.mean, request.camera);
    if (!p.visible)
        continue;
    visible++;
    const f = (0, math_1.gaussianFootprint)(g.scale, p.z, request.camera.fx, request.camera.fy);
    const minX = Math.max(0, Math.floor(p.x - f.x)), maxX = Math.min(w - 1, Math.ceil(p.x + f.x));
    const minY = Math.max(0, Math.floor(p.y - f.y)), maxY = Math.min(h - 1, Math.ceil(p.y + f.y));
    const c = (0, math_1.clampColor)(g.color);
    for (let y = minY; y <= maxY; y++)
        for (let x = minX; x <= maxX; x++) {
            const dx = (x - p.x) / Math.max(.5, f.x), dy = (y - p.y) / Math.max(.5, f.y);
            const a = g.opacity * Math.exp(-.5 * (dx * dx + dy * dy));
            if (a < .002)
                continue;
            const i = y * w + x;
            if (p.z < depth[i]) {
                depth[i] = p.z;
                rgba[i * 4] = Math.round(c.r * 255);
                rgba[i * 4 + 1] = Math.round(c.g * 255);
                rgba[i * 4 + 2] = Math.round(c.b * 255);
                rgba[i * 4 + 3] = Math.round(255 * (0, types_1.clamp)(a));
                alpha[i] = (0, types_1.clamp)(a);
            }
        }
} return { rgba, depth, alpha, stats: { gaussiansSubmitted: candidates.length, gaussiansVisible: visible, tilesTouched: Math.ceil(visible / 64), elapsedMs: 0, frameTimeMs: 0, memoryMb: (rgba.byteLength + depth.byteLength + alpha.byteLength) / 1048576, overdraw: Math.max(1, visible / Math.max(1, w * h) * 250), qualityScore: (0, types_1.clamp)(visible / (candidates.length || 1)) } }; }
