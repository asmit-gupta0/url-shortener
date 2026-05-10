const URL = require("../models/url");
const { nanoid } = require("nanoid");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortUrl = nanoid();
  await URL.create({
    shortUrl: shortUrl,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.status(201).render("home", {
    short_url: shortUrl,
    urls: allUrls,
  });
}

async function handleGetRedirectUrl(req, res) {
  const shortUrl = req.params.shortUrl;
  const entry = await URL.findOneAndUpdate(
    {
      shortUrl,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  console.log(entry.redirectUrl);
  res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
  const shortUrl = req.params.shortUrl;
  const result = await URL.findOne({ shortUrl });
  return res.json({
    total_clicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics,
};
