'use server';
/**
 * @fileOverview A flow to retrieve a random photograph from the Unsplash account.
 *
 * - getRandomPhoto - A function that returns a random photo.
 * - RandomPhotoOutput - The return type for the getRandomPhoto function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getPhotosByUsername, UnsplashPhoto } from '@/lib/unsplash';

const RandomPhotoOutputSchema = z.object({
  id: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  unsplashUrl: z.string(),
});
export type RandomPhotoOutput = z.infer<typeof RandomPhotoOutputSchema>;

export async function getRandomPhoto(): Promise<RandomPhotoOutput> {
  return randomPhotoFlow();
}

const randomPhotoFlow = ai.defineFlow(
  {
    name: 'randomPhotoFlow',
    outputSchema: RandomPhotoOutputSchema,
  },
  async () => {
    const unsplashPhotos = await getPhotosByUsername(process.env.NEXT_PUBLIC_UNSPLASH_USERNAME || "l1v1o");
    
    if (unsplashPhotos.length === 0) {
      throw new Error("No photos found for the user.");
    }
    
    const randomPhoto: UnsplashPhoto = unsplashPhotos[Math.floor(Math.random() * unsplashPhotos.length)];
    
    return {
      id: randomPhoto.id,
      description: randomPhoto.description || randomPhoto.alt_description || 'Unsplash Photo',
      imageUrl: randomPhoto.urls.regular,
      unsplashUrl: randomPhoto.links.html,
    };
  }
);
