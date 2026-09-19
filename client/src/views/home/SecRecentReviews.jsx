//Services
import { useEffect, useRef, useState } from "react";
//Components
import ReviewCardTall from "../../shared/components/ReviewCardTall.jsx";
//Services
import { FetchGamesBySlug, MergeCovers } from "../../services/GamesApi.js";
//Data
import PseudoGames from "../../../data/pseoduGames.js";

export default function SecRecentReviews(){
    /*Starts on the local placeholders so the carousel renders immediately,
      then swaps in the live cover art once RAWG answers*/
    const [games, setGames] = useState(PseudoGames);
    /*useRef hands us the real <div> element so we can scroll it directly.
      Unlike state, changing a ref never re-renders the component.*/
    const trackRef = useRef(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    function UpdateArrows(){
        const track = trackRef.current;
        if(!track) return;

        /*scrollWidth is the full width of the row, clientWidth only the visible part.
          The 1px of slack absorbs fractional scroll values from browser zoom.*/
        setAtStart(track.scrollLeft <= 1);
        setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
    }

    useEffect(() => {
        UpdateArrows();
        window.addEventListener("resize", UpdateArrows);
        return () => window.removeEventListener("resize", UpdateArrows);
    }, []);

    useEffect(() => {
        /*Guards against a late response landing after the section has unmounted*/
        let isActive = true;

        FetchGamesBySlug(PseudoGames.map((game) => game.slug))
            .then((liveGames) => {
                if(isActive) setGames(MergeCovers(PseudoGames, liveGames));
            })
            .catch((error) => {
                /*Placeholder art stays on screen - the page is still usable*/
                console.error("Cover art lookup failed:", error.message);
            });

        return () => { isActive = false; };
    }, []);

    function ScrollByPage(direction){
        const track = trackRef.current;
        if(!track) return;

        /*Move by most of a screenful, leaving a sliver of the last card visible
          so the user keeps their bearings*/
        track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
    }

    return(
        <section className="rec-reviews sec-panel">
            <h1>Recent Reviews</h1>
            <div className="reviews-carousel">
                <button className="reviews-arrow-btn reviews-arrow-prev"
                    onClick={() => ScrollByPage(-1)}
                    disabled={atStart}
                    aria-label="Previous reviews">➜</button>

                <div className="reviews-track" ref={trackRef} onScroll={UpdateArrows}>
                    {games.map((game) => (
                        <ReviewCardTall
                            key={game.id}
                            reviewCoverUrl={game.background_image}
                            reviewName={game.name}
                            reviewType={game.genres[0].slug}
                            rating={(game.rating * 2).toFixed(1)}
                        />
                    ))}
                </div>

                <button className="reviews-arrow-btn reviews-arrow-next"
                    onClick={() => ScrollByPage(1)}
                    disabled={atEnd}
                    aria-label="Next reviews">➜</button>
            </div>
        </section>
    )
}
