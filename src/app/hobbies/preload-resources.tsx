"use client";

import { useEffect, useState } from "react";
import { getPhotosByUsername } from "@/lib/unsplash";
import { type ImagePlaceholder } from "@/lib/placeholder-images";
import { getWeeklyTopAlbums, getWeeklyTopTracks, LastfmAlbum, LastfmTrack } from "@/lib/lastfm";
import Image from "next/image";

const username = process.env.NEXT_PUBLIC_LASTFM_USERNAME || 'doresty';

// This component is responsible for preloading image assets for the hobbies page.
// It fetches the data and renders hidden Image components to trigger caching.
export function PreloadHobbiesResources({ onFinished }: { onFinished: () => void }) {
  const [preloaded, setPreloaded] = useState(false);

  useEffect(() => {
    if (preloaded) return;

    const preload = async () => {
      try {
        // Preload Unsplash Photos
        const unsplashPhotos = await getPhotosByUsername(process.env.NEXT_PUBLIC_UNSPLASH_USERNAME || "l1v1o");
        const photographyPhotos: ImagePlaceholder[] = unsplashPhotos.map((p: any) => ({
          id: p.id,
          description: p.description || p.alt_description || 'Unsplash Photo',
          imageUrl: p.urls.regular,
          smallImageUrl: p.urls.small,
          unsplashUrl: p.links.html,
          imageHint: p.alt_description || 'photo',
        }));

        // Preload Last.fm Album Art
        const [tracks, albums] = await Promise.all([
          getWeeklyTopTracks(username),
          getWeeklyTopAlbums(username),
        ]);
        
        const lastFmImages: string[] = [];
        if (tracks.length > 0) {
            const track = tracks[0];
            const albumArt = albums.find(a => a.artist === track.artist)?.image || track.image;
            if (albumArt) lastFmImages.push(albumArt);
        }
        albums.slice(0, 4).forEach(album => {
            if(album.image) lastFmImages.push(album.image);
        });

        // Render hidden images to preload them
        const imagesToPreload = [
            ...photographyPhotos.map(p => p.smallImageUrl!),
            ...lastFmImages,
        ].filter(Boolean);


        await Promise.all(imagesToPreload.map(src => {
            return new Promise((resolve, reject) => {
                const img = document.createElement('img');
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        }));

      } catch (error) {
        console.error("Failed to preload resources:", error);
      } finally {
        setPreloaded(true);
        onFinished();
      }
    };

    preload();
  }, [preloaded, onFinished]);

  return null; // This component does not render anything visible
}
