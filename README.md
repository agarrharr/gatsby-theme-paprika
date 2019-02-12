# paprika-site

A website made with [Gatsby](https://www.gatsbyjs.org/) that pulls in your data from Paprika and displays your recipes.

## Add dotfiles

Create a file called `.env` and add the following:

```
PAPRIKA_USERNAME=my-email@email.com
PAPRIKA_PASSWORD=somethingsecure
```

## Import Recipes from Paprika

```
node scripts/import-recipes.js
```

## Develop

```
npm run develop
```

### Build

```
npm run build
```

### Related

- [export-paprika-recipes](https://github.com/agarrharr/export-paprika-recipes)

## License

MIT
