const AsyncHandler = require("express-async-handler");
const Url = require("../models/Url");

const indexController = AsyncHandler(async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No Url was found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});
module.exports = indexController;
