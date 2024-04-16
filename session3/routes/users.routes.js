const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    searchUser,
  } = require("../controllers/users.controller");

router.get("/", getUsers);

router.get("/search", searchUser);

router.get("/:id", getUserById);

module.exports = router