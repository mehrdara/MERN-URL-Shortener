const AsyncHandler = require("express-async-handler");
const nanoid = require("nanoid");
const Url = require("../models/Url");
const validUrl = require("valid-url");

const urlController = AsyncHandler(async (req, res) => {
  const { inputUrl } = req.body;
  const baseUrl = process.env.BASE_URL;
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json(`Invalid input url`);
  }
  const urlCode = nanoid.nanoid(5);
  if (validUrl.isUri(inputUrl)) {
    try {
      let url = await Url.findOne({ longUrl: inputUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl: inputUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.error(err);
      res.status(500).json("server error");
    }
  }
});
module.exports = urlController;
