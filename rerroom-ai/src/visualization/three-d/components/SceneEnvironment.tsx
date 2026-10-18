import React from 'react';
import { Environment } from '@react-three/drei';

export function SceneEnvironment({ enabled = true, files }: { enabled?: boolean; files?: string[] }) {
  if (!enabled) return null;
  return files?.length ? <Environment files={files} background={false} /> : <Environment preset="apartment" background={false} />;
}
