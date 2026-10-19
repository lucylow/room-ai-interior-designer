import type { QualityTier } from '../core/types';
export interface BandwidthPolicy {tier:QualityTier;initialChunks:number;maxInFlight:number;bytesPerSecond:number;dropBelowPriority:number;}
const TABLE:Record<QualityTier,BandwidthPolicy>={preview:{tier:'preview',initialChunks:4,maxInFlight:2,bytesPerSecond:3e6,dropBelowPriority:0.04},balanced:{tier:'balanced',initialChunks:8,maxInFlight:4,bytesPerSecond:8e6,dropBelowPriority:0.02},high:{tier:'high',initialChunks:16,maxInFlight:6,bytesPerSecond:16e6,dropBelowPriority:0.01},ultra:{tier:'ultra',initialChunks:32,maxInFlight:10,bytesPerSecond:32e6,dropBelowPriority:0}};
export function bandwidthPolicy(tier:QualityTier):BandwidthPolicy{return TABLE[tier];}
export function chunkBudget(tier:QualityTier,durationSec:number):number{return TABLE[tier].bytesPerSecond*Math.max(0,durationSec);}
