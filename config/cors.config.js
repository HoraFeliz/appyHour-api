const cors = require("cors");

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN,
  
 // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
});

module.exports = corsMiddleware;
// origin: process.env.CORS_ORIGIN || "http://localhost:3000",