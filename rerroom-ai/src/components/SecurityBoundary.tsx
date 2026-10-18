import type { ReactNode } from 'react';

export function SecurityBoundary({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  try {
    return <>{children}</>;
  } catch {
    return <>{fallback ?? <div role="alert">A protected feature could not be loaded.</div>}</>;
  }
}
