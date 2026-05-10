const mongoose = require("mongoose");

function connectMongo(mongo_url) {
  return mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("MongoDB Connected!");
    })
    .catch((err) => {
      console.log("Mongo Error: ", err);
    });
}

module.exports = connectMongo;
