import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  url?: string;
  width?: number;
  height?: number;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export function getImageDimensions(photo: ImagePlaceholder): { width: number; height: number } {
  if (photo.width && photo.height) {
    return { width: photo.width, height: photo.height };
  }
  
  try {
    const urlParts = photo.imageUrl.split('/');
    const h = parseInt(urlParts.pop() || '400');
    const w = parseInt(urlParts.pop() || '600');
    if (!isNaN(w) && !isNaN(h)) {
      return { width: w, height: h };
    }
  } catch (e) {
    // ignore
  }
  return { width: 600, height: 400 }; // Default size
}
