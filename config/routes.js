const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const baseController = require("../controllers/base.controller");

const placeController = require("../controllers/place.controller");
const userController = require("../controllers/user.controller");
const tourController = require("../controllers/tour.controller");

module.exports = router;

router.post("/user/add", userController.doGoogleLogin);
// Tours
router.post("/tour/new", tourController.create);
router.get("/tour/list", tourController.list);
router.get("/tour/list/recommended", tourController.listRecommended);
router.get("/tour/list/regular", tourController.listRegular);
router.get("/tour/:id", tourController.getTour);
router.delete("/tour/delete/:id", tourController.delete);

// Places
router.post("/place/new/:id", placeController.save);
router.get("/places/:id", placeController.getPlaces);
router.get("/place/:id", placeController.getPlace);
router.get("/places", placeController.list);
// tour and place id???
router.post("/place/delete/:id", placeController.delete);
