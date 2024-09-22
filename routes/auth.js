const express = require("express");
const { auth, register } = require("../service/authService");
const router = express.Router();

router.route("/login").post(auth);
router.route("/register").post(register);

module.exports = router;
