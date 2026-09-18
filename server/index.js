require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const pool = require("./db");

app.use(express.static(path.join(__dirname, "..", "client", "dist")))

// Only listen when run directly (node server/index.js). Vercel imports this
// module as a serverless function, where opening a port would never run.
if (require.main === module) {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

app.get("/api/health", async (req, res) => {
  try{
    const result = await pool.query("SELECT now()");
    res.json({ok: true, time: result.rows[0].now});
  } catch(err){
    console.error(err);
    res.status(500).json({ok: false});
  }
});

module.exports = app;
