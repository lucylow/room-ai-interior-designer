"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAME_PACER_VERSION = void 0;
exports.frame_pacer_mean = frame_pacer_mean;
exports.frame_pacer_variance = frame_pacer_variance;
exports.frame_pacer_trend = frame_pacer_trend;
exports.frame_pacer_score = frame_pacer_score;
exports.frame_pacer_actions = frame_pacer_actions;
exports.frame_pacer_result = frame_pacer_result;
exports.frame_pacer_window = frame_pacer_window;
exports.frame_pacer_robust = frame_pacer_robust;
exports.frame_pacer_seed = frame_pacer_seed;
exports.frame_pacer_sampleScene = frame_pacer_sampleScene;
exports.frame_pacer_distance = frame_pacer_distance;
exports.frame_pacer_frames = frame_pacer_frames;
exports.frame_pacer_gaussians = frame_pacer_gaussians;
exports.frame_pacer_recommendation = frame_pacer_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function frame_pacer_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function frame_pacer_variance(values = []) {
    if (!values.length)
        return 0;
    const m = frame_pacer_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function frame_pacer_trend(values = []) {
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
function frame_pacer_score(values = [], threshold = .65, weight = 1) {
    const mean = frame_pacer_mean(values);
    const variance = frame_pacer_variance(values);
    const trend = frame_pacer_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function frame_pacer_actions(score, warnings = []) {
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
function frame_pacer_result(id, values = [], warnings = []) {
    const score = frame_pacer_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `render-frame-pacer-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: frame_pacer_actions(score, warnings), metrics: { mean: frame_pacer_mean(values), variance: frame_pacer_variance(values), trend: frame_pacer_trend(values), count: values.length }, warnings };
}
function frame_pacer_window(values = [], window = 5) {
    return values.map((_, i) => frame_pacer_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function frame_pacer_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return frame_pacer_mean(core.length ? core : sorted);
}
function frame_pacer_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`render-frame-pacer:$${id}`), index); }
function frame_pacer_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function frame_pacer_distance(a, b) { return (0, math_1.dist)(a, b); }
function frame_pacer_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function frame_pacer_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function frame_pacer_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.FRAME_PACER_VERSION = 'v13';
