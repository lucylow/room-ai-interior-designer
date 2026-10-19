"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BENCHMARK_SUITE_VERSION = void 0;
exports.benchmark_suite_mean = benchmark_suite_mean;
exports.benchmark_suite_variance = benchmark_suite_variance;
exports.benchmark_suite_trend = benchmark_suite_trend;
exports.benchmark_suite_score = benchmark_suite_score;
exports.benchmark_suite_actions = benchmark_suite_actions;
exports.benchmark_suite_result = benchmark_suite_result;
exports.benchmark_suite_window = benchmark_suite_window;
exports.benchmark_suite_robust = benchmark_suite_robust;
exports.benchmark_suite_seed = benchmark_suite_seed;
exports.benchmark_suite_sampleScene = benchmark_suite_sampleScene;
exports.benchmark_suite_distance = benchmark_suite_distance;
exports.benchmark_suite_frames = benchmark_suite_frames;
exports.benchmark_suite_gaussians = benchmark_suite_gaussians;
exports.benchmark_suite_recommendation = benchmark_suite_recommendation;
const types_1 = require("../core/types");
const math_1 = require("../core/math");
function benchmark_suite_mean(values = []) {
    if (!values.length)
        return 0;
    return values.reduce((s, v) => s + v, 0) / values.length;
}
function benchmark_suite_variance(values = []) {
    if (!values.length)
        return 0;
    const m = benchmark_suite_mean(values);
    return values.reduce((s, v) => s + (v - m) * (v - m), 0) / values.length;
}
function benchmark_suite_trend(values = []) {
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
function benchmark_suite_score(values = [], threshold = .65, weight = 1) {
    const mean = benchmark_suite_mean(values);
    const variance = benchmark_suite_variance(values);
    const trend = benchmark_suite_trend(values);
    const stability = 1 - (0, types_1.clamp)(variance, 0, 1);
    const trendFit = (0, types_1.clamp)(.5 + trend, 0, 1);
    const thresholdFit = threshold <= 0 ? mean : (0, types_1.clamp)(mean / threshold, 0, 1);
    return (0, types_1.clamp)((mean * .48 + stability * .22 + trendFit * .10 + thresholdFit * .20) * weight, 0, 1);
}
function benchmark_suite_actions(score, warnings = []) {
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
function benchmark_suite_result(id, values = [], warnings = []) {
    const score = benchmark_suite_score(values);
    const confidence = (0, types_1.clamp)(score * (1 - warnings.length * .1), 0, 1);
    return { id: `evaluation-benchmark-suite-${(0, types_1.stableHash)(id).toString(16)}`, score, confidence, actions: benchmark_suite_actions(score, warnings), metrics: { mean: benchmark_suite_mean(values), variance: benchmark_suite_variance(values), trend: benchmark_suite_trend(values), count: values.length }, warnings };
}
function benchmark_suite_window(values = [], window = 5) {
    return values.map((_, i) => benchmark_suite_mean(values.slice(Math.max(0, i - window + 1), i + 1)));
}
function benchmark_suite_robust(values = []) {
    if (!values.length)
        return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * .1)] ?? sorted[0];
    const hi = sorted[Math.floor(sorted.length * .9)] ?? sorted[sorted.length - 1];
    const core = sorted.filter(v => v >= lo && v <= hi);
    return benchmark_suite_mean(core.length ? core : sorted);
}
function benchmark_suite_seed(id, index) { return (0, math_1.seededUnit)((0, types_1.stableHash)(`evaluation-benchmark-suite:$${id}`), index); }
function benchmark_suite_sampleScene(scene, camera) {
    const selected = camera ? scene.gaussians.filter(g => (0, math_1.project)(g.mean, camera).visible) : scene.gaussians.slice();
    if (!selected.length)
        return [0];
    return selected.slice(0, 24).map(g => (0, types_1.clamp)((g.opacity * .55 + (g.confidence ?? .5) * .45), 0, 1));
}
function benchmark_suite_distance(a, b) { return (0, math_1.dist)(a, b); }
function benchmark_suite_frames(frames) {
    if (!frames.length)
        return [0];
    return frames.map(f => (0, types_1.clamp)(f.sharpness * .3 + (1 - f.blur) * .25 + f.coverage * .25 + (1 - f.motion) * .2, 0, 1));
}
function benchmark_suite_gaussians(gaussians) {
    if (!gaussians.length)
        return [0];
    return gaussians.slice(0, 64).map(g => (0, types_1.clamp)(g.opacity * .4 + g.confidence * .4 + (g.dynamic ? 0 : .2), 0, 1));
}
function benchmark_suite_recommendation(result) {
    if (result.warnings.length)
        return 'Repair the highest-impact warning before downstream rendering.';
    if (result.score >= .85)
        return 'Keep the current configuration and promote it to the next pipeline stage.';
    if (result.score >= .6)
        return 'Refine the weakest contributing signal and rescore.';
    return 'Collect additional evidence or rebuild the affected stage.';
}
exports.BENCHMARK_SUITE_VERSION = 'v13';
