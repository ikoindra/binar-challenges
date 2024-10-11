require("dotenv").config(); // To enable .env called.
const express = require("express"); // Import express with non-module
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 2024 * 1024 },
  })
);

app.get("/", (req, res) => {
  res.send("ping successfully");
});

app.use("/", router);

app.use("*", notFoundURLHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});
