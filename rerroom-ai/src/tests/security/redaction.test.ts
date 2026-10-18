import { describe, expect, it } from 'vitest';
import { redactText, redactObject } from '../../security/redaction';

describe('redaction', () => {
  it('redacts emails and phone-like values', () => {
    const result = redactText('Contact sample@example.com at +1 (555) 555-0100. Ship to 77 Hidden Street.');
    expect(result.value).not.toContain('sample@example.com');
    expect(result.redactions).toEqual(expect.arrayContaining(['email', 'phone', 'address']));
  });

  it('redacts credential-shaped fields recursively', () => {
    const result = redactObject({ authorization: 'Bearer abc', nested: { password: 'p' } }) as { authorization: string; nested: { password: string } };
    expect(result.authorization).toBe('[REDACTED:secret-field]');
    expect(result.nested.password).toBe('[REDACTED:secret-field]');
  });
});
