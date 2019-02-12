require('dotenv').config();
const paprika = require('export-paprika-recipes');

paprika.saveRecipes(
  process.env.PAPRIKA_USERNAME,
  process.env.PAPRIKA_PASSWORD,
  './data/recipes.json'
);
