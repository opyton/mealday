const express = require("express");
const router = express.Router();
const axios = require("axios");
const _ = require("lodash");
const recipeModel = require("./recipeModel");

const randomRecipe =
  "https://api.spoonacular.com/recipes/random?apiKey=" +
  process.env.API_KEY +
  "&number=5";

router.get("/random", async (req, res) => {
  //Random Recipe sent
  recipeModel.countDocuments().exec((err, count) => {
    var random = Math.floor(Math.random() * count);
    recipeModel
      .findOne()
      .skip(random)
      .exec((err, result) => {
        // console.log(result);
        res.send(result);
      });
  });

  //Storing data from api
  const stringifiedEx = await axios
    .get(randomRecipe)
    .then((response) => response.data.recipes);
  for (let n in stringifiedEx) {
    recipeModel.find({ id: stringifiedEx[n].id }).exec((err, res) => {
      if (res.length === 0) {
        let recipe = new recipeModel(stringifiedEx[n]);
        console.log(recipe.title);
        recipe.save();
      } else {
        console.log("not unique");
      }
    });
  }
});

router.get("/", (req, res) => res.send("test"));

module.exports = router;
