"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADAPTIVE_LEARNING_VERSION = void 0;
exports.adaptive_learning_mean = adaptive_learning_mean;
exports.adaptive_learning_variance = adaptive_learning_variance;
exports.adaptive_learning_trend = adaptive_learning_trend;
exports.adaptive_learning_score = adaptive_learning_score;
exports.adaptive_learning_actions = adaptive_learning_actions;
exports.adaptive_learning_result = adaptive_learning_result;
exports.adaptive_learning_window = adaptive_learning_window;
exports.adaptive_learning_robust = adaptive_learning_robust;
exports.adaptive_learning_seed = adaptive_learning_seed;
exports.adaptive_learning_sampleScene = adaptive_learning_sampleScene;
exports.adaptive_learning_distance = adaptive_learning_distance;
exports.adaptive_learning_frames = adaptive_learning_frames;
exports.adaptive_learning_gaussians = adaptive_learning_gaussians;
exports.adaptive_learning_recommendation = adaptive_learning_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function adaptive_learning_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function adaptive_learning_variance(values = []) {
    if (!values.length)
        return 0;
    const m = adaptive_learning_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function adaptive_learning_trend(values = []) {
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
function adaptive_learning_score(values = [], threshold = .65, weight = 1) {
    const mean = adaptive_learning_mean(values);
    const variance = adaptive_learning_variance(values);
    const trend = adaptive_learning_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function adaptive_learning_actions(score, warnings = []) {
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
function adaptive_learning_result(id, values = [], warnings = []) {
    const score = adaptive_learning_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `optimization-adaptive-learning-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: adaptive_learning_actions(score, warnings), metrics: { mean: adaptive_learning_mean(values), variance: adaptive_learning_variance(values), trend: adaptive_learning_trend(values), count: values.length }, warnings };
}
function adaptive_learning_window(values = [], window = 5) {
    return values.map((_, i) => adaptive_learning_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function adaptive_learning_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return adaptive_learning_mean(core.length ? core : sorted);
}
function adaptive_learning_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`optimization-adaptive-learning:$${id}`), index); }
function adaptive_learning_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function adaptive_learning_distance(a, b) { return (0, math_1.dist)(a, b); }
function adaptive_learning_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function adaptive_learning_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function adaptive_learning_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.ADAPTIVE_LEARNING_VERSION = 'v13';
