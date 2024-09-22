const express = require("express");
const morgan = require("morgan");
const { fileURLToPath } = require("url");
const path = require("path");
const cors = require("cors");
const catchError = require("./utils/catchError");
const errorHandler = require("./utils/errorHandler");

const authRouter = require("./routes/auth");

const app = express();
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRouter);

app.use("*", (req, res, next) => {
  return next(new errorHandler("Invalid Route", 400));
});

app.use(catchError);

module.exports = app;
