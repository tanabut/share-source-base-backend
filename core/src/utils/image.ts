import sharp, { format } from 'sharp';

import { MAX_PRODUCT_IMAGE_SIZE } from '../config';

const SUPPORTED_RESIZABLE_FORMATS = ['jpeg'];

export async function resizeImage(
  imageBuffer: Buffer,
  threshold = MAX_PRODUCT_IMAGE_SIZE,
) {
  const sharpImage = sharp(imageBuffer);

  const metadata = await sharpImage.metadata();

  if (
    !metadata.format ||
    !SUPPORTED_RESIZABLE_FORMATS.includes(metadata.format)
  ) {
    return imageBuffer;
  }

  const isMaximumSizeExceeded =
    (metadata.width && metadata.width > threshold) ||
    (metadata.height && metadata.height > threshold);

  const outputSharpImage = isMaximumSizeExceeded
    ? sharpImage.resize(threshold, threshold, { fit: 'inside' })
    : sharpImage;

  if (!metadata.format) {
    throw new Error('Missing image format');
  }

  const sharpFormat = format[metadata.format];

  if (!sharpFormat) {
    throw new Error('Format not supported');
  }

  return outputSharpImage.toFormat(sharpFormat).toBuffer();
}
