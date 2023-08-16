const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();
router.get("/:code", indexController);
module.exports = router;
