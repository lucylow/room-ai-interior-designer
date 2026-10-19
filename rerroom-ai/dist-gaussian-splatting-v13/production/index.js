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
exports.VersionCompatibility = exports.ThermalPolicy = exports.RuntimeConfig = exports.MemoryBudget = exports.GpuCapability = exports.FeatureFlags = exports.DeviceProfile = exports.BatteryPolicy = exports.BackendRouter = exports.ArtifactRegistry = void 0;
// Stable, collision-free namespace exports for V13 production capabilities.
exports.ArtifactRegistry = __importStar(require("./artifact-registry"));
exports.BackendRouter = __importStar(require("./backend-router"));
exports.BatteryPolicy = __importStar(require("./battery-policy"));
exports.DeviceProfile = __importStar(require("./device-profile"));
exports.FeatureFlags = __importStar(require("./feature-flags"));
exports.GpuCapability = __importStar(require("./gpu-capability"));
exports.MemoryBudget = __importStar(require("./memory-budget"));
exports.RuntimeConfig = __importStar(require("./runtime-config"));
exports.ThermalPolicy = __importStar(require("./thermal-policy"));
exports.VersionCompatibility = __importStar(require("./version-compatibility"));
