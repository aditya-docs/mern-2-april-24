const express = require("express");
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currencies.controller");
const {
  getUsers,
  getUserById,
  searchUser,
} = require("./controllers/users.controller");

const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
