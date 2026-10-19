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
exports.WhiteBalance = exports.ViewpointNovelty = exports.VideoKeyframes = exports.TextureRichness = exports.RevisitPlanner = exports.MotionBlur = exports.FrameRanking = exports.FrameDedup = exports.FrameClustering = exports.ExposureBalance = exports.CaptureSession = exports.CaptureReport = exports.CaptureRecovery = exports.CaptureQuality = exports.CapturePath = exports.CaptureFailure = exports.CaptureCoverage = exports.CameraBaseline = void 0;
// Stable, collision-free namespace exports for V13 capture capabilities.
exports.CameraBaseline = __importStar(require("./camera-baseline"));
exports.CaptureCoverage = __importStar(require("./capture-coverage"));
exports.CaptureFailure = __importStar(require("./capture-failure"));
exports.CapturePath = __importStar(require("./capture-path"));
exports.CaptureQuality = __importStar(require("./capture-quality"));
exports.CaptureRecovery = __importStar(require("./capture-recovery"));
exports.CaptureReport = __importStar(require("./capture-report"));
exports.CaptureSession = __importStar(require("./capture-session"));
exports.ExposureBalance = __importStar(require("./exposure-balance"));
exports.FrameClustering = __importStar(require("./frame-clustering"));
exports.FrameDedup = __importStar(require("./frame-dedup"));
exports.FrameRanking = __importStar(require("./frame-ranking"));
exports.MotionBlur = __importStar(require("./motion-blur"));
exports.RevisitPlanner = __importStar(require("./revisit-planner"));
exports.TextureRichness = __importStar(require("./texture-richness"));
exports.VideoKeyframes = __importStar(require("./video-keyframes"));
exports.ViewpointNovelty = __importStar(require("./viewpoint-novelty"));
exports.WhiteBalance = __importStar(require("./white-balance"));
