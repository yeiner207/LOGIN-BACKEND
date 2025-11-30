const express = require("express");
const { Model } = require("sequelize");
const { login } = require("../controllers/authController");
const { register } = require("../config/controllers/routes/authController");
const router = express.Router();

router.post("/auth/Login", login);
router.post("/auth/Register", register);

module.exports = router;



