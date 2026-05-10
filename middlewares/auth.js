const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const token = req.cookies?.uid;

  req.user = null;
  if (!token) return next();

  const user = getUser(token);
  req.user = user;
  return next();
}

// restrictTo(roles[]){ if roles.contains(user.role) r next; else r send("unaothorised access!") }
function restrictTo(roles = []) {
  return function (req, res, next) {
    const user = req.user;
    if (!user) return res.redirect("/user/login");
    if (!roles.includes(user.role)) return res.end("Unauthorised Access");
    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
