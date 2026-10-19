"use strict";
// RE:ROOM AI Gaussian Splatting V13 — generated technical reference module.
// Original integration code; deterministic and dependency-free so it can run in demo mode.
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.Streaming = exports.Security = exports.Render = exports.Reconstruction = exports.Production = exports.Pose = exports.Pipeline = exports.Optimization = exports.Evaluation = exports.Editing = exports.Demo = exports.Capture = exports.CadBim = exports.Ai = void 0;
__exportStar(require("./core/types"), exports);
__exportStar(require("./core/math"), exports);
__exportStar(require("./core/gaussian-covariance"), exports);
__exportStar(require("./core/scene-index"), exports);
__exportStar(require("./core/pipeline-types"), exports);
__exportStar(require("./pipeline/v13-orchestrator"), exports);
__exportStar(require("./render/reference-rasterizer"), exports);
__exportStar(require("./demo/v13-demo-scene"), exports);
exports.Ai = __importStar(require("./ai"));
exports.CadBim = __importStar(require("./cad-bim"));
exports.Capture = __importStar(require("./capture"));
exports.Demo = __importStar(require("./demo"));
exports.Editing = __importStar(require("./editing"));
exports.Evaluation = __importStar(require("./evaluation"));
exports.Optimization = __importStar(require("./optimization"));
exports.Pipeline = __importStar(require("./pipeline"));
exports.Pose = __importStar(require("./pose"));
exports.Production = __importStar(require("./production"));
exports.Reconstruction = __importStar(require("./reconstruction"));
exports.Render = __importStar(require("./render"));
exports.Security = __importStar(require("./security"));
exports.Streaming = __importStar(require("./streaming"));
