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
exports.StreamScheduler = exports.StreamHealth = exports.SceneManifest = exports.ProgressiveLoader = exports.NetworkEstimator = exports.MobilePolicy = exports.LatencyModel = exports.IntegrityCheck = exports.DesktopPolicy = exports.DeltaPatch = exports.ClusterPriority = exports.ClusterBuilder = exports.ChunkPrefetch = exports.ChunkIndex = exports.ChunkCache = exports.BandwidthBudget = void 0;
// Stable, collision-free namespace exports for V13 streaming capabilities.
exports.BandwidthBudget = __importStar(require("./bandwidth-budget"));
exports.ChunkCache = __importStar(require("./chunk-cache"));
exports.ChunkIndex = __importStar(require("./chunk-index"));
exports.ChunkPrefetch = __importStar(require("./chunk-prefetch"));
exports.ClusterBuilder = __importStar(require("./cluster-builder"));
exports.ClusterPriority = __importStar(require("./cluster-priority"));
exports.DeltaPatch = __importStar(require("./delta-patch"));
exports.DesktopPolicy = __importStar(require("./desktop-policy"));
exports.IntegrityCheck = __importStar(require("./integrity-check"));
exports.LatencyModel = __importStar(require("./latency-model"));
exports.MobilePolicy = __importStar(require("./mobile-policy"));
exports.NetworkEstimator = __importStar(require("./network-estimator"));
exports.ProgressiveLoader = __importStar(require("./progressive-loader"));
exports.SceneManifest = __importStar(require("./scene-manifest"));
exports.StreamHealth = __importStar(require("./stream-health"));
exports.StreamScheduler = __importStar(require("./stream-scheduler"));
