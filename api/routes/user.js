const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const userController = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, userController.get_all);

router.post("/signup", userController.signup);

router.post("/login", userController.login);

module.exports = router;
