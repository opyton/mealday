if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 4000;

require("./databaseConnect");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

const recipeEndpoints = require("./recipeEndpoints");
app.use("/recipes", recipeEndpoints);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build"));
});
app.listen(PORT, () => console.log("now listening to port: " + PORT));
