const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

router.route("/signup").post(handleUserSignup);
router.route("/login").post(handleUserLogin);

module.exports = router;
