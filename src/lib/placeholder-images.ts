import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  url?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export function getImageDimensions(url: string): { width: number; height: number } {
  try {
    const urlParts = url.split('/');
    const height = parseInt(urlParts.pop() || '400');
    const width = parseInt(urlParts.pop() || '600');
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  } catch (e) {
    // ignore
  }
  return { width: 600, height: 400 }; // Default size
}
