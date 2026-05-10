const express = require("express");
const connectMongo = require("./connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();
const PORT = 8001;

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});

const DB = process.env.MONGODB_URI;
connectMongo(DB);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/admin/urls", restrictTo(["ADMIN"]), staticRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
