const express = require("express");
const router = express.Router();
const baseController = require("../controllers/base.controller");

module.exports = router;

router.get("/", baseController.index);
