const cors = require("cors");

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  allowedHeaders: [
    "Content-Type",
    "X-Auth-Token",
    "Access-Control-Allow-Headers",
    "Authorization",
  ],
  credentials: true,
});

module.exports = corsMiddleware;
