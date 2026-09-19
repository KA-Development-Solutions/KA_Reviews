const Env = require("../config/Env");
const TimedCache = require("../utils/TimedCache");

const RAWG_BASE = "https://api.rawg.io/api";
/*Covers and store links change rarely, so results are held for 6h*/
const GameCache = new TimedCache(1000 * 60 * 60 * 6);
const AppIdCache = new TimedCache(1000 * 60 * 60 * 24);
/*RAWG slugs are lowercase, digits and hyphens - anything else is rejected
  rather than forwarded, so this cannot be used as an open proxy*/
const SLUG_PATTERN = /^[a-z0-9-]{1,80}$/;
const STEAM_STORE_ID = 1;

function IsValidSlug(slug){
    return SLUG_PATTERN.test(slug);
}

/*Only the fields the cards use are passed on, so a change in RAWG's payload
  cannot quietly reshape what the client receives*/
function ToGameSummary(payload){
    return {
        id: payload.id,
        slug: payload.slug,
        name: payload.name,
        released: payload.released,
        background_image: payload.background_image,
        rating: payload.rating,
        metacritic: payload.metacritic,
        genres: (payload.genres || []).map((genre) => ({
            id: genre.id,
            name: genre.name,
            slug: genre.slug
        }))
    };
}

async function FetchGame(slug){
    const hit = GameCache.Get(slug);
    if(hit !== undefined) return hit;

    const response = await fetch(`${RAWG_BASE}/games/${slug}?key=${Env.RawgKey}`);
    if(response.status === 404){
        return GameCache.Set(slug, null);
    }
    if(!response.ok){
        throw new Error(`RAWG responded ${response.status} for game ${slug}`);
    }

    return GameCache.Set(slug, ToGameSummary(await response.json()));
}

/* The game detail payload carries empty store urls, so the appid has to come
   from the separate /stores endpoint. Returns null when a game has no Steam page. */
async function FetchSteamAppId(slug){
    const hit = AppIdCache.Get(slug);
    if(hit !== undefined) return hit;

    const response = await fetch(`${RAWG_BASE}/games/${slug}/stores?key=${Env.RawgKey}`);
    if(!response.ok){
        return AppIdCache.Set(slug, null);
    }

    const payload = await response.json();
    const steamEntry = (payload.results || []).find((entry) => entry.store_id === STEAM_STORE_ID);
    const appId = steamEntry ? (steamEntry.url.match(/app\/(\d+)/) || [])[1] : null;

    return AppIdCache.Set(slug, appId || null);
}

module.exports = { IsValidSlug, FetchGame, FetchSteamAppId };
