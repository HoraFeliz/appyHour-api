const cors = require("cors");

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "Content-Type",
    "X-Auth-Token",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
  credentials: true,
});

module.exports = corsMiddleware;
