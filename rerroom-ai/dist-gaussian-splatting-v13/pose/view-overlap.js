"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEW_OVERLAP_VERSION = void 0;
exports.view_overlap_mean = view_overlap_mean;
exports.view_overlap_variance = view_overlap_variance;
exports.view_overlap_trend = view_overlap_trend;
exports.view_overlap_score = view_overlap_score;
exports.view_overlap_actions = view_overlap_actions;
exports.view_overlap_result = view_overlap_result;
exports.view_overlap_window = view_overlap_window;
exports.view_overlap_robust = view_overlap_robust;
exports.view_overlap_seed = view_overlap_seed;
exports.view_overlap_sampleScene = view_overlap_sampleScene;
exports.view_overlap_distance = view_overlap_distance;
exports.view_overlap_frames = view_overlap_frames;
exports.view_overlap_gaussians = view_overlap_gaussians;
exports.view_overlap_recommendation = view_overlap_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function view_overlap_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function view_overlap_variance(values = []) {
    if (!values.length)
        return 0;
    const m = view_overlap_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function view_overlap_trend(values = []) {
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
function view_overlap_score(values = [], threshold = .65, weight = 1) {
    const mean = view_overlap_mean(values);
    const variance = view_overlap_variance(values);
    const trend = view_overlap_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function view_overlap_actions(score, warnings = []) {
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
function view_overlap_result(id, values = [], warnings = []) {
    const score = view_overlap_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `pose-view-overlap-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: view_overlap_actions(score, warnings), metrics: { mean: view_overlap_mean(values), variance: view_overlap_variance(values), trend: view_overlap_trend(values), count: values.length }, warnings };
}
function view_overlap_window(values = [], window = 5) {
    return values.map((_, i) => view_overlap_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function view_overlap_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return view_overlap_mean(core.length ? core : sorted);
}
function view_overlap_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`pose-view-overlap:$${id}`), index); }
function view_overlap_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function view_overlap_distance(a, b) { return (0, math_1.dist)(a, b); }
function view_overlap_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function view_overlap_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function view_overlap_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.VIEW_OVERLAP_VERSION = 'v13';
