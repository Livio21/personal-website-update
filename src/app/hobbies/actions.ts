// This file is ready for you to implement the Last.fm API call.
// Remember to add your LASTFM_API_KEY and LASTFM_USERNAME to a .env.local file.
"use server";

// Example of what the API response might look like.
// You'll need to adjust this based on the actual Last.fm API response structure.
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

export async function getRecentTracks() {
    // TODO: Implement the fetch call to the Last.fm API.
    // The endpoint for recent tracks is something like:
    // `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=YOUR_USER&api_key=YOUR_KEY&format=json&limit=10`
    
    // For now, returning an empty array.
    console.log("Fetching recent tracks from Last.fm...");
    // Remember to handle potential errors and the case where the API returns no tracks.
    return [];
}
