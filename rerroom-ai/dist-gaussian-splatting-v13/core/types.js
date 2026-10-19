"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stableHash = exports.dot = exports.norm = exports.lerp = exports.clamp = void 0;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
exports.clamp = clamp;
const lerp = (a, b, t) => a + (b - a) * t;
exports.lerp = lerp;
const norm = (v) => { const n = Math.hypot(v.x, v.y, v.z) || 1; return { x: v.x / n, y: v.y / n, z: v.z / n }; };
exports.norm = norm;
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
exports.dot = dot;
const stableHash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
} return h >>> 0; };
exports.stableHash = stableHash;
