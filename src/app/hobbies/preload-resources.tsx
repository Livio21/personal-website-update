
"use client";

import { useEffect, useState } from "react";
import { getPhotosByUsername } from "@/lib/unsplash";
import { type ImagePlaceholder } from "@/lib/placeholder-images";
import { getWeeklyTopAlbums, getWeeklyTopTracks, LastfmAlbum, LastfmTrack } from "@/lib/lastfm";

const username = process.env.NEXT_PUBLIC_LASTFM_USERNAME || 'doresty';

// This component is responsible for preloading image assets for the hobbies page in the background.
// It fetches the data and creates image elements to trigger browser caching.
export function PreloadHobbiesResources({ onFinished }: { onFinished: () => void }) {
  const [preloaded, setPreloaded] = useState(false);

  useEffect(() => {
    if (preloaded) {
      onFinished();
      return;
    };

    let isCancelled = false;

    const preload = async () => {
      try {
        // Preload Unsplash Photos
        const unsplashPhotosPromise = getPhotosByUsername(process.env.NEXT_PUBLIC_UNSPLASH_USERNAME || "l1v1o");
        
        // Preload Last.fm Album Art
        const tracksPromise = getWeeklyTopTracks(username);
        const albumsPromise = getWeeklyTopAlbums(username);

        const [unsplashPhotos, tracks, albums] = await Promise.all([
          unsplashPhotosPromise,
          tracksPromise,
          albumsPromise,
        ]);

        if (isCancelled) return;

        const photographyPhotos: ImagePlaceholder[] = unsplashPhotos.map((p: any) => ({
          smallImageUrl: p.urls.small,
        }));

        const lastFmImages: string[] = [];
        if (tracks.length > 0) {
            const track = tracks[0];
            const albumArt = albums.find(a => a.artist === track.artist)?.image || track.image;
            if (albumArt) lastFmImages.push(albumArt);
        }
        albums.slice(0, 4).forEach(album => {
            if(album.image) lastFmImages.push(album.image);
        });

        // Create a list of all image URLs to preload
        const imagesToPreload = [
            ...photographyPhotos.map(p => p.smallImageUrl!),
            ...lastFmImages,
        ].filter(Boolean);

        // Preload all images
        await Promise.all(imagesToPreload.map(src => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = resolve; // Resolve on error so one failed image doesn't block everything
            });
        }));

      } catch (error) {
        console.error("Failed to preload resources:", error);
      } finally {
        if (!isCancelled) {
          setPreloaded(true);
          onFinished();
        }
      }
    };

    // Start preloading after a short delay to not interfere with initial page render
    const timeoutId = setTimeout(preload, 1000);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [preloaded, onFinished]);

  return null; // This component does not render anything visible
}
