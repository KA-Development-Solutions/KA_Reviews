const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "client", "dist")))

// Only listen when run directly (node server/index.js). Vercel imports this
// module as a serverless function, where opening a port would never run.
if (require.main === module) {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

module.exports = app;
