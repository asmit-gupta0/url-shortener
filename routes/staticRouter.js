const express = require("express");
const URL = require("../models/url");
const User = require("../models/user");

const router = express.Router();

router.route("/admin/urls").get(async (req, res) => {
  if (!req.user) return res.redirect("/user/login");
  const allUrls = await URL.find({});
  const allUsers = await User.find({});
  console.log(req.user.role);

  return res.render("home", {
    users: allUsers,
    userRole: req.user.role,
    urls: allUrls,
  });
});
router.route("/url").get(async (req, res) => {
  if (!req.user) return res.redirect("/user/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allUrls,
  });
});
router.route("/user/signup").get((req, res) => {
  return res.render("signup");
});
router.route("/user/login").get((req, res) => {
  return res.render("login");
});

module.exports = router;
