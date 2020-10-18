if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;

require("./databaseConnect");

const app = express();
app.use(cors());
app.use(express.json());

const recipeEndpoints = require("./recipeEndpoints");
app.use("/recipes", recipeEndpoints);
app.listen(PORT, () => console.log("now listening to port: " + PORT));
