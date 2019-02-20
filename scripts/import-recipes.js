const fs = require('fs');
require('dotenv').config();
const paprika = require('export-paprika-recipes');

const dir = 'data';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

paprika.saveRecipes(
  process.env.PAPRIKA_USERNAME,
  process.env.PAPRIKA_PASSWORD,
  `./${dir}/recipes.json`
);
