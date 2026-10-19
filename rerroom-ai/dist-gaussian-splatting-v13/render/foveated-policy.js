"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOVEATED_POLICY_VERSION = void 0;
exports.foveated_policy_mean = foveated_policy_mean;
exports.foveated_policy_variance = foveated_policy_variance;
exports.foveated_policy_trend = foveated_policy_trend;
exports.foveated_policy_score = foveated_policy_score;
exports.foveated_policy_actions = foveated_policy_actions;
exports.foveated_policy_result = foveated_policy_result;
exports.foveated_policy_window = foveated_policy_window;
exports.foveated_policy_robust = foveated_policy_robust;
exports.foveated_policy_seed = foveated_policy_seed;
exports.foveated_policy_sampleScene = foveated_policy_sampleScene;
exports.foveated_policy_distance = foveated_policy_distance;
exports.foveated_policy_frames = foveated_policy_frames;
exports.foveated_policy_gaussians = foveated_policy_gaussians;
exports.foveated_policy_recommendation = foveated_policy_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function foveated_policy_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function foveated_policy_variance(values = []) {
    if (!values.length)
        return 0;
    const m = foveated_policy_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function foveated_policy_trend(values = []) {
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
function foveated_policy_score(values = [], threshold = .65, weight = 1) {
    const mean = foveated_policy_mean(values);
    const variance = foveated_policy_variance(values);
    const trend = foveated_policy_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function foveated_policy_actions(score, warnings = []) {
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
function foveated_policy_result(id, values = [], warnings = []) {
    const score = foveated_policy_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `render-foveated-policy-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: foveated_policy_actions(score, warnings), metrics: { mean: foveated_policy_mean(values), variance: foveated_policy_variance(values), trend: foveated_policy_trend(values), count: values.length }, warnings };
}
function foveated_policy_window(values = [], window = 5) {
    return values.map((_, i) => foveated_policy_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function foveated_policy_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return foveated_policy_mean(core.length ? core : sorted);
}
function foveated_policy_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`render-foveated-policy:$${id}`), index); }
function foveated_policy_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function foveated_policy_distance(a, b) { return (0, math_1.dist)(a, b); }
function foveated_policy_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function foveated_policy_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function foveated_policy_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.FOVEATED_POLICY_VERSION = 'v13';
