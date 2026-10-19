"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIM_ANCHOR_VERSION = void 0;
exports.bim_anchor_mean = bim_anchor_mean;
exports.bim_anchor_variance = bim_anchor_variance;
exports.bim_anchor_trend = bim_anchor_trend;
exports.bim_anchor_score = bim_anchor_score;
exports.bim_anchor_actions = bim_anchor_actions;
exports.bim_anchor_result = bim_anchor_result;
exports.bim_anchor_window = bim_anchor_window;
exports.bim_anchor_robust = bim_anchor_robust;
exports.bim_anchor_seed = bim_anchor_seed;
exports.bim_anchor_sampleScene = bim_anchor_sampleScene;
exports.bim_anchor_distance = bim_anchor_distance;
exports.bim_anchor_frames = bim_anchor_frames;
exports.bim_anchor_gaussians = bim_anchor_gaussians;
exports.bim_anchor_recommendation = bim_anchor_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function bim_anchor_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function bim_anchor_variance(values = []) {
    if (!values.length)
        return 0;
    const m = bim_anchor_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function bim_anchor_trend(values = []) {
    if (values.length < 2)
        return 0;
    let total = 0, weight = 0;
    for (let i = 1; i < values.length; i++) {
        const w = i;
        total += (values[i] - values[i - 1]) * w;
        weight += w;
    }
    return total / (weight || 1);
}
function bim_anchor_score(values = [], threshold = .65, weight = 1) {
    const mean = bim_anchor_mean(values);
    const variance = bim_anchor_variance(values);
    const trend = bim_anchor_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function bim_anchor_actions(score, warnings = []) {
    if (warnings.length)
        return ['inspect', 'repair'];
    if (score >= .9)
        return ['accept', 'cache'];
    if (score >= .75)
        return ['accept', 'monitor'];
    if (score >= .55)
        return ['refine', 'rescore'];
    return ['recollect', 'reprocess'];
}
function bim_anchor_result(id, values = [], warnings = []) {
    const score = bim_anchor_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `cad-bim-bim-anchor-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: bim_anchor_actions(score, warnings), metrics: { mean: bim_anchor_mean(values), variance: bim_anchor_variance(values), trend: bim_anchor_trend(values), count: values.length }, warnings };
}
function bim_anchor_window(values = [], window = 5) {
    return values.map((_, i) => bim_anchor_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function bim_anchor_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return bim_anchor_mean(core.length ? core : sorted);
}
function bim_anchor_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`cad-bim-bim-anchor:$${id}`), index); }
function bim_anchor_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function bim_anchor_distance(a, b) { return (0, math_1.dist)(a, b); }
function bim_anchor_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function bim_anchor_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function bim_anchor_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.BIM_ANCHOR_VERSION = 'v13';
