// This file is ready for you to implement the Last.fm API call.
// Remember to add your LASTFM_API_KEY and LASTFM_USERNAME to a .env.local file.
"use server";

export interface LastFmTrack {
    name: string;
    artist: {
        '#text': string;
    };
    image: {
        '#text': string;
        size: 'small' | 'medium' | 'large' | 'extralarge';
    }[];
    url: string;
    '@attr'?: {
        nowplaying?: 'true';
    };
}

interface LastFmResponse {
    recenttracks?: {
        track: LastFmTrack[];
    };
    error?: number;
    message?: string;
}


export async function getRecentTracks(): Promise<LastFmTrack[]> {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = process.env.LASTFM_USERNAME;

    if (!apiKey || !username) {
        console.warn("Last.fm API key or username not set in .env.local. Skipping fetch.");
        return [];
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=10`;

    try {
        console.log("Fetching recent tracks from Last.fm...");
        const response = await fetch(url, { next: { revalidate: 60 } }); // Cache for 1 minute

        if (!response.ok) {
            throw new Error(`Failed to fetch from Last.fm: ${response.statusText}`);
        }

        const data: LastFmResponse = await response.json();

        if (data.error) {
            throw new Error(`Last.fm API error: ${data.message}`);
        }

        const tracks = data.recenttracks?.track || [];
        
        // Filter out tracks without an image, as they don't look good in the UI
        return tracks.filter(track => track.image && track.image.some(i => i['#text']));

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching recent tracks from Last.fm:", error.message);
        } else {
            console.error("An unknown error occurred while fetching from Last.fm");
        }
        return [];
    }
}