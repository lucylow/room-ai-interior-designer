import { useEffect, useRef } from 'react';
import { createFrameMonitor } from '../../performance/frame-monitor';

export function PerformanceProbe({ onSample }: { onSample?: (sample: ReturnType<ReturnType<typeof createFrameMonitor>['snapshot']>) => void }) {
  const monitor = useRef(createFrameMonitor()).current;
  useEffect(() => {
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      monitor.record(now - last);
      last = now;
      if (monitor.snapshot().samples >= 30) onSample?.(monitor.snapshot());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [monitor, onSample]);
  return null;
}
