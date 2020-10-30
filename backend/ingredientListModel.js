const mongoose = require("mongoose");

const ingredientListSchema = mongoose.Schema({
  ingredientList: [String],
});

module.exports = mongoose.model("ingredientList", ingredientListSchema);
