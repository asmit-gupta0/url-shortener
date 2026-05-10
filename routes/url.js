const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.route("/").post(handleGenerateNewShortUrl);
router.route("/:shortUrl").get(handleGetRedirectUrl);
router.route("/analytics/:shortUrl").get(handleGetAnalytics);

module.exports = router;
