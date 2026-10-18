import { sanitizeImage } from '../src/security/image-sanitizer';
import { validateUpload } from '../src/security/file-validation';

export async function prepareRoomPhoto(file: File): Promise<{ blob: Blob; filename: string }> {
  const validation = validateUpload(file, 'image');
  if (!validation.ok) throw new Error(`Upload rejected: ${validation.reasons.join(', ')}`);
  const sanitized = await sanitizeImage(file);
  return { blob: sanitized.blob, filename: `${validation.normalizedName.replace(/\.[^.]+$/, '')}.jpg` };
}
