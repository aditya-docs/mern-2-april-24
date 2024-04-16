const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const currencyRoutes = require("./routes/currencies.routes")
const userRoutes = require("./routes/users.routes")
const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.use("/currencies", currencyRoutes);

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
