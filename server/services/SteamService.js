const TimedCache = require("../utils/TimedCache");

const STEAM_CDN = "https://cdn.cloudflare.steamstatic.com/steam/apps";
const STEAM_SEARCH = "https://store.steampowered.com/api/storesearch/";
/*600x900 portrait art - the shape the review cards are drawn at*/
const COVER_FILE = "library_600x900.jpg";
const CoverCache = new TimedCache(1000 * 60 * 60 * 24);
const SearchCache = new TimedCache(1000 * 60 * 60 * 24);

function BuildCoverUrl(appId){
    return `${STEAM_CDN}/${appId}/${COVER_FILE}`;
}

/* Not every Steam app publishes portrait art, so the URL is confirmed with a
   HEAD request before it is handed to the client and 404s in the browser. */
async function HasCover(appId){
    const hit = CoverCache.Get(appId);
    if(hit !== undefined) return hit;

    try{
        const response = await fetch(BuildCoverUrl(appId), { method: "HEAD" });
        return CoverCache.Set(appId, response.ok);
    }catch(error){
        console.error(`Steam cover check failed for appid ${appId}:`, error.message);
        return CoverCache.Set(appId, false);
    }
}

/* Fallback for games RAWG has no Steam link for - matches on title instead. */
async function FindAppIdByName(name){
    const hit = SearchCache.Get(name);
    if(hit !== undefined) return hit;

    try{
        const response = await fetch(`${STEAM_SEARCH}?term=${encodeURIComponent(name)}&cc=us&l=en`);
        if(!response.ok) return SearchCache.Set(name, null);

        const payload = await response.json();
        const firstMatch = (payload.items || [])[0];
        return SearchCache.Set(name, firstMatch ? String(firstMatch.id) : null);
    }catch(error){
        console.error(`Steam search failed for "${name}":`, error.message);
        return SearchCache.Set(name, null);
    }
}

/* Returns a portrait cover URL, or null when Steam has nothing usable so the
   caller can fall back to RAWG's landscape art. */
async function ResolveCoverUrl(appId, gameName){
    let resolvedId = appId;

    if(resolvedId && await HasCover(resolvedId)){
        return BuildCoverUrl(resolvedId);
    }

    resolvedId = await FindAppIdByName(gameName);
    if(resolvedId && await HasCover(resolvedId)){
        return BuildCoverUrl(resolvedId);
    }

    return null;
}

module.exports = { ResolveCoverUrl };
