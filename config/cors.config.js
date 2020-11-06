const cors = require("cors");

const corsMiddleware = cors({
  origin:
    process.env.CORS_ORIGIN_HEADER || "https://appy-hour-react.netlify.app",
  allowedHeaders: ["Content-Type"],
});

module.exports = corsMiddleware;
