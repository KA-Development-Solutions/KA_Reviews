const express = require("express");
const Env = require("./config/Env");
const ApiLimiter = require("./middleware/RateLimiter");
const GamesRoutes = require("./routes/GamesRoutes");

const app = express();

/*Every /api route is rate limited before it reaches a handler*/
app.use("/api", ApiLimiter);
app.use("/api/games", GamesRoutes);

app.use(express.static(Env.ClientDist));

app.listen(Env.Port, () => console.log(`http://localhost:${Env.Port}`));
