import { SECURITY_CONSTANTS } from './constants';

export interface SanitizedImage {
  blob: Blob;
  width: number;
  height: number;
  mimeType: 'image/jpeg';
  metadataStripped: boolean;
}

function loadImage(source: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(source);
    const image = new Image();
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image decode failed.')); };
    image.src = url;
  });
}

export async function sanitizeImage(file: Blob, quality = 0.88): Promise<SanitizedImage> {
  const image = await loadImage(file);
  const pixels = image.naturalWidth * image.naturalHeight;
  if (pixels > SECURITY_CONSTANTS.maxImagePixels) throw new Error('Image resolution exceeds privacy-processing limit.');
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable.');
  context.drawImage(image, 0, 0);
  const sanitized = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Image re-encoding failed.')), 'image/jpeg', quality);
  });
  return {
    blob: sanitized,
    width: image.naturalWidth,
    height: image.naturalHeight,
    mimeType: 'image/jpeg',
    metadataStripped: true,
  };
}
