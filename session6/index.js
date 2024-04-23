const express = require("express");
const mongoose = require("mongoose")
// const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const currencyRoutes = require("./routes/currencies.routes")
const userRoutes = require("./routes/users.routes")
const blogRoutes = require("./routes/blogs.routes")
const verifyAuth = require("./middleware/verifyAuth")

const app = express();
const PORT = 8082;

const DB_URI = "mongodb://127.0.0.1:27017";

mongoose
  .connect(`${DB_URI}`)
  .then(() => console.log("Connected to DB at", DB_URI))
  .catch((e) => console.log("Failed to connect to DB", e));

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.use(express.json())

app.use(verifyAuth);

app.use("/currencies", currencyRoutes);

app.use("/users", userRoutes);

app.use("/blogs", blogRoutes)

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
