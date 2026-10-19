export interface PreferenceUpdate { styleDelta:number; paletteDelta:number; layoutDelta:number; confidence:number; }
export function updatePreference(current: PreferenceUpdate, signal: {style:number; palette:number; layout:number; confidence:number}): PreferenceUpdate {
  const rate = 0.18;
  return { styleDelta: current.styleDelta*(1-rate)+signal.style*rate, paletteDelta: current.paletteDelta*(1-rate)+signal.palette*rate, layoutDelta: current.layoutDelta*(1-rate)+signal.layout*rate, confidence: Math.min(0.99, current.confidence + 0.02*signal.confidence) };
}

