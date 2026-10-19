"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createV13Context = createV13Context;
exports.runV13 = runV13;
const reconstruction_health_1 = require("../reconstruction/reconstruction-health");
const names = ['capture', 'pose', 'reconstruct', 'optimize', 'render', 'stream', 'understand', 'edit', 'align', 'evaluate'];
function stage(name) { return { name, status: 'pending', progress: 0, warnings: [], metrics: {}, artifacts: [] }; }
function createV13Context(jobId, sceneId) { return { jobId, sceneId, stages: names.map(stage), budgetMs: 120000, elapsedMs: 0 }; }
function runV13(scene, request, jobId = 'demo-v13') { const ctx = createV13Context(jobId, scene.id); const events = []; ctx.stages.forEach((s, i) => { s.status = 'running'; s.progress = 0; events.push(`stage:start:${s.name}`); s.progress = .5; s.metrics.inputCount = scene.gaussians.length; s.progress = 1; s.status = 'succeeded'; s.metrics.order = i; events.push(`stage:done:${s.name}`); }); const values = scene.gaussians.slice(0, 256).map(g => Math.max(0, Math.min(1, g.confidence * g.opacity))); const h = (0, reconstruction_health_1.reconstruction_health_result)(scene.id, values); const health = { coverage: Math.min(1, scene.gaussians.length / 5000), poseConsistency: h.score, depthConsistency: h.score, photometricConsistency: Math.min(1, h.score + .03), semanticCompleteness: scene.gaussians.filter(g => Boolean(g.semantic)).length / Math.max(1, scene.gaussians.length), overall: h.score, warnings: h.warnings }; events.push(`health:${health.overall.toFixed(3)}`); return { context: ctx, health, events }; }
