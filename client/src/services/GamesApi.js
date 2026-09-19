/* Talks to our own Express route, never to RAWG directly - the API key lives
   on the server, so the browser never sees it. */

export async function FetchGamesBySlug(slugs){
    const response = await fetch(`/api/games?slugs=${slugs.join(",")}`);
    if(!response.ok){
        throw new Error(`Game lookup failed with status ${response.status}`);
    }

    const payload = await response.json();
    return payload.results;
}

/* Keeps the local placeholder as the base record and lays the live cover over
   it, so a game RAWG does not recognise still renders with its stand-in art.
   cover_image is Steam's portrait art where it exists, RAWG's landscape art otherwise. */
export function MergeCovers(localGames, liveGames){
    const coversBySlug = new Map(liveGames.map((game) => [game.slug, game.cover_image]));

    return localGames.map((game) => ({
        ...game,
        background_image: coversBySlug.get(game.slug) || game.background_image
    }));
}
