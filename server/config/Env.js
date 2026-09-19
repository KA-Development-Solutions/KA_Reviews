const path = require("path");

/*Node 20.12+ reads a .env natively, so no dotenv dependency.
  Loaded once here and shared by every module that needs a secret.*/
process.loadEnvFile(path.join(__dirname, "..", ".env"));

const Env = {
    Port: process.env.PORT || 3000,
    RawgKey: process.env.RAWGKEY || "",
    ClientDist: path.join(__dirname, "..", "..", "client", "dist")
};

module.exports = Env;
