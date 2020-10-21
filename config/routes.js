const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const baseController = require("../controllers/base.controller");
const userController = require("../controllers/user.controller");
const tourController = require("../controllers/tour.controller");

module.exports = router;

router.get("/", baseController.index);

// Authentication
router.post("/login", userController.login);
router.get("/logout", authMiddleware.isAuthenticated, userController.logout);

// Routes
router.post("/tour/new", authMiddleware.isAuthenticated, tourController.create);
