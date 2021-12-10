const cors = require("cors");

const corsMiddleware = cors({
  origin: "*",
 // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

module.exports = corsMiddleware;
// origin: process.env.CORS_ORIGIN || "http://localhost:3000",