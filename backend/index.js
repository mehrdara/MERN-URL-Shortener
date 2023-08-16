const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("API is running....");
});
connectDB();
app
  .listen(PORT, () => console.log(`server started on port ${PORT}`))
  .on("error", (err) => {
    process.once("SIGUSR2", () => {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", () => {
      process.kill(process.pid, "SIGINT");
    });
  });
