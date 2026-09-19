/* Placeholder game data shaped like a RAWG /games response item, so swapping in
   a real fetch later means deleting this file, not rewriting the components.
   Field names stay snake_case to match the API. Release dates and platforms are
   real; ratings, review counts and cover images are invented stand-ins. */
const PseudoGames = [
    {
        id: 1,
        slug: "project-echoes-of-the-end",
        name: "Echoes of the End",
        released: "2025-08-12",
        background_image: "https://placehold.co/600x900/212121/F9FAFB?text=Echoes+of+the+End",
        rating: 3.6,
        rating_top: 5,
        ratings_count: 412,
        metacritic: 68,
        genres: [
            { id: 4, name: "Action", slug: "action" },
            { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
        ],
        platforms: ["PC", "PlayStation 5", "Xbox Series S/X"]
    },
    {
        id: 2,
        slug: "halo-infinite",
        name: "Halo Infinite",
        released: "2021-12-08",
        background_image: "https://placehold.co/600x900/212121/F9FAFB?text=Halo+Infinite",
        rating: 4.1,
        rating_top: 5,
        ratings_count: 3187,
        metacritic: 87,
        genres: [
            { id: 2, name: "Shooter", slug: "shooter" },
            { id: 4, name: "Action", slug: "action" }
        ],
        platforms: ["PC", "Xbox Series S/X", "Xbox One"]
    },
    {
        id: 3,
        slug: "baldurs-gate-3",
        name: "Baldur's Gate 3",
        released: "2023-08-03",
        background_image: "https://placehold.co/600x900/212121/F9FAFB?text=Baldur%27s+Gate+3",
        rating: 4.8,
        rating_top: 5,
        ratings_count: 5964,
        metacritic: 96,
        genres: [
            { id: 5, name: "RPG", slug: "role-playing-games-rpg" },
            { id: 7, name: "Strategy", slug: "strategy" }
        ],
        platforms: ["PC", "PlayStation 5", "Xbox Series S/X", "macOS"]
    },
    {
        id: 4,
        slug: "borderlands-4",
        name: "Borderlands 4",
        released: "2025-09-12",
        background_image: "https://placehold.co/600x900/212121/F9FAFB?text=Borderlands+4",
        rating: 4.2,
        rating_top: 5,
        ratings_count: 1043,
        metacritic: 82,
        genres: [
            { id: 2, name: "Shooter", slug: "shooter" },
            { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
        ],
        platforms: ["PC", "PlayStation 5", "Xbox Series S/X"]
    },
    {
        id: 5,
        slug: "the-last-of-us-part-i",
        name: "The Last of Us Part I",
        released: "2022-09-02",
        background_image: "https://placehold.co/600x900/212121/F9FAFB?text=The+Last+of+Us+Part+I",
        rating: 4.5,
        rating_top: 5,
        ratings_count: 2276,
        metacritic: 88,
        genres: [
            { id: 4, name: "Action", slug: "action" },
            { id: 3, name: "Adventure", slug: "adventure" }
        ],
        platforms: ["PlayStation 5", "PC"]
    },
    {
        id: 6,
        slug: "the-last-of-us-part-2",
        name: "The Last of Us Part II",
        released: "2020-06-19",
        background_image: "https://placehold.co/600x900/212121/F9FAFB?text=The+Last+of+Us+Part+II",
        rating: 4.6,
        rating_top: 5,
        ratings_count: 4415,
        metacritic: 93,
        genres: [
            { id: 4, name: "Action", slug: "action" },
            { id: 3, name: "Adventure", slug: "adventure" }
        ],
        platforms: ["PlayStation 5", "PlayStation 4", "PC"]
    }
];

export default PseudoGames;
