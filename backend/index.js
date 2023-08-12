const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API is running....");
});
connectDB();
app
  .listen(port, () => console.log(`server running on port ${port}`))
  .on("error", (err) => {
    process.once("SIGUSR2", () => {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", () => {
      process.kill(process.pid, "SIGINT");
    });
  });
