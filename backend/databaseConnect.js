if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");

const mongoConnection = new Promise((resolve, reject) => {
  const mongoDB_user = process.env.DB_USER;
  const mongoDB_pswd = process.env.DB_PSWD;
  const mongoDB_cluster = process.env.DB_CLUSTER;
  const mongoDB_URI =
    "mongodb+srv://" + mongoDB_user + ":" + mongoDB_pswd + mongoDB_cluster;
  mongoDB_URI ? resolve(mongoDB_URI) : reject("error: invalid uri");
});

mongoConnection
  .then((url) =>
    mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err) => (err ? console.log(err) : console.log("connected to database"))
    )
  )
  .catch((msg) => console.log(msg));

module.exports = mongoConnection;
