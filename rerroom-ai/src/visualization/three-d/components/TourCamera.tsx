import { useEffect, useState } from 'react';
import type { CameraTour } from '../../core/types';
import { sampleTour } from '../../core/tour';

export interface TourCameraProps {
  tour: CameraTour;
  playing: boolean;
  reducedMotion?: boolean;
  onPose?: (pose: ReturnType<typeof sampleTour>) => void;
}

export function TourCamera({ tour, playing, reducedMotion = false, onPose }: TourCameraProps) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!playing || reducedMotion) return;
    let frame = 0;
    const started = performance.now();
    const loop = (now: number) => {
      onPose?.(sampleTour(tour, now - started));
      setTick(value => value + 1);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [onPose, playing, reducedMotion, tour]);
  return null;
}
