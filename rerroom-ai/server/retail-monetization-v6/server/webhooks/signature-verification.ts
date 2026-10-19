import { createHmac, timingSafeEqual } from 'node:crypto';

function constantTimeDigestMatch(expected: Buffer, provided: string, encoding: 'hex' | 'base64'): boolean {
  if (!provided) return false;
  try {
    const actual = Buffer.from(provided, encoding);
    return actual.length === expected.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function verifyStripeWebhookSignature(
  secret: string,
  rawBody: string | Buffer,
  signatureHeader: string,
  nowSeconds = Math.floor(Date.now() / 1000),
  toleranceSeconds = 300,
): boolean {
  if (!secret || !signatureHeader || toleranceSeconds < 0) return false;
  const fields = signatureHeader.split(',').map((part) => part.trim().split('=', 2));
  const timestampText = fields.find(([key]) => key === 't')?.[1];
  const timestamp = Number(timestampText);
  if (!Number.isSafeInteger(timestamp) || Math.abs(nowSeconds - timestamp) > toleranceSeconds) return false;
  const signatures = fields.filter(([key, value]) => key === 'v1' && Boolean(value)).map(([, value]) => value!);
  if (!signatures.length) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest();
  return signatures.some((signature) => /^[a-f\d]{64}$/i.test(signature) && constantTimeDigestMatch(expected, signature, 'hex'));
}

export function verifyShopifyWebhookSignature(secret: string, rawBody: string | Buffer, hmacHeader: string): boolean {
  if (!secret || !hmacHeader || !/^[A-Za-z0-9+/]+={0,2}$/.test(hmacHeader)) return false;
  const expected = createHmac('sha256', secret).update(rawBody).digest();
  return constantTimeDigestMatch(expected, hmacHeader, 'base64');
}
