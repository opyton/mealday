const express = require("express");
const router = express.Router();
const axios = require("axios");
const _ = require("lodash");
const recipeModel = require("./recipeModel");

const randomRecipe =
  "https://api.spoonacular.com/recipes/random?apiKey=" +
  process.env.API_KEY +
  "&number=5";

router.post("/byNutrient", (req, res) => {
  console.log("in nutrient");
  _.forEach(req.body, (body) => console.log(body.qty));
  res.send("in");
});

router.post("/byIngredient", async (req, res) => {
  const matchesFilter = (res, body) => {
    let found = false;
    let foundarr = _.fill(Array(body.length), false);
    try {
      _.forEach(res.extendedIngredients, (ingredient) => {
        for (let x in body) {
          if (_.includes(ingredient.name, body[x].ingredient)) {
            foundarr[x] = true;
          }
        }
        if (_.every(foundarr, (n) => n === true)) found = true;
      });
    } catch (err) {
      console.log(err);
      return found;
    }
    return found;
  };
  const getFilteredRecipes = () => {
    let recipes = [];
    var recipeProm = new Promise((resolve, reject) => {
      recipeModel.find().exec((err, response) => {
        _.forEach(response, (response) => {
          if (matchesFilter(response, req.body) && recipes.length < 100) {
            recipes = _.concat(recipes, response);
          }
        });
        resolve();
      });
    });
    recipeProm.then(() => res.send(recipes));
  };
  getFilteredRecipes();
});

router.get("/random", async (req, res) => {
  //Random Recipe send to frontend
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
  // const stringifiedEx = await axios
  //   .get(randomRecipe)
  //   .then((response) => response.data.recipes);
  // for (let n in stringifiedEx) {
  //   recipeModel.find({ id: stringifiedEx[n].id }).exec((err, res) => {
  //     if (res.length === 0) {
  //       let recipe = new recipeModel(stringifiedEx[n]);
  //       console.log(recipe.title);
  //       recipe.save();
  //     } else {
  //       console.log("not unique");
  //     }
  //   });
  // }
});

router.get("/:id", (req, res) => {
  recipeModel.findOne({ id: req.params.id }).then((data) => res.send(data));
});

router.get("/", (req, res) => res.send("test"));

module.exports = router;
