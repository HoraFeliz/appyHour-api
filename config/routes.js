const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const baseController = require("../controllers/base.controller");

const placeController = require("../controllers/place.controller");
const userController = require("../controllers/user.controller");
const tourController = require("../controllers/tour.controller");

module.exports = router;

router.get("/", baseController.index);

// Authentication
router.get(
  "/auth/google",
  //session.isNotAuthenticated,
  userController.doGoogleLogin
);
router.get(
  "/auth/google/callback",
  //session.isNotAuthenticated,
  userController.googleCallback
);

router.post("/login", userController.login);
router.get("/logout", authMiddleware.isAuthenticated, userController.logout);

// Tours
router.post("/tour/new", tourController.create);
router.get("/tour/list", tourController.list);
router.get("/tour/:id", tourController.getTour);
router.delete("/tour/delete/:id", tourController.delete);

// Places
router.post("/place/new", placeController.save);
router.get("/places", placeController.getPlaces);
router.get("/place", placeController.getPlace);
// tour and place id???
router.post("/place/delete/:id", placeController.delete);
