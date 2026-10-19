"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalFlicker = exports.SsimProxy = exports.SemanticAccuracy = exports.SceneCompleteness = exports.RenderRegression = exports.PsnrProxy = exports.PoseError = exports.NovelViewScore = exports.MaterialAccuracy = exports.LpipsProxy = exports.DepthError = exports.CoverageScore = exports.CaptureRegression = exports.BenchmarkSuite = exports.ArtifactScore = exports.AiRegression = void 0;
// Stable, collision-free namespace exports for V13 evaluation capabilities.
exports.AiRegression = __importStar(require("./ai-regression"));
exports.ArtifactScore = __importStar(require("./artifact-score"));
exports.BenchmarkSuite = __importStar(require("./benchmark-suite"));
exports.CaptureRegression = __importStar(require("./capture-regression"));
exports.CoverageScore = __importStar(require("./coverage-score"));
exports.DepthError = __importStar(require("./depth-error"));
exports.LpipsProxy = __importStar(require("./lpips-proxy"));
exports.MaterialAccuracy = __importStar(require("./material-accuracy"));
exports.NovelViewScore = __importStar(require("./novel-view-score"));
exports.PoseError = __importStar(require("./pose-error"));
exports.PsnrProxy = __importStar(require("./psnr-proxy"));
exports.RenderRegression = __importStar(require("./render-regression"));
exports.SceneCompleteness = __importStar(require("./scene-completeness"));
exports.SemanticAccuracy = __importStar(require("./semantic-accuracy"));
exports.SsimProxy = __importStar(require("./ssim-proxy"));
exports.TemporalFlicker = __importStar(require("./temporal-flicker"));
