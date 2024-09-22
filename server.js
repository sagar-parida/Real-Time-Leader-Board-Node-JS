const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log(err));

app.listen(process.env.port, () =>
  console.log(`Server is running on port ${process.env.port} [:>:] `)
);
