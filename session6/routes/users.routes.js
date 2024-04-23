const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    searchUser,
  } = require("../controllers/users.controller");
const validateSearchQuery = require("../middleware/validateSearchQuery")

router.get("/", getUsers);

router.get("/search", validateSearchQuery, searchUser);

router.get("/:id", getUserById);

module.exports = router