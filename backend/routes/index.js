const express = require("express");
const Url = require("../models/Url");
const router = express.Router();
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url was found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
});
module.exports = router;
