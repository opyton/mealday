if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const recipeEndpoints = require("./recipeEndpoints");
const app = express();

const PORT = process.env.PORT || 4000;
app.use("/recipes", recipeEndpoints);
app.listen(PORT, () => console.log("now listening to port: " + PORT));
