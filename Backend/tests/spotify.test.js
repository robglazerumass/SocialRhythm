import { searchSpotify } from "../spotify"

describe("Spotify search function", () => {
    it("Test limited search", async () => {
        const maxLimit = 51;
        for (let i = 1; i <= maxLimit; i += 20) {
            const response = await searchSpotify("asap", "artist,track,album", i);
            for (const key in response) {
                expect(response[key].items.length).toBeLessThanOrEqual(i);
            }
        }
    });

    it("Response contains necessary information", async () => {
        const response = await searchSpotify("Amr Diab", "artist,track", 1);
        
        const artistProps = ["name", "genres", "images", "external_urls"]
        artistProps.forEach(p => expect(response.artists.items[0]).toHaveProperty(p))

        const tracksProps = ["name", "duration_ms", "artists", "external_urls"]
        tracksProps.forEach(p => expect(response.tracks.items[0]).toHaveProperty(p))
    });

    it("Accurate search for Taylor", async () => {
        const response = await searchSpotify("Taylor", "artist", 1);
        expect(response).toHaveProperty("artists");
        expect(response.artists.items[0].name).toEqual("Taylor Swift");
    });

    it("Filters for artists, tracks, albums", async () => {
        const types = ["artist", "track", "album"];
        async function testFilter(exclude) {
            const filtered = types.filter(e => e !== exclude).join(",");
            const response = await searchSpotify("ocean blue", filtered, 1);
            types.forEach(type => {
                if (type !== exclude)
                    expect(response).toHaveProperty(type + "s");
                else
                    expect(response).not.toHaveProperty(type + "s");
            });
        }

        for (let i = 0; i < types.length; i++) {
            await testFilter(types[i]);
        }
    });
})
