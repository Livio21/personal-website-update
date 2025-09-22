// This needs to be a server-only module
import { createApi } from 'unsplash-js';
import type { Random } from 'unsplash-js/dist/methods/photos/types';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

export type UnsplashPhoto = Random | any;

export async function getPhotosByUsername(username: string): Promise<UnsplashPhoto[]> {
  const result = await unsplash.users.getPhotos({ username });
  if (result.errors) {
    console.error('Error fetching from Unsplash:', result.errors);
    return [];
  }
  return result.response.results;
}
