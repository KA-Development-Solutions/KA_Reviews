const rateLimit = require("express-rate-limit");

const ApiLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many requests, please slow down." }
});

module.exports = ApiLimiter;
