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
exports.TrainMonitor = exports.TrainConfig = exports.ShSchedule = exports.ScaleSchedule = exports.RotationSchedule = exports.PruningSchedule = exports.OptimizerRetry = exports.OptimizerBudget = exports.OpacitySchedule = exports.LossWindow = exports.LossBalancer = exports.HyperparameterSweep = exports.GradientHealth = exports.DensificationSchedule = exports.CheckpointScore = exports.AdaptiveLearning = void 0;
// Stable, collision-free namespace exports for V13 optimization capabilities.
exports.AdaptiveLearning = __importStar(require("./adaptive-learning"));
exports.CheckpointScore = __importStar(require("./checkpoint-score"));
exports.DensificationSchedule = __importStar(require("./densification-schedule"));
exports.GradientHealth = __importStar(require("./gradient-health"));
exports.HyperparameterSweep = __importStar(require("./hyperparameter-sweep"));
exports.LossBalancer = __importStar(require("./loss-balancer"));
exports.LossWindow = __importStar(require("./loss-window"));
exports.OpacitySchedule = __importStar(require("./opacity-schedule"));
exports.OptimizerBudget = __importStar(require("./optimizer-budget"));
exports.OptimizerRetry = __importStar(require("./optimizer-retry"));
exports.PruningSchedule = __importStar(require("./pruning-schedule"));
exports.RotationSchedule = __importStar(require("./rotation-schedule"));
exports.ScaleSchedule = __importStar(require("./scale-schedule"));
exports.ShSchedule = __importStar(require("./sh-schedule"));
exports.TrainConfig = __importStar(require("./train-config"));
exports.TrainMonitor = __importStar(require("./train-monitor"));
