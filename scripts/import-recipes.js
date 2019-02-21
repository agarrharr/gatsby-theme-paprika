const fs = require('fs');
require('dotenv').config();
const paprika = require('export-paprika-recipes');

const dir = 'data';
const photoDir = `./${dir}/photos`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

if (!fs.existsSync(photoDir)) {
  fs.mkdirSync(photoDir);
}

console.log(photoDir);
paprika.saveRecipes(
  process.env.PAPRIKA_USERNAME,
  process.env.PAPRIKA_PASSWORD,
  `./${dir}/recipes.json`,
  photoDir
);
