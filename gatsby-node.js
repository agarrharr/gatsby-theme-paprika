const path = require(`path`);
const slug = require(`slug`);
const urlify = a => a.replace(/\s/g, '-').toLowerCase();
const { addToWebpackConfig } = require('@dschau/gatsby-theme-utils');

const { name } = require('./package.json');

exports.onCreateWebpackConfig = addToWebpackConfig(name);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  const types = {
    RECIPE: `RecipesJson`,
  };

  if (node.internal.type === types.RECIPE) {
    createNodeField({
      node,
      name: `slug`,
      value: urlify(node.name),
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allRecipesJson {
          edges {
            node {
              id
              uid
              name
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allRecipesJson.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: require.resolve(`./src/templates/recipe.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            id: node.id,
            imagePath: `${node.uid}.jpg`,
          },
        });
      });
      resolve();
    });
  });
};
