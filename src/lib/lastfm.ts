// This needs to be a server-only module

const API_KEY = process.env.LASTFM_API_KEY;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export interface LastfmTrack {
  name: string;
  artist: string;
  url: string;
  image: string;
}

export interface LastfmAlbum {
  name: string;
  artist: string;
  url: string;
  image: string;
}

const fetchFromLastfm = async (params: Record<string, string>) => {
    if (!API_KEY) {
        console.warn("Last.fm API key is missing. Returning placeholder data.");
        return null;
    }
    const searchParams = new URLSearchParams({
        ...params,
        api_key: API_KEY,
        format: 'json',
    });

    const response = await fetch(`${BASE_URL}?${searchParams.toString()}`, {
        // Revalidate every hour
        next: { revalidate: 3600 } 
    });

    if (!response.ok) {
        throw new Error(`Last.fm API error: ${response.statusText}`);
    }

    return response.json();
}

const getPlaceholderTracks = (): LastfmTrack[] => ([
    { name: "Nights", artist: "Frank Ocean", url: "#", image: "https://lastfm.freetls.fastly.net/i/u/300x300/c6de314a51e08821422778555e730598.jpg" }
]);

const getPlaceholderAlbums = (): LastfmAlbum[] => ([
    { name: "Blonde", artist: "Frank Ocean", url: "#", image: "https://lastfm.freetls.fastly.net/i/u/300x300/c6de314a51e08821422778555e730598.jpg" },
    { name: "Currents", artist: "Tame Impala", url: "#", image: "https://lastfm.freetls.fastly.net/i/u/300x300/54f670e335833c4f3b39221443c2d58f.jpg" },
    { name: "Good Kid, M.A.A.D City", artist: "Kendrick Lamar", url: "#", image: "https://lastfm.freetls.fastly.net/i/u/300x300/d594b08b5e58d348733b19f433f114a7.jpg" },
    { name: "The Dark Side of the Moon", artist: "Pink Floyd", url: "#", image: "https://lastfm.freetls.fastly.net/i/u/300x300/225c569f798b47249a5537553145887d.jpg" },
    { name: "Discovery", artist: "Daft Punk", url: "#", image: "https://lastfm.freetls.fastly.net/i/u/300x300/8724702163494b59b56f85635386d34e.jpg" },
]);

export async function getWeeklyTopTracks(username: string): Promise<LastfmTrack[]> {
    try {
        const data = await fetchFromLastfm({
            method: 'user.gettoptracks',
            user: username,
            period: '7day',
            limit: '1',
        });

        if (!data || !data.toptracks || !data.toptracks.track) {
            return getPlaceholderTracks();
        }

        return data.toptracks.track.map((track: any) => ({
            name: track.name,
            artist: track.artist.name,
            url: track.url,
            image: track.image.find((img: any) => img.size === 'extralarge')['#text'] || `https://picsum.photos/seed/${track.name}/600/600`,
        }));
    } catch (error) {
        console.error("Error fetching top tracks, returning placeholders", error);
        return getPlaceholderTracks();
    }
}

export async function getWeeklyTopAlbums(username: string): Promise<LastfmAlbum[]> {
     try {
        const data = await fetchFromLastfm({
            method: 'user.gettopalbums',
            user: username,
            period: '7day',
            limit: '10',
        });

        if (!data || !data.topalbums || !data.topalbums.album) {
            return getPlaceholderAlbums();
        }

        return data.topalbums.album.map((album: any) => ({
            name: album.name,
            artist: album.artist.name,
            url: album.url,
            image: album.image.find((img: any) => img.size === 'extralarge')['#text'] || `https://picsum.photos/seed/${album.name}/300/300`,
        }));
    } catch (error) {
        console.error("Error fetching top albums, returning placeholders", error);
        return getPlaceholderAlbums();
    }
}
