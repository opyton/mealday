const express = require("express");
const router = express.Router();
const axios = require("axios");
const _ = require("lodash");

const randomRecipe =
  "https://api.spoonacular.com/recipes/random?apiKey=" +
  process.env.API_KEY +
  "&number=1&tags=vegetarian,dessert";

const randomExample = [
  {
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    weightWatcherSmartPoints: 10,
    gaps: "no",
    lowFodmap: false,
    aggregateLikes: 40,
    spoonacularScore: 19,
    healthScore: 1,
    creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    license: "CC BY 3.0",
    sourceName: "Foodista",
    pricePerServing: 30.15,
    id: 644693,
    title: "Gingerbread Mummies",
    readyInMinutes: 45,
    servings: 18,
    sourceUrl: "https://www.foodista.com/recipe/D5S56NHC/gingerbread-mummies",
    image: "https://spoonacular.com/recipeImages/644693-556x370.jpg",
    imageType: "jpg",
    summary: `Gingerbread Mummies might be just the dessert you are searching for. This recipe serves 18 and costs 30 cents per serving. One portion of this dish contains roughly <b>2g of protein</b>, <b>6g of fat</b>, and a total of <b>217 calories</b>. It is brought to you by Foodista. This recipe is liked by 40 foodies and cooks. Head to the store and pick up ground cinnamon, balsamic vinegar, , and a few other things to make it today. It is perfect for <b>Christmas</b>. It is a good option if you're following a <b>lacto ovo vegetarian</b> diet. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 16%</b>, which is not so awesome. <a href="https://spoonacular.com/recipes/marshmallow-mummies-521064">Marshmallow Mummies</a>, <a href="https://spoonacular.com/recipes/mummies-on-a-stick-399721">Mummies on a Stick</a>, and <a href="https://spoonacular.com/recipes/yummy-mummies-109761">Yummy Mummies</a> are very similar to this recipe.`,
    cuisines: [],
    dishTypes: ["dessert"],
    diets: ["lacto ovo vegetarian"],
    occasions: ["christmas"],
    instructions:
      "In a bowl of an electric mixer, beat the butter until light and fluffy.\n" +
      "In a separate small bowl, whisk together the flour, baking powder, ground ginger, baking soda, cinnamon, cloves, nutmeg and salt. Set aside.\n" +
      "Add the sugar to the butter and beat until light and fluffy. Turn the mixer to low and mix in the molasses, egg and balsamic vinegar. Slowly add the dry ingredients to the bowl and continue mixing until thoroughly combined.\n" +
      "Cover and chill about 2 hours or until the dough is easy to handle.\n" +
      "Preheat oven to 400 degrees.\n" +
      'Divide the dough in half and turn out onto a lightly floured surface. Roll each half of the dough to 1/4" thickness adding flour as needed, the dough is very sticky so use flour liberally to prevent your cutouts from sticking to the surface.\n' +
      'Using cookie cutters, cut dough into shapes and place on a baking sheet lined with parchment approximately 1" apart.\n' +
      "Bake in a 400 degree oven for 5-6 minutes. Cool on baking sheets for one minute and move to a wire rack.\n" +
      "In a small bowl, combine the powdered sugar, vanilla and milk. Whisk to combine. Spoon mixture into a pastry bag or zip top bag and snip off the tip. Add two small dots of icing where the eyes should be and then press one eye on each dot. Decorate the mummies using a zig-zag pattern across the surface of the cookie and allow to dry for 2-4 hours or overnight.\n" +
      "Store in an airtight container.",
    analyzedInstructions: [[Object]],
    originalId: null,
    spoonacularSourceUrl: "https://spoonacular.com/gingerbread-mummies-644693",
  },
];

router.get("/random", (req, res) => {
  res.send(randomExample);
});

// router.get("/random", (req, res) => {
//   console.log("in random");
//   axios
//     .get(randomRecipe)
//     .then((response) => console.log(response.data.recipes))
//     .catch((err) => console.log(err));
//   res.send("in random");
// });

//   router.get('/random', (req, res) => {
//     request.get(`findByIngredients?fillIngredients=false&ingredients=${req.query.ingredients}&limitLicense=true&number=25&ranking=2`)
//       .then(recipes => res.send(recipes.data))
//       .catch(e => res.status(400).json({
//         message: 'Request to Spoonacular failed/unauthorized'
//       }));
//   });

router.get("/", (req, res) => res.send("test"));

module.exports = router;
