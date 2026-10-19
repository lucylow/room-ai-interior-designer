"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOURCE_REVISION_VERSION = void 0;
exports.source_revision_mean = source_revision_mean;
exports.source_revision_variance = source_revision_variance;
exports.source_revision_trend = source_revision_trend;
exports.source_revision_score = source_revision_score;
exports.source_revision_actions = source_revision_actions;
exports.source_revision_result = source_revision_result;
exports.source_revision_window = source_revision_window;
exports.source_revision_robust = source_revision_robust;
exports.source_revision_seed = source_revision_seed;
exports.source_revision_sampleScene = source_revision_sampleScene;
exports.source_revision_distance = source_revision_distance;
exports.source_revision_frames = source_revision_frames;
exports.source_revision_gaussians = source_revision_gaussians;
exports.source_revision_recommendation = source_revision_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function source_revision_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function source_revision_variance(values = []) {
    if (!values.length)
        return 0;
    const m = source_revision_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function source_revision_trend(values = []) {
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
function source_revision_score(values = [], threshold = .65, weight = 1) {
    const mean = source_revision_mean(values);
    const variance = source_revision_variance(values);
    const trend = source_revision_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function source_revision_actions(score, warnings = []) {
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
function source_revision_result(id, values = [], warnings = []) {
    const score = source_revision_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `cad-bim-source-revision-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: source_revision_actions(score, warnings), metrics: { mean: source_revision_mean(values), variance: source_revision_variance(values), trend: source_revision_trend(values), count: values.length }, warnings };
}
function source_revision_window(values = [], window = 5) {
    return values.map((_, i) => source_revision_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function source_revision_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return source_revision_mean(core.length ? core : sorted);
}
function source_revision_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`cad-bim-source-revision:$${id}`), index); }
function source_revision_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function source_revision_distance(a, b) { return (0, math_1.dist)(a, b); }
function source_revision_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function source_revision_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function source_revision_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.SOURCE_REVISION_VERSION = 'v13';
