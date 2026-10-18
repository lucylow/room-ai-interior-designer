import { hasJpegSignature, hasPngSignature, readBlobPrefix, validateUpload } from './file-validation';
import { sanitizeImage, type SanitizedImage } from './image-sanitizer';

function hasWebpSignature(bytes: Uint8Array): boolean {
  return String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
}

/** Validate and strip image metadata before handing the re-encoded blob to an authorized upload API. */
export async function prepareRoomImageUpload(file: File): Promise<SanitizedImage> {
  const validation = validateUpload(file, 'image');
  if (!validation.ok) throw new Error('Room image is not an accepted file.');
  const prefix = await readBlobPrefix(file, 12);
  const signatureMatches = file.type === 'image/jpeg'
    ? hasJpegSignature(prefix)
    : file.type === 'image/png'
      ? hasPngSignature(prefix)
      : file.type === 'image/webp'
        ? hasWebpSignature(prefix)
        : false;
  if (!signatureMatches) throw new Error('Room image content does not match its declared format.');
  return sanitizeImage(file);
}
