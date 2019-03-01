# gatsby-theme-paprika

A [Gatsby](https://www.gatsbyjs.org/) theme that pulls in your data from Paprika and displays your recipes.

[Demo](http://adam.garrett-harris.com/recipes/)

## Using

Install the theme:

```sh
npm install gatsby-theme-paprika gatsby react react-dom gatsby-plugin-compile-es6-packages
```

Create `gatsby-config.js` with the following:

```js
module.exports = {
  __experimentalThemes: [
    {
      resolve: `gatsby-theme-paprika`,
      options: {},
    },
  ],
  plugins: [
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`gatsby-theme-paprika`]
      }
    }
  ],
};
```

Add the following scripts to `package.json`:

```json
"scripts": {
  "develop": "gatsby develop",
  "build": "gatsby build",
  "import": "node ./node_modules/gatsby-theme-paprika/scripts/import-recipes.js"
},
```

Create a `.env` file with the following:

```
PAPRIKA_USERNAME=my-email@email.com
PAPRIKA_PASSWORD=somethingsecure
```

Add a `.gitignore` file:

```
.env
node_modules
.cache
public
```

Import Recipes from Paprika

```
npm run import
```

Run the site locally:

```
npm run develop
```

Or build the site:

```
npm run build
```

## Deploy

To deploy to GitHub Pages you can do the following:

```sh
npm install --save-dev gh-pages
```

Add this script to `package.json`:

```
"deploy": "gatsby build --prefix-paths && gh-pages -d public -b gh-pages",
```

And deploy:

```
npm run deploy
```

### Related

- [export-paprika-recipes](https://github.com/agarrharr/export-paprika-recipes)
- [recipes](https://github.com/agarrharr/recipes)

## License

MIT
