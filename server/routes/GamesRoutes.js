const express = require("express");
const Env = require("../config/Env");
const RawgService = require("../services/RawgService");
const SteamService = require("../services/SteamService");

const GamesRoutes = express.Router();
const MAX_SLUGS_PER_REQUEST = 20;

/* Combines both sources: RAWG supplies the game record, Steam the portrait
   cover. cover_image is what the cards render; background_image stays on the
   payload so a game without Steam art still has something to show. */
async function BuildGameCard(slug){
    const game = await RawgService.FetchGame(slug);
    if(!game) return null;

    const appId = await RawgService.FetchSteamAppId(slug);
    const coverUrl = await SteamService.ResolveCoverUrl(appId, game.name);

    return {
        ...game,
        cover_image: coverUrl || game.background_image,
        cover_is_portrait: Boolean(coverUrl)
    };
}

GamesRoutes.get("/", async (req, res) => {
    if(!Env.RawgKey){
        console.error("RAWGKEY is missing from server/.env - /api/games cannot run");
        return res.status(500).json({ error: "Game lookup is unavailable." });
    }

    const requestedSlugs = String(req.query.slugs || "").split(",").filter(Boolean);
    if(requestedSlugs.length === 0 || requestedSlugs.length > MAX_SLUGS_PER_REQUEST){
        return res.status(400).json({ error: `Provide between 1 and ${MAX_SLUGS_PER_REQUEST} slugs.` });
    }

    const invalidSlug = requestedSlugs.find((slug) => !RawgService.IsValidSlug(slug));
    if(invalidSlug){
        return res.status(400).json({ error: "Slugs may only contain lowercase letters, digits and hyphens." });
    }

    try{
        /*One lookup per slug, but they run together instead of in sequence*/
        const games = await Promise.all(requestedSlugs.map(BuildGameCard));
        res.json({ results: games.filter(Boolean) });
    }catch(error){
        console.error("Game lookup failed:", error.message);
        res.status(502).json({ error: "Could not reach the game database." });
    }
});

module.exports = GamesRoutes;
