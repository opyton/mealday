const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  vegetarian: Boolean,
  vegan: Boolean,
  glutenFree: Boolean,
  dairyFree: Boolean,
  veryHealthy: Boolean,
  cheap: Boolean,
  veryPopular: Boolean,
  sustainable: Boolean,
  weightWatcherSmartPoints: Number,
  gaps: String,
  lowFodmap: Boolean,
  aggregateLikes: Number,
  spoonacularScore: Number,
  healthScore: Number,
  creditsText: String,
  license: String,
  sourceName: String,
  pricePerServing: Number,
  extendedIngredients: [
    {
      id: Number,
      aisle: String,
      image: String,
      consistency: String,
      name: String,
      original: String,
      originalString: String,
      originalName: String,
      amount: Number,
      unit: String,
      meta: [String],
      metaInformation: [String],
      measures: {
        us: { amount: Number, unitShort: String, unitLong: String },
        metric: { amount: Number, unitShort: String, unitLong: String },
      },
    },
  ],
  id: Number,
  title: String,
  readyInMinutes: Number,
  servings: Number,
  sourceUrl: String,
  image: String,
  imageType: String,
  summary: String,
  cuisines: [String],
  dishTypes: [String],
  diets: [String],
  occasions: [String],
  instructions: String,
  analyzedInstructions: [
    {
      name: String,
      steps: [
        {
          number: Number,
          step: String,
          ingredients: [
            {
              id: Number,
              name: String,
              localizedName: String,
              image: String,
            },
          ],
          equipment: [
            {
              id: Number,
              name: String,
              localizedName: String,
              image: String,
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("recipes", recipeSchema);
