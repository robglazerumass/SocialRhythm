import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let token = getToken();

/**
 * Initializes a token based on the client_id and client_secret hashes.
 * Assure that these are present in the .env file.
 * The app is registered on Spotify's developer dashboard.
 */
async function getToken() {
    const urlString = "https://accounts.spotify.com/api/token"
    const url = new URL(urlString);
    url.searchParams.append("grant_type", "client_credentials");
    url.searchParams.append("client_id", CLIENT_ID)
    url.searchParams.append("client_secret", CLIENT_SECRET)

    let response = await fetch(url.toString(), {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(res => res.json());

    token = response;
}

/**
 * @param {string} query The contents of the user's search.
 * @param {[string]} types Refers to the types of data to be requested. Valid inputs for this app will be "artist", "album", "track". 
 * @param {number} limit Limit for number of responses.
 * 
 * @typedef {Object} SpotifyQueryResponse
 * @property {Array?} albums - A list of albums returned
 * @property {Array?} artists - A list of artists returned
 * @property {Array?} track - A list of tracks returned
 * @returns {SpotifyQueryResponse} See https://developer.spotify.com/documentation/web-api/reference/search
 */
export async function searchSpotify(query, types, limit) {
    const urlString = "https://api.spotify.com/v1/search";
    const url = new URL(urlString);
    url.searchParams.append("q", query);
    url.searchParams.append("type", types);
    url.searchParams.append("limit", limit);

    let response = await fetch(url, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token.access_token}` }
    }).then(res => res.json());

    // Handle expired token
    if (response.status === 401) {
        getToken();
        return searchSpotify(query, types, limit);
    }
    
    return response;
}