import React from 'react';
import { ConsentBanner } from '../src/components/ConsentBanner';
import { SecurityStatus } from '../src/components/SecurityStatus';
import { PrivacyCenter } from '../src/components/PrivacyCenter';

export function ProtectedRoomShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsentBanner />
      <SecurityStatus />
      {children}
      <PrivacyCenter />
    </>
  );
}
