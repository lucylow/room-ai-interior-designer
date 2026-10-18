import { AIDataInspector } from '@/components/AIDataInspector';
import { PrivacyCenter } from '@/components/PrivacyCenter';
import { SecurityStatus } from '@/components/SecurityStatus';
import { PrivacyVault } from '@/components/PrivacyVault';
import { getLastAIContext } from '@/ai/app-controller';
import { Button, Icon } from '@/components/ui';

export function PrivacyExperience({ onBack }: { onBack: () => void }) {
  return (
    <div className="secondary-screen">
      <header className="secondary-header">
        <Button className="back-button" onClick={onBack} label="Back to profile">
          <Icon name="arrow" size={18} />
        </Button>
        <div>
          <span className="eyebrow">DATA & SECURITY</span>
          <h1>Privacy center</h1>
        </div>
      </header>
      <div style={{ display: 'grid', gap: 16, padding: '0 4px 28px' }}>
        <SecurityStatus />
        <PrivacyVault />
        <PrivacyCenter />
        <AIDataInspector context={getLastAIContext()} />
        <p role="note" style={{ fontSize: 12, lineHeight: 1.5, opacity: 0.72 }}>
          AI generation currently uses a deterministic local demo provider. Room images, credentials, contact details,
          financial data, and contractor documents are not sent. Cloud AI is not configured in this app.
        </p>
      </div>
    </div>
  );
}
